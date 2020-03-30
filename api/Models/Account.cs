using System;

namespace SalePointAPI.Models
{
    public class Account
    {
        public Guid ID { get; set; }
        public string AccountName { get; set; }
        public string AccountType { get; set; }
        public decimal Balance { get; set; }
        public string Description { get; set; }
    }

}