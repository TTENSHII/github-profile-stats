import { Octokit } from "@octokit/rest";
import { Repository } from "../types/stats";

/**
 * Fetches the number of pull requests for each repository.
 * @param octokit Authenticated Octokit instance.
 * @param repositories Array of repositories to fetch PR counts for.
 * @returns Resolves when PR counts have been updated on each repository.
 */
const getPRsCount = async (octokit: Octokit, repositories: Repository[]): Promise<void> => {
    await Promise.all(
        repositories.map(async repo => {
            const allPRs = await octokit.paginate(octokit.rest.pulls.list, {
                owner: repo.owner,
                repo: repo.name,
                state: 'all',
                per_page: 100,
            });
            repo.pullRequestCount = allPRs.length;
        })
    );
};

/**
 * Fetches the number of user issues for each repository.
 * @param octokit Authenticated Octokit instance.
 * @param repositories Array of repositories to fetch issues for.
 * @param login GitHub username to filter issues by.
 * @returns Resolves when issue counts have been updated on each repository.
 */
const getIssuesCount =
async (octokit: Octokit, repositories: Repository[], login: string): Promise<void> => {
    await Promise.all(
        repositories.map(async repo => {

            const allIssues = await octokit.paginate(octokit.rest.issues.listForRepo, {
                owner: repo.owner,
                repo: repo.name,
                state: 'all',
                per_page: 100,
            });

            const userIssues = allIssues.filter(issue =>
                issue.user?.login === login && !issue.pull_request
            );

            repo.issueCount = userIssues.length;

        })
    );
};

/**
 * Fetches and updates the issue and pull request counts for all repositories.
 * @param octokit Authenticated Octokit instance.
 * @param repositories Array of repositories to fetch stats for.
 * @param login GitHub username to filter issues by.
 * @returns Resolves when all counts have been updated.
 * Exits the process if an error occurs during fetching.
 */
const fetchRepositoriesIssuesAndPRs =
async (octokit: Octokit, repositories: Repository[], login: string) => {
    try {
        await getIssuesCount(octokit, repositories, login);
        await getPRsCount(octokit, repositories);
    } catch (error) {
        console.error("❌ Error fetching issues and PRs:", error instanceof Error ? error.message : error);
        process.exit(1);
    }
};

export { fetchRepositoriesIssuesAndPRs };
