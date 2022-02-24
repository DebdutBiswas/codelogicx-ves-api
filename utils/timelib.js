const getTimeStamp = (isTime) => {
    const currentDateTime = new Date();
    const dateString = currentDateTime.toISOString().slice(0,10);
    const timeString = currentDateTime.toISOString().slice(11,19);

    if (isTime === undefined) return `${dateString} ${timeString}`;

    if (!isTime) return dateString;

    if (isTime) return timeString;
};

const getISOTimeStamp = () => {
    const currentDateTime = new Date();
    return currentDateTime.toISOString();
};

const getDateDiff = (prevDateStr, nextDateStr, isNegate = false) => {
    const prevDate = new Date(prevDateStr).getTime();
    const nextDate = new Date(nextDateStr).getTime();
    
    const microSecondsDiff = isNegate ? (prevDate - nextDate) : Math.abs(prevDate - nextDate);
    
    // milliseconds per day = 24 hrs * 60 minutes * 60 seconds * 1000 milliseconds
    return Math.round(microSecondsDiff / (1000 * 60 * 60  * 24));
};

const daysDueCheck = (dueDateStr) => {
    const dueDate = new Date(dueDateStr);
    return (getDateDiff(dueDate, getISOTimeStamp(), true) < 0) ? true : false;
};

module.exports = {
    getTimeStamp,
    getISOTimeStamp,
    getDateDiff,
    daysDueCheck
};