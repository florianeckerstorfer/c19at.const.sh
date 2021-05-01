const formatDateFilter = require('./site/src/filters/format-date-filter');
const formatJSONFilter = require('./site/src/filters/format-json-filter');
const formatNumberFilter = require('./site/src/filters/format-number-filter');
const roundFilter = require('./site/src/filters/round-filter');
const sortByIncidenceFilter = require('./site/src/filters/sort-by-incidence-filter');
const sortByCasesTotalFilter = require('./site/src/filters/sort-by-cases-total-filter');
const arraySliceFilter = require('./site/src/filters/array-slice-filter');
const maxIncidenceFilter = require('./site/src/filters/max-incidence-filter');
const maxCasesFilter = require('./site/src/filters/max-cases-filter');

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('formatDate', formatDateFilter);
  eleventyConfig.addFilter('formatJSON', formatJSONFilter);
  eleventyConfig.addFilter('formatNumber', formatNumberFilter);
  eleventyConfig.addFilter('round', roundFilter);
  eleventyConfig.addFilter('sortByIncidence', sortByIncidenceFilter);
  eleventyConfig.addFilter('sortByCasesTotal', sortByCasesTotalFilter);
  eleventyConfig.addFilter('arraySlice', arraySliceFilter);
  eleventyConfig.addFilter('maxIncidence', maxIncidenceFilter);
  eleventyConfig.addFilter('maxCases', maxCasesFilter);

  eleventyConfig.addLayoutAlias('base', 'base.njk');

  eleventyConfig.addPassthroughCopy({ 'site/src/fonts': 'fonts' });
  eleventyConfig.addPassthroughCopy('site/images');

  eleventyConfig.addWatchTarget('./site/src/css');

  return {
    dir: {
      input: 'site',
      output: 'dist',
      includes: 'src/includes',
      layouts: 'src/layouts',
      data: 'src/data',
      markdownTemplateEngine: 'njk',
    },
  };
};
