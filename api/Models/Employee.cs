using System;

namespace SalePointAPI.Models
{

    public class Employee
    {
        public Guid ID { get; set; }
        public string EmployeeName { get; set; }
        public Guid RoleId { get; set; }
        public Role Role { get; set; }
        public DateTime JoinDate { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
    }


}