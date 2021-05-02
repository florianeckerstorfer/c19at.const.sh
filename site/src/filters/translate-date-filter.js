function replaceAll(str, mapObj) {
  const re = new RegExp(Object.keys(mapObj).join('|'), 'g');

  return str.replace(re, (matched) => mapObj[matched]);
}

module.exports = function (date) {
  return replaceAll(date, {
    Monday: 'Montag',
    Tuesday: 'Dienstag',
    Wednesday: 'Mittwoch',
    Thursday: 'Donnerstag',
    Friday: 'Freitag',
    Saturday: 'Samstag',
    Sunday: 'Sonntag',
    January: 'Jänner',
    February: 'Februar',
    March: 'März',
    May: 'Mai',
    June: 'Juni',
    July: 'Juli',
    October: 'Oktober',
    December: 'Dezember',
    Jan: 'Jän',
    Oct: 'Okt',
    Dec: 'Dez',
  });
};
