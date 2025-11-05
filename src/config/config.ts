import { Octokit } from '@octokit/rest';
import { getInput } from '@actions/core';
import { StatsOptions } from '../types/stats';

let cachedConfig: StatsOptions | null = null;

/**
 * Retrieves and caches the configuration options from action inputs.
 * @returns The configuration options.
 * Caches the configuration after the first retrieval.
 */
const getConfig = (): StatsOptions => {
    if (cachedConfig) {
        return cachedConfig;
    }

    const rawMinLang = parseInt(getInput('min-language-percentage'), 10);
    const minLanguagePercentage = isNaN(rawMinLang) || rawMinLang < 0 || rawMinLang > 40 ? 15 : rawMinLang;

    const rawLanguagesToShow = parseInt(getInput('max-languages-to-show'), 10);
    const maxLanguagesToShow = isNaN(rawLanguagesToShow) || rawLanguagesToShow < 1 ? 5 : rawLanguagesToShow;

    cachedConfig = {
        outputFile: getInput('output-file'),
        timezone: getInput('timezone'),
        barFillChar: getInput('bar-fill-char'),
        barEmptyChar: getInput('bar-empty-char'),
        minLanguagePercentage: minLanguagePercentage,
        maxLanguagesToShow: maxLanguagesToShow,
        commitMessage: getInput('commit-message'),
        languageSortMode: (getInput('language-sort-mode') === 'percentage' ? 'percentage' : 'alphabetical'),
        includeOverview: getInput('include-overview') !== 'false',
        includeFunFacts: getInput('include-fun-facts') !== 'false',
        includeLanguages: getInput('include-languages') !== 'false',
        includeWorkingHours: getInput('include-working-hours') !== 'false',
        includeWorkingDays: getInput('include-working-days') !== 'false',
    };

    console.log('✅ Configuration loaded:', cachedConfig);

    return cachedConfig;
};

/**
 * Creates and returns an authenticated Octokit instance.
 * @returns Authenticated Octokit instance.
 * Exits the process if the gh-token is not found in action inputs.
 */
const createOctokit = (): Octokit => {
    const token = getInput('gh-token', { required: true });
    if (!token) {
        console.error("❌ Error retrieving gh-token from action inputs.");
        process.exit(1);
    }

    return new Octokit({ auth: token });
};

export { getConfig, createOctokit };
