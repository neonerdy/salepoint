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
    public class PointOfSaleController : ControllerBase
    {

        private readonly ILogger<PointOfSaleController> logger;
        private AppDbContext context;

        public PointOfSaleController(ILogger<PointOfSaleController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {   
            try
            {
                var pointOfSales = await context.PointOfSales
                    .Include(pos=>pos.Cashier)
                    .Select(pos=>new {
                        pos.ID,
                        pos.SalesCode,
                        pos.SalesDate,
                        CashierName = pos.Cashier.EmployeeName,
                        pos.Total,
                        pos.Status,
                        pos.CreatedDate,
                    })
                    .OrderByDescending(pos=>pos.CreatedDate)
                    .ToListAsync();
            
                return Ok(pointOfSales);
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
                var pointOfSale = await context.PointOfSales
                    .Include(pos=>pos.Customer)
                    .Include(pos=>pos.Cashier)
                    .Include(pos=>pos.PointOfSaleItems).ThenInclude(pos=>pos.Product)
                    .Select(pos=>new {
                        pos.ID,
                        pos.SalesCode,
                        pos.SalesDate,
                        CustomerName = pos.Customer.CustomerName,
                        CustomerAddress = pos.Customer.Address,
                        CustomerCity = pos.Customer.City,
                        CustomerPhone = pos.Customer.Phone,
                        CashierName = pos.Cashier.EmployeeName,
                        pos.Notes,
                        pos.Amount,
                        pos.Tax,
                        pos.Discount,
                        pos.Total,
                        pos.Status,
                        pos.CreatedDate,
                        pos.ModifiedDate,
                        SaleItems =  pos.PointOfSaleItems.Select(psi=>new
                        {
                            psi.ID,
                            psi.PointOfSaleId,
                            psi.ProductId,
                            ProductName = psi.Product.ProductName,
                            psi.Qty,
                            psi.Price,
                            psi.TaxPct,
                            psi.DiscountPct
                        })
                    })
                    .Where(psi=>psi.ID == id)
                    .SingleOrDefaultAsync();
                
                
                return Ok(pointOfSale);

            }
            catch(Exception ex) 
            {
                logger.LogError(ex.ToString());
            }

            return Ok();

        }




        [HttpPost]
        public async Task<IActionResult> Save([FromBody] PointOfSale pointOfSale)
        {
            int result = 0;
            try
            {
                pointOfSale.SalesDate = DateTime.Now;
                pointOfSale.CreatedDate = DateTime.Now;
                pointOfSale.ModifiedDate = DateTime.Now;
                context.PointOfSales.Add(pointOfSale);

                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }



        [HttpPut]
        public async Task<IActionResult> Update([FromBody] PointOfSale pointOfSale)
        {
            int result = 0;
            try
            {
                pointOfSale.ModifiedDate = DateTime.Now;
                context.Update(pointOfSale);
                context.Database.ExecuteSqlRaw("DELETE FROM PointOfSaleItems WHERE SalesId = {0}",
                     new object[] { pointOfSale.ID});

                foreach(var si in pointOfSale.PointOfSaleItems) {
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
                var pointOfSale = await context.PointOfSales.FindAsync(id);
                pointOfSale.Status = status;
                context.Update(pointOfSale);     

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
                var pointOfSale = await context.PointOfSales.FindAsync(id);
                context.Remove(pointOfSale);
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