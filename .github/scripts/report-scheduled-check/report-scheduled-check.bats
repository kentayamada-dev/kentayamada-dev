#!/usr/bin/env bats
# 期待する issue の本文は Markdown のバッククォートを含むため、展開させないようにシングルクォートで書いている
# shellcheck disable=SC2016
# bats はテストごとに別のプロセスで動かすので、テスト内で変えた変数がほかのテストに漏れないのは意図どおり https://bats-core.readthedocs.io/en/v1.14.0/writing-tests.html
# shellcheck disable=SC2030,SC2031

setup() {
  bats_require_minimum_version 1.5.0

  # shellcheck disable=SC2154 # BATS_TEST_DIRNAME は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  script="${BATS_TEST_DIRNAME}/report-scheduled-check.sh"
  # shellcheck disable=SC2154 # BATS_TEST_TMPDIR は bats が設定する。ShellCheck の check-unassigned-uppercase は未代入と判定する
  report="${BATS_TEST_TMPDIR}/lychee.md"
  echo '* [404] <https://example.com/gone>' >"${report}"
  # 外部リンクの定期検査はこのファイルも読むため、lychee が検査しない example.com をダミーの URL に使う
  # https://github.com/lycheeverse/lychee/blob/lychee-v0.24.2/README.md?plain=1#L175
  export GITHUB_SERVER_URL=https://example.com GITHUB_REPOSITORY=owner/repo GITHUB_RUN_ID=123

  # gh issue の偽物。GitHub 上の issue を $STUB_DIR/issues.json、ラベルの名前を $STUB_DIR/labels.json として読み書きする
  export STUB_DIR="${BATS_TEST_TMPDIR}/stub"
  mkdir -p "${STUB_DIR}/bin"
  PATH="${STUB_DIR}/bin:${PATH}"
  cat >"${STUB_DIR}/bin/gh" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail
issues="$STUB_DIR/issues.json"

if [ "$1" != issue ]; then
  echo "gh スタブ: 未対応のコマンド $1" >&2
  exit 1
fi
command=$2
shift 2

# STUB_FAIL は「issue サブコマンド」に一致させるパターン
if [ -n "${STUB_FAIL-}" ] && [[ "issue $command" == $STUB_FAIL ]]; then
  echo "gh: Server Error (HTTP 500)" >&2
  exit 1
fi

number='' state=open fields='' filter=. title='' body_file='' add_label='' reason='' comment=''
while [ $# -gt 0 ]; do
  case "$1" in
    --state) state=$2; shift 2 ;;
    --limit) shift 2 ;;
    --json) fields=$2; shift 2 ;;
    --jq) filter=$2; shift 2 ;;
    --title) title=$2; shift 2 ;;
    --body-file) body_file=$2; shift 2 ;;
    --add-label) add_label=$2; shift 2 ;;
    --reason) reason=$2; shift 2 ;;
    --comment) comment=$2; shift 2 ;;
    -*) echo "gh スタブ: 未対応のフラグ $1" >&2; exit 1 ;;
    *) number=$1; shift ;;
  esac
done
if [ "$body_file" = - ]; then
  body_file="$STUB_DIR/stdin.md"
  cat >"$body_file"
fi

