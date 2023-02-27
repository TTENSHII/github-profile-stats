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
Morning    : ####····················· 17%
Afternoon  : #########················ 36%
Evening    : ########················· 33%
Night      : ####····················· 14%
```
📅 - Working days stats
```text
Monday     : ###······················ 12%
Tuesday    : ###······················ 13%
Wednesday  : ###······················ 13%
Thursday   : ####····················· 14%
Friday     : ####····················· 14%
Saturday   : ####····················· 16%
Sunday     : ####····················· 17%
```
📊 - Top languages
```text
Assembly    : #························ 3%
C++         : #######·················· 28%
C           : ############············· 46%
Haskell     : ##······················· 6%
Javascript  : ####····················· 16%
```
🎏 - Quick overview of my profile
```text
👥 - Followers: 9
👤 - Following: 12
📂 - Public repositories: 8
🔒 - Private repositories: 18
⭐ - Repositories starred: 13
🔃 - Pull requests: 128
🐲 - Repos contributed to: 75
🍃 - Commits made: 1991
```
<!--END_SECTION:GITHUB_STATS-->
