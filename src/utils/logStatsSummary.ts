import { FunFacts, Repository, UserStats } from "../types/stats";

const logUserStats = (stats: UserStats) => {
    console.log("===== User Stats Summary =====");
    console.log(`User login: ${stats.login}`);
    console.log(`Followers: ${stats.followers}`);
    console.log(`Following: ${stats.following}`);
    console.log(`Total Gists: ${stats.totalGists}`);
    console.log(`Account Created At: ${stats.createdAt.toLocaleDateString()}`);
    console.log(`------------------------\n`);
}

const logRepositoriesStats = (repositories: Repository[]) => {
    console.log("===== Repositories Summary =====");
    console.log(`Total Repositories: ${repositories.length}`);

    repositories.forEach(repo => {
        console.log(`- ${repo.name}: ${repo.isPrivate ? "[Private]" : "[Public]"}`);
        console.log(`  Stars: ${repo.starCount}, Forks: ${repo.forkCount}, PRs: ${repo.pullRequestCount}, Issues: ${repo.issueCount}`);
        if (repo.languages.length !== 0) {
            repo.languages.forEach(lang => {
                console.log(`    - ${lang.name}: ${lang.percentage.toFixed(2)}%`);
            });
        }
        console.log(`  Total Commits: ${repo.commitCount}`);
    });

    console.log(`------------------------\n`);
}

const logFunFacts = (funFacts: FunFacts) => {
    console.log("===== Fun Facts =====");
    console.log(`Average commit count per repository: ${funFacts.averageCommitsPerRepo.toFixed(2)}`);
    console.log(`longestCommitStreak: ${funFacts.longestCommitStreak} days`);

    if (funFacts.commitStormDay) {
        console.log(`commitStormDay: ${funFacts.commitStormDay.date} with ${funFacts.commitStormDay.count} commits`);
    }

    console.log(`weekendWarriorRatio: ${funFacts.weekendWarriorRatio.toFixed(2)}%`);
    console.log(`yearsOnGitHub: ${funFacts.yearsOnGitHub} years = ${funFacts.daysOnGitHub} days`);
    
    if (funFacts.mostLikedRepo) {
        console.log(`mostLikedRepo: ${funFacts.mostLikedRepo.name} with ${funFacts.mostLikedRepo.starCount} stars`);
    }

    console.log(`------------------------\n`);
}

/**
 * Logs a summary of the fetched stats to the console.
 * @param stats The user statistics.
 * @param repositories The list of repositories.
 * @param funFacts The computed fun facts.
 */
const logStatsSummary = (stats: UserStats, repositories: Repository[], funFacts: FunFacts) => {
    logUserStats(stats);
    logRepositoriesStats(repositories);
    logFunFacts(funFacts);
}

export { logStatsSummary };
