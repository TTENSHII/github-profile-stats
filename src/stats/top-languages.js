import getBars from "../utils/bars.js";
import createMarkdownSection from "../utils/markdown.js";

const calcPercentages = (userLanguages) => {
    let totalPercent = 0;
    for (let i = 0; i < userLanguages.length; i++) {
        totalPercent += userLanguages[i].percent;
    }
    for (let i = 0; i < userLanguages.length; i++) {
        userLanguages[i].percent = Math.round((userLanguages[i].percent / totalPercent) * 100);
    }
    return userLanguages;
};

const getRepoLanguages = (languages, repoLanguages, totalSize) => {
    for (let j = 0; j < repoLanguages.length; j++) {
        const language = repoLanguages[j].node.name;
        const languageSize = repoLanguages[j].size;
        const percent = Math.round((languageSize / totalSize) * 100);
        if (percent > 15) {
            const languageIndex = languages.findIndex((e) => e.name === language);
            if (languageIndex === -1) {
                languages.push({ name: language, percent: percent });
            } else {
                languages[languageIndex].percent += percent;
            }
        }
    }
    return languages;
};

const getUserLanguages = (repositories) => {
    let languages = [];
    for (let i = 0; i < repositories.length; i++) {
        if (repositories[i] &&
            repositories[i].languages &&
            repositories[i].languages.edges) {
            const repoLanguages = repositories[i].languages.edges;
            let totalSize = repositories[i].languages.totalSize;
            languages = getRepoLanguages(languages, repoLanguages, totalSize);
        }
    }
    return languages;
};

const removeExcessLanguages = (userLanguages) => {
    const maxLanguages = process.env.INPUT_LANGUAGES_COUNT || 5;
    if (userLanguages.length > maxLanguages) {
        userLanguages.sort((a, b) => b.percent - a.percent);
        userLanguages = userLanguages.slice(0, maxLanguages);
        userLanguages.sort(() => Math.random() - 0.5);
    }
    return userLanguages;
};

const calcRealPercentages = (userLanguages) => {
    let totalPercent = 0;
    for (let i = 0; i < userLanguages.length; i++) {
        totalPercent += userLanguages[i].percent;
    }
    for (let i = 0; i < userLanguages.length; i++) {
        userLanguages[i].percent = Math.round((userLanguages[i].percent / totalPercent) * 100);
    }
    return userLanguages;
};

const getLanguagesPercentages = (repositories) => {
    let userLanguages = getUserLanguages(repositories);
    userLanguages = calcPercentages(userLanguages)
    userLanguages = removeExcessLanguages(userLanguages);
    userLanguages = calcRealPercentages(userLanguages);
    return userLanguages;
};


const getTopLanguages = (repositories) => {
    const title = "📊 - Top languages";
    const barSettings = { full: "#", empty: "·", length: 25 };
    const percentages = getLanguagesPercentages(repositories);
    const bars = getBars(percentages, barSettings);
    const topLanguages = createMarkdownSection(title, bars);
    return topLanguages;
};

export default getTopLanguages;
