# Claude Code での開発

Claude Code で開発するための設定は、[`.claude/`](../.claude/) にある。
Claude への指示は、[`CLAUDE.md`](../CLAUDE.md) と [`.claude/rules/`](../.claude/rules/) に書いている。

## 手動で起動するスキル

次のスキルは、Claude が自分の判断では使わない。
使うときは、Claude Code で `/<スキルの名前>` と入力して起動する。

| スキル | 使う場面 | 起動で指示したとみなす操作 |
| --- | --- | --- |
| [`/merge-dependency-pr`](../.claude/skills/merge-dependency-pr/SKILL.md) | 自動マージしない Renovate の PR をマージする | PR へのコメントの投稿と書き換え |
| [`/catchup-dependency-prs`](../.claude/skills/catchup-dependency-prs/SKILL.md) | 自動マージを予約した PR が main に遅れて止まっている | PR のブランチの更新・Renovate のワークフローの実行 |
| [`/prune-leftovers`](../.claude/skills/prune-leftovers/SKILL.md) | PR のないリモートのブランチと、マージしなかったブランチなどの実行を片付ける | リモートのブランチと実行の削除 |
| [`/review-comments`](../.claude/skills/review-comments/SKILL.md) | 古くなったコメントを探す | なし |

どのスキルも、マージ・push・PR のクローズ・ファイルの修正は、選択肢を示して選ばれたものだけをする。
ほかのスキルは、場面に合わせて Claude が使う。

Claude に自分の判断で使わせないスキルは、`SKILL.md` のフロントマターに `disable-model-invocation: true` を書く。
スキルを足したときや `disable-model-invocation` を変えたときは、この表も合わせる。

## サンドボックス

Claude Code が Bash で実行するコマンドは、サンドボックスのなかで動く。
設定は [`.claude/settings.json`](../.claude/settings.json) にある。

- `gh` と `git push` は、サンドボックスの外で動かす。サンドボックスのなかでは `gh` が `~/.config/gh` を読めず、`git push` の認証も通らないため
- 外で動くのは、コマンドの書き方が決まりに合うときだけ。決まりは [`CLAUDE.md`](../CLAUDE.md) にあり、スキルの手順に書く `gh` のコマンドにも当てはまる
- サンドボックスのなかで失敗したコマンドは、サンドボックスの外で実行し直さない
- コミット・push・PR のマージ・`rm` などは、実行の前に Claude Code が確認を求める。対象は `settings.json` の `permissions.ask` にある
- `gh` のうち、状態を読むだけのコマンドは確認なしで実行する。対象は `settings.json` の `permissions.allow` にある
  - サンドボックスの外で動くコマンドは、`autoAllowBashIfSandboxed` では許可されないため、`allow` に書く
  - `gh api` は書き込みもできるので、`allow` に足さない
- Claude に読ませないファイルは、`permissions.deny` の `Read(...)` と `sandbox.credentials.files` の両方に書く
  - `Read(...)` は、Read などのツールと、サンドボックスのなかのコマンドの両方を止める
  - `sandbox.credentials.files` は、管理者の設定で `permissions.deny` が無視されたときも、サンドボックスのなかのコマンドを止める
  - パスの書き方は 2 つで違う。[権限のルール](https://code.claude.com/docs/en/permissions#read-and-edit) と [サンドボックスのパス](https://code.claude.com/docs/en/settings-reference#sandbox-path-prefixes) の書き方に従う

## デスクトップアプリのプレビュー

Claude Code のデスクトップアプリは、[`.claude/launch.json`](../.claude/launch.json) の設定で portfolio の開発サーバーを起動する。
開発サーバーは、Dev Container と同じ Compose のサービスのコンテナで動く。
[`astro.config.mjs`](../portfolio/astro.config.mjs) の設定のままでは、コンテナのなかからしか届かないアドレスで待ち受ける。
そのため `--host` を付けてコンテナのすべてのアドレスで待ち受け、ホストではほかの端末に開かないよう 127.0.0.1 だけに公開する。
