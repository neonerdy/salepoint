using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class Sales
    {
        public Guid ID { get; set; }
        public Guid OutletId { get; set; }
        public Outlet Outlet { get; set; }
        public string InvoiceCode { get; set; }
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string CustomerPO { get; set; }
        public Guid PaymentTypeId { get; set; }
        public PaymentType PaymentType { get; set; }
        public string Notes { get; set; }
        public decimal Amount { get; set; }
        public decimal Tax { get; set; }
        public decimal ServiceCharge { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public List<SalesItem> SalesItems { get; set; }
       


    }


}