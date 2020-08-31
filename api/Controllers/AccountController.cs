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
    public class AccountController : ControllerBase
    {

        private readonly ILogger<AccountController> logger;
        private AppDbContext context;

        public AccountController(ILogger<AccountController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }

        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var accounts = await context.Accounts
                    .OrderBy(a=>a.AccountName)
                    .ToListAsync();
                
                return Ok(accounts);
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
                var accounts = await context.Accounts.FindAsync(id);
                return Ok(accounts);
            }
            catch(Exception ex) 
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }



        [HttpPost]
        public async Task<IActionResult> Save([FromBody] Account account)
        {
            int result = 0;
            try
            {
                account.ID = Guid.NewGuid();
                context.Accounts.Add(account);
                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }



        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Account account)
        {
            int result = 0;
            try
            {
                context.Update(account);
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
                var account = await context.Accounts.FindAsync(id);
                context.Remove(account);
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
