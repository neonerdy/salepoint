
using System;
using System.Collections.Generic;

namespace SalePointAPI.Models
{
    public class Outlet
    {
        public Guid ID { get; set; }
        public string OutletName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string Phone { get; set; }
        public string Manager { get; set; }
        public DateTime OpeningDate { get; set; }
        public List<OutletEmployee> OutletEmployees { get; set; }
        
    }



}