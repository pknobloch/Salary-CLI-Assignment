const moment = require('moment'),
  salaryGenerator = require('./salaryGenerator'),
  config = require('./config');
const defaultOptions = config.setDefaultOptions({});
const JANUARY = 0, DECEMBER = 11, YEAR = 2019;

test('Generator should create 1 row for the same date', () => {
  const startDate = moment({year: YEAR, month: JANUARY, day: 1});
  const endDate = moment({year: YEAR, month: JANUARY, day: 1});
  const salaries = salaryGenerator.generate(startDate, endDate, defaultOptions);
  expect(salaries.length).toBe(1);
});

test('Generator should create 12 rows for a year', () => {
  const startDate = moment({year: YEAR, month: JANUARY, day: 1});
  const endDate = moment({year: YEAR, month: DECEMBER, day: 1});
  const salaries = salaryGenerator.generate(startDate, endDate, defaultOptions);
  expect(salaries.length).toBe(12);
});

test('Generator should create a header', () => {
  const header = 'Month,Salary Payment Date,Bonus Payment Date';
  const startDate = moment({year: YEAR, month: JANUARY, day: 1});
  const endDate = moment({year: YEAR, month: DECEMBER, day: 1});
  const headerOptions = {
    ...defaultOptions,
    header: true,
  };
  const salariesCSV = salaryGenerator.generateCSV(startDate, endDate, headerOptions);
  expect(salariesCSV.startsWith(header)).toBeTruthy();
});

test('Generator should build a valid CSV for 2019', () => {
  moment.locale('en');
  const expectedCSV = 'January,\"Thu, Jan 31, 2019\",\"Fri, Feb 15, 2019\"\n' +
    'February,\"Thu, Feb 28, 2019\",\"Fri, Mar 15, 2019\"\n' +
    'March,\"Fri, Mar 29, 2019\",\"Mon, Apr 15, 2019\"\n' +
    'April,\"Tue, Apr 30, 2019\",\"Wed, May 15, 2019\"\n' +
    'May,\"Fri, May 31, 2019\",\"Wed, Jun 19, 2019\"\n' +
    'June,\"Fri, Jun 28, 2019\",\"Mon, Jul 15, 2019\"\n' +
    'July,\"Wed, Jul 31, 2019\",\"Thu, Aug 15, 2019\"\n' +
    'August,\"Fri, Aug 30, 2019\",\"Wed, Sep 18, 2019\"\n' +
    'September,\"Mon, Sep 30, 2019\",\"Tue, Oct 15, 2019\"\n' +
    'October,\"Thu, Oct 31, 2019\",\"Fri, Nov 15, 2019\"\n' +
    'November,\"Fri, Nov 29, 2019\",\"Wed, Dec 18, 2019\"\n' +
    'December,\"Tue, Dec 31, 2019\",\"Wed, Jan 15, 2020\"';
  const startDate = moment({year: YEAR, month: JANUARY, day: 1});
  const endDate = moment({year: YEAR, month: DECEMBER, day: 1});
  const salariesCSV = salaryGenerator.generateCSV(startDate, endDate, defaultOptions);
  expect(salariesCSV).toBe(expectedCSV);
});
