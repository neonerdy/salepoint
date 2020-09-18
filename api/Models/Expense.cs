using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SalePointAPI.Models
{
   public class Expense    
   {
       public Guid ID { get; set; }
       public DateTime Date { get; set; }
       public Guid CategoryId { get; set; }
       public ExpenseCategory Category { get; set; }
       public Guid AccountId { get; set; }
       public Account Account { get; set; }
       public decimal Amount { get; set; }

       [NotMapped]
       public decimal CurrentAmount { get; set;}
       public string Description { get; set; }
       public DateTime CreatedDate { get; set; }
       public DateTime ModifiedDate { get; set; }

   }

}