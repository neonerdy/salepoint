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
    public class RoleAccessController : ControllerBase
    {

        private readonly ILogger<RoleAccessController> logger;
        private AppDbContext context;

        public RoleAccessController(ILogger<RoleAccessController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var roles = await context.RoleAccesses
                    .Include(ra=>ra.Role)
                    .OrderBy(ra=>ra.Role.RoleName)
                    .ToListAsync();
                return Ok(roles);
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
                var role = await context.RoleAccesses.FindAsync(id);
                return Ok(role);
            }
            catch(Exception ex) 
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }



        [HttpPost]
        public async Task<IActionResult> Save([FromBody] RoleAccess roleAccess)
        {
            int result = 0;
            try
            {
                roleAccess.ID = Guid.NewGuid();
                context.RoleAccesses.Add(roleAccess);
                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }



        [HttpPut]
        public async Task<IActionResult> Update([FromBody] RoleAccess roleAccess)
        {
            int result = 0;
            try
            {
                context.Update(roleAccess);
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
                var role = await context.RoleAccesses.FindAsync(id);
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
