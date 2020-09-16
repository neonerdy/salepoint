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
    public class ProductController : ControllerBase
    {

        private readonly ILogger<ProductController> logger;
        private AppDbContext context;

        public ProductController(ILogger<ProductController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var products = await context.Products
                    .Include(p=>p.Category)
                    .Include(p=>p.Unit)
                    .OrderBy(p=>p.ProductName)
                    .ToListAsync();
            
                return Ok(products);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }


        [HttpGet("{search}")]
        public async Task<IActionResult> GetBySearch(string search)
        {
            try
            {
                var products = await context.Products
                    .Include(p=>p.Category)
                    .Include(p=>p.Unit)
                    .Where(p=>p.ProductCode.Contains(search) || p.ProductName.Contains(search))
                    .OrderBy(p=>p.ProductName)
                    .ToListAsync();
            
                return Ok(products);
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
                var product = await context.Products
                    .Include(p=>p.Category)
                    .Include(p=>p.Unit)
                    .Where(p=>p.ID == id)
                    .SingleOrDefaultAsync();
                
                return Ok(product);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }
        


        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Product product)
        {
            int result = 0;
            try
            {
                product.ID = Guid.NewGuid();
                product.CreatedDate = DateTime.Now;
                product.ModifiedDate = DateTime.Now;
                
                context.Products.Add(product);
                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }
            
            return Ok(result);

        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Product product)
        {
            int result = 0;    
            try
            {
                product.ModifiedDate = DateTime.Now;
                context.Products.Update(product);
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
                var product = await context.Products.FindAsync(id);
                context.Remove(product);
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