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
    public class SupplierController : Controller
    {
        private AppDbContext context;
        
        public SupplierController() {
            context = new AppDbContext();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var suppliers = await context.Suppliers.ToListAsync();
            return Ok(suppliers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var supplier = await context.Suppliers.FindAsync(id);
            return Ok(supplier);
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Supplier supplier)
        {
            supplier.ID = Guid.NewGuid();
            context.Add(supplier);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Supplier supplier)
        {
            context.Update(supplier);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var supplier = await context.Suppliers.FindAsync(id);
            context.Remove(supplier);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }
 




    }





}