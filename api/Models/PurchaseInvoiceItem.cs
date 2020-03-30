using System;

namespace SalePointAPI.Models
{

    public class PurchaseInvoiceItem
    {
        public Guid ID { get; set; }
        public Guid PurchaseInvoiceId { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public decimal Price { get; set; }
        public int Qty { get; set; }
        public int DiscountPct { get; set; }
        public int TaxPct { get; set; }
    }



}