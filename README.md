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
Morning    : ###······················ 13%
Afternoon  : ##########··············· 41%
Evening    : #########················ 35%
Night      : ###······················ 10%
```
📅 - Working days stats
```text
Monday     : ###······················ 11%
Tuesday    : ###······················ 11%
Wednesday  : ####····················· 14%
Thursday   : ###······················ 12%
Friday     : ####····················· 14%
Saturday   : ###······················ 12%
Sunday     : #######·················· 26%
```
📊 - Top languages
```text
C           : ##################······· 72%
Makefile    : #························ 1%
Javascript  : #####···················· 19%
C++         : ##······················· 8%
Typescript  : #························ 0%
```
🎏 - Quick overview of my profile
```text
👥 - Followers: 8
👤 - Following: 10
📂 - Public repositories: 6
🔒 - Private repositories: 14
⭐ - Repositories starred: 10
🔃 - Pull requests: 59
🐲 - Repos contributed to: 64
🍃 - Commits made: 1367
```
<!--END_SECTION:GITHUB_STATS-->
