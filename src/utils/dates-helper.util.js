/**
 * Convert a date (getTime value) to local time zone received a timeZone origin
 * @param {number} date get time value received from client
 * @param {number} timeZone time zone value received from client
 * @param {any} toUTC to apply addiction localtime + localOffset
 * @returns {Date}  converted date received from client
 */
export const convertLocalDateToUTCDate = (date, timeZone, toUTC = null) => {
    date = new Date(date);
    //Local time converted to UTC
    const localOffset = timeZone * 60000;
    const localTime = date.getTime();
    if (toUTC) {
        date = localTime + localOffset;
    } else {
        date = localTime - localOffset;
    }
    date = new Date(date);
    return date;
};
