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
    public class SalesReceiptController : ControllerBase
    {

        private readonly ILogger<SalesReceiptController> logger;
        private AppDbContext context;

        public SalesReceiptController(ILogger<SalesReceiptController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {   
            try
            {
                var salesReceipts = await context.SalesReceipts
                    .Include(sr=>sr.Cashier)
                    .Select(sr=>new {
                        sr.ID,
                        sr.SalesCode,
                        sr.SalesDate,
                        CashierName = sr.Cashier.EmployeeName,
                        sr.Total,
                        sr.Status,
                        sr.CreatedDate,
                    })
                    .OrderByDescending(sr=>sr.CreatedDate)
                    .ToListAsync();
            
                return Ok(salesReceipts);
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
                var salesReceipt = await context.SalesReceipts
                    .Include(sr=>sr.Cashier)
                    .Include(sr=>sr.SalesReceiptItems).ThenInclude(sr=>sr.Product)
                    .Select(sr=>new {
                        sr.ID,
                        sr.SalesCode,
                        sr.SalesDate,
                        sr.Cashier.EmployeeName,
                        sr.Notes,
                        sr.Amount,
                        sr.Tax,
                        sr.Discount,
                        sr.Total,
                        sr.Status,
                        sr.CreatedDate,
                        sr.ModifiedDate,
                        salesReceiptItems =  sr.SalesReceiptItems.Select(sri=>new
                        {
                            sri.ID,
                            sri.SalesId,
                            sri.ProductId,
                            ProductName = sri.Product.ProductName,
                            sri.Qty,
                            sri.Price,
                            sri.TaxPct,
                            sri.DiscountPct
                        })
                    })
                    .Where(sr=>sr.ID == id)
                    .SingleOrDefaultAsync();
                
                
                return Ok(salesReceipt);

            }
            catch(Exception ex) 
            {
                logger.LogError(ex.ToString());
            }

            return Ok();

        }




        [HttpPost]
        public async Task<IActionResult> Save([FromBody] SalesReceipt salesReceipt)
        {
            int result = 0;
            try
            {
                salesReceipt.CreatedDate = DateTime.Now;
                salesReceipt.ModifiedDate = DateTime.Now;
                context.SalesReceipts.Add(salesReceipt);

                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }



        [HttpPut]
        public async Task<IActionResult> Update([FromBody] SalesReceipt salesReceipt)
        {
            int result = 0;
            try
            {
                salesReceipt.ModifiedDate = DateTime.Now;
                context.Update(salesReceipt);
                context.Database.ExecuteSqlRaw("DELETE FROM SalesReceiptItems WHERE SalesId = {0}",
                     new object[] { salesReceipt.ID});

                foreach(var si in salesReceipt.SalesReceiptItems) {
                    context.Add(si);
                }
            
                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }
          

            return Ok(result);
        }
        


        [HttpGet("{id}/{status}")]
        public async Task<IActionResult> UpdateStatus(Guid id, string status)
        {
            int result = 0;
            try
            {
                var salesReceipt = await context.SalesReceipts.FindAsync(id);
                salesReceipt.Status = status;
                context.Update(salesReceipt);     

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
                var salesReceipt = await context.SalesReceipts.FindAsync(id);
                context.Remove(salesReceipt);
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