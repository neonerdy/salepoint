

using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class Purchase
    {
        public Guid ID { get; set; }
        public string PurchaseCode { get; set; }
        public Guid SupplierId { get; set; }
        public Supplier Supplier { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string SupplierInvoice { get; set; }
        public Guid PaymentTypeId { get; set; }
        public Guid PaymentAccountId { get; set; }
        public string Notes { get; set; }
        public decimal Amount { get; set; }
        public decimal Tax { get; set; }
        public decimal ServiceCharge { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public List<PurchaseItem> PurchaseItems { get; set; }
    
    }


}