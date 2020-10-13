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
    public class PointOfSaleController : ControllerBase
    {

        private readonly ILogger<PointOfSaleController> logger;
        private AppDbContext context;
        private const string SETTING_ID="E8DC5367-D553-4232-E621-08D84993E0DB";

        public PointOfSaleController(ILogger<PointOfSaleController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }


        [HttpPost()]
        public async Task<IActionResult> GetByDate([FromBody] DateRangeViewModel dateRange)
        {   
            try
            {
                var pointOfSales = await context.PointOfSales
                    .Include(pos=>pos.Cashier)
                    .Include(pos=>pos.PaymentType)
                    .Select(pos=>new {
                        pos.ID,
                        pos.SalesCode,
                        pos.SalesDate,
                        CustomerName = pos.Customer.CustomerName,
                        Cashier = pos.Cashier.EmployeeName,
                        PaymentType = pos.PaymentType.PaymentTypeName,
                        pos.Total,
                        pos.Status,
                        pos.CreatedDate,
                    })
                    .Where(pos=>pos.SalesDate.Date >= dateRange.StartDate.Date && pos.SalesDate.Date <= dateRange.EndDate.Date)
                    .OrderByDescending(pos=>pos.SalesDate)
                    .ToListAsync();
            
                return Ok(pointOfSales);
            }
            catch(Exception ex) 
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }


        [HttpPost()]
        public async Task<IActionResult> GetBySearch([FromBody] SearchViewModel search)
        {   
            try
            {
                var pointOfSales = await context.PointOfSales
                    .Include(pos=>pos.Cashier)
                    .Select(pos=>new {
                        pos.ID,
                        pos.SalesCode,
                        pos.SalesDate,
                        CustomerName = pos.Customer.CustomerName,
                        pos.Total,
                        pos.Status,
                        pos.CreatedDate,
                    })
                    .Where(pos=>pos.SalesDate.Date >= search.StartDate.Date && pos.SalesDate.Date <= search.EndDate.Date)
                    .Where(pos=>pos.SalesCode.Contains(search.Keyword) || pos.CustomerName.Contains(search.Keyword) || pos.Status.Contains(search.Keyword))
                    .OrderByDescending(pos=>pos.SalesDate)
                    .ToListAsync();
            
                return Ok(pointOfSales);
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
                var pointOfSale = await context.PointOfSales
                    .Include(pos=>pos.Customer)
                    .Include(pos=>pos.Cashier)
                    .Include(pos=>pos.PointOfSaleItems).ThenInclude(pos=>pos.Product)
                    .Select(pos=>new {
                        pos.ID,
                        pos.SalesCode,
                        pos.SalesDate,
                        CustomerName = pos.Customer.CustomerName,
                        CustomerAddress = pos.Customer.Address,
                        CustomerCity = pos.Customer.City,
                        CustomerPhone = pos.Customer.Phone,
                        CashierName = pos.Cashier.EmployeeName,
                        pos.Notes,
                        pos.Amount,
                        pos.Tax,
                        pos.Discount,
                        pos.ServiceCharge,
                        pos.Total,
                        pos.Status,
                        pos.CreatedDate,
                        pos.ModifiedDate,
                        SaleItems =  pos.PointOfSaleItems.Select(psi=>new
                        {
                            psi.ID,
                            psi.PointOfSaleId,
                            psi.ProductId,
                            ProductName = psi.Product.ProductName,
                            psi.Qty,
                            psi.Price,
                            psi.TaxPct,
                            psi.DiscountPct
                        })
                    })
                    .Where(psi=>psi.ID == id)
                    .SingleOrDefaultAsync();
                
                
                return Ok(pointOfSale);

            }
            catch(Exception ex) 
            {
                logger.LogError(ex.ToString());
            }

            return Ok();

        }



        [HttpPost()]
        public async Task<IActionResult> GetByCategory([FromBody] SearchViewModel search)
        {   
            try
            {
                List<PointOfSaleViewModel> pointOfSales = new List<PointOfSaleViewModel>();

                string condition = string.Empty;
        
                if (!string.IsNullOrEmpty(search.Keyword)) 
                {
                    condition = "WHERE (pos.SalesDate >= '" + search.StartDate.Date.ToString("MM/dd/yyyy") 
                            + "' AND pos.SalesDate <= '" + search.EndDate.Date.ToString("MM/dd/yyyy") + "' "
                            + ") AND (pc.ID = '" + search.Keyword + "')";  
                } 
                else
                {
                    condition = "WHERE pos.SalesDate >= '" + search.StartDate.Date.ToString("MM/dd/yyyy") 
                            + "' AND pos.SalesDate <= '" + search.EndDate.Date.ToString("MM/dd/yyyy") + "'";
                }

                string sql = "SELECT pos.ID, pos.SalesCode,pos.SalesDate, c.CustomerName, e.EmployeeName as Cashier, "
                        + "pt.PaymentTypeName as PaymentType, pos.Total, pos.Status from PointOfSales pos "
                        + "INNER JOIN Customers c ON pos.CustomerId = c.ID "
                        + "INNER JOIN PaymentTypes pt ON pos.PaymentTypeId = pt.ID "
                        + "INNER JOIN Employees e ON pos.CashierId = e.ID "
                        + "LEFT JOIN PointOfSaleItems psi ON psi.PointOfSaleId = pos.ID "
                        + "LEFT JOIN Products p ON P.ID = psi.ProductId "
                        + "LEFT JOIN ProductCategories pc ON pc.ID = p.CategoryId "
                        + condition + " "
                        + "GROUP BY pos.ID, pos.SalesCode, pos.SalesDate, c.CustomerName, e.EmployeeName ,pt.PaymentTypeName, "
                        + "pos.Total, pos.Status";

                using (var command = context.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = sql;
                    context.Database.OpenConnection();
                 
                    using (var rdr = command.ExecuteReader())
                    {
                        while(rdr.Read())
                        {
                            var pos = new PointOfSaleViewModel();
                         
                            pos.ID = new Guid(rdr["ID"].ToString());
                            pos.SalesCode = rdr["SalesCode"].ToString();
                            pos.SalesDate = Convert.ToDateTime(rdr["SalesDate"]);
                            pos.CustomerName = rdr["CustomerName"].ToString();
                            pos.Cashier = rdr["Cashier"].ToString();
                            pos.PaymentType = rdr["PaymentType"].ToString();
                            pos.Total = Convert.ToDecimal(rdr["Total"]);
                            pos.Status = rdr["Status"].ToString();

                            pointOfSales.Add(pos);

                        }
                    }

                } 
        
                return Ok(pointOfSales);
            }
            catch(Exception ex) 
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }




        [HttpPost]
        public async Task<IActionResult> Save([FromBody] PointOfSale pointOfSale)
        {
            int result = 0;
            try
            {
                pointOfSale.SalesDate = DateTime.Now;
                pointOfSale.CreatedDate = DateTime.Now;
                pointOfSale.ModifiedDate = DateTime.Now;
                context.PointOfSales.Add(pointOfSale);

                //update stock 

                var setting = await context.Settings.FindAsync(SETTING_ID);

                foreach(var si in pointOfSale.PointOfSaleItems) 
                {
                    if (setting.IsEnableStockTracking) 
                    {
                        var product = await context.Products.Where(p=>p.ID == si.ProductId).SingleOrDefaultAsync();
                        product.Stock = product.Stock - si.Qty;
                        context.Update(product);
                    }
                }

                //update record counter

                var recordCounter = await context.RecordCounters.Where(rc=>rc.Month == DateTime.Now.Month 
                    && rc.Year == DateTime.Now.Year).SingleOrDefaultAsync();

                recordCounter.PointOfSaleLastCounter = recordCounter.PointOfSaleLastCounter + 1;     
                context.Update(recordCounter);

                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }


        [HttpGet("{id}/{status}")]
        public async Task<IActionResult> UpdateStatus(Guid id, string status)
        {
            int result = 0;
            try
            {
                var pointOfSale = await context.PointOfSales.Include(pos=>pos.PointOfSaleItems)
                    .Where(pos=>pos.ID == id).SingleOrDefaultAsync();
            
                pointOfSale.Status = status;
                context.Update(pointOfSale);  

                 //Update Stock

                var setting = await context.Settings.FindAsync(new Guid(SETTING_ID));
                if (setting.IsEnableStockTracking)
                {
                    if (status == "Canceled")
                    {
                        foreach(var si in pointOfSale.PointOfSaleItems) 
                        {
                            if (setting.IsEnableStockTracking)
                            {
                                var product = await context.Products.Where(p=>p.ID == si.ProductId).SingleOrDefaultAsync();
                                product.Stock = product.Stock + si.Qty;
                                context.Update(product);
                            }
                        }
                    }
                }

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
                var pointOfSale = await context.PointOfSales.FindAsync(id);
                context.Remove(pointOfSale);

                var pointOfSaleItems = await context.PointOfSaleItems.Where(psi=>psi.PointOfSaleId == pointOfSale.ID)
                    .ToListAsync();
                
                context.RemoveRange(pointOfSaleItems);
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