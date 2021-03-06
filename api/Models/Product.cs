

using System;
using System.Collections.Generic;

namespace SalePointAPI.Models
{

    public class Product
    {
        public Guid ID { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public Guid CategoryId { get; set; }
        public ProductCategory Category { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public decimal PurchasePrice { get; set; }
        public decimal SalePrice { get; set; }
        public int Stock { get; set; }
        public Guid UnitId { get; set; }
        public Unit Unit { get; set; }
        public string Description { get; set; }
        public Boolean IsDiscontinued { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

    }



}