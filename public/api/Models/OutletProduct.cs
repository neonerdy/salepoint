
using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{
    public class OutletProduct
    {
        public Guid ID { get; set; }
        public Guid OutletId { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public decimal SalesPrice { get; set; }
        public int Stock { get; set; }
    }


}