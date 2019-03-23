const salary = require('./salary'),
  config = require('./config');
const JANUARY = 0, FEBRUARY = 1, MAY = 4, JUNE = 5, YEAR = 2019;
const defaultOptions = config.setDefaultOptions({});

test('Payday is end of the month', () => {
  const payDay = new Date(YEAR, JANUARY, 31);
  const januarySalary = salary.getSalaryDates(new Date(YEAR, JANUARY, 1), defaultOptions);
  expect(januarySalary.payDay.getTime()).toBe(payDay.getTime());
});

test('Payday is last weekday if end of the month is weekend', () => {
  const lastWeekDay = new Date(YEAR, JUNE, 28);
  const juneSalary = salary.getSalaryDates(new Date(YEAR, JUNE, 1), defaultOptions);
  expect(lastWeekDay.getTime()).toBe(juneSalary.payDay.getTime());
});

test('Pay day is end of the month weekend if payday weekend offset is zero', () => {
  const lastWeekDay = new Date(YEAR, JUNE, 30);
  const options = {
    ...defaultOptions,
    paydayOffset: 0
  };
  const juneSalary = salary.getSalaryDates(new Date(YEAR, JUNE, 1), options);
  expect(lastWeekDay.getTime()).toBe(juneSalary.payDay.getTime());
});

test('Bonus day is 15 of the next month', () => {
  const bonusDay = new Date(YEAR, FEBRUARY, 15);
  const janaurySalary = salary.getSalaryDates(new Date(YEAR, JANUARY, 1), defaultOptions);
  expect(bonusDay.getTime()).toBe(janaurySalary.bonusDay.getTime());
});

test('Bonus day is wednesday after 15 of the next month if weekend', () => {
  const bonusDay = new Date(YEAR, JUNE, 19);
  const maySalary = salary.getSalaryDates(new Date(YEAR, MAY, 1), defaultOptions);
  expect(bonusDay.getTime()).toBe(maySalary.bonusDay.getTime());
});

test('Bonus day is end of the month weekend if bonus weekend offset is zero', () => {
  const bonusDay = new Date(YEAR, JUNE, 15);
  const options = {
    ...defaultOptions,
    bonusOffset: 0
  };
  const maySalary = salary.getSalaryDates(new Date(YEAR, MAY, 1), options);
  expect(bonusDay.getTime()).toBe(maySalary.bonusDay.getTime());
});
