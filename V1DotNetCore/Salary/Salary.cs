using System;
using System.Collections.Generic;
using System.Text;

namespace SalaryAssignment
{
    public class Salary
    {
        public DateTime PayDay { get; set; }
        public DateTime BonusDay { get; set; }

        private readonly Options options;

        public Salary(DateTime date, Options options)
        {
            this.options = options;
            PayDay = GetPayDay(date);
            BonusDay = GetBonusDay(date);
            if (options.Debug)
            {
                Console.Error.WriteLine($"Debug: Salary input Date={date}");
            }
        }
        private DateTime GetBonusDay(DateTime date)
        {
            (int year, int month) = NextMonth(date);
            return AdjustBeforeWeekend(options.BonusWeekendOffset, new DateTime(year, month, options.BonusDay));
        }
        private DateTime GetPayDay(DateTime date)
        {
            var endOfMonth = EndOfMonth(date);
            return AdjustBeforeWeekend(options.PaydayWeekendOffset, endOfMonth);
        }
        private DateTime EndOfMonth(DateTime date)
        {
            (int year, int month) = NextMonth(date);
            var oneDay = new TimeSpan(1, 0, 0, 0);
            return new DateTime(year, month, 1) - oneDay;
        }
        private static (int year, int month) NextMonth(DateTime date)
        {
            var year = date.Year;
            var month = date.Month + 1;
            if (date.Month == 12)
            {
                year++;
                month = 1;
            }
            return (year, month);
        }
        private DateTime AdjustBeforeWeekend(int days, DateTime date)
        {
            if (days == 0 || !IsWeekend(date))
            {
                return date;
            }
            // Because Sunday is 0 and Saturday is 6, change Saturday = 0 and Sunday = 1
            var dayOfWeek = (int)(date.DayOfWeek + 1) % 7;
            var direction = days > 0 ? 1 : 0;
            return date + new TimeSpan(direction - dayOfWeek + days, 0, 0, 0);
        }
        private bool IsWeekend(DateTime date)
        {
            return date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday;
        }
    }
}
