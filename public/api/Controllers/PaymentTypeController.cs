using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SalePointAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace SalePointAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    public class PaymentTypeController : Controller
    {
        private AppDbContext context;
        
        public PaymentTypeController() {
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var paymentTypes = await context.PaymentTypes.ToListAsync();
            return Ok(paymentTypes);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var paymentType = await context.PaymentTypes.FindAsync(id);
            return Ok(paymentType);
        }


        [HttpPost]
        public async Task<IActionResult> Save([FromBody] PaymentType paymentType)
        {
            paymentType.ID = Guid.NewGuid();
            context.Add(paymentType);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] PaymentType paymentType)
        {
            context.Update(paymentType);
            var result = await context.SaveChangesAsync();

            return Ok(result);
        }




        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var paymentType = await context.PaymentTypes.FindAsync(id);
            context.Remove(paymentType);
            var result = await context.SaveChangesAsync();

            return Ok(result);

        }






    }



}
