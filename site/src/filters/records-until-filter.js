module.exports = function (records, untilDate) {
  return records.filter((record) => !record.date.isAfter(untilDate));
};
