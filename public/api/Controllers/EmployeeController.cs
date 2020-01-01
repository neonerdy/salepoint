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
    public class EmployeeController : Controller
    {
        private AppDbContext context;
        public EmployeeController() {
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await context.Employees
                .Include(e=>e.JobTitle)
                .OrderBy(e=>e.EmployeeName)
                .ToListAsync();
          
            return Ok(employees);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var employee = await context.Employees.Where(e=>e.ID == id)
                .SingleOrDefaultAsync();
                
            return Ok(employee);
        }


        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Employee employee)
        {
            employee.ID = Guid.NewGuid();
            context.Add(employee);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Employee employee)
        {
            context.Update(employee);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var employee = await context.Employees.FindAsync(id);
            context.Remove(employee);

            var result = await context.SaveChangesAsync();
            return Ok(result);
        }



    }


}