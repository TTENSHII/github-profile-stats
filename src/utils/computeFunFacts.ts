import { getConfig } from "../config/config";
import { Commit, CommitStormDay, Repository, UserStats, FunFacts } from "../types/stats";
import { areDaysConsecutive, dateToStringInTimezone, getDayInTimezone } from "./timezoneHelper";

/**
 * Calculates the longest streak of consecutive days with commits.
 * @param commits Array of commits.
 * @returns Number of consecutive days in the longest streak.
 */
const getLongestCommitStreak = (commits: Commit[]): number => {
    if (commits.length === 0) {
        return 0;
    }

    const uniqueDates = new Set(
        commits.map(c => {
            const localStr = c.date.toLocaleString("en-US", { timeZone: getConfig().timezone });
            const localDate = new Date(localStr);
            return localDate.toISOString().split("T")[0];
        })
    );
    const validDates = Array.from(uniqueDates)
        .filter(date => typeof date === 'string')
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    let longest = 0;
    let current = 0;

    for (let i = 1; i < validDates.length; i++) {
        const prevDate = new Date(validDates[i - 1]!);
        const currDate = new Date(validDates[i]!);

        if (areDaysConsecutive(prevDate, currDate)) {
            current++;
            longest = Math.max(longest, current);
        } else {
            current = 1;
        }
    }

    return longest;
};

/**
 * Finds the day with the most commits (commit storm).
 * @param commits Array of commits.
 * @returns CommitStormDay object or null if no commits.
 */
const getCommitStormDay = (commits: Commit[]): CommitStormDay | null => {
    if (commits.length === 0) {
        return null;
    }

    const counts = new Map<string, number>();

    commits.forEach(c => {
        const day = dateToStringInTimezone(c.date);
        counts.set(day, (counts.get(day) ?? 0) + 1);
    });

    const [maxDate, maxCount] = [...counts.entries()].reduce(
        (a, b) => (b[1] > a[1] ? b : a)
    );

    return maxDate ? { date: maxDate, count: maxCount } : null;
};

/**
 * Calculates the average number of commits per repository.
 * @param repos Array of repositories.
 * @returns Rounded average commits per repository.
 */
const getAverageCommitsPerRepo = (repos: Repository[]): number => {
    if (repos.length === 0) {
        return 0;
    }

    const totalCommits = repos.reduce((sum, repo) => sum + repo.commitCount, 0);
    return Math.round(totalCommits / repos.length);
}

/**
 * Calculates the percentage of commits done during weekends.
 * @param commits Array of commits.
 * @returns Percentage of weekend commits rounded to nearest integer.
 */
const getWeekendWarriorRatio = (commits: Commit[]): number => {
    if (commits.length === 0) {
        return 0;
    }

    const weekendCommits = commits.filter(c => {
        const day = getDayInTimezone(c.date);
        return day === "Sunday" || day === "Saturday";
    }).length;

    return Math.round((weekendCommits / commits.length) * 100);
}

/**
 * Calculates the remaining months after complete years since the user joined GitHub.
 * @param createdAt User's account creation date.
 * @returns Number of remaining months (0-11).
 */
const getMonthsOnGitHub = (createdAt: Date): number => {
    const now = new Date();
    let months = now.getMonth() - createdAt.getMonth();

    if (months < 0 || (months === 0 && now.getDate() < createdAt.getDate())) {
        months += 12;
    }

    if (now.getDate() < createdAt.getDate() && months > 0) {
        months--;
    }

    return months;
}

/**
 * Calculates the number of years since the user joined GitHub.
 * @param createdAt User's account creation date.
 * @returns Number of years on GitHub.
 */
const getYearsOnGitHub = (createdAt: Date): number => {
    const now = new Date();
    let years = now.getFullYear() - createdAt.getFullYear();

    if (now.getMonth() < createdAt.getMonth() || 
        (now.getMonth() === createdAt.getMonth() && now.getDate() < createdAt.getDate())) {
        years--;
    }
    
    return years;
}

/**
 * Finds the repository with the most stars.
 * @param repositories Array of repositories.
 * @returns Repository with the highest star count or null if none.
 */
const getMostLikedRepository = (repositories: Repository[]): Repository | null => {
    if (repositories.length === 0) {
        return null;
    }

    const likedRepos = repositories.filter(repo => repo.starCount > 0);
    if (likedRepos.length === 0) {
        return null;
    }

    return likedRepos.reduce((max, repo) => (repo.starCount > max.starCount ? repo : max));
}

/**
 * Computes fun facts from repositories and user stats.
 * @param repositories Array of repositories.
 * @param userStats User statistics object.
 * @returns FunFacts object containing various metrics.
 */
const computeFunFacts = (repositories: Repository[], userStats: UserStats): FunFacts => {
    const allCommits = repositories.flatMap(r => r.commits);

    return {
        longestCommitStreak: getLongestCommitStreak(allCommits),
        commitStormDay: getCommitStormDay(allCommits),
        averageCommitsPerRepo: getAverageCommitsPerRepo(repositories),
        weekendWarriorRatio: getWeekendWarriorRatio(allCommits),
        monthsOnGitHub: getMonthsOnGitHub(userStats.createdAt),
        yearsOnGitHub: getYearsOnGitHub(userStats.createdAt),
        mostLikedRepo: getMostLikedRepository(repositories),
    };
}

export { computeFunFacts };
