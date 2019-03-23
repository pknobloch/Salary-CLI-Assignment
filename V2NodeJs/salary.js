const moment = require('moment');

let currentOptions = {};

function isWeekend(date) {
  return date.isoWeekday() >= 6;
}

function adjustForWeekend(days, date) {
  if (days === 0 || !isWeekend(date)) {
    return date;
  }
  let result = moment(date);
  const direction = (days > 0) ? 1 : -1;
  while(isWeekend(result)) {
    result.add({days: direction});
  }
  //Result is now on the first day after the weekend, so remove one day
  return result.add({days: (Math.abs(days) - 1) * direction});
}

function endOfMonth(date) {
  return moment({year: date.year(), month: date.month(), day: 1})
  .add({month: 1})
  .subtract({day: 1});
}

function getPayDay(date) {
  return adjustForWeekend(currentOptions.paydayOffset, endOfMonth(date));
}

function getBonusDay(date) {
  const bonusDay = moment({year: date.year(), month: date.month(), day: currentOptions.bonus}).add({month: 1});
  return adjustForWeekend(currentOptions.bonusOffset, bonusDay);
}

function getSalaryDates(date, options) {
  currentOptions = options;
  const payDay = getPayDay(date);
  const bonusDay = getBonusDay(date);
  currentOptions = null;
  return {payDay, bonusDay};
}

module.exports = {getSalaryDates};
