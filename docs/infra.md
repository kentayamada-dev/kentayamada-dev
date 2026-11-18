# インフラ

## 概要

[`infra/`](../infra/) では、n8n を Oracle Cloud Infrastructure（OCI）の Ampere A1 のインスタンスで動かすためのインフラを管理する。

- [`infra/terraform/`](../infra/terraform/): OCI のネットワーク・インスタンス・ブロックボリュームと、Cloudflare Tunnel・Access を Terraform で管理する
- [`infra/compose.yml`](../infra/compose.yml): サーバーで n8n と cloudflared を動かす
- [`infra/setup-data-volume.sh`](../infra/setup-data-volume.sh)・[`infra/create-env.sh`](../infra/create-env.sh)・[`infra/import-workflows.sh`](../infra/import-workflows.sh): サーバーの準備に使う
- [`infra/workflows/`](../infra/workflows/): n8n のワークフローのバックアップ

n8n は Cloudflare Tunnel で公開し、Cloudflare Access で許可したメールアドレスの人だけを通す。
インスタンスは受信のポートを開けず、OCI コンソールのシリアル・コンソールだけで接続する。
n8n のデータはブロックボリュームに置くため、インスタンスを作り直しても残る。

## Terraform を実行する準備

Terraform は、infra の Dev Container のなかで実行する。
Dev Container の開き方は [`Makefile`](../Makefile) にある。

### 認証情報

OCI の provider と backend は、`~/.oci/config` の API キーで認証する。

- ホストの `~/.oci` を、Dev Container に読み取り専用でマウントする
- `~/.oci/config` の `key_file` は、`~/.oci/` から始まる形で書く。ホストの絶対パスで書くと、コンテナのなかで鍵を読めない

Cloudflare の provider は、環境変数 `CLOUDFLARE_API_TOKEN` のトークンを使う。

- ホストの `CLOUDFLARE_API_TOKEN` が、Dev Container に渡る。Dev Container に渡っていなければ、コンテナの端末で `export` する

トークンには、次の権限が要る。

| 範囲 | 権限 | アクセス |
| --- | --- | --- |
| アカウント | `Cloudflare One Connector: cloudflared` | `Write` |
| アカウント | `Access: Apps and Policies` | `Write` |
| n8n のゾーン | `DNS` | `Write` |

### backend と変数

state は、OCI Object Storage のバケット `terraform-state` に置く。
バケットは Terraform の管理外のため、バージョニングを有効にした非公開のバケットを、先に作る。

backend の namespace と変数の値は、テナンシやアカウントを特定できるため、git の管理外のファイルに書く。

1. [`backend.tfbackend.example`](../infra/terraform/backend.tfbackend.example) を `backend.tfbackend` にコピーし、namespace を書き換える
2. [`terraform.tfvars.example`](../infra/terraform/terraform.tfvars.example) を `terraform.tfvars` にコピーし、値を書き換える。値の意味は [`variables.tf`](../infra/terraform/variables.tf) にある
3. `terraform init -backend-config=backend.tfbackend` で初期化する

シリアル・コンソールのパスワードのハッシュ（`console_password_hash`）は、infra のコンテナで作る。
macOS に入っている `openssl` は LibreSSL で、SHA-512 のハッシュを作る `-6` に対応していないため。
パスワードを入れると表示される、`$6$` で始まる文字列を書く。

```bash
docker compose run --rm infra openssl passwd -6
```

`terraform init` は、[`.terraform.lock.hcl`](../infra/terraform/.terraform.lock.hcl) にないプラットフォームのハッシュを足す。
Dev Container で初めて実行して差分が出たら、コミットする。

## サーバーを準備する

`terraform apply` でインスタンスを作ったら、次の手順で n8n を起動する。

