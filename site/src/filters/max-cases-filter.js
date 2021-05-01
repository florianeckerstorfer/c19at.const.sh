module.exports = function (records) {
  return records.reduce((maxCases, record) => {
    return record.austria.casesDaily > maxCases
      ? record.austria.casesDaily
      : maxCases;
  }, 0);
};
