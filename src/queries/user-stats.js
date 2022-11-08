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

const getUserInfos = async () => {
    try {
        const { data } = await octokit.rest.users.getAuthenticated();
        return data;
    } catch (error) {
        if (process.env.INPUT_DEBUG) {
			console.log(error);
		}
        return null;
    }
};

const getUserPrsNumber = async (login) => {
    try {
        const { data } = await octokit.rest.search.issuesAndPullRequests({
            q: `type:pr author:"${login}"`,
        });
        return data.total_count;
    } catch (error) {
        if (process.env.INPUT_DEBUG) {
			console.log(error);
		}
        return 0;
    }
};

const getUserIssuesNumber = async (login) => {
    try {
        const { data } = await octokit.rest.search.issuesAndPullRequests({
            q: `type:issue author:"${login}"`,
        });
        return data.total_count;
    } catch (error) {
        if (process.env.INPUT_DEBUG) {
			console.log(error);
		}
        return 0;
    }
}

const getUserCommitsNumber = async (login) => {
    try {
        const { data } = await octokit.search.commits({
            q: `author:"${login}"`,
        });
        return data.total_count;
    } catch (error) {
        if (process.env.INPUT_DEBUG) {
            console.log(error);
        }
        return 0;
    }
};

const getUserStarsNumber = async () => {
    try {
        const { data } = await octokit.rest.activity.listReposStarredByAuthenticatedUser();
        return data.length;
    } catch (error) {
        if (process.env.INPUT_DEBUG) {
            console.log(error);
        }
        return 0;
    }
};

const getUserPrivateReposNumber = async () => {
    try {
        const { data } = await octokit.rest.repos.listForAuthenticatedUser({
            visibility: "private",
            affiliation: "owner"
        });
        return data.length;
    } catch (error) {
        if (process.env.INPUT_DEBUG) {
			console.log(error);
		}
        return 0;
    }
};

export {
    getUserInfos,
    getUserPrsNumber,
    getUserIssuesNumber,
    getUserCommitsNumber,
    getUserStarsNumber,
    getUserPrivateReposNumber
};
