import { execSync } from "child_process";
import { getInput } from '@actions/core';

/**
 * Check if a given file has any changes compared to the last commit.
 * Use status --porcelain to work with untracked files as well.
 * @param filePath Path to the file to check.
 * @returns True if the file has uncommitted changes, false otherwise.
 */
const isFileChanged = (filePath: string): boolean => {
    try {
        const status = execSync(`git status --porcelain ${filePath}`).toString().trim();
        return status.length > 0;
    } catch (error) {
        console.error('❌ An error occurred while checking file status:',
            error instanceof Error ? error.message : error);
        process.exit(1);
    }
};

/**
 * Commit and push a file to the repository.
 * @param filePath File to commit.
 * @param token GitHub token for authentication.
 * @param repo Repository in the format owner/repo.
 * @param commitMessage Commit message to use.
 */
const commitAndPush = (filePath: string, token: string, repo: string, commitMessage: string) => {
    try {
        execSync(`git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"`);
        execSync(`git config --global user.name "github-actions[bot]"`);
        execSync(`git remote set-url origin https://${token}@github.com/${repo}.git`);
        execSync(`git add "${filePath}"`);
        execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);
        execSync(`git push`);
        console.log(`✅ Successfully pushed changes to ${filePath}`);
    } catch (error: unknown) {
        console.error('❌ An error occurred while pushing the file:',
            error instanceof Error ? error.message : error);
        process.exit(1);
    }
};

/**
 * Function to push a file if it has changes.
 * @param filePath Path to the file.
 * @param commitMessage Commit message to use.
 */
const pushFile = (filePath: string, commitMessage: string) => {
    if (!isFileChanged(filePath)) {
        console.log(`✅ No changes detected in ${filePath}. Skipping push.`);
        return;
    }

    const token = getInput('gh-token', { required: true });
    if (!token) {
        console.error("❌ Error: GITHUB_TOKEN is not set in environment variables.");
        process.exit(1);
    }

    const repo = process.env.GITHUB_REPOSITORY;
    if (!repo) {
        console.error("❌ Error: GITHUB_REPOSITORY is not set in environment variables.");
        process.exit(1);
    }

    commitAndPush(filePath, token, repo, commitMessage);
};

export { pushFile };
