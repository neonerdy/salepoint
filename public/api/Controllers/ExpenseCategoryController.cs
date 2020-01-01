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
    public class ExpenseCategoryController : Controller
    {
        private AppDbContext context;
        public ExpenseCategoryController() {
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var expenses = await context.ExpenseCatgories.ToListAsync();
            return Ok(expenses);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var expense = await context.ExpenseCatgories.FindAsync(id);
            return Ok(expense);
        }


        [HttpPost]
        public async Task<IActionResult> Save([FromBody] ExpenseCategory category)
        {
            category.ID = Guid.NewGuid();
            context.Add(category);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ExpenseCategory category)
        {
            context.Update(category);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var category = await context.ExpenseCatgories.FindAsync(id);
            context.Remove(category);
            var result = await context.SaveChangesAsync();

            return Ok(result);

        }



    }



}