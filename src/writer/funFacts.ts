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
    const yearText = funFacts.yearsOnGitHub === 1 ? 'year' : 'years';
    const monthText = funFacts.monthsOnGitHub === 1 ? 'month' : 'months';
    const timeOnGitHub = funFacts.monthsOnGitHub === 0 
        ? `${funFacts.yearsOnGitHub} ${yearText}`
        : `${funFacts.yearsOnGitHub} ${yearText} and ${funFacts.monthsOnGitHub} ${monthText}`;
    textBuffer.push(`📅 - ${timeOnGitHub}`);
    textBuffer.push(`🌴 - Weekend commits ratio: ${funFacts.weekendWarriorRatio}%`);
    if (funFacts.commitStormDay) {
        textBuffer.push(`🌪️ - Commit storm day: ${funFacts.commitStormDay.date} with ${funFacts.commitStormDay.count} commits`)
    }
    textBuffer.push(`📊 - Average commits per repo: ${funFacts.averageCommitsPerRepo}`)
    textBuffer.push("```");
};

export { writeFunFacts };
