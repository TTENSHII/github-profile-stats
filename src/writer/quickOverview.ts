import { Repository, UserStats } from "../types/stats";

/**
 * Format and append a quick overview of the user's profile to the text buffer.
 * @param repos List of repositories.
 * @param userStats User statistics.
 * @param textBuffer Array of strings to append the overview to.
 */
const writeQuickOverview = (repos: Repository[], userStats: UserStats, textBuffer: string[]) => {
    textBuffer.push('🎏 Quick overview of my profile');
    textBuffer.push("```text");
    textBuffer.push(`👥 - Followers: ${userStats.followers}`);
    textBuffer.push(`👤 - Following: ${userStats.following}`);
    textBuffer.push(`📂 - Public repositories: ${repos.filter(r => !r.isPrivate).length}`);
    textBuffer.push(`🔒 - Private repositories: ${repos.filter(r => r.isPrivate).length}`);
    textBuffer.push(`⭐ - Total stars: ${repos.reduce((acc, r) => acc + r.starCount, 0)}`);
    textBuffer.push(`🔃 - Pull requests: ${repos.reduce((acc, r) => acc + r.pullRequestCount, 0)}`);
    textBuffer.push(`🏮 - Issues: ${repos.reduce((acc, r) => acc + r.issueCount, 0)}`);
    textBuffer.push(`🐲 - Repositories contributed to: ${repos.length}`);
    textBuffer.push(`🍃 - Commits made: ${repos.reduce((acc, r) => acc + r.commitCount, 0)}`);
    textBuffer.push(`📝 - Gists: ${userStats.totalGists}`);
    textBuffer.push("```");
};

export { writeQuickOverview };
