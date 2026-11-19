#!/usr/bin/env bash
set -euo pipefail

# GET の応答は Cache-Control: private, max-age=60 で、変更の直後に古い値が返ることがあったため、キャッシュを使わせない
gh_get() {
  local operation=$1
  shift
  gh_api "${operation}" -H 'Cache-Control: no-cache' "$@"
}

# gh のエラーには失敗したエンドポイントが含まれず、途中で止まるとどこまで反映したかわからないため、何の操作で失敗したかを示す
# https://github.com/cli/cli/blob/v2.102.0/pkg/cmd/api/api.go#L553-L558
gh_api() {
  local operation=$1
  shift
  if ! gh api "$@"; then
    if ${check_only}; then
      echo "エラー: ${operation}で失敗しました" >&2
    else
      echo "エラー: ${operation}で失敗しました。それより前の設定は反映済みです" >&2
    fi
    return 1
  fi
}

# 書き込みの応答は使わない。標準出力が端末のままだと、gh が要求の前に端末の応答を待ち、応答しない端末では 1 回ごとに約 5 秒かかるため、/dev/null に向ける
# 待つのは termenv の端末への問い合わせと推測している（TERM=dumb で待ちが消え、待つ時間が OSCTimeout と同じ） https://github.com/muesli/termenv/blob/v0.16.0/termenv_unix.go#L234-L293
gh_write() {
  gh_api "$@" >/dev/null
}

drift_count=0

drift() {
  echo "ずれ: $1"
  drift_count=$((drift_count + 1))
}

report_drift() {
  local subject=$1 desired actual
  # GitHub は配列を定義と違う順で返すことがある（selected-actions の patterns_allowed で確認）。定義の配列はどれも順序で意味が変わらないとみなし、並べ替えて比べる
  desired=$(jq -S 'walk(if type == "array" then sort else . end)' <<<"$2")
  actual=$(jq -S 'walk(if type == "array" then sort else . end)' <<<"$3")
  if [[ ${desired} != "${actual}" ]]; then
    drift "${subject}"
    diff -u --label 定義 --label GitHub <(echo "${desired}") <(echo "${actual}") || [[ $? -eq 1 ]]
  fi
}

