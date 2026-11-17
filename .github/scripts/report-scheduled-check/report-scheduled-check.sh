#!/usr/bin/env bash
set -euo pipefail

usage="使い方: $0 {broken-links | settings-drift | osv-scanner} {<検査の出力> | --resolved}"
if [[ $# -ne 2 ]]; then
  echo "${usage}" >&2
  exit 1
fi
check=$1

if [[ $2 == --resolved ]]; then
  resolved=true
  output=''
else
  resolved=false
  output=$(cat "$2")
fi

# GITHUB_* は GitHub Actions が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定するため、:? で設定されている前提を示す
run_url="${GITHUB_SERVER_URL:?}/${GITHUB_REPOSITORY:?}/actions/runs/${GITHUB_RUN_ID:?}"

# labels に書くラベルは、.github/settings/labels.json にも定義する
case ${check} in
broken-links)
  title='docs: 外部リンクの定期検査で見つかったリンク切れを直す'
  labels=documentation
  resolved_comment="[外部リンクの定期検査](${run_url}) で、すべてのリンクが通りました。"
  body="[外部リンクの定期検査](${run_url}) で、次のリンクが通りませんでした。

${output}"
  ;;
settings-drift)
  title='chore: 定期検査で見つかった GitHub の設定と定義のずれを直す'
  labels=configuration
  resolved_comment="[GitHub の設定の定期検査](${run_url}) で、GitHub の設定が定義と一致しました。"
  body="[GitHub の設定の定期検査](${run_url}) が失敗しました。定義を直すか、\`.github/scripts/sync-github-settings/sync-github-settings.sh\` で GitHub を定義に揃えてください。

\`\`\`diff
${output}
\`\`\`"
  ;;
osv-scanner)
  title='fix: main の依存関係の検査で見つかった脆弱性を直す'
  labels=dependencies,security
  resolved_comment="[main の依存関係の検査](${run_url}) が通りました。"
  # 検査の出力は、Code scanning のアラートの JSON を 1 件ずつ並べたもの。
  # パッケージは OSV-Scanner のメッセージから取り出し、メッセージの形が違えばそのまま載せる。概要は rule.description から先頭の ID を除く
  # https://github.com/google/osv-scanner/blob/v2.7.0/internal/output/sarif.go#L279-L298 https://github.com/google/osv-scanner/blob/v2.7.0/internal/output/sarif.go#L356-L363
  # shellcheck disable=SC2016 # $alert と $package_pattern は jq の変数で、シェルに展開させない
  alerts=$(jq -rs --arg package_pattern "^Package '(?<package>[^']+)'" '
    # セルの中の | で列が分かれないようにする
    def cell: gsub("\\|"; "\\|");
    if length == 0 then
      "なし。検査そのものが失敗していないか、実行のログを確認してください。"
    else
      "| アラート | 重大度 | パッケージ | 概要 | ファイル |",
      "| --- | --- | --- | --- | --- |",
      (.[] | . as $alert | [
        "[\(.rule.id)](\(.html_url))",
        (.rule.security_severity_level // ""),
        (.most_recent_instance.message.text | capture($package_pattern).package // .),
        (.rule.description | ltrimstr("\($alert.rule.id): ")),
        .most_recent_instance.location.path
      ] | map(cell) | "| \(join(" | ")) |")
    end' <<<"${output}")
  body="[main の依存関係の検査](${run_url}) が失敗しました。脆弱性のあるパッケージを上げるか、すぐに上げられなければ、ロックファイルと同じディレクトリの \`osv-scanner.toml\` で理由と期限を付けて除外してください。

Code scanning で開いているアラート:

${alerts}"
  ;;
*)
  echo "${usage}" >&2
  exit 1
  ;;
esac

if ${resolved}; then
  # 開いている issue が複数あっても、どれも同じ検査の失敗のため、最も新しいものだけでなくすべて閉じる
  numbers=$(TITLE=${title} gh issue list --state open --limit 1000 --json number,title --jq '.[] | select(.title == env.TITLE) | .number')
  for number in ${numbers}; do
    gh issue close "${number}" --reason completed --comment "${resolved_comment}"
  done
  exit 0
fi

# 失敗のたびに issue を増やさず、開いている issue があれば本文を最新の結果に書き換える
number=$(TITLE=${title} gh issue list --state open --limit 1000 --json number,title --jq '[.[] | select(.title == env.TITLE) | .number] | max // empty')
if [[ -n ${number} ]]; then
  gh issue edit "${number}" --body-file - <<<"${body}"
else
  url=$(gh issue create --title "${title}" --body-file - <<<"${body}")
  number=${url##*/}
fi
# --label を付けて作ると、ラベルが GitHub にないときに issue ごと作られず知らせが届かないため、作ったあとで付ける
# https://github.com/cli/cli/blob/v2.102.0/pkg/cmd/issue/create/create.go#L460-L482 https://github.com/cli/cli/blob/v2.102.0/api/queries_repo.go#L809-L825
gh issue edit "${number}" --add-label "${labels}"
