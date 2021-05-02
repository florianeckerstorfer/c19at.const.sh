const isAustria = (province) => province.provinceId === 10;
const isProvince = (province) => province.provinceId !== 10;

module.exports = { isAustria, isProvince };
