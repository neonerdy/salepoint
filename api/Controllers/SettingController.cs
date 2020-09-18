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
    public class SettingController : ControllerBase
    {

        private readonly ILogger<SettingController> logger;
        private AppDbContext context;

        public SettingController(ILogger<SettingController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var setting = await context.Settings.FindAsync(id);
                return Ok(setting);
            }
            catch(Exception ex)
            {
                 logger.LogError(ex.ToString());   
            }

            return Ok();
        }


        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Setting setting)
        {
            int result = 0;
            try
            {
                context.Update(setting);
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

