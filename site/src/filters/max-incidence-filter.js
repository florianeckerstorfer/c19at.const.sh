module.exports = function (records) {
  return records.reduce((maxIncidence, record) => {
    return record.sevenDayIncidence > maxIncidence
      ? record.sevenDayIncidence
      : maxIncidence;
  }, 0);
};
