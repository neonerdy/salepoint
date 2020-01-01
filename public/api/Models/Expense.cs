using System;
using System.Collections.Generic;


namespace SalePointAPI.Models
{
   public class Expense    
   {
       public Guid ID { get; set; }
       public Guid OutletId { get; set; }
       public DateTime Date { get; set; }
       public Guid CategoryId { get; set; }
       public ExpenseCategory Category { get; set; }
       public Guid AccountId { get; set; }
       public Account Account { get; set; }
       public decimal Amount { get; set; }
       public string Notes { get; set; }
       public DateTime CreatedDate { get; set; }
       public DateTime ModifiedDate { get; set; }


   
   }

}