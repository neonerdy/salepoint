using System;

namespace SalePointAPI.Models
{
    public class OutletEmployee
    {
        public Guid ID { get; set; }
        public Guid OutletId { get; set; }
        public Guid EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }

}