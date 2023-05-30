<h1 align="center">GITHUB PROFILE STATS</h1>
<p align="center">Add your github stats to your profile without wakatime</p>

## ✨ - Quick Start
```
Add this comments into your README.md file
<!--START_SECTION:GITHUB_STATS--> and <!--END_SECTION:GITHUB_STATS-->
You can see more precisely in this README file
```
```
You need a github token with "repo" scope
You can generate it here -> https://github.com/settings/tokens
```
```
You need to add the GitHub Token in the repository secrets
You can find it in the repository settings
The format must be GH_TOKEN=<your github token here>
```
```
Create a github Workflow File into your repository
Here is a simple exemple:
```
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
      - uses: actions/checkout@v3
      - uses: TTENSHII/github-profile-stats@main
        with:
          GH_TOKEN: ${{ secrets.GH_TOKEN }}
          DEBUG: 'false'
          SHOW_HOURS: 'true'
          SHOW_DAYS: 'true'
          SHOW_LANGUAGES: 'true'
          LANGUAGES_COUNT: '5'
          SHOW_OVERWIEW: 'true'
          COMMIT_MESSAGE: 'Update profile stats'
```

## 🔖 - Future features
- More statistics
- Customizable Ui

## 📘 - Example

<!--START_SECTION:GITHUB_STATS-->
🌉 - Working hours stats
```text
Morning    : ####····················· 14%
Afternoon  : ########················· 30%
Evening    : #########················ 36%
Night      : #####···················· 21%
```
📅 - Working days stats
```text
Monday     : ###······················ 12%
Tuesday    : ####····················· 15%
Wednesday  : ####····················· 16%
Thursday   : #####···················· 18%
Friday     : ###······················ 10%
Saturday   : ####····················· 15%
Sunday     : ####····················· 14%
```
📊 - Top languages
```text
Javascript  : ####····················· 16%
Assembly    : #························ 3%
C           : ######··················· 22%
C++         : ###########·············· 45%
Haskell     : ###······················ 13%
```
🎏 - Quick overview of my profile
```text
👥 - Followers: 11
👤 - Following: 15
📂 - Public repositories: 9
🔒 - Private repositories: 25
⭐ - Repositories starred: 27
🔃 - Pull requests: 177
🐲 - Repos contributed to: 78
🍃 - Commits made: 371
```
<!--END_SECTION:GITHUB_STATS-->
