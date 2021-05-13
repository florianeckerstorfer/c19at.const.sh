const _ = require('lodash');
const { isAustria, isProvince } = require('../data-helper');

module.exports = function (caseTimeline, vaccinationTimeline) {
  return caseTimeline.map((record) => {
    const vaccinations = vaccinationTimeline[record.dateYYYYMMDD];
    return {
      ...record,
      vaccinationsAustria: vaccinations?.find(isAustria),
      vaccinationsProvinces: _.chain(vaccinations || [])
        .filter(isProvince)
        .sortBy((record) => record.provinceId)
        .value(),
    };
  });
};
