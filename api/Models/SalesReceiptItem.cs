using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class SalesReceiptItem
    {
        public Guid ID { get; set; }
        public Guid SalesId { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public decimal Price { get; set; }
        public int Qty { get; set; }
        public int TaxPct { get; set; }
        public int DiscountPct { get; set; }
        
    }

}


