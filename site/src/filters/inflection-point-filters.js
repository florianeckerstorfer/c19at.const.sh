function firstDeathRecordFilter(records) {
  for (const record of records) {
    if (record.austria.deathsDaily > 0) {
      return record;
    }
  }
}

function firstCaseRecordFilter(records) {
  for (const record of records) {
    if (record.austria.casesDaily > 0) {
      return record;
    }
  }
}

function lastDeathRecordFilter(records) {
  const reverseRecords = [...records].reverse();
  for (const record of reverseRecords) {
    if (record.austria.deathsDaily > 0) {
      return record;
    }
  }
}

function lastCaseRecordFilter(records) {
  const reverseRecords = [...records].reverse();
  for (const record of reverseRecords) {
    if (record.austria.casesDaily > 0) {
      return record;
    }
  }
}

function maxCasesRecordFilter(records) {
  return records.reduce(
    (maxRecord, record) =>
      record.austria.casesDaily > maxRecord.austria.casesDaily
        ? record
        : maxRecord,
    { austria: { casesDaily: 0 } }
  );
}

function maxSevenDayIncidenceRecordFilter(records) {
  return records.reduce(
    (maxRecord, record) =>
      record.austria.sevenDayIncidence > maxRecord.austria.sevenDayIncidence
        ? record
        : maxRecord,
    { austria: { sevenDayIncidence: 0 } }
  );
}

function maxHospitalBedsRecordFilter(records) {
  return records.reduce(
    (maxRecord, record) =>
      record.austria.hospitalBeds > maxRecord.austria.hospitalBeds
        ? record
        : maxRecord,
    { austria: { hospitalBeds: 0 } }
  );
}

function maxIcuBedsRecordFilter(records) {
  return records.reduce(
    (maxRecord, record) =>
      record.austria.icuBeds > maxRecord.austria.icuBeds ? record : maxRecord,
    { austria: { icuBeds: 0 } }
  );
}

function maxTestsRecordFilter(records) {
  return records.reduce(
    (maxRecord, record) =>
      record.austria.testsDaily > maxRecord.austria.testsDaily
        ? record
        : maxRecord,
    { austria: { testsDaily: 0 } }
  );
}

module.exports = {
  firstCaseRecordFilter,
  firstDeathRecordFilter,
  lastCaseRecordFilter,
  lastDeathRecordFilter,
  maxCasesRecordFilter,
  maxSevenDayIncidenceRecordFilter,
  maxHospitalBedsRecordFilter,
  maxIcuBedsRecordFilter,
  maxTestsRecordFilter,
};
