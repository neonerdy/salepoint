using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class SalesInvoice
    {
        public Guid ID { get; set; }
        public string InvoiceCode { get; set; }
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime DueDate { get; set; }
        public Guid SalesPersonId { get; set; }
        public Employee SalesPerson { get; set; }
        public string Notes { get; set; }
        public decimal Amount { get; set; }
        public decimal Tax { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
        public decimal AmountPaid { get; set; }
        public string Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public List<SalesInvoiceItem> SalesInvoiceItems { get; set; }

    }



}