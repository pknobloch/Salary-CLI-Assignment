const salaryGenerator = require('./salaryGenerator'),
  index = require('./index');
const defaultOptions = index.setDefaultOptions({});
const JANUARY = 0, DECEMBER = 11, YEAR = 2019;

test('Payday is end of the month', () => {
  const startDate = new Date(YEAR, JANUARY, 1);
  const endDate = new Date(YEAR, DECEMBER, 31);
  const salaries = salaryGenerator.generate(startDate, endDate, defaultOptions);
  expect(salaries.length).toBe(12);
});
