import axios from "axios";

const doGraphQlRequests = async (graphQlQuery) => {
    try {
        const { data } = await axios({
            url: "https://api.github.com/graphql",
            method: "post",
            headers: {
              Authorization: `bearer ${process.env.INPUT_GH_TOKEN}`,
            },
            data: {
              query: graphQlQuery,
            },
        }); 
        if (data && data.data) {
            return data.data;
        } else {
            return null;
        }
    } catch (error) {
		if (process.env.INPUT_DEBUG) {
			console.log(error);
		}
        return null;
    }
};

const getUserRepositories = async (login) => {
    let repositories = [];
    const query =
    `query {
        user(login: "${login}") {
            repositoriesContributedTo(last: 100, includeUserRepositories: true) {
                nodes {
                    name
                    owner {
                        login
                    }
                    languages(first: 5) {
                        totalSize
                        edges {
                            size
                            node {
                                name
                            }
                        }
                    }
                }
            }
        }
    }`;
    const result = await doGraphQlRequests(query);
    if (result &&
        result.user &&
        result.user.repositoriesContributedTo) {
        repositories = result.user.repositoriesContributedTo.nodes;
    }
    return repositories;
};

export default getUserRepositories;
