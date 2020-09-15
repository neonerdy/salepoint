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
    public class ProductCategoryController : ControllerBase
    {

        private readonly ILogger<ProductCategoryController> logger;
        private AppDbContext context;

        public ProductCategoryController(ILogger<ProductCategoryController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var productCategories = await context.ProductCategories.ToListAsync();
                return Ok(productCategories);
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
                var productCategory = await context.ProductCategories.FindAsync(id);
                return Ok(productCategory);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }

        

        [HttpPost]
        public async Task<IActionResult> Save([FromBody] ProductCategory productCategory)
        {
            int result = 0;
            try
            {
                productCategory.ID = Guid.NewGuid();
                context.ProductCategories.Add(productCategory);
                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }



        [HttpPut]
        public async Task<IActionResult> Update([FromBody] ProductCategory productCategory)
        {
            int result = 0;
            try
            {
                context.Update(productCategory);
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
                var productCategory = await context.ProductCategories.FindAsync(id);
                context.Remove(productCategory);
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