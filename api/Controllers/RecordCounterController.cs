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



    }



}


