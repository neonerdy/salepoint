using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class PurchaseInvoiceViewModel
    {
        public Guid ID { get; set; }
        public string InvoiceCode { get; set; }
        public string SupplierName { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime DueDate { get; set; }
        public decimal Total { get; set; }
        public decimal AmountPaid { get; set; }
        public string Status { get; set; }
    }

}