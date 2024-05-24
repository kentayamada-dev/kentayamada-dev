owner="kentayamada-dev"
repo="kentayamada-dev"
token="$2"
workflow_name="$1"

# Fetch workflow ID by name
workflow_id=$(curl -s -H "Authorization: token $token" \
"https://api.github.com/repos/$owner/$repo/actions/workflows" \
| jq -r --arg name "$workflow_name" '.workflows[] | select(.name == $name) | .id')

# Get all workflow run IDs and delete all but the most recent one
if [ -n "$workflow_id" ]; then
  run_ids=$(curl -s -H "Authorization: token $token" \
  "https://api.github.com/repos/$owner/$repo/actions/workflows/$workflow_id/runs" \
  | jq -r '.workflow_runs | map(.id) | .[1:][]')

  if [ -n "$run_ids" ]; then
    for run_id in $run_ids; do
      curl -s -X DELETE -H "Authorization: token $token" \
      "https://api.github.com/repos/$owner/$repo/actions/runs/$run_id" && echo "Deleted workflow run ID: $run_id"
    done
  else
    echo "No previous workflow runs found to delete."
  fi
else
  echo "Workflow '$workflow_name' not found."
fi
