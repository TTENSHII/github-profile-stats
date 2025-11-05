import { printBar } from "../utils/printBar";
import { HourBucket, Repository } from "../types/stats";
import { getHourInTimezone } from "../utils/timezoneHelper";

/**
 * Format and append working hours statistics to the text buffer.
 * @param repositories List of repositories.
 * @param textBuffer Array of strings to append the working hours stats to.
 */
const writeWorkingHoursStats = (repositories: Repository[], textBuffer: string[]) => {
    textBuffer.push(`🌉 - Working hours stats`);
    textBuffer.push("```text");

    const hoursBucket: Record<HourBucket, number> = {
        "Morning": 0,
        "Afternoon": 0,
        "Evening": 0,
        "Night": 0,
    };

    repositories.forEach(repo => {
        repo.commits.forEach(c => {
            if (c) {
                const hour = getHourInTimezone(c.date);
            if (hour >= 6 && hour < 12) {
                hoursBucket["Morning"] += 1;
            } else if (hour >= 12 && hour < 18) {
                hoursBucket["Afternoon"] += 1;
            } else if (hour >= 18 && hour < 24) {
                hoursBucket["Evening"] += 1;
            } else {
                hoursBucket["Night"] += 1;
            }
            }
        });
    });

    const totalHours = Object.values(hoursBucket).reduce((a, b) => a + b, 0) || 1;
    Object.entries(hoursBucket).forEach(([k, v]) => {
        textBuffer.push(`${k.padEnd(10)}: ${printBar(v, totalHours)} ${Math.round((v / totalHours) * 100)}%`);
    });

    textBuffer.push("```");
};

export { writeWorkingHoursStats };
