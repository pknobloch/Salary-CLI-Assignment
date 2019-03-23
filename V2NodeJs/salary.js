let currentOptions = {};

function isWeekend(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

function adjustBeforeWeekend(days, date) {
  if (days === 0 || !isWeekend(date)) {
    return date;
  }
  // Because Sunday is 0 and Saturday is 6, change Saturday = 0 and Sunday = 1
  const dayOfWeek = (date.getDay() + 1) % 7;
  const direction = (days > 0) ? 1 : 0;
  const result = new Date(date);
  result.setDate(date.getDate() + (direction - dayOfWeek + days));
  return result;
}

function nextMonth(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month === 12) {
    year++;
    month = 0;
  }
  return {year, month};
}

function endOfMonth(date) {
  const {year, month} = nextMonth(date);
  const result = new Date(year, month, 1);
  result.setDate(result.getDate() - 1);
  return result;
}

function getPayDay(date) {
  return adjustBeforeWeekend(currentOptions.paydayOffset, endOfMonth(date));
}

function getBonusDay(date) {
  const {year, month} = nextMonth(date);
  return adjustBeforeWeekend(currentOptions.bonusOffset, new Date(year, month, currentOptions.bonus));
}

function getSalaryDates(date, options) {
  currentOptions = options;
  const payDay = getPayDay(date);
  const bonusDay = getBonusDay(date);
  currentOptions = null;
  return {payDay, bonusDay};
}

module.exports = {getSalaryDates};
