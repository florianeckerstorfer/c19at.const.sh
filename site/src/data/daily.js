const readCaseTimeline = require('../lib/read-data/read-case-timeline');
const processCaseTimeline = require('../lib/process-data/process-case-timeline');

module.exports = async function () {
  const caseTimeline = await readCaseTimeline();
  return processCaseTimeline(caseTimeline);
};
