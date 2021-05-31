const _ = require('lodash');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const { isAustria, isProvince } = require('../data-helper');

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);

module.exports = function (caseTimeline) {
  return _.chain(caseTimeline)
    .map((record) => ({
      ...record,
      date: dayjs(Object.values(record)[0]),
    }))
    .map((record) => ({
      date: record.date,
      dateYYYYMMDD: record.date.format('YYYYMMDD'),
      province: record.Name,
      provinceId: parseInt(record.BundeslandID, 10),
      casesTotal: parseInt(record.BestaetigteFaelleBundeslaender, 10),
      deathsTotal: parseInt(record.Todesfaelle, 10),
      curedTotal: parseInt(record.Genesen, 10),
      hospitalBeds: parseInt(record.Hospitalisierung, 10),
      icuBeds: parseInt(record.Intensivstation, 10),
      testsTotal: parseInt(record.Testungen, 10),
      pcrTestsTotal: parseInt(record.TestungenPCR, 10),
      antigenTestsTotal: parseInt(record.TestungenAntigen, 10),
    }))
    .groupBy((record) => record.dateYYYYMMDD)
    .flatMap((dailyRecord, index, dailyRecords) => {
      return dailyRecord.map((record) => {
        const prevWeekDate = record.date.subtract(7, 'days').format('YYYYMMDD');
        const prevWeekRecords = dailyRecords[prevWeekDate] || [];
        const prevWeekRecord =
          prevWeekRecords.find((r) => r.provinceId === record.provinceId) || {};
        const prevWeekCasesTotal = prevWeekRecord.casesTotal || 0;

        const prevDate = record.date.subtract(1, 'day').format('YYYYMMDD');
        const prevRecords = dailyRecords[prevDate] || [];
        const prevRecord =
          prevRecords.find((r) => r.provinceId === record.provinceId) || {};
        const prevCasesTotal = prevRecord.casesTotal || 0;
        const prevDeathsTotal = prevRecord.deathsTotal || 0;
        const prevCuredTotal = prevRecord.curedTotal || 0;
        const prevTestsTotal = prevRecord.testsTotal || 0;
        const prevPcrTestsTotal = prevRecord.pcrTestsTotal || 0;
        const prevAntigenTestsTotal = prevRecord.antigenTestsTotal || 0;

        return {
          ...record,
          sevenDayTotal: record.casesTotal - prevWeekCasesTotal,
          casesDaily: record.casesTotal - prevCasesTotal,
          deathsDaily: record.deathsTotal - prevDeathsTotal,
          curedDaily: record.curedTotal - prevCuredTotal,
          testsDaily: record.testsTotal - prevTestsTotal,
          pcrTestsDaily: record.pcrTestsTotal - prevPcrTestsTotal,
          antigenTestsDaily: record.antigenTestsTotal - prevAntigenTestsTotal,
        };
      });
    })
    .groupBy((record) => record.dateYYYYMMDD)
    .map(_.value)
    .map((record) => ({
      date: _.first(record).date,
      dateYYYYMMDD: _.first(record).dateYYYYMMDD,
      austria: _.find(record, isAustria),
      provinces: _.chain(record)
        .filter(isProvince)
        .sortBy('provinceId')
        .value(),
    }))
    .value();
};
