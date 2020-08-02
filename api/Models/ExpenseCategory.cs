using System;

namespace SalePointAPI.Models
{
    public class ExpenseCategory
    {
        public Guid ID { get; set; }
        public string CategoryName { get; set; }
        public decimal MonthlyBudget { get; set; }
        public string Description { get; set; }

    }


}