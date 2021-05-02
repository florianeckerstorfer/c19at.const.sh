const readCaseTimeline = require('../lib/read-data/read-case-timeline');
const processCaseTimeline = require('../lib/process-data/process-case-timeline');
const readVaccinationTimeline = require('../lib/read-data/read-vaccination-timeline');
const processVaccinationTimeline = require('../lib/process-data/process-vaccination-timeline');
const mergeTimelines = require('../lib/process-data/merge-timelines');

module.exports = async function () {
  const caseTimeline = await readCaseTimeline();
  const vaccinationTimeline = processVaccinationTimeline(
    await readVaccinationTimeline()
  );
  return mergeTimelines(processCaseTimeline(caseTimeline), vaccinationTimeline);
};
