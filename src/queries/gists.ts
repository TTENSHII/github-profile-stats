import { Octokit } from "@octokit/rest";

/**
 * Fetches the total number of gists for the authenticated user.
 * @param octokit Authenticated Octokit instance.
 * @returns Promise resolving to the number of gists.
 * Exits the process if an error occurs during the API request.
 */
const fetchGistsCount = async (octokit: Octokit): Promise<number> => {
    try {
        const gists = await octokit.paginate(octokit.rest.gists.list, {
            per_page: 100,
        });

        return gists.length;
    } catch (error) {
        console.error("❌ Error fetching gists:", error instanceof Error ? error.message : error);
        process.exit(1);
    }
};

export { fetchGistsCount };
