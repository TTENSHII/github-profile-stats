import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: process.env.INPUT_GH_TOKEN,
    log: {
        debug: () => {},
        info: () => {},
        warn: console.warn,
        error: console.error
    }
});

const getRepositoryCommits = async (login, repoOwner, repoName) => {
    try {
        const commits = await octokit.repos.listCommits({
            owner: repoOwner,
            repo: repoName,
            author: login,
            per_page: 100,
        });
        return commits.data;
    } catch (error) {
        if (process.env.INPUT_DEBUG) {
			console.log(error);
		}
        return null;
    }
};

const getUserCommits = async (login, repositories) => {
    let commits = [];
    if (repositories) {
        for (let i = 0; i < repositories.length; i++) {
            if (repositories[i] &&
                repositories[i].owner &&
                repositories[i].owner.login &&
                repositories[i].name) {
                const repoCommits = await getRepositoryCommits(
                    login, repositories[i].owner.login, repositories[i].name);
                if (repoCommits) {
                    commits = commits.concat(repoCommits);
                }
            }
        }
    }
    return commits;
};

export default getUserCommits;
