const _ = require('lodash');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

const isAustria = (province) => province.provinceId === 10;
const isProvince = (province) => province.provinceId !== 10;

module.exports = function (caseTimeline) {
  return _.chain(caseTimeline)
    .map((record) => ({
      ...record,
      date: dayjs(record.Time, 'DD.MM.YYYY HH:mm:ss'),
    }))
    .map((record) => ({
      date: record.date,
      dateYYYYMMDD: record.date.format('YYYYMMDD'),
      province: record.Bundesland,
      provinceId: parseInt(record.BundeslandID, 10),
      inhabitants: parseInt(record.AnzEinwohner, 10),
      casesDaily: parseInt(record.AnzahlFaelle, 10),
      casesTotal: parseInt(record.AnzahlFaelleSum, 10),
      casesWeekly: parseInt(record.AnzahlFaelle7Tage, 10),
      sevenDayIncidence: parseFloat(
        record.SiebenTageInzidenzFaelle.replace(',', '.')
      ),
      deathsDaily: parseInt(record.AnzahlTotTaeglich, 10),
      deathsTotal: parseInt(record.AnzahlTotSum, 10),
      curedDaily: parseInt(record.AnzahlGeheiltTaeglich, 10),
      curedTotal: parseInt(record.AnzahlGeheiltSum, 10),
    }))
    .groupBy((record) => record.dateYYYYMMDD)
    .map(_.value)
    .map((record) => ({
      date: _.first(record).date,
      dateYYYYMMDD: _.first(record).dateYYYYMMDD,
      austria: _.find(record, isAustria),
      provinces: _.filter(record, isProvince),
    }))
    .value();
};
