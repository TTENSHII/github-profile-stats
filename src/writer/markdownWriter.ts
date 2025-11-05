import { getConfig } from "../config/config";
import { FunFacts, Repository, StatsOptions, UserStats } from "../types/stats";
import { createStatFileIfNotExists } from "../utils/createStatFile";
import { parseMarkdownFile } from "../utils/parseMarkdownFile";
import { pushFile } from "../utils/pushFile";
import { writeStatsInFile } from "../utils/writeStatsInFile";
import { writeFunFacts } from "./funFacts";
import { writeQuickOverview } from "./quickOverview";
import { writeTopLanguages } from "./topLanguages";
import { writeWorkingDaysStats } from "./workingDays";
import { writeWorkingHoursStats } from "./workingHours";

type SectionWriter = (repos: Repository[], userStats: UserStats, funFacts: FunFacts, buffer: string[]) => void;

const sectionWriters: { 
    configKey: keyof StatsOptions, 
    write: SectionWriter 
}[] = [
    { configKey: "includeOverview", write: (repos, stats, _, buf) => writeQuickOverview(repos, stats, buf) },
    { configKey: "includeFunFacts", write: (_, __, funFacts, buf) => writeFunFacts(funFacts, buf) },
    { configKey: "includeLanguages", write: (repos, _, __, buf) => writeTopLanguages(repos, buf) },
    { configKey: "includeWorkingHours", write: (repos, _, __, buf) => writeWorkingHoursStats(repos, buf) },
    { configKey: "includeWorkingDays", write: (repos, _, __, buf) => writeWorkingDaysStats(repos, buf) },
];

/**
 * Asynchronously generates and writes GitHub stats to a markdown file.
 * It ensures the stats file exists, creating it if necessary.
 * It keeps the content outside the stats section intact while updating the stats section.
 * 
 * @param repositories Array of user's repositories to include in the stats.
 * @param userStats Statistics of the user (followers, created date, etc.).
 * @param funFacts Computed fun facts such as streaks and commit patterns.
 * Exits the process if any error occurs during writing.
 */
const markdownWriter = async (repositories: Repository[], userStats: UserStats, funFacts: FunFacts) => {
    const config: StatsOptions = getConfig();
    let textBuffer: string[] = [];

    try {
        createStatFileIfNotExists(config.outputFile);
        const fileStatsSection = parseMarkdownFile(config.outputFile);

        for (const { configKey, write } of sectionWriters) {
            if (config[configKey]) {
                write(repositories, userStats, funFacts, textBuffer);
            }
        }

        writeStatsInFile(config.outputFile, fileStatsSection, textBuffer.join('\n'));
        pushFile(config.outputFile, config.commitMessage);
    } catch (error: any) {
        console.error('❌ An error occurred while writing the stats:', error.message);
        process.exit(1);
    }
};

export { markdownWriter };
