const _ = require('lodash');
const { isAustria, isProvince } = require('../data-helper');

function getHospitalTestsForProvince(records, provinceId) {
  const record = records.find((r) => r.provinceId === provinceId);
  return record
    ? _.pick(record, [
        'testsTotal',
        'testsDaily',
        'hospitalBeds',
        'icuBeds',
        'freeHospitalBeds',
        'freeIcuBeds',
      ])
    : {};
}

module.exports = function (
  caseTimeline,
  vaccinationTimeline,
  hospitalTestTimeline
) {
  return caseTimeline.map((record) => {
    const vaccinations = vaccinationTimeline[record.dateYYYYMMDD];
    const hospitalTests = hospitalTestTimeline[record.dateYYYYMMDD] || [];
    return {
      ...record,
      austria: {
        ...record.austria,
        ...getHospitalTestsForProvince(
          hospitalTests,
          record.austria.provinceId
        ),
      },
      provinces: _.chain(record.provinces)
        .map((province) => ({
          ...province,
          ...getHospitalTestsForProvince(hospitalTests, province.provinceId),
        }))
        .value(),
      vaccinationsAustria: vaccinations?.find(isAustria),
      vaccinationsProvinces: _.chain(vaccinations || [])
        .filter(isProvince)
        .sortBy('provinceId')
        .value(),
    };
  });
};
