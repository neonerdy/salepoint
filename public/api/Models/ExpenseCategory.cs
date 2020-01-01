using System;

namespace SalePointAPI.Models
{
    public class ExpenseCategory
    {
        public Guid ID { get; set; }
        public string CategoryName { get; set; }
        public string CategoryGroup { get; set; }
        public double Budget { get; set; }

    }



}