using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class SalesPayment
    {
        public Guid ID { get; set; }
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; } 
        public DateTime PaymentDate { get; set; }
        public Guid AccountId { get; set; }
        public Account Account { get; set; }
        public Guid PaymentTypeId { get; set; }
        public PaymentType PaymentType { get; set; }
        public decimal TotalAmountPaid { get; set; }
        public string Notes { get; set; }
        public List<SalesPaymentItem> SalesPaymentItems { get; set; }

    }


}