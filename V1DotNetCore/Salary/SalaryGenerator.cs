using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SalaryAssignment
{
    public class SalaryGenerator
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        private readonly Options options;

        public SalaryGenerator(Options options)
        {
            this.options = options;
            StartDate = options.GetStartDate();
            EndDate = EndOfYear(StartDate);
            if (options.Debug)
            {
                Console.Error.WriteLine($"Debug: StartDate={StartDate}");
                Console.Error.WriteLine($"Debug: EndDate={EndDate}");
            }
        }
        private DateTime EndOfYear(DateTime date)
        {
            return new DateTime(date.Year, 12, 31);
        }
        public IEnumerable<Salary> GetSalaries()
        {
            return Enumerable.Range(StartDate.Month, EndDate.Month - StartDate.Month + 1)
                .Select(month => new Salary(new DateTime(StartDate.Year, month, 1), options));
        }
    }
}
