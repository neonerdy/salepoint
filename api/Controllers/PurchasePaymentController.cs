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
    public class PurchasePaymentController : ControllerBase
    {

        private readonly ILogger<PurchasePaymentController> logger;
        private AppDbContext context;

        public PurchasePaymentController(ILogger<PurchasePaymentController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetByInvoiceId(Guid id)
        {   
            try
            {
                var purchasePayments = await context.PurchasePayments
                    .Include(pp=>pp.PaymentType)
                    .Select(sp=>new {
                        sp.ID,
                        sp.PurchaseInvoiceId,
                        sp.PaymentDate,
                        PaymentMethod = sp.PaymentType.PaymentTypeName,
                        AmountPaid = sp.AmountPaid,
                        Notes = sp.Notes
                    })
                    .Where(sp=>sp.PurchaseInvoiceId == id)
                    .OrderByDescending(pp=>pp.PaymentDate)
                    .ToListAsync();
            
                return Ok(purchasePayments);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());        
            }

            return Ok();

        }

       


        [HttpPost]
        public async Task<IActionResult> Save([FromBody] PurchasePayment purchasePayment) 
        {
            int result = 0;
            try
            {

                purchasePayment.ID = Guid.NewGuid();
                context.PurchasePayments.Add(purchasePayment);
                
                var invoice = await context.PurchaseInvoices.FindAsync(purchasePayment.PurchaseInvoiceId);
                invoice.AmountPaid = invoice.AmountPaid + purchasePayment.AmountPaid;

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
                var purchasePayment = await context.PurchasePayments.FindAsync(id);

                var purchaseInvoice = await context.PurchaseInvoices.Where(pi=>pi.ID == purchasePayment.PurchaseInvoiceId)
                    .SingleOrDefaultAsync();

                var paymentDiff = purchaseInvoice.AmountPaid - purchasePayment.AmountPaid;  
                if (paymentDiff > 0) {
                    purchaseInvoice.AmountPaid = paymentDiff;     
                } else {
                    purchaseInvoice.AmountPaid = 0;
                    purchaseInvoice.Status = "New";     
                }

                context.Update(purchaseInvoice);
                context.Remove(purchasePayment);

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
