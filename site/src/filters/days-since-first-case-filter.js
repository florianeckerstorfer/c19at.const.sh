const dayjs = require('dayjs');

module.exports = function (records, currentDate = null) {
  currentDate = currentDate || dayjs();

  return records.reduce((daysSince, record) => {
    if (record.date.isAfter(currentDate)) {
      return daysSince;
    }
    const ifFirstDay = record.austria.casesDaily > 0 ? 1 : 0;
    return daysSince > 0 ? daysSince + 1 : ifFirstDay;
  }, 0);
};
