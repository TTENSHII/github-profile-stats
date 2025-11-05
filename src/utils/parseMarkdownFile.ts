import fs from "fs";
import { FileStatsSection } from "../types/stats";

const sectionStartComment = "<!-- STATS-SECTION:START -->";
const sectionEndComment = "<!-- STATS-SECTION:END -->";

const addMissingSectionToFile = (filePath: string) => {
    fs.appendFileSync(filePath, `\n${sectionStartComment}\n${sectionEndComment}\n`, 'utf-8');
};

const findSectionLines = (lines: string[]): { startLine: number, endLine: number } => {
    const startLine = lines.findIndex(line => line.includes(sectionStartComment));
    const endLine = lines.findIndex(line => line.includes(sectionEndComment));
    return { startLine, endLine };
};

/**
 * Parses a markdown file to extract the section marked for stats updates.
 * It identifies the start and end markers and splits the file into three parts:
 *   - the text before the stats section,
 *   - the stats section boundaries,
 *   - the text after the stats section.
 * 
 * @param filePath Path to the markdown file to parse.
 * @returns FileStatsSection object containing the split sections and line indices.
 * Exits the process if the start or end markers cannot be found or are in the wrong order.
 */
const parseMarkdownFile = (filePath: string): FileStatsSection => {
    let lines = fs.readFileSync(filePath, "utf-8").split(/\r?\n/);
    let { startLine, endLine } = findSectionLines(lines);

    if (startLine === -1 || endLine === -1 || endLine <= startLine) {
        addMissingSectionToFile(filePath);
        lines = fs.readFileSync(filePath, "utf-8").split(/\r?\n/);
        ({ startLine, endLine } = findSectionLines(lines));
    }

    if (startLine === -1 || endLine === -1 || endLine <= startLine) {
        console.error('❌ Could not find stats section markers in the markdown file.');
        process.exit(1);
    }

    const before = lines.slice(0, startLine + 1);
    const after = lines.slice(endLine);

    return {
        textBefore: before,
        beginStatsLine: startLine,
        endStatsLine: endLine,
        textAfter: after
    };
}

export { parseMarkdownFile };
