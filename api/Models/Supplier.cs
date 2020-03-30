
using System;


namespace SalePointAPI.Models
{

    public class Supplier
    {
        public Guid ID { get; set; }
        public string SupplierName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string ZipCode { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string ContactPerson { get; set; }
        public string ContactPhone { get; set; }
        public bool IsActive { get; set; }

    }

}