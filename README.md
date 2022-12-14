<h1 align="center">GITHUB PROFILE STATS</h1>
<p align="center">Add your github stats to your profile without wakatime</p>

## โจ - Quick Start
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

## ๐ - Future features
- More statistics
- Customizable Ui

## ๐ - Example

<!--START_SECTION:GITHUB_STATS-->
๐ - Working hours stats
```text
Morning    : ####ยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยท 16%
Afternoon  : ##########ยทยทยทยทยทยทยทยทยทยทยทยทยทยทยท 40%
Evening    : #########ยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยท 36%
Night      : ##ยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยท 8%
```
๐ - Working days stats
```text
Monday     : ##ยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยท 8%
Tuesday    : ###ยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยท 10%
Wednesday  : ####ยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยท 15%
Thursday   : ####ยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยท 14%
Friday     : ####ยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยท 17%
Saturday   : ####ยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยท 14%
Sunday     : ######ยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยท 22%
```
๐ - Top languages
```text
Makefile    : #ยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยท 1%
Haskell     : ##ยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยท 7%
C++         : ####ยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยท 14%
Javascript  : #####ยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยทยท 20%
C           : ###############ยทยทยทยทยทยทยทยทยทยท 58%
```
๐ - Quick overview of my profile
```text
๐ฅ - Followers: 8
๐ค - Following: 10
๐ - Public repositories: 8
๐ - Private repositories: 17
โญ - Repositories starred: 13
๐ - Pull requests: 64
๐ฒ - Repos contributed to: 60
๐ - Commits made: 1423
```
<!--END_SECTION:GITHUB_STATS-->
