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
    public class CustomerController : ControllerBase
    {

        private readonly ILogger<CustomerController> logger;
        private AppDbContext context;

        public CustomerController(ILogger<CustomerController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var customers = await context.Customers.ToListAsync();
                return Ok(customers);
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
                var customer = await context.Customers.FindAsync(id);
                return Ok(customer);
            }
            catch(Exception ex)
            {
                 logger.LogError(ex.ToString());   
            }

            return Ok();
        }
        


        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Customer customer)
        {
            int result = 0;
            try
            {
                customer.ID = Guid.NewGuid();
                context.Customers.Add(customer);
                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }



        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Customer customer)
        {
            int result = 0;
            try
            {
                context.Update(customer);
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
                var customer = await context.Customers.FindAsync(id);
                context.Remove(customer);
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