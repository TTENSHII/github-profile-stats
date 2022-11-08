const getMiddleBar = (percentage, barSettings) => {
    let middleBar = "";
    const full = barSettings.full;
    const empty = barSettings.empty;
    const length = barSettings.length;
    let fullLength = Math.round((percentage * length) / 100);
    let emptyLength = length - fullLength;
    if (fullLength === 0) {
        fullLength = 1;
        emptyLength -= 1;
    }
    middleBar += full.repeat(fullLength);
    middleBar += empty.repeat(emptyLength);
    return middleBar;
};

const getTitleSize = (object) => {
    let titleSize = 0; 
    for (let i = 0; i < object.length; i++) {
        const title = object[i].name;
        if (title.length > titleSize) {
            titleSize = title.length;
        }
    }
    return titleSize + 2;
};

const getCorrectTitle = (title, titleSize) => {
    const sizeDiff = titleSize - title.length;
    const spaces = " ".repeat(sizeDiff);
    let correctTitle = title.toLowerCase();
    correctTitle = correctTitle.charAt(0).toUpperCase() + correctTitle.slice(1);
    correctTitle += spaces;
    return correctTitle;
};

const getBars = (object, barSettings) => {
    let bars = [];

    const titleSize = getTitleSize(object);
    for (let i = 0; i < object.length; i++) {
        const title = getCorrectTitle(object[i].name, titleSize);
        const percentage = object[i].percent;
        const middleBar = getMiddleBar(percentage, barSettings);
        const barLine = `${title}: ${middleBar} ${percentage}%`;
        bars.push(barLine);
    }
    return bars;
};

export default getBars;
