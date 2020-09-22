using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{

    public class RecordCounter
    {
        public Guid ID { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public int PointOfSaleLastCounter { get; set; }
        public int SalesInvoiceLastCounter { get; set; }
        public int PurchaseInvoiceLastCounter { get; set; }
    }


}