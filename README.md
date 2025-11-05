<h1 align="center">GITHUB PROFILE STATS</h1>
<p align="center">Automatically display your GitHub activity stats on your profile.</p>

## ✨ - Introduction

Originally, this project began as a small JavaScript project three years ago.
It has now been fully rewritten in TypeScript, with improved performance, better configurability and additional features.

This action fetches and computes statistics from your GitHub activity (commits, pull requests, languages, and more), then dynamically updates a section of your GitHub profile.

## ⚙️ - Quick Setup

### 1. Generate a GitHub Token
You need a **classic GitHub token** (not fine-grained) with the following permissions:
- `repo`
- `gist`

Generate it here: [GitHub Tokens](https://GitHub.com/settings/tokens)

---

### 2. Add the Token to Your Repository
1. Go to the GitHub repository where you want to display the stats (usually your profile repository)
2. Go to **Settings → Secrets and variables → Actions → New repository secret**
3. Name the secret to match the `gh-token` input in your workflow (e.g., `GH_TOKEN`)
4. Paste your GitHub token and save

---

### 3. Create the Workflow
1. Ensure the folder `.github/workflows/` exists in your repository
2. Create a new workflow file, for example: `update-stats.yml`
3. Place the file inside `.github/workflows/`
4. Copy the following example into your workflow file

```yml
name: 'Update profile stats'

on:
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * *'

permissions:
  contents: write

jobs:
  update-stats:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: TTENSHII/github-profile-stats@main
        with:
          gh-token: ${{ secrets.GH_TOKEN }}
          timezone: "Europe/Paris"
          output-file: "README.md"
          max-languages-to-show: 6
          min-language-percentage: 20
```

You can check the `inputs` section to see all the available options.
By default, the stats are appended to the bottom but if you want to place the stats in a specific location of your markdown file, you need to add the following section:
```
<!--START_SECTION:GITHUB_STATS-->
<!--END_SECTION:GITHUB_STATS-->
```

(You can read this README file to see an example)

## 📊 - How Language Percentages Are Calculated

To keep the statistics fair and representative across all your repositories, the language percentages are calculated as follows:

- Each repository’s languages are analyzed individually.
- Languages below the defined minimum threshold (min-language-percentage) are excluded to remove configuration files or auto-generated code.
- The remaining language data from all repositories is then aggregated.
- Percentages are normalized so that the total equals 100%.

Why?
This approach ensures that small repositories (personal projects, experiments, etc.) are not overshadowed by a single large open-source contribution.
Using total lines of code alone would distort the results. For example, contributing a few commits to a million-line repository could completely outweigh your smaller projects.

Due to GitHub API limitations (especially rate limits on free tokens), it’s not feasible to compute language usage per commit.
This model provides the best balance between accuracy, fairness, and performance, keeping your statistics both meaningful and reliable.

## 🧩 - Logging and Error Handling

Detailed logs are available in the GitHub Actions console output.
They display all fetched data and allow you to debug more effectively.

If any fatal error occurs, the process exits with code 1 rather than updating incomplete or corrupted data.
The philosophy behind this is simple: it is preferable to fail cleanly than to publish inaccurate statistics.

## 🔧 - Inputs

| Name                      | Description                                              | Required | Default                |
| ------------------------- | -------------------------------------------------------- | -------- | ---------------------- |
| `gh-token`                | GitHub token with repo and gist permissions              | ✅       | —                      |
| `output-file`             | Markdown file to update                                  | ❌       | `README.md`            |
| `timezone`                | Timezone                                                 | ❌       | `Europe/Dublin`        |
| `bar-fill-char`           | Character for filled progress bars                       | ❌       | `#`                    |
| `bar-empty-char`          | Character for empty progress bars                        | ❌       | `.`                    |
| `min-language-percentage` | Minimum percentage per repo before exclusion (0–40)      | ❌       | `15`                   |
| `max-languages-to-show`   | Maximum number of languages to display                   | ❌       | `5`                    |
| `commit-message`          | Commit message when updating stats                       | ❌       | `Update profile stats` |
| `language-sort-mode`      | Sort mode for languages (`percentage` or `alphabetical`) | ❌       | `alphabetical`         |
| `include-overview`        | Include overview section                                 | ❌       | `true`                 |
| `include-fun-facts`       | Include fun facts section                                | ❌       | `true`                 |
| `include-languages`       | Include language section                                 | ❌       | `true`                 |
| `include-working-hours`   | Include working hours stats                              | ❌       | `true`                 |
| `include-working-days`    | Include working days stats                               | ❌       | `true`                 |

## 📘 - Example

<!-- STATS-SECTION:START -->

<!-- STATS-SECTION:END -->
