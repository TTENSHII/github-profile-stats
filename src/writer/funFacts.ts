import { FunFacts } from "../types/stats";

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
    textBuffer.push(`📅 - Days on GitHub: ${funFacts.daysOnGitHub} days (${funFacts.yearsOnGitHub} years)`);
    textBuffer.push(`🌴 - Weekend commits ratio: ${funFacts.weekendWarriorRatio}%`);
    if (funFacts.commitStormDay) {
        textBuffer.push(`🌪️ - Commit storm day: ${funFacts.commitStormDay.date} with ${funFacts.commitStormDay.count} commits`)
    }
    textBuffer.push(`📊 - Average commits per repo: ${funFacts.averageCommitsPerRepo}`)
    textBuffer.push("```");
};

export { writeFunFacts };
