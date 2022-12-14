import { getUserInfos } from "./queries/user-stats.js";
import getRepositories from "./queries/repositories.js";
import getCommits from "./queries/commits.js";
import getHoursStats from "./stats/hours-stats.js";
import getWeekStats from "./stats/week-stats.js";
import getTopLanguages from "./stats/top-languages.js";
import getProfileInfos from "./stats/profile-infos.js";
import { writeReadme, pushReadme } from "./utils/readme.js";

const main = async () => {
    const userInfos = await getUserInfos();
    if (!userInfos || !userInfos.login) {
        console.log("Cannot get user infos, please check your token");
        process.exit(1);
    }
    const repositories = await getRepositories(userInfos.login);
    const commits = await getCommits(userInfos.login, repositories);
    const hoursStats = getHoursStats(commits);
    const weekStats = getWeekStats(commits);
    const topLanguages = getTopLanguages(repositories);
    const profileInfos = await getProfileInfos(userInfos);
    writeReadme(hoursStats, weekStats, topLanguages, profileInfos);
    pushReadme();
};

main();