case "$command" in
  list)
    jq -r --arg state "$state" --arg fields "$fields" \
      "map(select(\$state == \"all\" or .state == \$state)) | map(with_entries(select(.key | IN(\$fields | split(\",\")[])))) | $filter" \
      "$issues"
    ;;
  edit)
    if ! jq -e --argjson number "$number" 'any(.number == $number)' "$issues" >/dev/null; then
      echo "gh: Could not resolve to an issue with the number of $number" >&2
      exit 1
    fi
    # 本物と同じく、ないラベルがあれば何も変えずに失敗する
    missing=$(jq -r --arg add "$add_label" '. as $existing | $add | split(",") | map(select(. as $name | $existing | index($name) | not)) | first // empty' "$STUB_DIR/labels.json")
    if [ -n "$missing" ]; then
      echo "'$missing' not found" >&2
      exit 1
    fi
    if [ -n "$body_file" ]; then
      jq --argjson number "$number" --rawfile body "$body_file" \
        'map(if .number == $number then .body = $body else . end)' "$issues" >"$issues.new"
      mv "$issues.new" "$issues"
    fi
    if [ -n "$add_label" ]; then
      jq --argjson number "$number" --arg add "$add_label" \
        'map(if .number == $number then .labels = ((.labels // []) + ($add | split(",")) | unique) else . end)' "$issues" >"$issues.new"
      mv "$issues.new" "$issues"
    fi
    ;;
  create)
    jq --arg title "$title" --rawfile body "$body_file" \
      '. + [{number: ((map(.number) | max // 0) + 1), title: $title, state: "open", body: $body}]' "$issues" >"$issues.new"
    mv "$issues.new" "$issues"
    echo "https://example.com/owner/repo/issues/$(jq 'map(.number) | max' "$issues")"
    ;;
  close)
    if ! jq -e --argjson number "$number" 'any(.number == $number)' "$issues" >/dev/null; then
      echo "gh: Could not resolve to an issue with the number of $number" >&2
      exit 1
    fi
    jq --argjson number "$number" --arg reason "$reason" --arg comment "$comment" \
      'map(if .number == $number then .state = "closed" | .state_reason = $reason | .comments += [$comment] else . end)' "$issues" >"$issues.new"
    mv "$issues.new" "$issues"
    ;;
  *)
    echo "gh スタブ: 未対応のサブコマンド issue $command" >&2
    exit 1
    ;;
esac
EOF
  chmod +x "${STUB_DIR}/bin/gh"
  echo '[]' >"${STUB_DIR}/issues.json"
  echo '["bug", "configuration", "dependencies", "documentation", "security"]' >"${STUB_DIR}/labels.json"
}

given_github_issues() {
  echo "$1" >"${STUB_DIR}/issues.json"
}

given_github_labels() {
  echo "$1" >"${STUB_DIR}/labels.json"
}

assert_github_issues() {
  if ! jq -e --argjson expected "$1" '. == $expected' "${STUB_DIR}/issues.json" >/dev/null; then
    local actual
    actual=$(jq -c . "${STUB_DIR}/issues.json")
    echo "GitHub 上の issue: ${actual}"
    return 1
  fi
}

@test "同じタイトルの issue が開いていなければ、実行の URL とレポートを本文にして issue を作る" {
  given_github_issues '[{"number": 22, "title": "chore(deps): 依存関係の更新状況", "state": "open", "body": "ダッシュボード"}]'

  run -0 "${script}" broken-links "${report}"

  assert_github_issues '[
    {"number": 22, "title": "chore(deps): 依存関係の更新状況", "state": "open", "body": "ダッシュボード"},
    {"number": 23, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "[外部リンクの定期検査](https://example.com/owner/repo/actions/runs/123) で、次のリンクが通りませんでした。\n\n* [404] <https://example.com/gone>\n", "labels": ["documentation"]}
  ]'
}

@test "同じタイトルの issue が開いていれば、新しく作らずに本文を書き換える" {
  given_github_issues '[
    {"number": 22, "title": "chore(deps): 依存関係の更新状況", "state": "open", "body": "ダッシュボード"},
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"}
  ]'

  run -0 "${script}" broken-links "${report}"

  assert_github_issues '[
    {"number": 22, "title": "chore(deps): 依存関係の更新状況", "state": "open", "body": "ダッシュボード"},
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "[外部リンクの定期検査](https://example.com/owner/repo/actions/runs/123) で、次のリンクが通りませんでした。\n\n* [404] <https://example.com/gone>\n", "labels": ["documentation"]}
  ]'
}

