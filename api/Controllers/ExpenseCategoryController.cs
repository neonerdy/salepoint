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
    public class ExpenseCategoryController : ControllerBase
    {

        private readonly ILogger<ExpenseCategoryController> logger;
        private AppDbContext context;

        public ExpenseCategoryController(ILogger<ExpenseCategoryController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


          [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var expenseCategories = await context.ExpenseCategories.ToListAsync();
                return Ok(expenseCategories);
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
                var expenseCategories = await context.ExpenseCategories.FindAsync(id);
                return Ok(expenseCategories);
            }
            catch(Exception ex) 
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }



        [HttpPost]
        public async Task<IActionResult> Save([FromBody] ExpenseCategory expenseCategory)
        {
            int result = 0;
            try
            {
                expenseCategory.ID = Guid.NewGuid();
                context.ExpenseCategories.Add(expenseCategory);
                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }



        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ExpenseCategory expenseCategory)
        {
            int result = 0;
            try
            {
                context.Update(expenseCategory);
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
                var expenseCategory = await context.ExpenseCategories.FindAsync(id);
                context.Remove(expenseCategory);
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