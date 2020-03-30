using System;

namespace SalePointAPI.Models
{
    public class PurchasePaymentItem
    {
        public Guid ID { get; set; }
        public Guid PurchasePaymentId { get; set; }
        public Guid PurchaseInvoiceId { get; set; }
        public decimal AmountPaid { get; set; }
    }


}