@test "同じタイトルの issue が閉じていれば、書き換えずに新しく作る" {
  given_github_issues '[{"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "closed", "body": "前回の結果"}]'

  run -0 "${script}" broken-links "${report}"

  assert_github_issues '[
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "closed", "body": "前回の結果"},
    {"number": 186, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "[外部リンクの定期検査](https://example.com/owner/repo/actions/runs/123) で、次のリンクが通りませんでした。\n\n* [404] <https://example.com/gone>\n", "labels": ["documentation"]}
  ]'
}

@test "タイトルの一部だけが一致する issue は書き換えずに、新しく作る" {
  given_github_issues '[{"number": 190, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す（README）", "state": "open", "body": "手で立てた issue"}]'

  run -0 "${script}" broken-links "${report}"

  assert_github_issues '[
    {"number": 190, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す（README）", "state": "open", "body": "手で立てた issue"},
    {"number": 191, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "[外部リンクの定期検査](https://example.com/owner/repo/actions/runs/123) で、次のリンクが通りませんでした。\n\n* [404] <https://example.com/gone>\n", "labels": ["documentation"]}
  ]'
}

@test "同じタイトルの issue が複数開いていれば、新しく作らずに最も新しいものだけを書き換える" {
  given_github_issues '[
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前々回の結果"},
    {"number": 190, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"}
  ]'

  run -0 "${script}" broken-links "${report}"

  assert_github_issues '[
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前々回の結果"},
    {"number": 190, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "[外部リンクの定期検査](https://example.com/owner/repo/actions/runs/123) で、次のリンクが通りませんでした。\n\n* [404] <https://example.com/gone>\n", "labels": ["documentation"]}
  ]'
}

@test "issue の一覧を取得できなければ、issue を作らずに失敗する" {
  export STUB_FAIL="issue list"

  run -1 "${script}" broken-links "${report}"

  assert_github_issues '[]'
}

@test "レポートのファイルがなければ、issue を作らずに失敗する" {
  run -1 "${script}" broken-links "${BATS_TEST_TMPDIR}/missing.md"

  assert_github_issues '[]'
}

@test "開いている issue を書き換えるとき、外されたラベルを付け直し、ほかのラベルは残す" {
  given_github_issues '[{"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果", "labels": ["bug"]}]'

  run -0 "${script}" broken-links "${report}"

  assert_github_issues '[
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "[外部リンクの定期検査](https://example.com/owner/repo/actions/runs/123) で、次のリンクが通りませんでした。\n\n* [404] <https://example.com/gone>\n", "labels": ["bug", "documentation"]}
  ]'
}

@test "ラベルが GitHub になければ、ラベルのない issue を作ってから失敗する" {
  given_github_labels '["bug"]'

  run -1 "${script}" broken-links "${report}"

  assert_github_issues '[
    {"number": 1, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "[外部リンクの定期検査](https://example.com/owner/repo/actions/runs/123) で、次のリンクが通りませんでした。\n\n* [404] <https://example.com/gone>\n"}
  ]'
}

@test "ラベルが GitHub になければ、開いている issue の本文を書き換えてから失敗する" {
  given_github_labels '["bug"]'
  given_github_issues '[{"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"}]'

  run -1 "${script}" broken-links "${report}"

  assert_github_issues '[
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "[外部リンクの定期検査](https://example.com/owner/repo/actions/runs/123) で、次のリンクが通りませんでした。\n\n* [404] <https://example.com/gone>\n"}
  ]'
}

@test "検査が通ったとき（--resolved）、同じタイトルの開いている issue に実行の URL をコメントして、completed で閉じる" {
  given_github_issues '[
    {"number": 22, "title": "chore(deps): 依存関係の更新状況", "state": "open", "body": "ダッシュボード"},
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"}
  ]'

  run -0 "${script}" broken-links --resolved

  assert_github_issues '[
    {"number": 22, "title": "chore(deps): 依存関係の更新状況", "state": "open", "body": "ダッシュボード"},
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "closed", "body": "前回の結果", "state_reason": "completed", "comments": ["[外部リンクの定期検査](https://example.com/owner/repo/actions/runs/123) で、すべてのリンクが通りました。"]}
  ]'
}

