const _ = require('lodash');
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(customParseFormat);

module.exports = function (vaccinationTimeline) {
  return _.chain(vaccinationTimeline)
    .map((record) => ({
      ...record,
      date: dayjs(Object.values(record)[0].match(/\d{4}-\d{2}-\d{2}/)[0]),
    }))
    .map((record) => ({
      date: record.date,
      dateYYYYMMDD: record.date.format('YYYYMMDD'),
      province: record.Name,
      provinceId: parseInt(record.BundeslandID, 10),
      inhabitants: parseInt(record['Bevölkerung'], 10),
      registeredVaccinations: parseInt(record.EingetrageneImpfungen, 10),
      registeredVaccinationsPer100: parseFloat(
        record.EingetrageneImpfungenPro100
      ),
      partlyVaccinated: parseInt(record.Teilgeimpfte, 10),
      partlyVaccinatedPer100: parseFloat(record.TeilgeimpftePro100),
      fullyVaccinated: parseInt(record.Vollimmunisierte, 10),
      fullyVaccinatedPer100: parseFloat(record.VollimmunisiertePro100),
      groupLt25M1: parseInt(record['Gruppe_<25_M_1'], 10),
      groupLt25F1: parseInt(record['Gruppe_<25_W_1'], 10),
      groupLte25D1: parseInt(record['Gruppe_<25_D_1'], 10),
      group25To34M1: parseInt(record['Gruppe_25-34_M_1'], 10),
      group25To34F1: parseInt(record['Gruppe_25-34_W_1'], 10),
      group25To34D1: parseInt(record['Gruppe_25-34_D_1'], 10),
      group35To44M1: parseInt(record['Gruppe_35-44_M_1'], 10),
      group35To44F1: parseInt(record['Gruppe_35-44_W_1'], 10),
      group35To44D1: parseInt(record['Gruppe_35-44_D_1'], 10),
      group45To54M1: parseInt(record['Gruppe_45-54_M_1'], 10),
      group45To54F1: parseInt(record['Gruppe_45-54_W_1'], 10),
      group45To54D1: parseInt(record['Gruppe_45-54_D_1'], 10),
      group55To64M1: parseInt(record['Gruppe_55-64_M_1'], 10),
      group55To64F1: parseInt(record['Gruppe_55-64_W_1'], 10),
      group55To64D1: parseInt(record['Gruppe_55-64_D_1'], 10),
      group65To74M1: parseInt(record['Gruppe_65-74_M_1'], 10),
      group65To74F1: parseInt(record['Gruppe_65-74_W_1'], 10),
      group65To74D1: parseInt(record['Gruppe_65-74_D_1'], 10),
      group75To84M1: parseInt(record['Gruppe_75-84_M_1'], 10),
      group75To84F1: parseInt(record['Gruppe_75-84_W_1'], 10),
      group75To84D1: parseInt(record['Gruppe_75-84_D_1'], 10),
      groupGt84M1: parseInt(record['Gruppe_>84_M_1'], 10),
      groupGt84F1: parseInt(record['Gruppe_>84_W_1'], 10),
      groupGt84D1: parseInt(record['Gruppe_>84_D_1'], 10),
      groupLt25M2: parseInt(record['Gruppe_<25_M_2'], 10),
      groupLt25F2: parseInt(record['Gruppe_<25_W_2'], 10),
      groupLt25D2: parseInt(record['Gruppe_<25_D_2'], 10),
      group25To34M2: parseInt(record['Gruppe_25-34_M_2'], 10),
      group25To34F2: parseInt(record['Gruppe_25-34_W_2'], 10),
      group25To34D2: parseInt(record['Gruppe_25-34_D_2'], 10),
      group35To44M2: parseInt(record['Gruppe_35-44_M_2'], 10),
      group35To44F2: parseInt(record['Gruppe_35-44_W_2'], 10),
      group35To44D2: parseInt(record['Gruppe_35-44_D_2'], 10),
      group45To54M2: parseInt(record['Gruppe_45-54_M_2'], 10),
      group45To54F2: parseInt(record['Gruppe_45-54_W_2'], 10),
      group45To54D2: parseInt(record['Gruppe_45-54_D_2'], 10),
      group55To64M2: parseInt(record['Gruppe_55-64_M_2'], 10),
      group55To64F2: parseInt(record['Gruppe_55-64_W_2'], 10),
      group55To64D2: parseInt(record['Gruppe_55-64_D_2'], 10),
      group65To74M2: parseInt(record['Gruppe_65-74_M_2'], 10),
      group65To74F2: parseInt(record['Gruppe_65-74_W_2'], 10),
      group65To74D2: parseInt(record['Gruppe_65-74_D_2'], 10),
      group75To84M2: parseInt(record['Gruppe_75-84_M_2'], 10),
      group75To84F2: parseInt(record['Gruppe_75-84_W_2'], 10),
      group75To84D2: parseInt(record['Gruppe_75-84_D_2'], 10),
      groupGt84M2: parseInt(record['Gruppe_>84_M_2'], 10),
      groupGt84F2: parseInt(record['Gruppe_>84_W_2'], 10),
      groupGt84D2: parseInt(record['Gruppe_>84_D_2'], 10),
      groupNa: parseInt(record['Gruppe_NichtZuordenbar'], 10),
      registeredBioNTech1: parseInt(
        record.EingetrageneImpfungenBioNTechPfizer_1,
        10
      ),
      registeredModerna1: parseInt(record.EingetrageneImpfungenModerna_1, 10),
      registeredAstraZeneca1: parseInt(
        record.EingetrageneImpfungenAstraZeneca_1,
        10
      ),
      registeredBioNTech2: parseInt(
        record.EingetrageneImpfungenBioNTechPfizer_2,
        10
      ),
      registeredModerna2: parseInt(record.EingetrageneImpfungenModerna_2, 10),
      registeredAstraZeneca2: parseInt(
        record.EingetrageneImpfungenAstraZeneca_2,
        10
      ),
      registeredJanssen: parseInt(record.EingetrageneImpfungenJanssen, 10),
    }))
    .filter((record) => record.provinceId > 0)
    .groupBy((record) => record.dateYYYYMMDD)
    .flatMap((dailyRecord, index, dailyRecords) => {
      return dailyRecord.map((record) => {
        const prevDate = record.date.subtract(1, 'day').format('YYYYMMDD');
        const prevRecords = dailyRecords[prevDate] || [];
        const prevRecord =
          prevRecords.find((r) => r.provinceId === record.provinceId) || {};
        const prevVaccinations = prevRecord.registeredVaccinations || 0;
        const prevPartlyVaccinated = prevRecord.partlyVaccinated || 0;
        const prevfullyVaccinated = prevRecord.fullyVaccinated || 0;
        return {
          ...record,
          dailyRegisteredVaccinations:
            record.registeredVaccinations - prevVaccinations,
          dailyPartlyVaccinated: record.partlyVaccinated - prevPartlyVaccinated,
          dailyFullyVaccinated: record.fullyVaccinated - prevfullyVaccinated,
        };
      });
    })
    .groupBy((record) => record.dateYYYYMMDD)
    .value();
};
