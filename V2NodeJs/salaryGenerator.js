const salary = require('./salary'),
  moment = require('moment');

function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

function generate(startDate, endDate, options) {
  return range(endDate.month() - startDate.month() + 1, startDate.month())
  .map(month => salary.getSalaryDates(moment({year:startDate.year(), month: month, day: 1}), options));
}

/**
 * CSV columns may contain commas so long as the field is surrounded by quotes
 * @param input
 */
function cleanForCSV(input) {
  return (input.indexOf(',') > -1) ? `"${input}"` : input;
}

function generateCSV(startDate, endDate, options) {
  const salaries = generate(startDate, endDate, options);
  const lines = [];
  if (options.header) {
    lines.push('Month,Salary Payment Date,Bonus Payment Date');
  }
  const dateFormat = 'ddd, MMM DD, YYYY';
  salaries.forEach(salary => {
    const month = salary.payDay.format('MMMM');
    const payday = cleanForCSV(salary.payDay.format(dateFormat));
    const bonusDay = cleanForCSV(salary.bonusDay.format(dateFormat));
    lines.push(`${month},${payday},${bonusDay}`);
  });
  return lines.join('\n');
}

module.exports = {generate, generateCSV};
