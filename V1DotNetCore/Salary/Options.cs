using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using CommandLine;

namespace SalaryAssignment
{
    public class Options
    {
        [Option('h', "help", Required = false, HelpText = "Show help.")]
        public bool Help { get; set; }
        [Option('D', "debug", Required = false, HelpText = "Outputs debug code for troubleshooting problems.")]
        public bool Debug { get; set; } = false;
        [Option('v', "version", Required = false, HelpText = "Show the current version.")]
        public bool Version { get; set; }
        [Option('d', "date", Required = false, HelpText = "Set calculation start date. Expected format: YYYYMM.")]
        public string StartDate { get; set; }
        [Option("payday-offset", Required = false, HelpText = "Number of days before or after the weekend that salaries should be paid. (Default: -1. Off: 0)")]
        public int PaydayWeekendOffset { get; set; } = -1;
        [Option('b', "bonus", Required = false, HelpText = "Day of the month that bonuses should be paid. (Default: 15)")]
        public int BonusDay { get; set; } = 15;
        [Option("bonus-offset", Required = false, HelpText = "Number of days before or after the weekend that bonus should be paid. (Default: 3. Off: 0)")]
        public int BonusWeekendOffset { get; set; } = 3;
        [Option('o', "output", Required = true, HelpText = "Filename of CSV output.")]
        public string FileName { get; set; }
        [Option("overwrite", Required = false, HelpText = "Overwrite the file if it exists.")]
        public bool Overwrite { get; set; }

        public DateTime GetStartDate()
        {
            if (!string.IsNullOrEmpty(StartDate))
            {
                if (StartDate.Length == 6)
                {
                    return DateTime.ParseExact(StartDate + "01", "yyyyMMdd", null);
                }
                throw new FormatException("Expected format is YYYYMM.");
            }
            return DateTime.Now;
        }
    }
}
