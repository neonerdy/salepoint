using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class PurchasePayment
    {
        public Guid ID { get; set; }
        public Guid PurchaseInvoiceId { get; set; }
        public Guid PaymentTypeId { get; set; }
        public PaymentType PaymentType { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal AmountPaid { get; set; }
        public string Notes { get; set; }
      
    }


}