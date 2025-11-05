import { Octokit } from '@octokit/rest';
import { Repository } from '../types/stats';

/**
 * Fetches all repositories for the authenticated user.
 * @param octokit Authenticated Octokit instance.
 * @returns Promise resolving to an array of repositories.
 * Exits the process if an error occurs while fetching repositories.
 */
const fetchRepositories = async (octokit: Octokit): Promise<Repository[]> => {
    try {
        const repos = await octokit.paginate(
            octokit.rest.repos.listForAuthenticatedUser,
            {
                visibility: 'all',
                affiliation: 'owner,collaborator',
                per_page: 100,
            }
        );

        return repos.filter(repo => {
            if (!repo.fork) {
                return true;
            }
            return !repos.some(r => !r.fork && r.name === repo.name && r.owner.login !== repo.owner.login);
        }).map(repo => ({
            name: repo.name,
            owner: repo.owner.login,
            isPrivate: repo.private,
            languages: [],
            commitCount: 0,
            issueCount: 0,
            pullRequestCount: 0,
            starCount: repo.stargazers_count,
            forkCount: repo.forks_count,
            commits: []
        }));
    } catch (error) {
        console.error("❌ Error fetching repositories:",
            error instanceof Error ? error.message : error);
        process.exit(1);
    }
};

export { fetchRepositories };
