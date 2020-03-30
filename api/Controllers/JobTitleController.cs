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
    public class JobTitleController : ControllerBase
    {

        private readonly ILogger<JobTitleController> logger;
        private AppDbContext context;

        public JobTitleController(ILogger<JobTitleController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var jobTitles = await context.JobTitles.ToListAsync();
                return Ok(jobTitles);
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
                var jobTitle = await context.JobTitles.FindAsync(id);
                return Ok(jobTitle);
            }
            catch(Exception ex) 
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }



        [HttpPost]
        public async Task<IActionResult> Save([FromBody] JobTitle jobTitle)
        {
            int result = 0;
            try
            {
                jobTitle.ID = Guid.NewGuid();
                context.JobTitles.Add(jobTitle);
                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }



        [HttpPut]
        public async Task<IActionResult> Update([FromBody] JobTitle jobTitle)
        {
            int result = 0;
            try
            {
                context.Update(jobTitle);
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
                var jobTitle = await context.JobTitles.FindAsync(id);
                context.Remove(jobTitle);
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