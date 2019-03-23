const salary = require('./salary');

function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

function generate(startDate, endDate, options) {
  return range(endDate.getMonth() - startDate.getMonth() + 1, startDate.getMonth())
  .map(month => salary.getSalaryDates(new Date(startDate.getFullYear(), month, 1), options));
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
  const monthFormat = { month: 'long' };
  const dateFormat = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'};
  salaries.forEach(salary => {
    const month = salary.payDay.toLocaleDateString(options.locale, monthFormat);
    const payday = cleanForCSV(salary.payDay.toLocaleDateString(options.locale, dateFormat));
    const bonusDay = cleanForCSV(salary.bonusDay.toLocaleDateString(options.locale, dateFormat));
    lines.push(`${month},${payday},${bonusDay}`);
  });
  return lines.join('\n');
}

module.exports = {generate, generateCSV};
