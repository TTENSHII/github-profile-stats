import { getUserInfos } from "./queries/user-stats.js";
import getRepositories from "./queries/repositories.js";
import getCommits from "./queries/commits.js";
import getHoursStats from "./stats/hours-stats.js";

const main = async () => {
    const userInfos = await getUserInfos();
    if (!userInfos || !userInfos.login) {
        console.log("Cannot get user infos, please check your token");
        process.exit(1);
    }
    const repositories = await getRepositories(userInfos.login);
    const commits = await getCommits(userInfos.login, repositories);
    const hoursStats = getHoursStats(commits);
    console.log(hoursStats);
};

main();
