using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class SalesPayment
    {
        public Guid ID { get; set; }
        public Guid SalesInvoiceId { get; set; }
        public Guid PaymentTypeId { get; set; }
        public PaymentType PaymentType { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal AmountPaid { get; set; }
        public string Notes { get; set; }
     
    }


}