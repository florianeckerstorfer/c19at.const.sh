const buildCss = require('../src/lib/build-css');

module.exports = class {
  async data() {
    return await buildCss('styles.css');
  }

  async render({ css }) {
    return css;
  }
};
