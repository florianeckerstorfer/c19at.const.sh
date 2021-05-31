const formatDateFilter = require('./site/src/filters/format-date-filter');
const formatJSONFilter = require('./site/src/filters/format-json-filter');
const formatNumberFilter = require('./site/src/filters/format-number-filter');
const roundFilter = require('./site/src/filters/round-filter');
const sortByIncidenceFilter = require('./site/src/filters/sort-by-incidence-filter');
const sortByCasesTotalFilter = require('./site/src/filters/sort-by-cases-total-filter');
const arraySliceFilter = require('./site/src/filters/array-slice-filter');
const maxIncidenceFilter = require('./site/src/filters/max-incidence-filter');
const maxCasesFilter = require('./site/src/filters/max-cases-filter');
const translateDateFilter = require('./site/src/filters/translate-date-filter');
const daysSinceFirstCaseFilter = require('./site/src/filters/days-since-first-case-filter');
const recordsUntilFilter = require('./site/src/filters/records-until-filter');
const recordsForProvinceFilter = require('./site/src/filters/records-for-province-filter');
const vaccinationRecordsForProvinceFilter = require('./site/src/filters/vaccination-records-for-province-filter');
const recordForDateFilter = require('./site/src/filters/record-for-date-filter');
const {
  firstCaseRecordFilter,
  lastCaseRecordFilter,
  firstDeathRecordFilter,
  lastDeathRecordFilter,
  maxCasesRecordFilter,
  maxSevenDayIncidenceRecordFilter,
  maxHospitalBedsRecordFilter,
  maxIcuBedsRecordFilter,
  maxTestsRecordFilter,
} = require('./site/src/filters/inflection-point-filters');

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
  eleventyConfig.addFilter('translateDate', translateDateFilter);
  eleventyConfig.addFilter('daysSinceFirstCase', daysSinceFirstCaseFilter);
  eleventyConfig.addFilter('recordsUntil', recordsUntilFilter);
  eleventyConfig.addFilter('recordsForProvince', recordsForProvinceFilter);
  eleventyConfig.addFilter(
    'vaccinationRecordsForProvince',
    vaccinationRecordsForProvinceFilter
  );
  eleventyConfig.addFilter('recordForDate', recordForDateFilter);
  eleventyConfig.addFilter('firstCaseRecord', firstCaseRecordFilter);
  eleventyConfig.addFilter('lastCaseRecord', lastCaseRecordFilter);
  eleventyConfig.addFilter('firstDeathRecord', firstDeathRecordFilter);
  eleventyConfig.addFilter('lastDeathRecord', lastDeathRecordFilter);
  eleventyConfig.addFilter('maxCasesRecord', maxCasesRecordFilter);
  eleventyConfig.addFilter(
    'maxSevenDayIncidenceRecord',
    maxSevenDayIncidenceRecordFilter
  );
  eleventyConfig.addFilter(
    'maxHospitalBedsRecord',
    maxHospitalBedsRecordFilter
  );
  eleventyConfig.addFilter('maxIcuBedsRecord', maxIcuBedsRecordFilter);
  eleventyConfig.addFilter('maxTestsRecord', maxTestsRecordFilter);

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
