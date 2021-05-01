module.exports = function (records) {
  return records.sort(
    (a, b) => a.casesTotalPerInhabitants - b.casesTotalPerInhabitants
  );
};
