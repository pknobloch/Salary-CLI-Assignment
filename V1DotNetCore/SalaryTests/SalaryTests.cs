using NUnit.Framework;
using System;
using System.Linq;
using SalaryAssignment;

namespace Tests
{
    public class SalaryTests
    {
        private Options defaultOptions;

        [SetUp]
        public void Setup()
        {
            defaultOptions = new Options();
        }
        
        [Test]
        public void PayDayIsEndOfTheMonth()
        {
            var payDay = new DateTime(2019, 1, 31);
            var options = new Options { StartDate = "201901" };
            var janaurySalary = new Salary(new DateTime(2019, 1, 1), options);
            Assert.AreEqual(payDay, janaurySalary.PayDay);
        }
        [Test]
        public void PayDayIsLastWeekdayIfEndOfTheMonthIsWeekend()
        {
            var lastWeekDay = new DateTime(2019, 6, 28);
            var juneSalary = new Salary(new DateTime(2019, 6, 1), defaultOptions);
            Assert.AreEqual(lastWeekDay, juneSalary.PayDay);
        }
        [Test]
        public void PayDayIsEndOfTheMonthWeekendIfPaydayWeekendOffsetIsZero()
        {
            var lastWeekDay = new DateTime(2019, 6, 30);
            var options = new Options { PaydayWeekendOffset = 0 };
            var juneSalary = new Salary(new DateTime(2019, 6, 1), options);
            Assert.AreEqual(lastWeekDay, juneSalary.PayDay);
        }
        [Test]
        public void BonusDayIs15OfTheNextMonth()
        {
            var bonusDay = new DateTime(2019, 2, 15);
            var janaurySalary = new Salary(new DateTime(2019, 1, 1), defaultOptions);
            Assert.AreEqual(bonusDay, janaurySalary.BonusDay);
        }
        [Test]
        public void BonusDayIsWednesdayAfter15OfTheNextMonthIfWeekend()
        {
            var bonusDay = new DateTime(2019, 6, 19);
            var maySalary = new Salary(new DateTime(2019, 5, 1), defaultOptions);
            Assert.AreEqual(bonusDay, maySalary.BonusDay);
        }
        [Test]
        public void BonusDayIsEndOfTheMonthWeekendIfBonusWeekendOffsetIsZero()
        {
            var bonusDay = new DateTime(2019, 6, 15);
            var options = new Options { BonusWeekendOffset = 0 };
            var maySalary = new Salary(new DateTime(2019, 5, 1), options);
            Assert.AreEqual(bonusDay, maySalary.BonusDay);
        }
    }
}