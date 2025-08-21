

const calculateGrowthPercentage = (previousMontheIncome, currentMontheIncome) => {
    if (!previousMontheIncome[0]?.total && !currentMontheIncome[0]?.total) {
        return 0;
    } else if (!currentMontheIncome[0]?.total) {
        return 100;
    } else {
        return ((100 - ((previousMontheIncome[0]?.total || 0) / (currentMontheIncome[0]?.total || 0)) * 100).toFixed(2))
    }
}
module.exports = calculateGrowthPercentage
