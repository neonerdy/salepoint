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
    public class PurchaseInvoiceController : ControllerBase
    {

        private readonly ILogger<PurchaseInvoiceController> logger;
        private AppDbContext context;
        private const string SETTING_ID="E8DC5367-D553-4232-E621-08D84993E0DB";

        public PurchaseInvoiceController(ILogger<PurchaseInvoiceController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }



        [HttpPost()]
        public async Task<IActionResult> GetByDate([FromBody] DateRangeViewModel dateRange)
        {   
            try
            {
                var purchaseInvoices = await context.PurchaseInvoices
                    .Include(pi=>pi.Supplier)
                    .Select(pi=>new {
                        pi.ID,
                        pi.InvoiceCode,
                        SupplierName = pi.Supplier.SupplierName,
                        pi.InvoiceDate,
                        pi.Total,
                        pi.AmountPaid,
                        pi.Status,
                        pi.CreatedDate,
                    })
                    .Where(pi=>pi.InvoiceDate.Date >= dateRange.StartDate.Date && pi.InvoiceDate.Date <= dateRange.EndDate.Date)
                    .OrderByDescending(pi=>pi.InvoiceDate)
                    .ToListAsync();
            
                return Ok(purchaseInvoices);
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
                var purchaseInvoices = await context.PurchaseInvoices
                    .Include(pi=>pi.Supplier)
                    .Select(pi=>new {
                        pi.ID,
                        pi.InvoiceCode,
                        SupplierName = pi.Supplier.SupplierName,
                        pi.InvoiceDate,
                        pi.Total,
                        pi.AmountPaid,
                        pi.Status,
                        pi.CreatedDate,
                    })
                    .Where(pi=>(pi.InvoiceDate.Date >= search.StartDate.Date && pi.InvoiceDate.Date <= search.EndDate.Date))
                    .Where(pi=>pi.InvoiceCode.Contains(search.Keyword) || pi.SupplierName.Contains(search.Keyword) || pi.Status.Contains(search.Keyword))
                    .OrderByDescending(pi=>pi.InvoiceDate)
                    .ToListAsync();
            
                return Ok(purchaseInvoices);
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
                var purchaseInvoice = await context.PurchaseInvoices
                    .Include(pi=>pi.Supplier)
                    .Include(pi=>pi.PurchaseInvoiceItems).ThenInclude(pi=>pi.Product)
                    .Where(pi=>pi.ID == id)
                    .Select(pi=>new {
                        pi.ID,
                        pi.InvoiceCode,
                        SupplierId = pi.SupplierId,
                        SupplierName = pi.Supplier.SupplierName,
                        SupplierAddress = pi.Supplier.Address,
                        SupplierCity = pi.Supplier.City,
                        SupplierPhone = pi.Supplier.Phone,
                        pi.InvoiceDate,
                        pi.DueDate,
                        pi.Notes,
                        pi.Amount,
                        pi.AmountPaid,
                        pi.Tax,
                        pi.Discount,
                        pi.Total,
                        pi.Status,
                        pi.CreatedDate,
                        pi.ModifiedDate,
                        purchaseInvoiceItems = pi.PurchaseInvoiceItems.Select(pii=> new {
                            pii.ID,
                            pii.PurchaseInvoiceId,
                            pii.ProductId,
                            ProductName = pii.Product.ProductName,
                            pii.Qty,
                            pii.Price,
                            pii.TaxPct,
                            pii.DiscountPct
                        })                  
                    })
                    .SingleOrDefaultAsync();
                
                return Ok(purchaseInvoice);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }




        [HttpPost]
        public async Task<IActionResult> Save([FromBody] PurchaseInvoice purchaseInvoice)
        {
            int result = 0;
            try
            {
                purchaseInvoice.CreatedDate = DateTime.Now;
                purchaseInvoice.ModifiedDate = DateTime.Now;
                context.Add(purchaseInvoice);

                //Update record counter

                var recordCounter = await context.RecordCounters.Where(rc=>rc.Month == DateTime.Now.Month 
                    && rc.Year == DateTime.Now.Year).SingleOrDefaultAsync();

                recordCounter.PurchaseInvoiceLastCounter = recordCounter.PurchaseInvoiceLastCounter + 1;     
                context.Update(recordCounter);
              
                //update stock 

                var setting = await context.Settings.FindAsync(SETTING_ID);

                foreach(var pii in purchaseInvoice.PurchaseInvoiceItems) 
                {
                    if (setting.IsEnableStockTracking) 
                    {
                        var product = await context.Products.Where(p=>p.ID == pii.ProductId).SingleOrDefaultAsync();
                        product.Stock = product.Stock - pii.Qty;
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



        [HttpPut]
        public async Task<IActionResult> Update([FromBody] PurchaseInvoice purchaseInvoice)
        {
            int result = 0;
            try
            {
                purchaseInvoice.ModifiedDate = DateTime.Now;
                context.Update(purchaseInvoice);
                context.Database.ExecuteSqlRaw("DELETE FROM PurchaseInvoiceItems WHERE PurchaseInvoiceId = {0}" , 
                    new object[] { purchaseInvoice.ID });

                foreach(var pii in purchaseInvoice.PurchaseInvoiceItems) {
                    context.Add(pii);
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
                var purchaseInvoice = await context.PurchaseInvoices.FindAsync(id);
                purchaseInvoice.Status = status;
                context.Update(purchaseInvoice);     

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
                var purchaseInvoice = await context.PurchaseInvoices.FindAsync(id);
                context.Remove(purchaseInvoice);
                
                var purchaseInvoiceItems = await context.PurchaseInvoiceItems.Where(pii=> pii.PurchaseInvoiceId == id)
                    .ToListAsync();
                
                var purchasePayments = await context.PurchasePayments.Where(pp=>pp.PurchaseInvoiceId == id)
                    .ToListAsync();

                context.RemoveRange(purchaseInvoiceItems);
                context.RemoveRange(purchasePayments);

                //Update Stock

                var setting = await context.Settings.FindAsync(SETTING_ID);

                foreach(var pii in purchaseInvoice.PurchaseInvoiceItems) 
                {
                    if (setting.IsEnableStockTracking)
                    {
                        var product = await context.Products.Where(p=>p.ID == pii.ProductId).SingleOrDefaultAsync();
                        product.Stock = product.Stock + pii.Qty;
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
