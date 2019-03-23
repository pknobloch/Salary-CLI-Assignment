const config = require('./config'),
  tmp = require('tmp');
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
  const startDateFeb = new Date(YEAR, FEBRUARY, 1);
  const endDateJan = new Date(YEAR, JANUARY, 1);
  config.abortIfDatesAreWrong(startDateFeb, endDateJan);
  expect(mockExit).toHaveBeenCalledWith(1);
  expect(mockStdout).toHaveBeenCalledWith('Start date should be before the end date.');
});

test('Abort if start year is after end date', () => {
  const mockStdout = jest.spyOn(console, 'error').mockImplementation(() => {
  });
  const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
  });
  const startDate2020 = new Date(NEXT_YEAR, JANUARY, 1);
  const endDate2019 = new Date(YEAR, JANUARY, 1);
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
  const expectedStartDate = new Date(YEAR, JANUARY, 1);
  const expectedEndDate = new Date(YEAR, DECEMBER, 1);
  const options = {startDate: '2019-01'};
  const {startDate, endDate} = config.getDates(options);
  expect(startDate.getTime()).toBe(expectedStartDate.getTime());
  expect(endDate.getTime()).toBe(expectedEndDate.getTime());
});

test('Dates should be parsed corrected', () => {
  const expectedStartDate = new Date(YEAR, FEBRUARY, 1);
  const expectedEndDate = new Date(YEAR, NOVEMBER, 1);
  const options = {startDate: '2019-02', endDate: '2019-11'};
  const {startDate, endDate} = config.getDates(options);
  expect(startDate.getTime()).toBe(expectedStartDate.getTime());
  expect(endDate.getTime()).toBe(expectedEndDate.getTime());
});

test('Start date should default to this year and month', () => {
  const expectedStartDate = new Date();
  const {startDate} = config.getDates({});
  expect(startDate.getFullYear()).toBe(expectedStartDate.getFullYear());
  expect(startDate.getMonth()).toBe(expectedStartDate.getMonth());
});
