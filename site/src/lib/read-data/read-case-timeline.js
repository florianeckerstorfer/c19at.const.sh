const fetch = require('node-fetch');
const neatCsv = require('neat-csv');

const SOURCE_URL =
  'https://covid19-dashboard.ages.at/data/CovidFaelle_Timeline.csv';

module.exports = async function () {
  const response = await fetch(SOURCE_URL);
  const text = await response.text();
  return await neatCsv(text, { separator: ';' });
};
