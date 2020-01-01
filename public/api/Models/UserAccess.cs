using System;


namespace SalePointAPI.Models
{

    public class UserAccess
    {
        public Guid ID { get; set; }
        public Guid UserId { get; set; }
        public string ComponentName { get; set; }
        public string ComponentType { get; set; }
        public bool IsView { get; set; }
        public bool IsCreate { get; set; }
        public bool IsUpdate { get; set; }
        public bool IsDelete { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
         
    }

}