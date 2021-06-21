module.exports = function (date, format) {
  return date.tz('Europe/Vienna').format(format);
};
