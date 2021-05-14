module.exports = function (records, date, subtractCount, subtractUnit) {
  const newDate = subtractCount
    ? date.subtract(subtractCount, subtractUnit)
    : date;
  return records.find(
    (record) =>
      record.date.format('YYYY-MM-DD') === newDate.format('YYYY-MM-DD')
  );
};
