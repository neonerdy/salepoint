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


          [HttpGet]
        public async Task<IActionResult> GetAll()
        {   
            try
            {
                var purchasePayments = await context.PurchasePayments
                    .Include(pp=>pp.Supplier)
                    .Include(pp=>pp.Account)
                    .Include(pp=>pp.PaymentType)
                    .Select(pp=>new {
                        pp.ID,
                        SupplierName = pp.Supplier.SupplierName,
                        pp.PaymentDate,
                        AccountName = pp.Account.AccountName,
                        PaymentMethod = pp.PaymentType.PaymentTypeName,
                        pp.TotalAmountPaid
                    })
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
                context.PurchasePayments.Add(purchasePayment);
                var invoice = await context.PurchaseInvoices.FindAsync(purchasePayment.PurchasePaymentItems[0].PurchaseInvoiceId);
                invoice.AmountPaid = invoice.AmountPaid + purchasePayment.PurchasePaymentItems[0].AmountPaid;

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





    }



}
