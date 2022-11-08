import getBars from "../utils/bars.js";
import createMarkdownSection from "../utils/markdown.js";

const getHoursPercentages = (commits) => {
    let totalCommits = 0;
    let percentages = [
        { name: "morning", percent: 0 },
        { name: "afternoon", percent: 0 },
        { name: "evening", percent: 0 },
        { name: "night", percent: 0 },
    ];
    for (let i = 0; i < commits.length; i++) {
        const commitDate = new Date(commits[i].commit.author.date);
        const commitHour = commitDate.getHours();
        if (commitHour >= 6 && commitHour < 12) {
            percentages[0].percent++;
        } else if (commitHour >= 12 && commitHour < 18) {
            percentages[1].percent++;
        } else if (commitHour >= 18 && commitHour < 24) {
            percentages[2].percent++;
        } else {
            percentages[3].percent++;
        }
        totalCommits++;
    }
    percentages[0].percent = Math.round((percentages[0].percent / totalCommits) * 100);
    percentages[1].percent = Math.round((percentages[1].percent / totalCommits) * 100);
    percentages[2].percent = Math.round((percentages[2].percent / totalCommits) * 100);
    percentages[3].percent = Math.round((percentages[3].percent / totalCommits) * 100);
    return percentages;
};

const getHoursStats = (commits) => {
    const title = "🌉 - Working hours stats";
    const barSettings = { full: "#", empty: "·", length: 25 };
    const percentages = getHoursPercentages(commits);
    const bars = getBars(percentages, barSettings);
    const hoursStats = createMarkdownSection(title, bars);
    return hoursStats;
};

export default getHoursStats;
