using System;

namespace SalePointAPI.Models
{
    public class RoleAccess
    {
        public Guid ID { get; set; }
        public Guid RoleId { get; set; }
        public Role Role { get; set; }
        public bool IsAllowDashboard { get; set; }
        public bool IsAllowMasterData { get; set; }
        public bool IsAllowEmployee { get; set; }
        public bool IsAllowProduct { get; set; }
        public bool IsAllowCustomer { get; set; }
        public bool IsAllowSupplier { get; set; }
        public bool IsAllowPointOfSale { get; set; }
        public bool IsAllowPurchaseInvoice { get; set; }
        public bool IsAllowSalesInvoice { get; set; }
        public bool IsAllowExpense { get; set; }
        public bool IsAllowReport { get; set; }
        public bool IsAllowUser { get; set; }
        

        


    }

}