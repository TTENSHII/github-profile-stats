import fs from "fs";
import { FileStatsSection } from "../types/stats";

/**
 * Write stats content into a file, preserving surrounding text.
 * @param outputFile Path to the output file.
 * @param fileStatsSection Section containing text before and after the stats.
 * @param content Stats content to write.
 */
const writeStatsInFile = (outputFile: string, fileStatsSection: FileStatsSection, content: string) => {
    try {
        const textBefore = fileStatsSection.textBefore.join('\n');
        const textAfter = fileStatsSection.textAfter.join('\n');

        const finalOutput = `${textBefore}\n${content}\n${textAfter}`;
        
        fs.writeFileSync(outputFile, finalOutput, 'utf-8');
        console.log(`✅ Stats successfully written to ${outputFile}`);
    }
    catch (error: any) {
        console.error(`❌ Failed to write stats to ${outputFile}:`, error.message);
        process.exit(1);
    }
};

export { writeStatsInFile };
