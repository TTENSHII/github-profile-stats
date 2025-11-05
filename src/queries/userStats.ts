import { Octokit } from '@octokit/rest';
import { UserStats } from '../types/stats';

/**
 * Fetches user statistics from GitHub.
 * @param octokit An authenticated Octokit instance.
 * @returns A promise that resolves to the user's statistics.
 * Exits the process if an error occurs while fetching user statistics.
 */
const fetchUserStats = async (octokit: Octokit): Promise<UserStats> => {
    try {
        const { data: user } = await octokit.rest.users.getAuthenticated();

        return {
            login: user.login,
            followers: user.followers,
            following: user.following,
            totalGists: user.public_gists,
            createdAt: new Date(user.created_at),
        };
    } catch (error) {
        console.error("❌ Error fetching user stats:", error instanceof Error ? error.message : error);
        process.exit(1);
    }
};

export { fetchUserStats };
