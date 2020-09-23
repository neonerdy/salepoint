using System;

namespace SalePointAPI.Models
{
    public class Setting
    {
        public Guid ID { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string ZipCode { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int TaxPct { get; set; }
        public int DiscountPct { get; set; }
        public int ServiceChargePct { get; set;}
        public bool IsEnableServiceCharge { get; set; }
        public bool IsEnableAutomaticNumbering { get; set; }
        public bool IsShowMonthAndYear { get; set; }
        public string PointOfSalePrefix { get; set; }
        public string SalesInvoicePrefix { get; set; }
        public string PurchaseInvoicePrefix { get; set; }
        public string Delimiter { get; set; }
    }


}