const buildCss = require('../lib/build-css');

module.exports = async function () {
  const stylesCss = await buildCss('styles.css');
  const printCss = await buildCss('print.css');
  return { stylesCss: stylesCss.href, printCss: printCss.href };
};
