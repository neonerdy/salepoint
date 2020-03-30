using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class PurchaseInvoice
    {
        public Guid ID { get; set; }
        public string InvoiceCode { get; set; }
        public Guid SupplierId { get; set; }
        public Supplier Supplier { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime DueDate { get; set; }
        public string Notes { get; set; }
        public decimal Amount { get; set; }
        public decimal Tax { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
        public decimal AmountPaid { get; set; }
        public string Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public List<PurchaseInvoiceItem> PurchaseInvoiceItems { get; set; }

    }



}