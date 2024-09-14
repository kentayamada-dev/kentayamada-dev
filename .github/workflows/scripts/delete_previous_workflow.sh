repo="$1"
token="$2"
workflow_name="$3"

# Fetch workflow ID by name
workflow_id=$(curl -s -H "Authorization: token $token" \
"https://api.github.com/repos/$repo/actions/workflows" \
| jq -r --arg name "$workflow_name" '.workflows[] | select(.name == $name) | .id')

# Get previous workflow run ID and delete if it exists
if [ -n "$workflow_id" ]; then
  run_id=$(curl -s -H "Authorization: token $token" \
  "https://api.github.com/repos/$repo/actions/workflows/$workflow_id/runs" \
  | jq -r '.workflow_runs[1].id')

  [ "$run_id" != "null" ] && curl -s -X DELETE -H "Authorization: token $token" \
  "https://api.github.com/repos/$repo/actions/runs/$run_id" && echo "Deleted previous workflow run ID: $run_id" || echo "No previous workflow run found."
else
  echo "Workflow '$workflow_name' not found."
fi
