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


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {   
            try
            {
                var salesPayments = await context.SalesPayments
                    .Include(sp=>sp.Customer)
                    .Include(sp=>sp.Account)
                    .Include(sp=>sp.PaymentType)
                    .Select(sp=>new {
                        sp.ID,
                        customerName = sp.Customer.CustomerName,
                        sp.PaymentDate,
                        AccountName = sp.Account.AccountName,
                        PaymentMethod = sp.PaymentType.PaymentTypeName
                    })
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
                context.SalesPayments.Add(salesPayment);
                var invoice = await context.SalesInvoices.FindAsync(salesPayment.SalesPaymentItems[0].SalesInvoiceId);
                invoice.AmountPaid = invoice.AmountPaid + salesPayment.SalesPaymentItems[0].AmountPaid;

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
