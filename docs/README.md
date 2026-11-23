# 開発のドキュメント

## 概要

このリポジトリでは、[`portfolio/`](../portfolio/) にある Astro のサイトを開発している。
n8n を動かすインフラは、[`infra/`](../infra/) で Terraform を使って管理する。
開発は Dev Container のなかで進める。
Node.js・pnpm・Terraform はコンテナで使うため、ホストには要らない。
pnpm と Terraform の版は、それぞれ [portfolio の Dockerfile](../.devcontainer/portfolio/Dockerfile) と [infra の Dockerfile](../.devcontainer/infra/Dockerfile) だけで管理し、Renovate が更新する。

## 開発環境の始め方

開発環境は macOS だけをサポートしている。
ほかの OS では、コンテナを開く前に止まる。

ホストに次のものを入れておく。

- [Docker Desktop](https://www.docker.com/products/docker-desktop) など、Docker Compose を使える Docker
- [Visual Studio Code](https://code.visualstudio.com/) と [Dev Containers 拡張機能](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- ターミナルから VS Code を開く `code` コマンド（入れ方は [VS Code のドキュメント](https://code.visualstudio.com/docs/setup/mac) にある）
- [jq](https://formulae.brew.sh/formula/jq)

## ドキュメントの一覧

- [CI](ci.md): 検査の一覧、PR の検査・定期検査・依存の更新の動き方と、ワークフローを足すときの決まり
- [インフラ](infra.md): n8n を動かす OCI と Cloudflare の構成、Terraform の実行、サーバーの準備と運用
- [GitHub のリポジトリの準備](github-setup.md): 新しく作ったリポジトリで、管理者がする作業と、GitHub の設定の理由
- [Claude Code での開発](claude-code.md): 手動で起動するスキル、サンドボックスの決まり、デスクトップアプリのプレビュー
