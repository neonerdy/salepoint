using System;

namespace SalePointAPI.Models
{
    public class ExpenseGroup
    {
        public Guid ID { get; set; }
        public string GroupName { get; set; }
        public string Description { get; set; }
    }

}