1. OCI コンソールのシリアル・コンソールで、`ubuntu` ユーザーでログインする
2. `cloud-init status --wait` で、初回起動の設定（[`setup-instance.sh`](../infra/terraform/setup-instance.sh)）が終わるのを待つ。Docker を入れ、このリポジトリを `~/kentayamada-dev` に取得する
3. `cd ~/kentayamada-dev/infra` で、[`infra/`](../infra/) に移る
4. `sudo ./setup-data-volume.sh` で、ブロックボリュームを `/srv/n8n` にマウントする
5. `./create-env.sh` で `.env` を作る。`CF_TUNNEL_TOKEN` の値は、Dev Container で `terraform output -raw cloudflare_tunnel_token` を実行して取り出す
6. `sudo docker compose up -d` で、n8n と cloudflared を起動する
7. n8n の画面で、オーナーと認証情報を作る。認証情報は、前と同じ名前と種類にする
8. `./import-workflows.sh` でワークフローを取り込み、画面で認証情報のつながりを確認してから有効にする

`setup-data-volume.sh` は、ボリュームが空のときだけフォーマットし、データがあればそのまま使う。
`import-workflows.sh` は、同じ ID のワークフローを上書きし、取り込んだワークフローをすべて無効にする。

## インスタンスを作り直す

インスタンスとブロックボリュームは、`prevent_destroy` で削除を禁止している。
OS のイメージを変えるときなど、インスタンスを作り直すときは、次の手順にする。

1. [`compute.tf`](../infra/terraform/compute.tf) のインスタンスの `prevent_destroy` を、一時的に `false` にする（コミットしない）
2. `terraform apply -replace=oci_core_instance.n8n` を実行する。ブロックボリュームは残り、新しいインスタンスに付け直される
3. `prevent_destroy` を `true` に戻す
4. 「サーバーを準備する」の手順で n8n を起動する。データはブロックボリュームに残っているため、ワークフローの取り込みは要らない

手順 2 で A1 の空きがない（Out of host capacity）・ボリュームの上限（LimitExceeded）のエラーになったら、時間をおいてやり直す。

## n8n と cloudflared を更新する

n8n の版は [`infra/compose.yml`](../infra/compose.yml) で固定し、ほかの依存と同じく Renovate が更新する。
サーバーには自動では反映しないため、main に入ったら次の手順で反映する。

1. サーバーの `~/kentayamada-dev` で `git pull` する
2. `infra/` で `sudo docker compose up -d` を実行する

n8n の版は下げない。新しい版がデータベースの形を変えると、古い版で動くとは限らない。

cloudflared は、サーバーの `infra/` で `sudo docker compose pull cf` と `sudo docker compose up -d cf` を実行して更新する。

OS のパッケージは自動では更新しない。サーバーで `sudo apt upgrade` を実行する。

## 暗号化キーを控える

n8n は、認証情報を暗号化するキーを初回起動で作り、ブロックボリュームに保存する。
ボリュームを失うと認証情報を復号できなくなるため、キーを控える。
キーは、サーバーの `infra/` で `sudo docker compose exec n8n cat /home/node/.n8n/config` を実行すると表示される。

## ワークフローのバックアップ

n8n の「ワークフローバックアップ」が、毎日 n8n のワークフローを [`infra/workflows/`](../infra/workflows/) と比べる。
変更があれば `chore/n8n-workflows` ブランチにコミットし、main への PR を作る。

- PR を開いているあいだは、同じブランチにコミットを足す。マージすると、次の変更で新しい PR を作る
- 認証情報「GitHub account」のトークンには、このリポジトリの内容と PR を書き込む権限が要る
- ファイルは n8n が書き出す形のまま置く。そのため、整形・コードの重複・リンク切れの検査の対象から外している

ワークフローを取り込む前に、開いているバックアップの PR をマージし、サーバーで `git pull` する。
マージしていない変更は main にないため、古いワークフローで上書きしてしまう。

## Webhook を Access の外に出す

Slack のように Cloudflare にログインできないサービスからの Webhook は、Access を通さずに受ける。
通すパスは、[`cloudflare.tf`](../infra/terraform/cloudflare.tf) の `public_webhook_paths` に書く。

- パスは `/webhook/<webhookId>/webhook` の形で、`webhookId` はワークフローの JSON にある
- ワークフローを作り直して `webhookId` が変わったら、`public_webhook_paths` も直す
- n8n の Slack の認証情報に、Slack アプリの Signing Secret を入れる。入れないと、誰の POST でも通る
