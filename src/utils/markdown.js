const createMarkdownSection = (title, content) => {
    let markdownSection = "";
    markdownSection += `${title}\n\`\`\`text\n`;
    for (let i = 0; i < content.length; i++) {
        markdownSection += `${content[i]}\n`;
    }
    markdownSection += "\`\`\`";
    return markdownSection;
};

export default createMarkdownSection;
