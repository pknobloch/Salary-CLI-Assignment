using NUnit.Framework;
using System;
using System.Linq;
using SalaryAssignment;

namespace Tests
{
    public class SalaryGeneratorTests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void StartAndEndDatesSet()
        {
            var startDate = new DateTime(2019, 01, 01);
            var endDate = new DateTime(2019, 12, 31);
            var options = new Options { StartDate = "201901" };
            var generator = new SalaryGenerator(options);
            Assert.AreEqual(startDate, generator.StartDate);
            Assert.AreEqual(endDate, generator.EndDate);
        }
        [Test]
        public void NumberOfDatesGeneratedInAYearAre12()
        {
            var options = new Options { StartDate = "201901" };
            var generator = new SalaryGenerator(options);
            Assert.AreEqual(12, generator.GetSalaries().Count());
        }
    }
}