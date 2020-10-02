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
        private const string SETTING_ID="E8DC5367-D553-4232-E621-08D84993E0DB";

        public PointOfSaleController(ILogger<PointOfSaleController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


        [HttpPost()]
        public async Task<IActionResult> GetByDate([FromBody] DateRangeViewModel dateRange)
        {   
            try
            {
                var pointOfSales = await context.PointOfSales
                    .Include(pos=>pos.Cashier)
                    .Select(pos=>new {
                        pos.ID,
                        pos.SalesCode,
                        pos.SalesDate,
                        CustomerName = pos.Customer.CustomerName,
                        pos.Total,
                        pos.Status,
                        pos.CreatedDate,
                    })
                    .Where(pos=>pos.SalesDate.Date >= dateRange.StartDate.Date && pos.SalesDate.Date <= dateRange.EndDate.Date)
                    .OrderByDescending(pos=>pos.SalesDate)
                    .ToListAsync();
            
                return Ok(pointOfSales);
            }
            catch(Exception ex) 
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }


        [HttpPost()]
        public async Task<IActionResult> GetBySearch([FromBody] SearchViewModel search)
        {   
            try
            {
                var pointOfSales = await context.PointOfSales
                    .Include(pos=>pos.Cashier)
                    .Select(pos=>new {
                        pos.ID,
                        pos.SalesCode,
                        pos.SalesDate,
                        CustomerName = pos.Customer.CustomerName,
                        pos.Total,
                        pos.Status,
                        pos.CreatedDate,
                    })
                    .Where(pos=>pos.SalesDate.Date >= search.StartDate.Date && pos.SalesDate.Date <= search.EndDate.Date)
                    .Where(pos=>pos.SalesCode.Contains(search.Keyword) || pos.CustomerName.Contains(search.Keyword) || pos.Status.Contains(search.Keyword))
                    .OrderByDescending(pos=>pos.SalesDate)
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
                        pos.ServiceCharge,
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

                //update stock 

                var setting = await context.Settings.FindAsync(SETTING_ID);

                foreach(var si in pointOfSale.PointOfSaleItems) 
                {
                    if (setting.IsEnableStockTracking) 
                    {
                        var product = await context.Products.Where(p=>p.ID == si.ProductId).SingleOrDefaultAsync();
                        product.Stock = product.Stock - si.Qty;
                        context.Update(product);
                    }
                }

                //update record counter

                var recordCounter = await context.RecordCounters.Where(rc=>rc.Month == DateTime.Now.Month 
                    && rc.Year == DateTime.Now.Year).SingleOrDefaultAsync();

                recordCounter.PointOfSaleLastCounter = recordCounter.PointOfSaleLastCounter + 1;     
                context.Update(recordCounter);

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

                var pointOfSaleItems = await context.PointOfSaleItems.Where(psi=>psi.PointOfSaleId == pointOfSale.ID)
                    .ToListAsync();
                
                context.RemoveRange(pointOfSaleItems);

                //Update Stock

                var setting = await context.Settings.FindAsync(SETTING_ID);

                foreach(var si in pointOfSale.PointOfSaleItems) 
                {
                    if (setting.IsEnableStockTracking)
                    {
                        var product = await context.Products.Where(p=>p.ID == si.ProductId).SingleOrDefaultAsync();
                        product.Stock = product.Stock + si.Qty;
                        context.Update(product);
                    }
                }

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