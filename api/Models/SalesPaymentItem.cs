using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{
    public class SalesPaymentItem
    {
        public Guid ID { get; set; }
        public Guid SalesPaymentId { get; set; }
        public Guid SalesInvoiceId { get; set; }
        public decimal AmountPaid { get; set; }
    }


}