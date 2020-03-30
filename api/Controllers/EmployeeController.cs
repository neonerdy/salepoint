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
    public class EmployeeController : ControllerBase
    {

        private readonly ILogger<EmployeeController> logger;
        private AppDbContext context;

        public EmployeeController(ILogger<EmployeeController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var employees = await context.Employees
                    .Include(e=>e.JobTitle)
                    .OrderBy(e=>e.EmployeeName)
                    .ToListAsync();
        
                return Ok(employees);
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
                var employee = await context.Employees
                    .Where(e=>e.ID == id)
                    .SingleOrDefaultAsync();
            
                return Ok(employee);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }



        
        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Employee employee)
        {
            int result = 0;
            try
            {
                employee.ID = Guid.NewGuid();
                context.Add(employee);
                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }



        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Employee employee)
        {
            int result = 0;
            try
            {
                context.Update(employee);
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
                var employee = await context.Employees.FindAsync(id);
                context.Remove(employee);
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