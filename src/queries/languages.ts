import { Octokit } from '@octokit/rest';
import { getConfig } from '../config/config';
import { Repository, Language } from '../types/stats';

/**
 * Fetch raw language data from GitHub for a single repository.
 * @param octokit Authenticated Octokit instance.
 * @param repo Repository to fetch languages for.
 * @returns Raw language data from GitHub.
 * Exits the process if an error occurs.
 */
const fetchRepositoryLanguages = async (octokit: Octokit, repo: Repository):
    Promise<Record<string, number>> => {
    try {
        const { data } = await octokit.rest.repos.listLanguages({
            owner: repo.owner,
            repo: repo.name,
        });
        return data;
    } catch (error) {
        console.error(`❌ Failed to fetch languages for repository "${repo.name}":`,
            error instanceof Error ? error.message : error);
        process.exit(1);
    }
};

/**
 * Filter out languages that are less than 10% of the total bytes.
 * @param languagesData Raw language data.
 * @returns Filtered language data containing only languages >=10% of total bytes.
 */
const filterLanguagesData = (languagesData: Record<string, number>): Record<string, number> => {
    const entries = Object.entries(languagesData);
    const totalBytes = entries.reduce((acc, [, bytes]) => acc + bytes, 0);
    if (totalBytes === 0) {
        return {};
    }

    const languages = entries.filter(([, bytes]) =>
        (bytes / totalBytes) * 100 >= getConfig().minLanguagePercentage)

    return Object.fromEntries(languages);
};

/**
 * Compute percentage for each language.
 * @param languagesData Filtered language data.
 * @returns Array of languages with their percentage of the repository.
 */
const computeLanguagePercentages = (languagesData: Record<string, number>): Language[] => {
    const entries = Object.entries(languagesData);
    const totalBytes = entries.reduce((acc, [, bytes]) => acc + bytes, 0);
    if (totalBytes === 0) {
        return [];
    }

    return entries.map(([language, bytes]) => ({
        name: language,
        percentage: (bytes / totalBytes) * 100,
    }));
};

/**
 * Fetch and compute languages for all the user's repositories.
 * @param octokit Authenticated Octokit instance.
 * @param repositories Array of repositories to fetch languages for.
 * Exits the process if fetching languages for any repository fails.
 */
const fetchRepositoriesLanguages = async (octokit: Octokit, repositories: Repository[]): Promise<void> => {
    await Promise.all(
        repositories.map(async (repo) => {
            const rawData = await fetchRepositoryLanguages(octokit, repo);
            const filteredData = filterLanguagesData(rawData);
            repo.languages = computeLanguagePercentages(filteredData);
        })
    );
};

export { fetchRepositoriesLanguages };
