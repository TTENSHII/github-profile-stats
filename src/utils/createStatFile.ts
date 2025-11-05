import fs from 'fs';

const STATS_SECTION_START = "<!-- STATS-SECTION:START -->";
const STATS_SECTION_END = "<!-- STATS-SECTION:END -->";

/**
 * Creates a stats file with initial section comments if it does not already exist.
 * @param outputFile The name of the stats file to create.
 */
const createStatFileIfNotExists = (outputFile: string) => {
    try {
        if (!fs.existsSync(outputFile)) {
            const initialContent = `${STATS_SECTION_START}\n${STATS_SECTION_END}\n`;
            fs.writeFileSync(outputFile, initialContent, 'utf-8');
            console.log(`✅ Created stats file: ${outputFile}`);
        }
    } catch (error: any) {
        console.error('❌ An error occurred while creating the stats file:', error.message);
        process.exit(1);
    }
};

export { createStatFileIfNotExists };
