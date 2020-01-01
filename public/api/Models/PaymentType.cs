using System;

namespace SalePointAPI.Models
{
    public class PaymentType
    {
        public Guid ID { get; set; }
        public string PaymentName { get; set; }
        public string Description { get; set; }
    }

}