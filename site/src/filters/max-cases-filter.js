module.exports = function (records) {
  return records.reduce((maxCases, record) => {
    return record.casesDaily > maxCases ? record.casesDaily : maxCases;
  }, 0);
};
