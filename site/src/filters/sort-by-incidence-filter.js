module.exports = function (records) {
  return records.sort((a, b) => a.sevenDayIncidence - b.sevenDayIncidence);
};
