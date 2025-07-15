const getDate = (daysToAdd = 0) => {
    const today = new Date();
    today.setDate(today.getDate() + daysToAdd);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
module.exports = getDate