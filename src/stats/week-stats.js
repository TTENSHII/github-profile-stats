import getBars from "../utils/bars.js";
import createMarkdownSection from "../utils/markdown.js";

const getWeeklyPercentages = (commits) => {
    let totalCommits = 0;
    let percentages = [
        { name: "Monday", percent: 0 },
        { name: "Tuesday", percent: 0 },
        { name: "Wednesday", percent: 0 },
        { name: "Thursday", percent: 0 },
        { name: "Friday", percent: 0 },
        { name: "Saturday", percent: 0 },
        { name: "Sunday", percent: 0 },
    ];
    for (let i = 0; i < commits.length; i++) {
        const commitDate = new Date(commits[i].commit.author.date);
        const commitDay = commitDate.getDay();
        if (commitDay === 1) {
            percentages[0].percent++;
        } else if (commitDay === 2) {
            percentages[1].percent++;
        } else if (commitDay === 3) {
            percentages[2].percent++;
        } else if (commitDay === 4) {
            percentages[3].percent++;
        } else if (commitDay === 5) {
            percentages[4].percent++;
        } else if (commitDay === 6) {
            percentages[5].percent++;
        } else {
            percentages[6].percent++;
        }
        totalCommits++;
    }
    percentages[0].percent = Math.round((percentages[0].percent / totalCommits) * 100);
    percentages[1].percent = Math.round((percentages[1].percent / totalCommits) * 100);
    percentages[2].percent = Math.round((percentages[2].percent / totalCommits) * 100);
    percentages[3].percent = Math.round((percentages[3].percent / totalCommits) * 100);
    percentages[4].percent = Math.round((percentages[4].percent / totalCommits) * 100);
    percentages[5].percent = Math.round((percentages[5].percent / totalCommits) * 100);
    percentages[6].percent = Math.round((percentages[6].percent / totalCommits) * 100);
    return percentages;
};

const getWeekStats = (commits) => {
    const title = "📅 - Working days stats";
    const barSettings = { full: "#", empty: "·", length: 25 };
    const percentages = getWeeklyPercentages(commits);
    const bars = getBars(percentages, barSettings);
    const weeklyStats = createMarkdownSection(title, bars);
    return weeklyStats;
};

export default getWeekStats;
