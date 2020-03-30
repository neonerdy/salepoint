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
    public class UserController : ControllerBase
    {

        private readonly ILogger<UserController> logger;
        private AppDbContext context;

        public UserController(ILogger<UserController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }

        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var users = await context.Users
                    .Include(u=>u.Employee)
                    .ToListAsync();
                
                return Ok(users);
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
                var user = await context.Users.FindAsync(id);
                return Ok(user);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }
            
            return Ok();

        }



        [HttpPost]
        public async Task<IActionResult> Save([FromBody] User user)
        {
            int result = 0;
            try
            {
                user.ID = Guid.NewGuid();
                user.CreatedDate = DateTime.Now;
                user.ModifiedDate = DateTime.Now;
                context.Add(user);
                
                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }



        [HttpPut]
        public async Task<IActionResult> Update([FromBody] User user)
        {
            int result = 0;
            try
            {
                user.ModifiedDate = DateTime.Now;
                context.Update(user);
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
                var user = await context.Users.FindAsync(id);
                context.Remove(user);
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
