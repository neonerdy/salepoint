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
    public class ExpenseGroupController : Controller
    {
        private AppDbContext context;
        
        public ExpenseGroupController() {
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var expenseGroups = await context.ExpenseGroups.ToListAsync();
            return Ok(expenseGroups);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var expenseGroup = await context.ExpenseGroups.FindAsync(id);
            return Ok(expenseGroup);
        }


        [HttpPost]
        public async Task<IActionResult> Save([FromBody] ExpenseGroup expenseGroup)
        {
            expenseGroup.ID = Guid.NewGuid();
            context.Add(expenseGroup);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ExpenseGroup expenseGroup)
        {
            context.Update(expenseGroup);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var expenseGroup = await context.ExpenseGroups.FindAsync(id);
            context.Remove(expenseGroup);
            var result = await context.SaveChangesAsync();

            return Ok(result);

        }




    }



}