@test "検査が通ったとき（--resolved）、同じタイトルの issue が複数開いていれば、すべて閉じる" {
  given_github_issues '[
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前々回の結果"},
    {"number": 190, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"}
  ]'

  run -0 "${script}" broken-links --resolved

  assert_github_issues '[
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "closed", "body": "前々回の結果", "state_reason": "completed", "comments": ["[外部リンクの定期検査](https://example.com/owner/repo/actions/runs/123) で、すべてのリンクが通りました。"]},
    {"number": 190, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "closed", "body": "前回の結果", "state_reason": "completed", "comments": ["[外部リンクの定期検査](https://example.com/owner/repo/actions/runs/123) で、すべてのリンクが通りました。"]}
  ]'
}

@test "検査が通ったとき（--resolved）、閉じている issue とタイトルの一部だけが一致する issue には触れない" {
  given_github_issues '[
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "closed", "body": "前回の結果"},
    {"number": 190, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す（README）", "state": "open", "body": "手で立てた issue"}
  ]'

  run -0 "${script}" broken-links --resolved

  assert_github_issues '[
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "closed", "body": "前回の結果"},
    {"number": 190, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す（README）", "state": "open", "body": "手で立てた issue"}
  ]'
}

@test "検査が通ったとき（--resolved）、issue の一覧を取得できなければ、issue を閉じずに失敗する" {
  given_github_issues '[{"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"}]'
  export STUB_FAIL="issue list"

  run -1 "${script}" broken-links --resolved

  assert_github_issues '[{"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"}]'
}

@test "検査が通ったとき（--resolved）、issue を閉じられなければ失敗する" {
  given_github_issues '[{"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"}]'
  export STUB_FAIL="issue close"

  run -1 "${script}" broken-links --resolved

  assert_github_issues '[{"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"}]'
}

@test "settings-drift では、設定のずれの issue を、検査の出力を diff のコードブロックに入れた本文で作る" {
  echo 'ずれ: ラベル bug が GitHub にありません' >"${BATS_TEST_TMPDIR}/drift.txt"
  given_github_issues '[{"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"}]'

  run -0 "${script}" settings-drift "${BATS_TEST_TMPDIR}/drift.txt"

  assert_github_issues '[
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"},
    {"number": 186, "title": "chore: 定期検査で見つかった GitHub の設定と定義のずれを直す", "state": "open", "body": "[GitHub の設定の定期検査](https://example.com/owner/repo/actions/runs/123) が失敗しました。定義を直すか、`.github/scripts/sync-github-settings/sync-github-settings.sh` で GitHub を定義に揃えてください。\n\n```diff\nずれ: ラベル bug が GitHub にありません\n```\n", "labels": ["configuration"]}
  ]'
}

@test "settings-drift で検査が通ったとき（--resolved）、設定のずれの issue だけを、定義と一致したとコメントして閉じる" {
  given_github_issues '[
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"},
    {"number": 190, "title": "chore: 定期検査で見つかった GitHub の設定と定義のずれを直す", "state": "open", "body": "前回の結果"}
  ]'

  run -0 "${script}" settings-drift --resolved

  assert_github_issues '[
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"},
    {"number": 190, "title": "chore: 定期検査で見つかった GitHub の設定と定義のずれを直す", "state": "closed", "body": "前回の結果", "state_reason": "completed", "comments": ["[GitHub の設定の定期検査](https://example.com/owner/repo/actions/runs/123) で、GitHub の設定が定義と一致しました。"]}
  ]'
}

