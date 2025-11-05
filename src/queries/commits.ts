import { Octokit } from '@octokit/rest';
import { Commit, Repository } from '../types/stats';

/**
 * Fetch commits for a single repository authored by the given user.
 * @param octokit Authenticated Octokit instance.
 * @param repo Repository to fetch commits from.
 * @param login GitHub login of the author.
 * @returns Array of commits.
 */
const fetchRepositoryCommits = async (
    octokit: Octokit,
    repo: Repository,
    login: string
): Promise<Commit[]> => {
    try {
        const commits = await octokit.paginate(octokit.rest.repos.listCommits, {
            owner: repo.owner,
            repo: repo.name,
            author: login,
            per_page: 100,
        });

        return commits
            .map(c => c.commit.author?.date ? { date: new Date(c.commit.author.date) } : null)
            .filter((d): d is Commit => d !== null);
    } catch (error) {
        console.error(`❌ Failed to fetch commits for repository "${repo.name}":`,
            error instanceof Error ? error.message : error);
        process.exit(1);
    }
};

/**
 * Fetch commits for all repositories authored by the given user.
 * @param octokit Authenticated Octokit instance.
 * @param repositories Array of repositories to fetch commits from.
 * @param login GitHub login of the author.
 * Exits the process if fetching commits for any repository fails.
 */
const fetchRepositoriesCommits = async (
    octokit: Octokit,
    repositories: Repository[],
    login: string
): Promise<void> => {
    await Promise.all(
        repositories.map(async (repo) => {
            repo.commits = await fetchRepositoryCommits(octokit, repo, login);
            repo.commitCount = repo.commits.length;
        })
    );
};

export { fetchRepositoriesCommits };
