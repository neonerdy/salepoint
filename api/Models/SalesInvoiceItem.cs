using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class SalesInvoiceItem
    {
        public Guid ID { get; set; }
        public Guid SalesInvoiceId { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public decimal Price { get; set; }
        public int Qty { get; set; }
        public int TaxPct { get; set; }
        public int DiscountPct { get; set; }
    }




}