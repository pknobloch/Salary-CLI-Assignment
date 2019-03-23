# Salary CLI Assignment

Calculate employee payment and bonus dates using a command-line utility.

To run, use node and call index.js with the output command.

```
node.exe V2NodeJs\index.js output output.csv
```

## Usage

Usage: output [options] [filename]

Options:
  -s, --startDate [value]  Set calculation start date. Expected format: YYYY-MM. (Default: Today)
  -e, --endDate [value]    Set calculation end date. Expected format: YYYY-MM. (Default: End of year)
  -w, --overwrite          Overwrite the file if it exists.
  -h, --headers            Include headers.
  --paydayOffset <n>       Number of days before or after the weekend that salaries should be paid. (Default: -1. Off: 0)
  --bonusOffset <n>        Number of days before or after the weekend that bonus should be paid. (Default: 3. Off: 0)
  b, --bonus <n>           Day of the month that bonuses should be paid. (Default 15)
  -D, --debug              Outputs debug code for troubleshooting problems.
  -h, --help               output usage information

## Introduction

Version 1 was written in C# with DotNet Core. after getting through 90% of the code (I am missing a CSV output), I was required to switch to NodeJS. I decided to leave the original code since I put in all the effort. 

## Requirements

You are required to create a small command-line utility to help a fictional company determine the dates they need
to pay salaries to their sales department.

This company is handling their sales payroll in the following way:

* Sales staff get a regular monthly fixed base salary and a monthly bonus.
* The base salaries are paid on the last day of the month unless that day is a Saturday or a Sunday
(weekend). Else on the Friday **before**.
* On the 15th of every month bonuses are paid for the previous month, unless that day is a weekend. In
that case, they are paid the first Wednesday **after** the 15th.

The output of the utility should be a CSV file, containing the payment dates for the remainder of this year. The
CSV file should contain a column for the month name, a column that contains the salary payment date for that
month, and a column that contains the bonus payment date.

## Version 2 External Libraries (NodeJS version)

Name | URL
---- | ---
Commander Command Line Parser | https://www.npmjs.com/package/commander
Moment.js | http://momentjs.com
Jest testing framework | https://jestjs.io
Tmp temporary file framework (for testing) | https://www.npmjs.com/package/tmp

## Version 1 External Libraries (DotNet Core)

Name | URL
---- | ---
NUnit testing framework | http://nunit.org/
Command Line Parser | https://github.com/commandlineparser/commandline
