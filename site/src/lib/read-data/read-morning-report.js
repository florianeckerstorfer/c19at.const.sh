const fetch = require('node-fetch');
const neatCsv = require('neat-csv');

const SOURCE_URL =
  'https://info.gesundheitsministerium.gv.at/data/timeline-faelle-bundeslaender.csv';

module.exports = async function () {
  const response = await fetch(SOURCE_URL);
  const text = await response.text();
  return await neatCsv(text, { separator: ';' });
};
