const readMorningReport = require('../lib/read-data/read-morning-report');
const processMorningReport = require('../lib/process-data/process-morning-report');

module.exports = async function () {
  const recentCases = await readMorningReport();
  const processed = processMorningReport(recentCases);
  return processed;
};
