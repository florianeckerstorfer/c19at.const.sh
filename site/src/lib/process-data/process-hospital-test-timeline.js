const _ = require('lodash');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

module.exports = function (hospitalTestTimeline) {
  return _.chain(hospitalTestTimeline)
    .map((record) => ({
      ...record,
      date: dayjs(
        Object.values(record)[0].match(/\d{2}\.\d{2}\.\d{4}/)[0],
        'DD.MM.YYYY'
      ),
    }))
    .map((record) => ({
      date: record.date,
      dateYYYYMMDD: record.date.format('YYYYMMDD'),
      province: record.Bundesland,
      provinceId: parseInt(record.BundeslandID, 10),
      testsTotal: parseInt(record.TestGesamt, 10),
      hospitalBeds: parseInt(record.FZHosp, 10),
      icuBeds: parseInt(record.FZICU, 10),
      freeHospitalBeds: parseInt(record.FZHospFree, 10),
      freeIcuBeds: parseInt(record.FZICUFree, 10),
    }))
    .filter((record) => record.provinceId > 0)
    .groupBy((record) => record.dateYYYYMMDD)
    .flatMap((dailyRecord, index, dailyRecords) => {
      return dailyRecord.map((record) => {
        const prevDate = record.date.subtract(1, 'day').format('YYYYMMDD');
        const prevRecords = dailyRecords[prevDate] || [];
        const prevRecord =
          prevRecords.find((r) => r.provinceId === record.provinceId) || {};
        const prevTests = prevRecord.testsTotal || 0;
        return {
          ...record,
          testsDaily: record.testsTotal - prevTests,
        };
      });
    })
    .groupBy((record) => record.dateYYYYMMDD)
    .value();
};
