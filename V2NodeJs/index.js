'use strict';
const program = require('commander'),
  fileSystem = require('fs'),
  moment = require('moment'),
  pkg = require('./package.json'),
  config = require('./config'),
  salaryGenerator = require('./salaryGenerator');

const output = (filename, options) => {
  moment.locale(options.locale);

  // Use console.error so that stdout can be reserved for CSV output if output to console becomes a requirement.
  if (options.debug) {
    console.error('Setting defaults.');
  }
  config.setDefaultOptions(options);
  if (options.debug && options.overwrite) {
    console.error('Checking for existing file.');
  }
  config.abortIfCantWriteToFile(options, filename);
  if (options.debug) {
    console.error('Checking dates.');
  }
  const {startDate, endDate} = config.getDates(options);
  config.abortIfDatesAreWrong(startDate, endDate);
  if (options.debug) {
    console.error('Generating CSV.');
  }
  const csv = salaryGenerator.generateCSV(startDate, endDate, options);
  if (options.debug) {
    console.error('Final output');
    console.error('------------');
    console.error(csv);
  }
  if (options.debug) {
    console.error('Write to file.');
  }
  fileSystem.writeFile(filename, csv, 'utf8', (error) => {
    if (error) {
      throw error;
    }
    console.error('Saved!');
  });
};

program
.version(pkg.version, '-v, --version')
.command('output [filename]')
.option('-s, --startDate [value]', 'Set calculation start date. Expected format: YYYY-MM. (Default: Today)')
.option('-e, --endDate [value]', 'Set calculation end date. Expected format: YYYY-MM. (Default: End of year)')
.option('-l, --locale [value]', 'Set locale for date output (Default: en-US)')
.option('-w, --overwrite', 'Overwrite the file if it exists.', false)
.option('-h, --headers', 'Include headers.')
.option('--paydayOffset <n>', 'Number of days before or after the weekend that salaries should be paid. (Default: -1. Off: 0)')
.option('--bonusOffset <n>', 'Number of days before or after the weekend that bonus should be paid. (Default: 3. Off: 0)')
.option('b, --bonus <n>', 'Day of the month that bonuses should be paid. (Default 15)')
.option('-D, --debug', 'Outputs debug code for troubleshooting problems.')
.action(output);

program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.rawArgs.length <= 2) {
  program.help();
}
