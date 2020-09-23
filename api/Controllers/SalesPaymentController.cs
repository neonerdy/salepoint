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
    public class SalesPaymentController : ControllerBase
    {

        private readonly ILogger<SalesPaymentController> logger;
        private AppDbContext context;

        public SalesPaymentController(ILogger<SalesPaymentController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetByInvoiceId(Guid id)
        {   
            try
            {
                var salesPayments = await context.SalesPayments
                    .Include(sp=>sp.PaymentType)
                    .Select(sp=>new {
                        sp.ID,
                        sp.SalesInvoiceId,
                        sp.PaymentDate,
                        PaymentMethod = sp.PaymentType.PaymentTypeName,
                        AmountPaid = sp.AmountPaid,
                        Notes = sp.Notes
                    })
                    .Where(sp=>sp.SalesInvoiceId == id)
                    .OrderByDescending(pp=>pp.PaymentDate)
                    .ToListAsync();
            
                return Ok(salesPayments);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());        
            }

            return Ok();

        }



        [HttpPost]
        public async Task<IActionResult> Save([FromBody] SalesPayment salesPayment) 
        {
            int result = 0;
            try
            {

                salesPayment.ID = Guid.NewGuid();
                context.SalesPayments.Add(salesPayment);
                
                var invoice = await context.SalesInvoices.FindAsync(salesPayment.SalesInvoiceId);
                invoice.AmountPaid = invoice.AmountPaid + salesPayment.AmountPaid;

                if (invoice.AmountPaid < invoice.Total) {
                    invoice.Status = "Partial";
                }

                if (invoice.AmountPaid ==  invoice.Total) {
                    invoice.Status = "Paid";
                }

                context.Update(invoice);
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
                var salesPayment = await context.SalesPayments.FindAsync(id);

                var salesInvoice = await context.SalesInvoices.Where(si=>si.ID == salesPayment.SalesInvoiceId)
                    .SingleOrDefaultAsync();

                var paymentDiff = salesInvoice.AmountPaid - salesPayment.AmountPaid;  
                if (paymentDiff > 0) {
                    salesInvoice.AmountPaid = paymentDiff;     
                } else {
                    salesInvoice.AmountPaid = 0;
                    salesInvoice.Status = "New";     
                }

                context.Update(salesInvoice);

                context.Remove(salesPayment);
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
