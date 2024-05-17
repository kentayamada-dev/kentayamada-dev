owner="kentayamada-dev"
repo="kentayamada-dev"

# Get the latest workflow run ID for the specific workflow
run_id=$(curl -H "Authorization: token $2" \
"https://api.github.com/repos/$owner/$repo/actions/workflows/$1/runs?per_page=2" \
| jq '.workflow_runs[1].id')

# Check if there is a previous workflow run
if [ "$run_id" != "null" ]; then
  run_id=$(echo $run_id | tr -d '"') # Remove quotes from ID
  echo "Deleting previous workflow run ID: $run_id"
  curl -X DELETE -H "Authorization: token $2" \
  "https://api.github.com/repos/$owner/$repo/actions/runs/$run_id"
  echo "Previous workflow run deleted."
else
  echo "No previous workflow run found."
fi
