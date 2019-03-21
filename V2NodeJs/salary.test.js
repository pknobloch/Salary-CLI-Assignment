const salary = require('./salary'),
  index = require('./index');
const defaultOptions = index.setDefaultOptions({});
const JANUARY = 0, FEBRUARY = 1, MAY = 4, JUNE = 5, YEAR = 2019;

test('Payday is end of the month', () => {
  const payDay = new Date(YEAR, JANUARY, 31);
  const januarySalary = salary.getSalaryDates(new Date(YEAR, JANUARY, 1), defaultOptions);
  expect(januarySalary.payDay.getTime()).toBe(payDay.getTime());
});

test('Payday is last weekday if end of the month is weekend', () => {
  let lastWeekDay = new Date(YEAR, JUNE, 28);
  let juneSalary = salary.getSalaryDates(new Date(YEAR, JUNE, 1), defaultOptions);
  expect(lastWeekDay.getTime()).toBe(juneSalary.payDay.getTime());
});

test('Pay day is end of the month weekend if payday weekend offset is zero', () => {
  let lastWeekDay = new Date(YEAR, JUNE, 30);
  let options = {
    ...defaultOptions,
    paydayOffset: 0
  };
  let juneSalary = salary.getSalaryDates(new Date(YEAR, JUNE, 1), options);
  expect(lastWeekDay.getTime()).toBe(juneSalary.payDay.getTime());
});

test('Bonus day is 15 of the next month', () => {
  let bonusDay = new Date(YEAR, FEBRUARY, 15);
  let janaurySalary = salary.getSalaryDates(new Date(YEAR, JANUARY, 1), defaultOptions);
  expect(bonusDay.getTime()).toBe(janaurySalary.bonusDay.getTime());
});

test('Bonus day is wednesday after 15 of the next month if weekend', () => {
  let bonusDay = new Date(YEAR, JUNE, 19);
  let maySalary = salary.getSalaryDates(new Date(YEAR, MAY, 1), defaultOptions);
  expect(bonusDay.getTime()).toBe(maySalary.bonusDay.getTime());
});

test('Bonus day is end of the month weekend if bonus weekend offset is zero', () => {
  let bonusDay = new Date(YEAR, JUNE, 15);
  let options = {
    ...defaultOptions,
    bonusOffset: 0
  };
  let maySalary = salary.getSalaryDates(new Date(YEAR, MAY, 1), options);
  expect(bonusDay.getTime()).toBe(maySalary.bonusDay.getTime());
});