# 定義に書いた項目だけを反映する設定は、GitHub 上の値から定義にある項目だけを取り出して比べる
report_defined_drift() {
  local subject=$1 desired=$2 actual
  actual=$(jq --argjson desired "${desired}" '
    def defined_only($desired):
      if ($desired | type) == "object" and type == "object" then
        . as $actual | reduce ($desired | keys[]) as $key ({}; .[$key] = ($actual[$key] | defined_only($desired[$key])))
      else . end;
    defined_only($desired)
  ' <<<"$3")
  report_drift "${subject}" "${desired}" "${actual}"
}

settings_dir=.github/settings

sync_rulesets() {
  local files=("${settings_dir}"/rulesets/*.json) has_definitions=false
  # 一致するファイルがないとパターンが文字列のまま残る。macOS の bash 3.2 は空配列の展開を set -u でエラーにするため、配列は空にせず存在で判定する
  # https://www.gnu.org/software/bash/manual/html_node/Filename-Expansion.html https://tiswww.case.edu/php/chet/bash/CHANGES の bash-4.4-rc2 3.a
  if [[ -e ${files[0]} ]]; then
    has_definitions=true
  fi

  # 途中まで適用した状態で止まらないよう、作成・更新・削除の前にすべての定義と照合先を検査する
  local file names='[]' duplicates
  if ${has_definitions}; then
    for file in "${files[@]}"; do
      if ! jq -e '.name | type == "string" and length > 0' "${file}" >/dev/null; then
        echo "エラー: ${file} は name（空でない文字列）を持つ JSON オブジェクトではありません" >&2
        return 1
      fi
    done
    names=$(jq -cs 'map(.name)' "${files[@]}")
  fi
  duplicates=$(jq -r 'group_by(.) | map(select(length > 1) | .[0]) | .[]' <<<"${names}")
  if [[ -n ${duplicates} ]]; then
    echo "エラー: 同じ name のルールセットが複数のファイルにあります: ${duplicates}" >&2
    return 1
  fi

  # includes_parents のデフォルトは true で、Organization のルールセットも返り、名前が同じだと誤って照合するため外す
  # https://docs.github.com/en/rest/repos/rules?apiVersion=2022-11-28#get-all-repository-rulesets
  local existing
  existing=$(gh_get 'ルールセットの一覧の取得' --paginate --slurp 'repos/{owner}/{repo}/rulesets?includes_parents=false&per_page=100')
  duplicates=$(jq -r --argjson names "${names}" '[.[][] | .name | select(IN($names[]))] | group_by(.) | map(select(length > 1) | .[0]) | .[]' <<<"${existing}")
  if [[ -n ${duplicates} ]]; then
    echo "エラー: GitHub に同じ名前のルールセットが複数あり、更新先を決められません: ${duplicates}" >&2
    return 1
  fi

  local name id actual desired
  if ${has_definitions}; then
    for file in "${files[@]}"; do
      name=$(jq -r '.name' "${file}")
      id=$(jq -r --arg name "${name}" '.[][] | select(.name == $name) | .id' <<<"${existing}")
      if [[ -z ${id} ]]; then
        if ${check_only}; then
          drift "ルールセット ${name} (${file}) が GitHub にありません"
        else
          gh_write "ルールセット ${name} の作成" --method POST 'repos/{owner}/{repo}/rulesets' --input "${file}"
          echo "作成: ルールセット ${name} (${file})"
        fi
      elif ${check_only}; then
        # 一覧の応答には rules や conditions が含まれないため、1 件ずつ取得する
        # https://docs.github.com/en/rest/repos/rules?apiVersion=2022-11-28#get-all-repository-rulesets
        actual=$(gh_get "ルールセット ${name} の取得" "repos/{owner}/{repo}/rulesets/${id}")
        desired=$(cat "${file}")
        actual=$(jq 'del(.id, .source_type, .source, .node_id, .created_at, .updated_at, .current_user_can_bypass, ._links)' <<<"${actual}")
        report_drift "ルールセット ${name} (${file})" "${desired}" "${actual}"
      else
        gh_write "ルールセット ${name} の反映" --method PUT "repos/{owner}/{repo}/rulesets/${id}" --input "${file}"
      fi
    done
  fi

  # 定義の name を変えたときに、古いルールセットを先に消して保護が途切れないよう、作成・更新のあとで削除する
  local stale
  stale=$(jq -r --argjson names "${names}" '.[][] | select(.name | IN($names[]) | not) | .id' <<<"${existing}")
  for id in ${stale}; do
    name=$(jq -r --argjson id "${id}" '.[][] | select(.id == $id) | .name' <<<"${existing}")
    if ${check_only}; then
      drift "定義にないルールセット ${name} が GitHub にあります"
    else
      gh_write "ルールセット ${name} の削除" --method DELETE "repos/{owner}/{repo}/rulesets/${id}"
      echo "削除: ルールセット ${name}"
    fi
  done
}

repository_definition="${settings_dir}/repository.json"

validate_repository() {
  if ! jq -e 'type == "object"' "${repository_definition}" >/dev/null; then
    echo "エラー: ${repository_definition} を JSON オブジェクトとして読めません" >&2
    return 1
  fi
}

sync_repository() {
  if ${check_only}; then
    local actual desired
    actual=$(gh_get 'リポジトリの設定の取得' 'repos/{owner}/{repo}')
    desired=$(cat "${repository_definition}")
    report_defined_drift 'リポジトリの設定' "${desired}" "${actual}"
    return 0
  fi
  # has_discussions は API のドキュメントの項目にないが、gh repo edit も同じ API に送っている
  # https://github.com/cli/cli/blob/v2.102.0/pkg/cmd/repo/edit/edit.go
  gh_write 'リポジトリの設定の反映' --method PATCH 'repos/{owner}/{repo}' --input "${repository_definition}"
}

security_definition="${settings_dir}/security.json"
# true なら PUT、false なら DELETE で切り替える項目。_ を - にすると API のパスになる
security_features='vulnerability_alerts automated_security_fixes private_vulnerability_reporting immutable_releases'

validate_security() {
  if ! jq -e --arg features "${security_features}" '
    ($features | split(" ")) as $features
    | type == "object"
    and (keys - $features - ["code_scanning_default_setup"] | length == 0)
    and ([.[$features[]] | select(. != null) | type == "boolean"] | all)
    and ((has("code_scanning_default_setup") | not) or (.code_scanning_default_setup | type == "object"))
  ' "${security_definition}" >/dev/null; then
    echo "エラー: ${security_definition} は、項目が ${security_features} code_scanning_default_setup のどれかで、有効・無効が true か false、code_scanning_default_setup が JSON オブジェクトの定義ではありません" >&2
    return 1
  fi
}

security_feature_enabled() {
  local feature=$1 response
  if [[ ${feature} != vulnerability_alerts ]]; then
    # コマンド置換のなかで呼ばれて set -e が効かないため、失敗を明示的に返す。gh_get は失敗を自分で返すので、そのなかで set -e が効かなくても困らない
    # shellcheck disable=SC2310
    response=$(gh_get "${feature} の取得" "repos/{owner}/{repo}/${feature//_/-}") || return 1
    jq -r .enabled <<<"${response}"
    return 0
  fi
  # 脆弱性アラートは、無効なら 404 を返す。gh はそれを (HTTP 404) と示して失敗するため、ほかの失敗と見分ける
  # https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#check-if-vulnerability-alerts-are-enabled-for-a-repository
  if response=$(gh api -H 'Cache-Control: no-cache' 'repos/{owner}/{repo}/vulnerability-alerts' 2>&1); then
    echo true
  elif [[ ${response} == *'(HTTP 404)'* ]]; then
    echo false
  else
    echo "${response}" >&2
    echo "エラー: ${feature} の取得で失敗しました" >&2
    return 1
  fi
}

sync_security() {
  local feature enabled current
  for feature in ${security_features}; do
    enabled=$(jq -r --arg feature "${feature}" 'if has($feature) then .[$feature] else empty end' "${security_definition}")
    if [[ -z ${enabled} ]]; then
      continue
    elif ${check_only}; then
      current=$(security_feature_enabled "${feature}")
      if [[ ${current} != "${enabled}" ]]; then
        drift "${feature} が定義では ${enabled}、GitHub では ${current}"
      fi
    elif [[ ${enabled} == true ]]; then
      gh_write "${feature} の反映" --method PUT "repos/{owner}/{repo}/${feature//_/-}"
    else
      gh_write "${feature} の反映" --method DELETE "repos/{owner}/{repo}/${feature//_/-}"
    fi
  done

  local desired
  desired=$(jq -c 'if has("code_scanning_default_setup") then .code_scanning_default_setup else empty end' "${security_definition}")
  if [[ -z ${desired} ]]; then
    return 0
  fi
  if ${check_only}; then
    current=$(gh_get 'CodeQL のデフォルトセットアップの取得' 'repos/{owner}/{repo}/code-scanning/default-setup')
    report_defined_drift 'CodeQL のデフォルトセットアップ' "${desired}" "${current}"
    return 0
  fi
  # 同じ設定を送っても新しい解析は始まらない（202 で前回の run_id が返る）ため、比べずに送る
  gh_write 'CodeQL のデフォルトセットアップの反映' --method PATCH 'repos/{owner}/{repo}/code-scanning/default-setup' --input - <<<"${desired}"
}

actions_definition="${settings_dir}/actions.json"

validate_actions() {
  if ! jq -e '
    type == "object"
    and (keys - ["permissions", "selected_actions", "fork_pr_contributor_approval", "workflow_permissions"] | length == 0)
    and ([.[]] | all(type == "object"))
    and ((has("permissions") | not) or (.permissions.enabled | type == "boolean"))
    and ((has("selected_actions") | not) or .permissions.allowed_actions == "selected")
  ' "${actions_definition}" >/dev/null; then
    echo "エラー: ${actions_definition} は、項目が permissions・selected_actions・fork_pr_contributor_approval・workflow_permissions のどれかで、どれも JSON オブジェクト、permissions の enabled が true か false、selected_actions を書くなら permissions の allowed_actions が selected の定義ではありません" >&2
    return 1
  fi
}

sync_actions_setting() {
  local subject=$1 key=$2 endpoint=$3 body actual
  body=$(jq -c --arg key "${key}" 'if has($key) then .[$key] else empty end' "${actions_definition}")
  if [[ -z ${body} ]]; then
    return 0
  fi
  if ${check_only}; then
    actual=$(gh_get "${subject}の取得" "${endpoint}")
    report_defined_drift "${subject}" "${body}" "${actual}"
  else
    gh_write "${subject}の反映" --method PUT "${endpoint}" --input - <<<"${body}"
  fi
}

sync_actions() {
  sync_actions_setting 'Actions の権限' permissions 'repos/{owner}/{repo}/actions/permissions'
  # allowed_actions が selected でないと受け付けないため、権限のあとで送る
  # https://docs.github.com/en/rest/actions/permissions?apiVersion=2022-11-28#set-allowed-actions-and-reusable-workflows-for-a-repository
  sync_actions_setting '実行できるアクション' selected_actions 'repos/{owner}/{repo}/actions/permissions/selected-actions'
  sync_actions_setting 'フォークからの PR の承認の方針' fork_pr_contributor_approval 'repos/{owner}/{repo}/actions/permissions/fork-pr-contributor-approval'
  sync_actions_setting 'GITHUB_TOKEN の既定の権限' workflow_permissions 'repos/{owner}/{repo}/actions/permissions/workflow'
}

actions_policies_dir="${settings_dir}/actions-policies"

validate_actions_policies() {
  local files=("${actions_policies_dir}"/*.json) file duplicates
  if [[ ! -e ${files[0]} ]]; then
    return 0
  fi
  for file in "${files[@]}"; do
    if ! jq -e '.name | type == "string" and length > 0' "${file}" >/dev/null; then
      echo "エラー: ${file} は name（空でない文字列）を持つ JSON オブジェクトではありません" >&2
      return 1
    fi
  done
  duplicates=$(jq -rs 'map(.name) | group_by(.) | map(select(length > 1) | .[0]) | .[]' "${files[@]}")
  if [[ -n ${duplicates} ]]; then
    echo "エラー: 同じ name の Actions のポリシーが複数のファイルにあります: ${duplicates}" >&2
    return 1
  fi
}

# Require lockfile のルール（require_lockfile）は、GET では返るが、POST・PUT では 422 で拒否され、REST API のドキュメントにもない。
# 反映できるルールとできないルールで扱いを分けず、どのポリシーも反映はせず、--check でなくても比べるだけにする
# https://docs.github.com/en/rest/actions/policies
sync_actions_policies() {
  local files=("${actions_policies_dir}"/*.json) has_definitions=false names='[]'
  if [[ -e ${files[0]} ]]; then
    has_definitions=true
    names=$(jq -cs 'map(.name)' "${files[@]}")
  fi

  # has_parents のデフォルトは true で、Organization などのポリシーも返り、定義にないポリシーと誤って示すため外す
  # https://docs.github.com/en/rest/actions/policies
  local existing
  existing=$(gh_get 'Actions のポリシーの一覧の取得' --paginate --slurp 'repos/{owner}/{repo}/actions/policies?has_parents=false&per_page=100')

  local file name id actual desired
  if ${has_definitions}; then
    for file in "${files[@]}"; do
      name=$(jq -r '.name' "${file}")
      id=$(jq -r --arg name "${name}" 'first(.[].policies[] | select(.name == $name) | .id)' <<<"${existing}")
      if [[ -z ${id} ]]; then
        drift "Actions のポリシー ${name} (${file}) が GitHub にありません"
        continue
      fi
      # 一覧の応答には rules や conditions が含まれないため、1 件ずつ取得する
      actual=$(gh_get "Actions のポリシー ${name} の取得" "repos/{owner}/{repo}/actions/policies/${id}")
      actual=$(jq 'del(.id, .target, .source_type, .source, .node_id, .created_at, .updated_at, ._links)' <<<"${actual}")
      desired=$(cat "${file}")
      report_drift "Actions のポリシー ${name} (${file})" "${desired}" "${actual}"
    done
  fi

  local stale
  stale=$(jq -r --argjson names "${names}" '.[].policies[] | .name | select(IN($names[]) | not)' <<<"${existing}")
  while IFS= read -r name; do
    if [[ -n ${name} ]]; then
      drift "定義にない Actions のポリシー ${name} が GitHub にあります"
    fi
  done <<<"${stale}"
}

labels_definition="${settings_dir}/labels.json"

validate_labels() {
  if ! jq -e '
    type == "array"
    and all(.[];
      type == "object"
      and (keys - ["name", "color", "description"] | length == 0)
      and (.name | type == "string" and length > 0)
      and (.color | type == "string" and test("^[0-9a-fA-F]{6}$"))
      and ((has("description") | not) or (.description | type == "string")))
  ' "${labels_definition}" >/dev/null; then
    echo "エラー: ${labels_definition} は、name（空でない文字列）・color（6 桁の 16 進数）・description（文字列。省略可）だけを持つオブジェクトの配列ではありません" >&2
    return 1
  fi
  local duplicates
  duplicates=$(jq -r 'map(.name) | group_by(.) | map(select(length > 1) | .[0]) | .[]' "${labels_definition}")
  if [[ -n ${duplicates} ]]; then
    echo "エラー: 同じ名前のラベルが ${labels_definition} に複数あります: ${duplicates}" >&2
    return 1
  fi
}

# ラベル名は空白などを含むため、API のパスに入れる前にエンコードする
uri_encode() {
  jq -rn --arg value "$1" '$value | @uri'
}

sync_labels() {
  local existing
  existing=$(gh_get 'ラベルの一覧の取得' --paginate --slurp 'repos/{owner}/{repo}/labels?per_page=100')

  local count i label name actual encoded body
  count=$(jq length "${labels_definition}")
  for ((i = 0; i < count; i++)); do
    label=$(jq -c ".[${i}]" "${labels_definition}")
    name=$(jq -r '.name' <<<"${label}")
    if ! jq -e --arg name "${name}" 'any(.[][]; .name == $name)' <<<"${existing}" >/dev/null; then
      if ${check_only}; then
        drift "ラベル ${name} が GitHub にありません"
      else
        gh_write "ラベル ${name} の作成" --method POST 'repos/{owner}/{repo}/labels' --input - <<<"${label}"
        echo "作成: ラベル ${name}"
      fi
    elif ${check_only}; then
      actual=$(jq -c --arg name "${name}" 'first(.[][] | select(.name == $name))' <<<"${existing}")
      report_defined_drift "ラベル ${name}" "${label}" "${actual}"
    else
      encoded=$(uri_encode "${name}")
      body=$(jq -c 'del(.name)' <<<"${label}")
      gh_write "ラベル ${name} の反映" --method PATCH "repos/{owner}/{repo}/labels/${encoded}" --input - <<<"${body}"
    fi
  done

  local stale
  stale=$(jq -r --slurpfile defined "${labels_definition}" '.[][] | .name | select(IN($defined[0][].name) | not)' <<<"${existing}")
  while IFS= read -r name; do
    if [[ -z ${name} ]]; then
      continue
    elif ${check_only}; then
      drift "定義にないラベル ${name} が GitHub にあります"
    else
      encoded=$(uri_encode "${name}")
      gh_write "ラベル ${name} の削除" --method DELETE "repos/{owner}/{repo}/labels/${encoded}"
      echo "削除: ラベル ${name}"
    fi
  done <<<"${stale}"
}

# --check では GitHub を変えず、反映すると変わる箇所をずれとして示す
check_only=false
if [[ $# -eq 1 ]] && [[ $1 == --check ]]; then
  check_only=true
elif [[ $# -ne 0 ]]; then
  echo "使い方: $0 [--check]" >&2
  exit 1
fi

# jq がないと定義の検査（if ! jq）が失敗し、定義の不備と誤って示すため、先に確かめる
for command in gh jq; do
  if ! command -v "${command}" >/dev/null; then
    echo "エラー: ${command} が見つかりません。インストールしてから実行してください" >&2
    exit 1
  fi
done

# gh は GH_REPO があればそれを対象にするため外し、定義と同じリポジトリのルートで remote から決めさせる
# https://github.com/cli/cli/blob/v2.102.0/pkg/cmdutil/repo_override.go
unset GH_REPO
cd "$(dirname "$0")/../../.."
# ルールセットだけ反映して止まらないよう、ほかの定義はルールセットより先に検査する
validate_repository
validate_security
validate_actions
validate_actions_policies
validate_labels
if ${check_only}; then
  echo "GitHub の設定を定義と比べています..."
else
  echo "GitHub に定義を適用しています..."
fi
sync_rulesets
sync_repository
sync_security
sync_actions
sync_actions_policies
sync_labels
if ! ${check_only} && [[ ${drift_count} -eq 0 ]]; then
  echo "GitHub に定義を適用しました"
elif ! ${check_only}; then
  echo "GitHub に定義を適用しましたが、API で反映できない設定に、定義と違う箇所が ${drift_count} 件あります。GitHub の画面で定義に合わせてください"
  exit 1
elif [[ ${drift_count} -eq 0 ]]; then
  echo "GitHub の設定は定義と一致しています"
else
  echo "GitHub の設定に、定義と違う箇所が ${drift_count} 件あります"
  exit 1
fi
