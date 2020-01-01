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
    public class ProductCategoryController : Controller
    {
        private AppDbContext context;
        public ProductCategoryController() {
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await context.ProductCategories
                .OrderBy(c=>c.CategoryName)
                .ToListAsync();
            
            return Ok(categories);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var category = await context.ProductCategories.FindAsync(id);
            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] ProductCategory category)
        {
            category.ID = Guid.NewGuid();
            context.Add(category);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ProductCategory category)
        {
            context.Update(category);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var category = await context.ProductCategories.FindAsync(id);
            context.Remove(category);
            var result = await context.SaveChangesAsync();

            return Ok(result);
       
        }





    }



}