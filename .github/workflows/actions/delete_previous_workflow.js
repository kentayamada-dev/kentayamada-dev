import { Octokit } from "@octokit/core";
import fetch from "node-fetch";

export const deletePreviousWorkflow = async (authKey) => {
  const octokit = new Octokit({
    request: {
      fetch: fetch,
    },
    auth: authKey,
  });

  const runs = await octokit.request("GET /repos/{owner}/{repo}/actions/runs", {
    owner: "kentayamada-dev",
    repo: "kentayamada-dev",
    per_page: 2,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  await octokit.request("DELETE /repos/{owner}/{repo}/actions/runs/{run_id}", {
    owner: "kentayamada-dev",
    repo: "kentayamada-dev",
    run_id: runs["data"]["workflow_runs"][1]["id"],
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
};
