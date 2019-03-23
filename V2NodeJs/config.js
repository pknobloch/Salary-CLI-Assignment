const fileSystem = require('fs');

const setDefaultOptions = (options) => {
  options.paydayOffset = Number(options.paydayOffset) || -1;
  options.bonusOffset = Number(options.bonusOffset) || 3;
  options.bonus = Number(options.bonus) || 15;
  options.locale = options.locale || 'en-US';
  return options;
};

function endOfYearDate(year) {
  return new Date(year, 11, 1);
}

/**
 * @param date Tests to see if the format is 'YYYY-MM'.
 * @returns {boolean}
 */
function testDateFormat(date) {
  return /^\d{4}-\d{2}$/.test(date);
}

/**
 * @param dateYYYY_MM Expects a string in the format 'YYYY-MM'.
 * @returns {Date}
 */
function buildDateFromYearMonthString(dateYYYY_MM) {
  const parts = dateYYYY_MM.split('-');
  return new Date(parts[0], parts[1] - 1, 1);
}

function checkDate(options, dateKey) {
  let result = null, hasDateError = false;
  if (options.hasOwnProperty(dateKey)) {
    if (testDateFormat(options[dateKey])) {
      result = buildDateFromYearMonthString(options[dateKey]);
    } else {
      hasDateError = true;
    }
  }
  return {result, hasDateError};
}

function getDates(options) {
  let {result: startDate, hasDateError: hasStartDateError} = checkDate(options, 'startDate');
  let {result: endDate, hasDateError: hasEndDateError} = checkDate(options, 'endDate');
  if (hasStartDateError || hasEndDateError) {
    console.error('Dates should be in the format YYYY-MM.');
    process.exit(1);
  }
  startDate = startDate || new Date();
  endDate = endDate || endOfYearDate(startDate.getFullYear());
  return {startDate, endDate};
}

function abortIfDatesAreWrong(startDate, endDate){
  const isWrongYear = startDate.getFullYear() > endDate.getFullYear();
  const isWrongMonth = startDate.getFullYear() === endDate.getFullYear() && startDate.getMonth() > endDate.getMonth();
  if (isWrongYear || isWrongMonth) {
    console.error('Start date should be before the end date.');
    process.exit(1);
  }
}

function abortIfCantWriteToFile(options, filename){
  if (!options.overwrite && fileSystem.existsSync(filename)) {
    console.error('File already exists and -w or --overwrite flag is not enabled.');
    process.exit(1);
  }
}

module.exports = {setDefaultOptions, abortIfCantWriteToFile, abortIfDatesAreWrong, getDates};
