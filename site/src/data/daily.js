const readCaseTimeline = require('../lib/read-data/read-case-timeline');
const processCaseTimeline = require('../lib/process-data/process-case-timeline');
const readVaccinationTimeline = require('../lib/read-data/read-vaccination-timeline');
const processVaccinationTimeline = require('../lib/process-data/process-vaccination-timeline');
const mergeTimelines = require('../lib/process-data/merge-timelines');
const readHospitalTestTimeline = require('../lib/read-data/read-hospital-test-timeline');
const processHospitalTestTimeline = require('../lib/process-data/process-hospital-test-timeline');

module.exports = async function () {
  const caseTimeline = await readCaseTimeline();
  const vaccinationTimeline = processVaccinationTimeline(
    await readVaccinationTimeline()
  );
  const hospitalTestTimeline = processHospitalTestTimeline(
    await readHospitalTestTimeline()
  );
  return mergeTimelines(
    processCaseTimeline(caseTimeline),
    vaccinationTimeline,
    hospitalTestTimeline
  );
};
