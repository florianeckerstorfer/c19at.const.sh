module.exports = function (records) {
  return records.reduce((maxIncidence, record) => {
    return record.austria.sevenDayIncidence > maxIncidence
      ? record.austria.sevenDayIncidence
      : maxIncidence;
  }, 0);
};
