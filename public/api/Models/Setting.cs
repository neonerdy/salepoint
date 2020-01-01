using System;

namespace SalePointAPI.Models
{
    public class Setting
    {
        public Guid ID { get; set; }
        public string SettingName { get; set; }
        public string Value { get; set; }
        public string Description { get; set; }
    
    }

}