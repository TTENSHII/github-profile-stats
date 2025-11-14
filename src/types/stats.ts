type Language = {
    name: string;
    percentage: number;
};

type Commit = {
    date: Date;
};

type Repository = {
    name: string;
    owner: string;
    isPrivate: boolean;
    languages: Language[];
    commitCount: number;
    issueCount: number;
    pullRequestCount: number;
    starCount: number;
    forkCount: number;
    commits: Commit[];
};

type UserStats = {
    login: string;
    followers: number;
    following: number;
    totalGists: number;
    createdAt: Date;
};

type StatsOptions = {
    outputFile: string;
    timezone: string;
    barFillChar: string;
    barEmptyChar: string;
    minLanguagePercentage: number;
    maxLanguagesToShow: number;
    languageSortMode: "percentage" | "alphabetical";
    commitMessage: string;
    includeOverview: boolean;
    includeFunFacts: boolean;
    includeLanguages: boolean;
    includeWorkingHours: boolean;
    includeWorkingDays: boolean;
};

type CommitStormDay = {
    date: string;
    count: number;
};

enum HourBucket {
  Morning = "Morning",
  Afternoon = "Afternoon",
  Evening = "Evening",
  Night = "Night",
}

enum DayOfWeek {
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
}

type FunFacts = {
    longestCommitStreak: number;
    commitStormDay: CommitStormDay | null;
    averageCommitsPerRepo: number;
    weekendWarriorRatio: number;
    monthsOnGitHub: number;
    yearsOnGitHub: number;
    mostLikedRepo: Repository | null;
};

type FileStatsSection = {
    textBefore: string[];
    beginStatsLine: number;
    endStatsLine: number;
    textAfter: string[];
};

export type { StatsOptions, Repository, UserStats, Language, CommitStormDay, FunFacts, Commit, FileStatsSection };
export { DayOfWeek, HourBucket };
