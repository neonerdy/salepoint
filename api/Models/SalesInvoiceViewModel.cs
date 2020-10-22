using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class SalesInvoiceViewModel
    {
        public Guid ID { get; set; }
        public string InvoiceCode { get; set; }
        public string CustomerName { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime DueDate { get; set; }
        public string SalesPerson { get; set; }
        public decimal Total { get; set; }
        public decimal AmountPaid { get; set; }
        public string Status { get; set; }
    }

}