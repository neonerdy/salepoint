using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class PointOfSale
    {
        public Guid ID { get; set; }
        public string SalesCode { get; set; }
        public DateTime SalesDate { get; set; }
        public Guid CustomerId { get; set; }
        public Customer Customer { get; set; }
        public Guid PaymentTypeId { get; set; }
        public PaymentType PaymentType { get; set; }
        public Guid CashierId { get; set; }
        public Employee Cashier { get; set; }
        public string Notes { get; set; }
        public decimal Amount { get; set; }
        public decimal Tax { get; set; }
        public decimal Discount { get; set; }
        public decimal ServiceCharge { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public List<PointOfSalesItem> PointOfSaleItems { get; set; }
       

    }


}