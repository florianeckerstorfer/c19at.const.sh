const readRecentCases = require('../lib/read-data/read-recent-cases');
const processRecentCases = require('../lib/process-data/process-recent-cases');

module.exports = async function () {
  const recentCases = await readRecentCases();
  const processed = processRecentCases(recentCases);
  return processed;
};
