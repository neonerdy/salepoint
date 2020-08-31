using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using SalePointAPI.Models;


namespace SalePointAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ExpenseController : ControllerBase
    {

        private readonly ILogger<ExpenseController> logger;
        private AppDbContext context;

        public ExpenseController(ILogger<ExpenseController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }

        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var month = DateTime.Now.Month;
                var year = DateTime.Now.Year;

                var expenses = await context.Expenses
                    .Include(e=>e.Category)
                    .Include(e=>e.Account)
                    .Select(e=>new{
                        e.ID,
                        e.Date,
                        e.CategoryId,
                        e.AccountId,
                        CategoryName = e.Category.CategoryName,
                        MonthlyBudget = e.Category.MonthlyBudget,
                        AccountName = e.Account.AccountName,
                        e.Amount,
                        e.Description,
                        e.CreatedDate,
                        e.ModifiedDate
                    })
                    .Where(e=>e.Date.Month == month && e.Date.Year == year)
                    .OrderByDescending(s=>s.CreatedDate)
                    .ToListAsync();
                
                return Ok(expenses);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }



        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var expense = await context.Expenses
                    .Include(e=>e.Category)
                    .Include(e=>e.Account)
                    .Where(e=>e.ID == id)
                    .Select(e=>new{
                        e.ID,
                        e.Date,
                        e.CategoryId,
                        e.AccountId,
                        e.Amount,
                        e.Description,
                        e.CreatedDate,
                        e.ModifiedDate
                    })
                    .SingleOrDefaultAsync();
           
                return Ok(expense);
            }
            catch(Exception ex) 
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }



        [HttpGet]
        public async Task<IActionResult> GetMonthly()
        {
            try
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
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();    
        }



        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Expense expense)
        {
            int result = 0;
            try
            {
                expense.ID = Guid.NewGuid();
                expense.CreatedDate = DateTime.Now;
                expense.ModifiedDate = DateTime.Now;
                
                context.Expenses.Add(expense);
                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }



        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Expense expense)
        {
            int result = 0;
            try
            {
                expense.ModifiedDate = DateTime.Now;
                context.Update(expense);
                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }




        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            int result = 0;
            try
            {
                var expense = await context.Expenses.FindAsync(id);
                context.Remove(expense);
                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }
            
            return Ok(result);
        }


    }



}