@test "osv-scanner では、Code scanning のアラートを表にした本文で、脆弱性の issue を作る" {
  cat >"${BATS_TEST_TMPDIR}/alerts.json" <<'EOF'
{"html_url": "https://example.com/alerts/1", "rule": {"id": "CVE-2026-0001", "security_severity_level": "medium", "description": "CVE-2026-0001: glob の脆弱性"}, "most_recent_instance": {"message": {"text": "Package 'glob@13.0.6' is vulnerable to 'CVE-2026-0001' (also known as 'GHSA-aaaa-bbbb-cccc')."}, "location": {"path": ".github/textlint/pnpm-lock.yaml"}}}
{"html_url": "https://example.com/alerts/2", "rule": {"id": "GHSA-dddd-eeee-ffff", "security_severity_level": "high", "description": "GHSA-dddd-eeee-ffff: minimatch の脆弱性"}, "most_recent_instance": {"message": {"text": "Package 'minimatch@10.2.6' is vulnerable to 'GHSA-dddd-eeee-ffff'."}, "location": {"path": "portfolio/pnpm-lock.yaml"}}}
EOF
  given_github_issues '[{"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"}]'

  run -0 "${script}" osv-scanner "${BATS_TEST_TMPDIR}/alerts.json"

  assert_github_issues '[
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"},
    {"number": 186, "title": "fix: main の依存関係の検査で見つかった脆弱性を直す", "state": "open", "body": "[main の依存関係の検査](https://example.com/owner/repo/actions/runs/123) が失敗しました。脆弱性のあるパッケージを上げるか、すぐに上げられなければ、ロックファイルと同じディレクトリの `osv-scanner.toml` で理由と期限を付けて除外してください。\n\nCode scanning で開いているアラート:\n\n| アラート | 重大度 | パッケージ | 概要 | ファイル |\n| --- | --- | --- | --- | --- |\n| [CVE-2026-0001](https://example.com/alerts/1) | medium | glob@13.0.6 | glob の脆弱性 | .github/textlint/pnpm-lock.yaml |\n| [GHSA-dddd-eeee-ffff](https://example.com/alerts/2) | high | minimatch@10.2.6 | minimatch の脆弱性 | portfolio/pnpm-lock.yaml |\n", "labels": ["dependencies", "security"]}
  ]'
}

@test "osv-scanner で、メッセージからパッケージを取り出せなければ、メッセージをそのまま載せる" {
  cat >"${BATS_TEST_TMPDIR}/alerts.json" <<'EOF'
{"html_url": "https://example.com/alerts/1", "rule": {"id": "CVE-2026-0001", "security_severity_level": "medium", "description": "CVE-2026-0001: glob の脆弱性"}, "most_recent_instance": {"message": {"text": "glob 13.0.6 に脆弱性がある"}, "location": {"path": "pnpm-lock.yaml"}}}
EOF

  run -0 "${script}" osv-scanner "${BATS_TEST_TMPDIR}/alerts.json"

  assert_github_issues '[
    {"number": 1, "title": "fix: main の依存関係の検査で見つかった脆弱性を直す", "state": "open", "body": "[main の依存関係の検査](https://example.com/owner/repo/actions/runs/123) が失敗しました。脆弱性のあるパッケージを上げるか、すぐに上げられなければ、ロックファイルと同じディレクトリの `osv-scanner.toml` で理由と期限を付けて除外してください。\n\nCode scanning で開いているアラート:\n\n| アラート | 重大度 | パッケージ | 概要 | ファイル |\n| --- | --- | --- | --- | --- |\n| [CVE-2026-0001](https://example.com/alerts/1) | medium | glob 13.0.6 に脆弱性がある | glob の脆弱性 | pnpm-lock.yaml |\n", "labels": ["dependencies", "security"]}
  ]'
}

