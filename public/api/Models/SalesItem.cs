using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class SalesItem
    {
        public Guid ID { get; set; }
        public Guid SalesId { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public int Qty { get; set; }
        public decimal Price { get; set; }
    }

}


