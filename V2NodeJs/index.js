'use strict';
const program = require('commander'),
  pkg = require('./package.json'),
  fileSystem = require('fs'),
  salaryGenerator = require('./salaryGenerator');

function endOfYear(year) {
  return new Date(year, 11, 31);
}

function testDateFormat(date) {
  return /^\d{4}-\d{2}$/.test(date);
}

function buildDate(date) {
  return new Date(date + '-01');
}

const setDefaultOptions = (options) => {
  options.paydayOffset = options.paydayOffset || -1;
  options.bonusOffset = options.bonusOffset || 3;
  options.bonus = options.bonus || 15;
  return options;
};

function checkDate(options, dateKey) {
  let result = null, hasDateError = false;
  if (options[dateKey]) {
    if (!testDateFormat(options[dateKey])) {
      hasDateError = true;
    } else {
      result = buildDate(options[dateKey]);
    }
  }
  return {result, hasDateError};
}

function getDates(options) {
  let {startDate, hasStartDateError} = checkDate(options, 'startDate');
  let {endDate, hasEndDateError} = checkDate(options, 'endDate');
  if (hasStartDateError || hasEndDateError) {
    console.error('Dates should be in the format YYYY-MM.');
    process.exit(1);
  }
  startDate = startDate || new Date();
  endDate = endDate || endOfYear(startDate.getFullYear());
  if (startDate.getFullYear() > endDate.getFullYear()){
    console.error('Start date should be before the end date..');
    process.exit(1);
  }
  return {startDate, endDate};
}

const output = (filename, options) => {

  setDefaultOptions(options);
  const {startDate, endDate} = getDates(options);
  if (!options.overwrite && fileSystem.existsSync(filename)) {
    console.error('File already exists and -w or --overwrite flag is not enabled.');
    process.exit(1);
  }
  const csv = salaryGenerator.generateCSV(startDate, endDate, options);
  if (options.debug){
    console.log('Final output');
    console.log('------------');
    console.log(csv);
  }
  fileSystem.writeFile(filename, csv, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
};

program
.version(pkg.version, '-v, --version')
.command('output [filename]')
.option('-s, --startDate [value]', 'Set calculation start date. Expected format: YYYY-MM. (Default: Today)')
.option('-e, --endDate [value]', 'Set calculation end date. Expected format: YYYY-MM. (Default: End of year)')
.option('-w, --overwrite', 'Overwrite the file if it exists.')
.option('-h, --headers', 'Include headers.')
.option('--paydayOffset <n>', 'Number of days before or after the weekend that salaries should be paid. (Default: -1. Off: 0)')
.option('--bonusOffset <n>', 'Number of days before or after the weekend that bonus should be paid. (Default: 3. Off: 0)')
.option('b, --bonus <n>', 'Day of the month that bonuses should be paid. (Default 15)')
.option('-D, --debug', 'Outputs debug code for troubleshooting problems.')
.action(output);

program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.args.length === 0) program.help();

module.exports = {setDefaultOptions};
