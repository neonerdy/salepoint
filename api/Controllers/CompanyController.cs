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
    public class CompanyController : ControllerBase
    {

        private readonly ILogger<AccountController> logger;
        private AppDbContext context;

        public CompanyController(ILogger<AccountController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var company = await context.CompanySetting.FindAsync(id);
                return Ok(company);
            }
            catch(Exception ex)
            {
                 logger.LogError(ex.ToString());   
            }

            return Ok();
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Company company)
        {
            int result = 0;
            try
            {
                context.Update(company);
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

