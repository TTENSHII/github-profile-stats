import { getConfig } from "../config/config";

const getDayInTimezone = (date: Date): string => {
    const timezone = getConfig().timezone;
    return date.toLocaleString("en-US", { weekday: "long", timeZone: timezone });
};

const getHourInTimezone = (date: Date): number => {
    const timezone = getConfig().timezone;

    return Number(
        date.toLocaleString("en-US", { hour: "2-digit", hour12: false, timeZone: timezone })
    );
};

const areDaysConsecutive = (d1: Date, d2: Date): boolean => {
    const timeZone = getConfig().timezone;

    const d1Parts = new Date(d1.toLocaleString("en-US", { timeZone })).toISOString().split("T")[0];
    const d2Parts = new Date(d2.toLocaleString("en-US", { timeZone })).toISOString().split("T")[0];

    if (typeof d1Parts !== 'string' || typeof d2Parts !== 'string') {
        return false;
    }

    const day1 = new Date(d1Parts);
    const day2 = new Date(d2Parts);

    const oneDayMs = 1000 * 60 * 60 * 24;
    return day2.getTime() - day1.getTime() === oneDayMs;
};

const dateToStringInTimezone = (date: Date): string => {
    const timezone = getConfig().timezone;
    return date.toLocaleDateString("en-US", { timeZone: timezone });
};

export { getDayInTimezone, getHourInTimezone, areDaysConsecutive, dateToStringInTimezone };
