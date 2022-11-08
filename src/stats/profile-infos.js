import createMarkdownSection from "../utils/markdown.js";
import getRepositories from "../queries/repositories.js";
import {
    getUserPrsNumber,
    getUserIssuesNumber,
    getUserCommitsNumber,
    getUserStarsNumber,
    getUserPrivateReposNumber
} from "../queries/user-stats.js";

const getProfileInfosContent = (infos) => {
    let content = [];
    for (let i = 0; i < infos.length; i++) {
        content.push(`${infos[i].symbol} - ${infos[i].name}: ${infos[i].value}`);
    }
    return content;
};

const getInfos = async (userInfos) => {
    let profileInfos = [];
    if (userInfos.followers) {
        profileInfos.push({
            name: "Followers",
            value: userInfos.followers,
            symbol: "👥",
        });
    }
    if (userInfos.following) {
        profileInfos.push({
            name: "Following",
            value: userInfos.following,
            symbol: "👤",
        });
    }
    if (userInfos.public_repos) {
        profileInfos.push({
            name: "Public repositories",
            value: userInfos.public_repos,
            symbol: "📂",
        });
    }
    const privateRepos = await getUserPrivateReposNumber();
    if (privateRepos) {
        profileInfos.push({
            name: "Private repositories",
            value: privateRepos,
            symbol: "🔒",
        });
    }
    const repositoriesStarred = await getUserStarsNumber();
    if (repositoriesStarred) {
        profileInfos.push({
            name: "Repositories starred",
            value: repositoriesStarred,
            symbol: "⭐",
        });
    }
    const userPrs = await getUserPrsNumber(userInfos.login);
    if (userPrs) {
        profileInfos.push({
            name: "Pull requests",
            value: userPrs,
            symbol: "🔃",
        });
    }
    const userIssues = await getUserIssuesNumber(userInfos.login);
    if (userIssues) {
        profileInfos.push({
            name: "Issues",
            value: userIssues,
            symbol: "🏮",
        });
    }
    const repoContributedTo = await getRepositories(userInfos.login);
    if (repoContributedTo && repoContributedTo.length > 0) {
        profileInfos.push({
            name: "Repos contributed to",
            value: repoContributedTo.length,
            symbol: "🐲",
        });
    }
    const commitsNumber = await getUserCommitsNumber(userInfos.login);
    if (commitsNumber) {
        profileInfos.push({
            name: "Commits made",
            value: commitsNumber,
            symbol: "🍃",
        });
    }
    return profileInfos;
};

const getProfileInfos = async (userInfos) => {
    const title = "🎏 - Quick overview of my profile";
    const infos = await getInfos(userInfos);
    const content = getProfileInfosContent(infos);
    const profileInfos = createMarkdownSection(title, content);
    return profileInfos;
};

export default getProfileInfos;
