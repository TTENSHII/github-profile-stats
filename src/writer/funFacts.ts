import { FunFacts } from "../types/stats";

/**
 * Formats the time on GitHub into a human-readable string.
 * @param years Number of years on GitHub.
 * @param months Number months on GitHub (0-11).
 * @return Formatted time string.
 */
const formatTimeOnGitHub = (years: number, months: number) => {
    const parts = [];

    if (years > 0) {
        parts.push(`${years} ${years === 1 ? "year" : "years"}`);
    }
    if (months > 0 && months < 12) {
        parts.push(`${months} ${months === 1 ? "month" : "months"}`);
    }

    if (parts.length === 0) {
        return "less than a month";
    }

    return parts.join(" and ");
};

/**
 * Format and append fun facts to the text buffer.
 * @param funFacts Fun facts data.
 * @param textBuffer Array of strings to append the fun facts to.
 */
const writeFunFacts = (funFacts: FunFacts, textBuffer: string[]) => {
    textBuffer.push(`\n🎉 Fun Facts:`);
    textBuffer.push("```text");
    textBuffer.push(`🏆 - Longest commit streak: ${funFacts.longestCommitStreak} days`)
    if (funFacts.mostLikedRepo) {
        textBuffer.push(`💖 - Most liked repo: ${funFacts.mostLikedRepo.name} with ${funFacts.mostLikedRepo.starCount} stars`)
    }
    const timeOnGitHub = formatTimeOnGitHub(funFacts.yearsOnGitHub, funFacts.monthsOnGitHub);
    textBuffer.push(`📅 - ${timeOnGitHub} on GitHub`);
    textBuffer.push(`🌴 - Weekend commits ratio: ${funFacts.weekendWarriorRatio}%`);
    if (funFacts.commitStormDay) {
        textBuffer.push(`🌪️ - Commit storm day: ${funFacts.commitStormDay.date} with ${funFacts.commitStormDay.count} commits`)
    }
    textBuffer.push(`📊 - Average commits per repo: ${funFacts.averageCommitsPerRepo}`)
    textBuffer.push("```");
};

export { writeFunFacts };
