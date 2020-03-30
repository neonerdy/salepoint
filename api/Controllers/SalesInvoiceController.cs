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
    public class SalesInvoiceController : ControllerBase
    {

        private readonly ILogger<SalesInvoiceController> logger;
        private AppDbContext context;

        public SalesInvoiceController(ILogger<SalesInvoiceController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


         [HttpGet]
        public async Task<IActionResult> GetAll() 
        {
            try
            {
                var salesInvoices = await context.SalesInvoices
                    .Include(si=>si.Customer)
                    .Select(si=>new {
                        si.ID,
                        si.InvoiceCode,
                        CustomerName = si.Customer.CustomerName,
                        si.InvoiceDate,
                        si.Total,
                        si.AmountPaid,
                        si.Status,
                        si.CreatedDate,
                    })
                    .OrderByDescending(so=>so.CreatedDate)
                    .ToListAsync();
                

                return Ok(salesInvoices);
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
                var salesInvoice = await context.SalesInvoices
                    .Include(si=>si.Customer)
                    .Include(si=>si.SalesPerson)
                    .Include(si=>si.SalesInvoiceItems).ThenInclude(si=>si.Product)
                    .Select(si=>new {
                        si.ID,
                        si.InvoiceCode,
                        si.CustomerId,
                        CustomerName = si.Customer.CustomerName,
                        CustomerAddress = si.Customer.Address,
                        CustomerCity = si.Customer.City,
                        CustomerPhone = si.Customer.Phone,
                        si.SalesPersonId,
                        SalesPerson = si.SalesPerson.EmployeeName,
                        si.InvoiceDate,
                        si.DueDate,
                        si.Notes,
                        si.Amount,
                        si.AmountPaid,
                        si.Tax,
                        si.Discount,
                        si.Total,
                        si.Status,
                        si.CreatedDate,
                        si.ModifiedDate,
                        salesInvoiceItems =  si.SalesInvoiceItems.Select(sii=>new
                        {
                                sii.ID,
                                sii.SalesInvoiceId,
                                sii.ProductId,
                                ProductName = sii.Product.ProductName,
                                sii.Qty,
                                sii.Price,
                                sii.TaxPct,
                                sii.DiscountPct
                        })
                    })
                    .Where(so=>so.ID == id)
                    .SingleOrDefaultAsync();
                
                return Ok(salesInvoice);

            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();

        }



        [HttpPost]
        public async Task<IActionResult> Save([FromBody] SalesInvoice salesInvoice)
        {
            int result = 0;
            try
            {
                salesInvoice.CreatedDate = DateTime.Now;
                salesInvoice.ModifiedDate = DateTime.Now;
                context.SalesInvoices.Add(salesInvoice);

                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }




        [HttpPut]
        public async Task<IActionResult> Update([FromBody] SalesInvoice salesInvoice)
        {
            int result = 0;
            try
            {
                salesInvoice.ModifiedDate = DateTime.Now;
                context.Update(salesInvoice);
                context.Database.ExecuteSqlRaw("DELETE FROM SalesInvoiceItems WHERE SalesInvoiceId = {0}",
                     new object[]{salesInvoice.ID});
            
                foreach(var sii in salesInvoice.SalesInvoiceItems) {
                    context.Add(sii);
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
                var salesInvoice = await context.SalesInvoices.FindAsync(id);
                salesInvoice.Status = status;
                context.Update(salesInvoice);     

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
                var salesInvoice = await context.SalesInvoices.FindAsync(id);
                context.Remove(salesInvoice);

                var salesInvoiceItems = salesInvoice.SalesInvoiceItems.Where(sii => sii.SalesInvoiceId == id);
                context.RemoveRange(salesInvoiceItems);
            
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
