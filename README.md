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
Morning    : ###······················ 12%
Afternoon  : #######·················· 29%
Evening    : #########················ 36%
Night      : ######··················· 23%
```
📅 - Working days stats
```text
Monday     : ###······················ 13%
Tuesday    : ####····················· 16%
Wednesday  : ####····················· 17%
Thursday   : #####···················· 19%
Friday     : ###······················ 10%
Saturday   : ####····················· 14%
Sunday     : ###······················ 12%
```
📊 - Top languages
```text
Javascript  : ##······················· 8%
C++         : ##############··········· 57%
Assembly    : #························ 3%
C           : #####···················· 18%
Haskell     : ####····················· 14%
```
🎏 - Quick overview of my profile
```text
👥 - Followers: 11
👤 - Following: 15
📂 - Public repositories: 9
🔒 - Private repositories: 28
⭐ - Repositories starred: 30
🔃 - Pull requests: 202
🐲 - Repos contributed to: 71
🍃 - Commits made: 528
```
<!--END_SECTION:GITHUB_STATS-->
