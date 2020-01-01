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
    public class ProductController : Controller
    {
        private AppDbContext context;
        public ProductController() {
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await context.Products
                .Include(p=>p.Category)
                .OrderBy(p=>p.ProductName)
                .ToListAsync();
        
            return Ok(products);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var product = await context.Products
                .Include(p=>p.Category)
                .Where(p=>p.ID == id)
                .SingleOrDefaultAsync();
            
            return Ok(product);
        }


        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Product product)
        {
            product.ID = Guid.NewGuid();
            product.CreatedDate = DateTime.Now;
            product.ModifiedDate = DateTime.Now;
            
            context.Products.Add(product);
            var result = await context.SaveChangesAsync();

            return Ok(result);

        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Product product)
        {
            product.ModifiedDate = DateTime.Now;
            context.Products.Update(product);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var product = await context.Products.FindAsync(id);
            context.Remove(product);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }



    }



}