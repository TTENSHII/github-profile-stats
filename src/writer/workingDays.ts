import { printBar } from "../utils/printBar";
import { DayOfWeek, Repository } from "../types/stats";
import { getDayInTimezone } from "../utils/timezoneHelper";

/**
 * Format and append working days statistics to the text buffer.
 * @param repositories List of repositories.
 * @param textBuffer Array of strings to append the working days stats to.
 */
const writeWorkingDaysStats = (repositories: Repository[], textBuffer: string[]) => {
    textBuffer.push(`📅 - Working days stats`);
    textBuffer.push("```text");
    const daysBucket: Record<DayOfWeek, number> = {
        Sunday: 0,
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
    };

    repositories.forEach(repo => {
        repo.commits.forEach(c => {
            if (c) {
                const day = getDayInTimezone(c.date) as DayOfWeek;
                daysBucket[day] += 1;
            }
        });
    });

    const totalDays = Object.values(daysBucket).reduce((a, b) => a + b, 0) || 1;
    Object.entries(daysBucket).forEach(([k, v]) => {
        textBuffer.push(`${k.padEnd(10)}: ${printBar(v, totalDays)} ${Math.round((v / totalDays) * 100)}%`);
    });

    textBuffer.push("```");
};

export { writeWorkingDaysStats };
