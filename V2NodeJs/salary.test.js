const moment = require('moment'),
  salary = require('./salary'),
  config = require('./config');
const JANUARY = 0, FEBRUARY = 1, MAY = 4, JUNE = 5, YEAR = 2019;
const defaultOptions = config.setDefaultOptions({});

test('Payday is end of the month', () => {
  const payDay = moment({year: YEAR, month: JANUARY, day: 31});
  const januarySalary = salary.getSalaryDates(moment({year: YEAR, month: JANUARY, day: 1}), defaultOptions);
  expect(januarySalary.payDay.format('YYYY-MM-DD')).toBe(payDay.format('YYYY-MM-DD'));
});

test('Payday is last weekday if end of the month is weekend', () => {
  const lastWeekDay = moment({year: YEAR, month: JUNE, day: 28});
  const juneSalary = salary.getSalaryDates(moment({year: YEAR, month: JUNE, day: 1}), defaultOptions);
  expect(lastWeekDay.format('YYYY-MM-DD')).toBe(juneSalary.payDay.format('YYYY-MM-DD'));
});

test('Pay day is end of the month weekend if payday weekend offset is zero', () => {
  const lastWeekDay = moment({year: YEAR, month: JUNE, day: 30});
  const options = {
    ...defaultOptions,
    paydayOffset: 0
  };
  const juneSalary = salary.getSalaryDates(moment({year: YEAR, month: JUNE, day: 1}), options);
  expect(lastWeekDay.format('YYYY-MM-DD')).toBe(juneSalary.payDay.format('YYYY-MM-DD'));
});

test('Bonus day is 15 of the next month', () => {
  const bonusDay = moment({year: YEAR, month: FEBRUARY, day: 15});
  const janaurySalary = salary.getSalaryDates(moment({year: YEAR, month: JANUARY, day: 1}), defaultOptions);
  expect(bonusDay.format('YYYY-MM-DD')).toBe(janaurySalary.bonusDay.format('YYYY-MM-DD'));
});

test('Bonus day is wednesday after 15 of the next month if weekend', () => {
  const bonusDay = moment({year: YEAR, month: JUNE, day: 19});
  const maySalary = salary.getSalaryDates(moment({year: YEAR, month: MAY, day: 1}), defaultOptions);
  expect(bonusDay.format('YYYY-MM-DD')).toBe(maySalary.bonusDay.format('YYYY-MM-DD'));
});

test('Bonus day is end of the month weekend if bonus weekend offset is zero', () => {
  const bonusDay = moment({year: YEAR, month: JUNE, day: 15});
  const options = {
    ...defaultOptions,
    bonusOffset: 0
  };
  const maySalary = salary.getSalaryDates(moment({year: YEAR, month: MAY, day: 1}), options);
  expect(bonusDay.format('YYYY-MM-DD')).toBe(maySalary.bonusDay.format('YYYY-MM-DD'));
});
