module.exports = function (records, provinceId) {
  if (provinceId === 10) {
    return records.map((record) => record.austria);
  }
  return records.map((record) =>
    record.provinces.find((province) => province.provinceId === provinceId)
  );
};
