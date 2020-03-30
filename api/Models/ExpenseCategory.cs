using System;

namespace SalePointAPI.Models
{
    public class ExpenseCategory
    {
        public Guid ID { get; set; }
        public string CategoryName { get; set; }
        public decimal Budget { get; set; }
        public string Notes { get; set; }

    }


}