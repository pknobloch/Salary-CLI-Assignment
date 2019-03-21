# Salary CLI Assignment

Calculate employee payment and bonus dates using a command-line utility.

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
Jest testing framework | https://jestjs.io
Commander Command Line Parser | https://www.npmjs.com/package/commander

## Version 1 External Libraries (DotNet Core)

Name | URL
---- | ---
NUnit testing framework | http://nunit.org/
Command Line Parser | https://github.com/commandlineparser/commandline
