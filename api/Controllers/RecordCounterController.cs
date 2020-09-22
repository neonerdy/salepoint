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
    public class RecordCounterController : ControllerBase
    {

        private readonly ILogger<RecordCounterController> logger;
        private AppDbContext context;

        public RecordCounterController(ILogger<RecordCounterController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


         [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var recordCounters = await context.RecordCounters.ToListAsync();
                return Ok(recordCounters);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }


        [HttpGet("{month}/{year}")]
        public async Task<IActionResult> GetByMonth(int month, int year)
        {
            try
            {
                var recordCounter = await context.RecordCounters
                    .Where(rc=>rc.Month == month && rc.Year == year)    
                    .SingleOrDefaultAsync();
                
                return Ok(recordCounter);
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
                var recordCounter = await context.RecordCounters.FindAsync(id);
                return Ok(recordCounter);
            }
            catch(Exception ex) 
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }



        [HttpPost]
        public async Task<IActionResult> Save([FromBody] RecordCounter recordCounter)
        {
            int result = 0;
            try
            {
                recordCounter.ID = Guid.NewGuid();
                context.RecordCounters.Add(recordCounter);
                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }



        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Role role)
        {
            int result = 0;
            try
            {
                context.Update(role);
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
                var role = await context.Roles.FindAsync(id);
                context.Remove(role);
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


