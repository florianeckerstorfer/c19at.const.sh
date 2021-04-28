const formatDateFilter = require('./site/src/filters/format-date-filter');
const formatJSONFilter = require('./site/src/filters/format-json-filter');

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('formatDate', formatDateFilter);
  eleventyConfig.addFilter('formatJSON', formatJSONFilter);

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
