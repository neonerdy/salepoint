using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class PointOfSaleViewModel
    {
        public Guid ID { get; set; }
        public string SalesCode { get; set; }
        public DateTime SalesDate { get; set; }
        public string CustomerName { get; set; }
        public string PaymentType { get; set; }
        public string Cashier { get; set; }
        public decimal Total { get; set; }
        public string Status { get; set; }
       
    }


}