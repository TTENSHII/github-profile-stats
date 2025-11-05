import { createOctokit } from './config/config';
import { fetchUserStats } from './queries/userStats';
import { fetchRepositories } from './queries/repositories';
import { fetchRepositoriesCommits } from './queries/commits';
import { fetchRepositoriesLanguages } from './queries/languages';
import { fetchRepositoriesIssuesAndPRs } from './queries/issuesAndPR';
import { fetchGistsCount } from './queries/gists';
import { markdownWriter } from './writer/markdownWriter';
import { computeFunFacts } from './utils/computeFunFacts';
import { logStatsSummary } from './utils/logStatsSummary';

const main = async () => {
    try {
        const octokit = createOctokit();

        let stats = await fetchUserStats(octokit);
        stats.totalGists = await fetchGistsCount(octokit);

        let Repositories = await fetchRepositories(octokit);
        await fetchRepositoriesIssuesAndPRs(octokit, Repositories, stats.login);
        await fetchRepositoriesLanguages(octokit, Repositories);
        await fetchRepositoriesCommits(octokit, Repositories, stats.login);

        const funFacts = computeFunFacts(Repositories, stats);

        logStatsSummary(stats, Repositories, funFacts);
        await markdownWriter(Repositories, stats, funFacts);

    } catch (error: unknown) {
        console.error('❌ An error occurred:', error instanceof Error ? error.message : error);
        process.exit(1);
    }
}

main();
