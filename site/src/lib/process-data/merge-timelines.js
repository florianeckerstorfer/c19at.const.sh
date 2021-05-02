const { isAustria, isProvince } = require('../data-helper');

module.exports = function (caseTimeline, vaccinationTimeline) {
  return caseTimeline.map((record) => {
    const vaccinations = vaccinationTimeline[record.dateYYYYMMDD];
    return {
      ...record,
      vaccinationsAustria: vaccinations?.find(isAustria),
      vaccinationsProvinces: vaccinations?.filter(isProvince),
    };
  });
};
