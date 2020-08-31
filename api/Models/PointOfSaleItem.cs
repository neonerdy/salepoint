using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class PointOfSalesItem
    {
        public Guid ID { get; set; }
        public Guid PointOfSaleId { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public decimal Price { get; set; }
        public int Qty { get; set; }
        public int TaxPct { get; set; }
        public int DiscountPct { get; set; }
        
    }

}


