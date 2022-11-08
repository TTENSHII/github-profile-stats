import fs from "fs";
import { exec } from "child_process";

const getSections = () => {
    let sections = { startSection: null, endSection: null };
    if (!fs.existsSync("README.md")) {
        fs.writeFileSync("README.md",
        "<!--START_SECTION:GITHUB_STATS-->\n<!--END_SECTION:GITHUB_STATS-->");
    }
    const readme = fs.readFileSync("./README.md", "utf8").split('\n');
    for (let i = 0; i < readme.length; i++) {
        if (readme[i].includes("<!--START_SECTION:GITHUB_STATS-->")) {
            sections.startSection = i;
        }
        if (readme[i].includes("<!--END_SECTION:GITHUB_STATS-->")) {
            sections.endSection = i;
        }
    }
    if (sections.startSection >= sections.endSection) {
        sections.startSection = null;
        sections.endSection = null;
    }
    return sections;
};

const getStats = (hoursStats, weekStats, topLanguages, profileInfos) => {
    let stats = [];
    if (process.env.INPUT_SHOW_HOURS === "true") {
        stats.push(hoursStats);
    }
    if (process.env.INPUT_SHOW_DAYS === "true") {
        stats.push(weekStats);
    }
    if (process.env.INPUT_SHOW_LANGUAGES === "true") {
        stats.push(topLanguages);
    }
    if (process.env.INPUT_SHOW_OVERWIEW === "true") {
        stats.push(profileInfos);
    }
    return stats;
};

const writeReadme = (hoursStats, weekStats, topLanguages, profileInfos) => {
    const sections = getSections();
    if (sections.startSection !== null && sections.endSection !== null) {
        const readmeContent = fs.readFileSync("README.md", "utf8").split("\n");
        const stats = getStats(hoursStats, weekStats, topLanguages, profileInfos);
        const newContent = readmeContent.slice(0, sections.startSection + 1)
            .concat(stats).concat(readmeContent.slice(sections.endSection));
        fs.writeFileSync("README.md", newContent.join("\n"));
    } else {
        console.log("Bad sections in README.md, please read the documentation");
        process.exit(1);
    }
};

const pushReadme = () => {
    const userEmail = "41898282+github-actions[bot]@users.noreply.github.com";
    const userName = "github-actions[bot]";
    const commitMessage = process.env.INPUT_COMMIT_MESSAGE || "Update README.md";
    exec(`git config --global user.email "${userEmail}"`);
    exec(`git config --global user.name "${userName}"`);
    exec("git add README.md");
    exec(`git commit -m "${commitMessage}"`);
    exec("git push");
    console.log("Work done, README.md updated");
};

export { writeReadme, pushReadme };
