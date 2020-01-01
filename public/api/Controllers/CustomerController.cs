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
    public class CustomerController : Controller
    {
        private AppDbContext context;
        public CustomerController() {
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var customers = await context.Customers.ToListAsync();
            return Ok(customers);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var customer = await context.Customers.FindAsync(id);
            return Ok(customer);
        }


        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Customer customer)
        {
            customer.ID = Guid.NewGuid();
            context.Customers.Add(customer);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Customer customer)
        {
            context.Update(customer);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var customer = await context.Customers.FindAsync(id);
            context.Remove(customer);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


    }



}