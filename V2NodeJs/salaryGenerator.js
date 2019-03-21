const salary = require('./salary');
const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

function generate(startDate, endDate, options) {
  if (options.debug) {
    console.log(`Debug: salaryGenerator.generate(${startDate?startDate.toDateString():'startDate'},${endDate?endDate.toDateString():'endDate'}, options)`);
  }
  return range(endDate.getMonth() - startDate.getMonth() + 1, startDate.getMonth())
  .map(month => salary.getSalaryDates(new Date(startDate.getFullYear(), month, 1), options));
}

function generateCSV(startDate, endDate, options) {
  const salaries = generate(startDate, endDate, options);
  let lines = [];
  if (options.header) {
    lines.push('Month,Salary Payment Date,Bonus Payment Date');
  }
  salaries.forEach(salary =>
    lines.push(`${MONTHS[salary.payDay.getMonth()]},${salary.payDay.toDateString()},${salary.bonusDay.toDateString()}`)
  );
  return lines.join('\n');
}

module.exports = {generate, generateCSV};
