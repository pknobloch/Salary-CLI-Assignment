using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;
using SalaryAssignment;

namespace SalaryTests
{
    public class OptionsTests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void EmptyStartDateIsToday()
        {
            var now = DateTime.Now;
            var options = new Options();
            var difference = now - options.GetStartDate();
            var fiveSeconds = new TimeSpan(0, 0, 5);
            Assert.LessOrEqual(difference, fiveSeconds);
        }
        [Test]
        public void StartDateIsParsedCorrectly()
        {
            var expectedDate = new DateTime(2019, 1, 1);
            var options = new Options { StartDate = "201901" };
            Assert.AreEqual(expectedDate, options.GetStartDate());
        }
        [Test]
        public void StartDateFormatExcecptionIsThrown()
        {
            var options = new Options { StartDate = "2019" };
            Assert.Throws<FormatException>(()=>options.GetStartDate());
        }
    }
}
