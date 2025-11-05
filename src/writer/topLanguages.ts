import { getConfig } from "../config/config";
import { Repository } from "../types/stats";
import { printBar } from "../utils/printBar";

/**
 * Write top languages to a text buffer with bars and percentages.
 * @param sortedLanguages Array of [languageName, totalPercentage].
 * @param textBuffer Buffer where output lines will be pushed.
 */
const writeTopLanguagesToBuffer = (sortedLanguages: [string, number][], textBuffer: string[]) => {
    const totalPercent = sortedLanguages.reduce((sum, [, percent]) => sum + percent, 0);
    if (totalPercent === 0) {
        return;
    }

    textBuffer.push('\n📊 - Top languages');
    textBuffer.push("```text");

    sortedLanguages.forEach(([name, percent]) => {
        const realPercent = (percent / totalPercent) * 100;
        textBuffer.push(`${name.padEnd(10)}: ${printBar(realPercent, 100)} ${realPercent.toFixed(0)}%`);
    });

    textBuffer.push("```");
};

/**
 * Compute and write top languages for repositories.
 * @param repositories Array of repositories.
 * @param textBuffer Buffer where output lines will be pushed.
 */
const writeTopLanguages = (repositories: Repository[], textBuffer: string[]) => {
    const languagesSum: Record<string, number> = {};

    repositories.forEach(repo => {
        if (!repo.languages || repo.languages.length === 0) {
            return;
        }
        repo.languages.forEach(lang => {
            languagesSum[lang.name] = (languagesSum[lang.name] || 0) + lang.percentage;
        });
    });

    let sortedLanguages = Object.entries(languagesSum)
        .sort((a, b) => b[1] - a[1])
        .slice(0, getConfig().maxLanguagesToShow);

    if (getConfig().languageSortMode === "alphabetical") {
        sortedLanguages = sortedLanguages.sort((a, b) => a[0].localeCompare(b[0]));
    }

    writeTopLanguagesToBuffer(sortedLanguages, textBuffer);
};

export { writeTopLanguages };
