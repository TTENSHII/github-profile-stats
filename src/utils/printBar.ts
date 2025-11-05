import { getConfig } from "../config/config";

/**
 * Generate a progress bar string.
 * @param value Current value.
 * @param max Maximum value.
 * @param length Length of the progress bar.
 * @returns Progress bar string.
 */
const printBar = (value: number, max: number, length = 25): string => {
    const config = getConfig();

    const filled = max > 0 ? Math.min(length, Math.round((value / max) * length)) : 0;
    return config.barFillChar.repeat(filled) + config.barEmptyChar.repeat(length - filled);
}

export { printBar };
