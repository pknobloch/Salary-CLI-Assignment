const config = require('./config'),
  tmp = require('tmp'),
  moment = require('moment');
const JANUARY = 0, FEBRUARY = 1, NOVEMBER = 10, DECEMBER = 11, YEAR = 2019, NEXT_YEAR = 2020;

test('Abort if file exists without overwrite flag', () => {
  const tempFile = tmp.fileSync();

  const mockStdout = jest.spyOn(console, 'error').mockImplementation(() => {
  });
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
  });
  config.abortIfCantWriteToFile({overwrite: false}, tempFile.name);
  expect(mockExit).toHaveBeenCalledWith(1);
  expect(mockStdout).toHaveBeenCalledWith('File already exists and -w or --overwrite flag is not enabled.');

  //Cleanup temp file
  tempFile.removeCallback();
});

test('Abort if start month is after end date', () => {
  const mockStdout = jest.spyOn(console, 'error').mockImplementation(() => {
  });
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
  });
  const startDateFeb = moment({year: YEAR, month: FEBRUARY, day: 1});
  const endDateJan = moment({year: YEAR, month: JANUARY, day: 1});
  config.abortIfDatesAreWrong(startDateFeb, endDateJan);
  expect(mockExit).toHaveBeenCalledWith(1);
  expect(mockStdout).toHaveBeenCalledWith('Start date should be before the end date.');
});

test('Abort if start year is after end date', () => {
  const mockStdout = jest.spyOn(console, 'error').mockImplementation(() => {
  });
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
  });
  const startDate2020 = moment({year: NEXT_YEAR, month: JANUARY, day: 1});
  const endDate2019 = moment({year: YEAR, month: JANUARY, day: 1});
  config.abortIfDatesAreWrong(startDate2020, endDate2019);
  expect(mockExit).toHaveBeenCalledWith(1);
  expect(mockStdout).toHaveBeenCalledWith('Start date should be before the end date.');
});

test('Abort if start format is not YYYY-MM', () => {
  const mockStdout = jest.spyOn(console, 'error').mockImplementation(() => {
  });
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
  });
  const options = {startDate: '201901'};
  config.getDates(options);
  expect(mockExit).toHaveBeenCalledWith(1);
  expect(mockStdout).toHaveBeenCalledWith('Dates should be in the format YYYY-MM.');
});

test('Abort if end format is not YYYY-MM', () => {
  const mockStdout = jest.spyOn(console, 'error').mockImplementation(() => {
  });
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
  });
  const options = {endDate: '201901'};
  config.getDates(options);
  expect(mockExit).toHaveBeenCalledWith(1);
  expect(mockStdout).toHaveBeenCalledWith('Dates should be in the format YYYY-MM.');
});

test('End date should be end of the year', () => {
  const expectedStartDate = moment({year: YEAR, month: JANUARY, day: 1});
  const expectedEndDate = moment({year: YEAR, month: DECEMBER, day: 1});
  const options = {startDate: '2019-01'};
  const {startDate, endDate} = config.getDates(options);
  expect(startDate.format('YYYY-MM-DD')).toBe(expectedStartDate.format('YYYY-MM-DD'));
  expect(endDate.format('YYYY-MM-DD')).toBe(expectedEndDate.format('YYYY-MM-DD'));
});

test('Dates should be parsed corrected', () => {
  const expectedStartDate = moment({year: YEAR, month: FEBRUARY, day: 1});
  const expectedEndDate = moment({year: YEAR, month: NOVEMBER, day: 1});
  const options = {startDate: '2019-02', endDate: '2019-11'};
  const {startDate, endDate} = config.getDates(options);
  expect(startDate.format('YYYY-MM-DD')).toBe(expectedStartDate.format('YYYY-MM-DD'));
  expect(endDate.format('YYYY-MM-DD')).toBe(expectedEndDate.format('YYYY-MM-DD'));
});

test('Start date should default to this year and month', () => {
  const expectedStartDate = moment();
  const {startDate} = config.getDates({});
  expect(startDate.year()).toBe(expectedStartDate.year());
  expect(startDate.month()).toBe(expectedStartDate.month());
});