@test "osv-scanner で、値に | があれば、列が分かれないようにエスケープする" {
  cat >"${BATS_TEST_TMPDIR}/alerts.json" <<'EOF'
{"html_url": "https://example.com/alerts/1", "rule": {"id": "CVE-2026-0001", "security_severity_level": "medium", "description": "CVE-2026-0001: a | b の脆弱性"}, "most_recent_instance": {"message": {"text": "Package 'glob@13.0.6' is vulnerable to 'CVE-2026-0001'."}, "location": {"path": "pnpm-lock.yaml"}}}
EOF

  run -0 "${script}" osv-scanner "${BATS_TEST_TMPDIR}/alerts.json"

  assert_github_issues '[
    {"number": 1, "title": "fix: main の依存関係の検査で見つかった脆弱性を直す", "state": "open", "body": "[main の依存関係の検査](https://example.com/owner/repo/actions/runs/123) が失敗しました。脆弱性のあるパッケージを上げるか、すぐに上げられなければ、ロックファイルと同じディレクトリの `osv-scanner.toml` で理由と期限を付けて除外してください。\n\nCode scanning で開いているアラート:\n\n| アラート | 重大度 | パッケージ | 概要 | ファイル |\n| --- | --- | --- | --- | --- |\n| [CVE-2026-0001](https://example.com/alerts/1) | medium | glob@13.0.6 | a \\| b の脆弱性 | pnpm-lock.yaml |\n", "labels": ["dependencies", "security"]}
  ]'
}

@test "osv-scanner で、開いているアラートがなければ、表の代わりに実行のログの確認を促す" {
  : >"${BATS_TEST_TMPDIR}/alerts.json"

  run -0 "${script}" osv-scanner "${BATS_TEST_TMPDIR}/alerts.json"

  assert_github_issues '[
    {"number": 1, "title": "fix: main の依存関係の検査で見つかった脆弱性を直す", "state": "open", "body": "[main の依存関係の検査](https://example.com/owner/repo/actions/runs/123) が失敗しました。脆弱性のあるパッケージを上げるか、すぐに上げられなければ、ロックファイルと同じディレクトリの `osv-scanner.toml` で理由と期限を付けて除外してください。\n\nCode scanning で開いているアラート:\n\nなし。検査そのものが失敗していないか、実行のログを確認してください。\n", "labels": ["dependencies", "security"]}
  ]'
}

@test "osv-scanner で検査が通ったとき（--resolved）、脆弱性の issue だけを、通ったとコメントして閉じる" {
  given_github_issues '[
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"},
    {"number": 190, "title": "fix: main の依存関係の検査で見つかった脆弱性を直す", "state": "open", "body": "前回の結果"}
  ]'

  run -0 "${script}" osv-scanner --resolved

  assert_github_issues '[
    {"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"},
    {"number": 190, "title": "fix: main の依存関係の検査で見つかった脆弱性を直す", "state": "closed", "body": "前回の結果", "state_reason": "completed", "comments": ["[main の依存関係の検査](https://example.com/owner/repo/actions/runs/123) が通りました。"]}
  ]'
}

@test "知らない検査の名前なら、使い方を出して issue に触れずに失敗する" {
  given_github_issues '[{"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"}]'

  run -1 --separate-stderr "${script}" broken-link --resolved

  [[ ${stderr} == "使い方: ${script} {broken-links | settings-drift | osv-scanner} {<検査の出力> | --resolved}" ]]
  assert_github_issues '[{"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"}]'
}

@test "検査の名前を渡さなければ、使い方を出して issue に触れずに失敗する" {
  given_github_issues '[{"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"}]'

  run -1 --separate-stderr "${script}" --resolved

  [[ ${stderr} == "使い方: ${script} {broken-links | settings-drift | osv-scanner} {<検査の出力> | --resolved}" ]]
  assert_github_issues '[{"number": 185, "title": "docs: 外部リンクの定期検査で見つかったリンク切れを直す", "state": "open", "body": "前回の結果"}]'
}
