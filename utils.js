/**
 * Format a date in US date format with a user-friendly string with 12-hour time format.
 * @param {Date} dateToFormat - The date to format.
 * @returns {string} - The formatted date string.
 */
const formatDate = function formatDate(dateToFormat) {
    return dateToFormat.toLocaleString('en-US', {
        hour12: true,
    });
}


/**
* Format the duration in minutes to a user-friendly string.
* @param {number} durationInMinutes - The duration of the event in minutes.
* @returns {string} - The formatted duration string.
*/
const formatDuration = function formatDuration(durationInMinutes) {
    if (durationInMinutes < 60) {
        return `${durationInMinutes} minute(s)`;
    } else {
        let hours = Math.floor(durationInMinutes / 60);
        let remainingMinutes = durationInMinutes % 60;

        if (remainingMinutes == 0) {
            return `${hours} hour(s)`;
        } else {
            return `${hours} hour(s) ${remainingMinutes} minute(s)`;
        }
    }
}

/**
 * utils module containing all utility functions
 * @module utils
 */
module.exports = {formatDate, formatDuration};