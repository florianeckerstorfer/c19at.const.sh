module.exports = function (records, provinceId) {
  if (provinceId === 10) {
    return records.map((record) => record.vaccinationsAustria);
  }
  return records.map((record) =>
    record.vaccinationsProvinces.find(
      (province) => province.provinceId === provinceId
    )
  );
};
