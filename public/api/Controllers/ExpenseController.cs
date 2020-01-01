using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SalePointAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace SalePointAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ExpenseController : Controller
    {
        private AppDbContext context;
        
        public ExpenseController() {
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var month = DateTime.Now.Month;
            var year = DateTime.Now.Year;

            var expenses = await context.Expenses
                .Include(e=>e.Category)
                .Include(e=>e.Account)
                .Select(e=>new{
                    e.ID,
                    e.OutletId,
                    e.Date,
                    e.CategoryId,
                    e.AccountId,
                    CategoryName = e.Category.CategoryName,
                    CategoryGroup = e.Category.CategoryGroup,
                    CategoryBudget = e.Category.Budget,
                    AccountName = e.Account.AccountName,
                    e.Amount,
                    e.Notes,
                    e.CreatedDate,
                    e.ModifiedDate
                })
                .Where(e=>e.Date.Month == month && e.Date.Year == year)
                .OrderByDescending(s=>s.CreatedDate)
                .ToListAsync();
            
            
            return Ok(expenses);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var expense = await context.Expenses
                .Include(e=>e.Category)
                .Include(e=>e.Account)
                .Where(e=>e.ID == id)
                .Select(e=>new{
                    e.ID,
                    e.OutletId,
                    e.Date,
                    e.CategoryId,
                    e.AccountId,
                    e.Amount,
                    e.Notes,
                    e.CreatedDate,
                    e.ModifiedDate
                })
                .SingleOrDefaultAsync();
           
            return Ok(expense);
        }


        [HttpGet]
        public async Task<IActionResult> GetMonthly()
        {
            var month = DateTime.Now.Month;
            var year = DateTime.Now.Year;

            var expenses = await context.Expenses.Include(e=>e.Category)
                    .Where(e=>e.Date.Month == month && e.Date.Year == year)
                    .GroupBy(e=>e.Category.CategoryName)
                    .Select(g=> new {
                        CategoryName = g.Key,
                        Amount = g.Sum(e=>e.Amount)
                    }).ToListAsync();

            return Ok(expenses);    
        }

        

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Expense expense)
        {
            expense.ID = Guid.NewGuid();
            expense.CreatedDate = DateTime.Now;
            expense.ModifiedDate = DateTime.Now;
            context.Add(expense);

            var result = await context.SaveChangesAsync();
            return Ok(result);
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Expense expense)
        {
            context.Update(expense);
            expense.ModifiedDate = DateTime.Now;
            var result = await context.SaveChangesAsync();

            

            return Ok(result);
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var expense = await context.Expenses.FindAsync(id);
            context.Remove(expense);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }





    }



}