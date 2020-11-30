using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

using SalePointAPI.Models;


namespace SalePointAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    public class SalesInvoiceController : ControllerBase
    {

        private readonly ILogger<SalesInvoiceController> logger;
        private AppDbContext context;
        private const string SETTING_ID="E8DC5367-D553-4232-E621-08D84993E0DB";

        public SalesInvoiceController(ILogger<SalesInvoiceController> logger)
        {
            this.logger = logger;
            context = new AppDbContext();
        }

        
        [HttpPost]
        public async Task<IActionResult> GetTotalSales([FromBody] DateRangeViewModel dateRange)
        {
            try
            {

                var totalPos = context.PointOfSales
                     .Where(po=>po.SalesDate.Date >= dateRange.StartDate.Date && po.SalesDate.Date <= dateRange.EndDate.Date)
                     .Sum(e=>e.Amount);  


                var totalSalesInvoice = context.SalesInvoices
                     .Where(si=>si.InvoiceDate.Date >= dateRange.StartDate.Date && si.InvoiceDate.Date <= dateRange.EndDate.Date)
                     .Sum(e=>e.Amount);  

                var totalSales = totalPos + totalSalesInvoice;

                return Ok(totalSales);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();    
        }



        [HttpPost()]
        public async Task<IActionResult> GetByDate([FromBody] DateRangeViewModel dateRange)
        {   
            try
            {
                 var salesInvoices = await context.SalesInvoices
                    .Include(si=>si.Customer)
                    .Include(si=>si.SalesPerson)
                    .Select(si=>new {
                        si.ID,
                        si.InvoiceCode,
                        CustomerName = si.Customer.CustomerName,
                        SalesPerson = si.SalesPerson.EmployeeName,
                        si.InvoiceDate,
                        si.DueDate,
                        si.Total,
                        si.AmountPaid,
                        si.Status,
                        si.CreatedDate,
                    })
                    .Where(si=>si.InvoiceDate.Date >= dateRange.StartDate.Date && si.InvoiceDate.Date <= dateRange.EndDate.Date)
                    .OrderByDescending(so=>so.InvoiceDate)
                    .ToListAsync();
                

                return Ok(salesInvoices);

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
                var salesInvoices = await context.SalesInvoices
                    .Include(si=>si.Customer)
                    .Include(si=>si.SalesPerson)
                    .Select(si=>new {
                        si.ID,
                        si.InvoiceCode,
                        CustomerName = si.Customer.CustomerName,
                        SalesPerson = si.SalesPerson.EmployeeName,
                        si.InvoiceDate,
                        si.DueDate,
                        si.Total,
                        si.AmountPaid,
                        si.Status,
                        si.CreatedDate,
                    })
                    .Where(si=>si.InvoiceDate.Date >= search.StartDate.Date && si.InvoiceDate.Date <= search.EndDate.Date)
                    .Where(si=>si.InvoiceCode.Contains(search.Keyword) || si.CustomerName.Contains(search.Keyword) || si.Status.Contains(search.Keyword))
                    .OrderByDescending(so=>so.InvoiceDate)
                    .ToListAsync();
      
                return Ok(salesInvoices);
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }




        [HttpGet]
        public async Task<IActionResult> GetAll() 
        {
            try
            {
                var salesInvoices = await context.SalesInvoices
                    .Include(si=>si.Customer)
                    .Include(si=>si.SalesPerson)
                    .Select(si=>new {
                        si.ID,
                        si.InvoiceCode,
                        CustomerName = si.Customer.CustomerName,
                        SalesPerson = si.SalesPerson.EmployeeName,
                        si.InvoiceDate,
                        si.DueDate,
                        si.Total,
                        si.AmountPaid,
                        si.Status,
                        si.CreatedDate,
                    })
                    .OrderByDescending(so=>so.CreatedDate)
                    .ToListAsync();
                

                return Ok(salesInvoices);
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
                var salesInvoice = await context.SalesInvoices
                    .Include(si=>si.Customer)
                    .Include(si=>si.SalesPerson)
                    .Include(si=>si.SalesInvoiceItems).ThenInclude(si=>si.Product)
                    .Select(si=>new {
                        si.ID,
                        si.InvoiceCode,
                        si.CustomerId,
                        CustomerName = si.Customer.CustomerName,
                        CustomerAddress = si.Customer.Address,
                        CustomerCity = si.Customer.City,
                        CustomerPhone = si.Customer.Phone,
                        si.SalesPersonId,
                        SalesPerson = si.SalesPerson.EmployeeName,
                        si.InvoiceDate,
                        si.DueDate,
                        si.Notes,
                        si.Amount,
                        si.AmountPaid,
                        si.Tax,
                        si.Discount,
                        si.Total,
                        si.Status,
                        si.CreatedDate,
                        si.ModifiedDate,
                        salesInvoiceItems =  si.SalesInvoiceItems.Select(sii=>new
                        {
                                sii.ID,
                                sii.SalesInvoiceId,
                                sii.ProductId,
                                ProductName = sii.Product.ProductName,
                                sii.Qty,
                                sii.Price,
                                sii.TaxPct,
                                sii.DiscountPct
                        })
                    })
                    .Where(so=>so.ID == id)
                    .SingleOrDefaultAsync();
                
                return Ok(salesInvoice);

            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok();

        }


        [HttpPost()]
        public async Task<IActionResult> GetByCustomer([FromBody] SearchViewModel search)
        {   
            try
            {
                List<SalesInvoiceViewModel> salesInvoices = new List<SalesInvoiceViewModel>();

                string condition = string.Empty;
        
                if (!string.IsNullOrEmpty(search.Keyword)) 
                {
                    condition = "WHERE (si.InvoiceDate >= '" + search.StartDate.Date.ToString("MM/dd/yyyy") 
                            + "' AND si.InvoiceDate <= '" + search.EndDate.Date.ToString("MM/dd/yyyy") + "' "
                            + ") AND (c.ID = '" + search.Keyword + "')";  
                } 
                else
                {
                    condition = "WHERE si.InvoiceDate >= '" + search.StartDate.Date.ToString("MM/dd/yyyy") 
                            + "' AND si.InvoiceDate <= '" + search.EndDate.Date.ToString("MM/dd/yyyy") + "'";
                }

                string sql ="SELECT  si.ID, si.InvoiceCode,c.CustomerName, si.InvoiceDate, si.DueDate, e.EmployeeName as SalesPerson,"
                          + "si.Total, si.AmountPaid, si.Status FROM SalesInvoices si "  
                          + "INNER JOIN Customers c ON si.CustomerId = c.ID " 
                          + "INNER JOIN Employees e ON si.SalesPersonId = e.ID "
                          + condition;
                          
                using (var command = context.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = sql;
                    context.Database.OpenConnection();
                 
                    using (var rdr = await command.ExecuteReaderAsync())
                    {
                        while(rdr.Read())
                        {
                            var si = new SalesInvoiceViewModel();
                         
                            si.ID = new Guid(rdr["ID"].ToString());
                            si.InvoiceCode = rdr["InvoiceCode"].ToString();
                            si.CustomerName = rdr["CustomerName"].ToString();
                            si.InvoiceDate = Convert.ToDateTime(rdr["InvoiceDate"]);
                            si.DueDate = Convert.ToDateTime(rdr["DueDate"]);
                            si.SalesPerson = rdr["SalesPerson"].ToString();
                            si.Total = Convert.ToDecimal(rdr["Total"]);
                            si.Status = rdr["Status"].ToString();

                            salesInvoices.Add(si);
                        }
                    }

                } 
        
                return Ok(salesInvoices);
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
                List<SalesInvoiceViewModel> salesInvoices = new List<SalesInvoiceViewModel>();

                string condition = string.Empty;
        
                if (!string.IsNullOrEmpty(search.Keyword)) 
                {
                    condition = "WHERE (si.InvoiceDate >= '" + search.StartDate.Date.ToString("MM/dd/yyyy") 
                            + "' AND si.InvoiceDate <= '" + search.EndDate.Date.ToString("MM/dd/yyyy") + "' "
                            + ") AND (pc.ID = '" + search.Keyword + "')";  
                } 
                else
                {
                    condition = "WHERE si.InvoiceDate >= '" + search.StartDate.Date.ToString("MM/dd/yyyy") 
                            + "' AND si.InvoiceDate <= '" + search.EndDate.Date.ToString("MM/dd/yyyy") + "'";
                }


                string sql = "SELECT  si.ID, si.InvoiceCode,c.CustomerName, si.InvoiceDate, si.DueDate, e.EmployeeName as SalesPerson,"
                    + "si.Total, si.AmountPaid, si.Status FROM SalesInvoices si "
                    + "INNER JOIN Customers c ON si.CustomerId = c.ID "
                    + "INNER JOIN Employees e ON si.SalesPersonId = e.ID "
                    + "LEFT JOIN SalesInvoiceItems sii ON sii.SalesInvoiceId = si.ID "
                    + "LEFT JOIN Products p ON p.ID = sii.ProductId "
                    + "LEFT JOIN ProductCategories pc ON pc.ID = p.CategoryId "
                    + condition
                    + "GROUP BY si.ID,si.InvoiceCode,c.CustomerName, si.InvoiceDate, si.DueDate, e.EmployeeName, si.Total, si.AmountPaid, si.Status";
                          
                using (var command = context.Database.GetDbConnection().CreateCommand())
                {
                    command.CommandText = sql;
                    context.Database.OpenConnection();
                 
                    using (var rdr = await command.ExecuteReaderAsync())
                    {
                        while(rdr.Read())
                        {
                            var si = new SalesInvoiceViewModel();
                         
                            si.ID = new Guid(rdr["ID"].ToString());
                            si.InvoiceCode = rdr["InvoiceCode"].ToString();
                            si.CustomerName = rdr["CustomerName"].ToString();
                            si.InvoiceDate = Convert.ToDateTime(rdr["InvoiceDate"]);
                            si.DueDate = Convert.ToDateTime(rdr["DueDate"]);
                            si.SalesPerson = rdr["SalesPerson"].ToString();
                            si.Total = Convert.ToDecimal(rdr["Total"]);
                            si.Status = rdr["Status"].ToString();

                            salesInvoices.Add(si);
                        }
                    }

                } 
        
                return Ok(salesInvoices);
            }
            catch(Exception ex) 
            {
                logger.LogError(ex.ToString());
            }

            return Ok();
        }








        [HttpPost]
        public async Task<IActionResult> Save([FromBody] SalesInvoice salesInvoice)
        {
            int result = 0;
            try
            {
                salesInvoice.CreatedDate = DateTime.Now;
                salesInvoice.ModifiedDate = DateTime.Now;
                context.SalesInvoices.Add(salesInvoice);

                //update stock 

                var setting = await context.Settings.FindAsync(new Guid(SETTING_ID));

                if (setting.IsEnableStockTracking)
                {
                    foreach(var sii in salesInvoice.SalesInvoiceItems) 
                    {
                        var product = await context.Products.Where(p=>p.ID == sii.ProductId).SingleOrDefaultAsync();
                        product.Stock = product.Stock - sii.Qty;
                        context.Update(product);
                    }
                }
                
                
                //Update record counter 

                var recordCounter = await context.RecordCounters.Where(rc=>rc.Month == DateTime.Now.Month 
                    && rc.Year == DateTime.Now.Year).SingleOrDefaultAsync();
                
                recordCounter.SalesInvoiceLastCounter = recordCounter.SalesInvoiceLastCounter + 1;     
                context.Update(recordCounter);

                result = await context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                logger.LogError(ex.ToString());
            }

            return Ok(result);
        }




        [HttpPut]
        public async Task<IActionResult> Update([FromBody] SalesInvoice salesInvoice)
        {
            int result = 0;

            using (var transaction = context.Database.BeginTransaction())
            {

                try
                {
                    List<SalesInvoiceItem> items = salesInvoice.SalesInvoiceItems;
                    salesInvoice.ModifiedDate = DateTime.Now;
                    context.Update(salesInvoice);

                    var setting = await context.Settings.FindAsync(new Guid(SETTING_ID));

                    if (setting.IsEnableStockTracking)
                    {
                        using (var command = context.Database.GetDbConnection().CreateCommand())
                        {
                            command.CommandText = "SELECT ProductId, Qty FROM SalesInvoiceItems WHERE SalesInvoiceId = @SalesInvoiceId";
                            command.Transaction = context.Database.CurrentTransaction.GetDbTransaction();
                            context.Database.OpenConnection();

                            var param = command.CreateParameter();
                            param.ParameterName = "@SalesInvoiceId";
                            param.Value = salesInvoice.ID;
                            command.Parameters.Add(param);

                            List<ProductViewModel> productViewModels = new List<ProductViewModel>();

                            using (var rdr = command.ExecuteReader())
                            {
                                while(rdr.Read()) {

                                    var productId = new Guid(rdr["ProductId"].ToString());
                                    var qty = Convert.ToInt32(rdr["Qty"]);
                                    var pvm = new ProductViewModel();
                                    pvm.ProductId = productId;
                                    pvm.Qty = qty;

                                    productViewModels.Add(pvm);
                                }    
                            }

                            foreach(var pvm in productViewModels)
                            {
                                var product = await context.Products.Where(p=>p.ID == pvm.ProductId).SingleOrDefaultAsync();
                                product.Stock = product.Stock + pvm.Qty;
                                context.Update(product);
                            }
                    
                        }
                    }

                    result = await context.Database.ExecuteSqlRawAsync("DELETE FROM SalesInvoiceItems WHERE SalesInvoiceId = {0}",
                        new object[]{salesInvoice.ID});

                    foreach(var sii in items) 
                    {
                        context.Add(sii);
                    
                        if (setting.IsEnableStockTracking)
                        {
                            var product = await context.Products.Where(p=>p.ID == sii.ProductId).SingleOrDefaultAsync();
                            product.Stock = product.Stock - sii.Qty;
                            context.Update(product);
                        }
                    }

                    await context.SaveChangesAsync();
                    transaction.Commit();
                }
                catch(Exception ex)
                {
                    logger.LogError(ex.ToString());
                    transaction.Rollback();
                }

            }

            return Ok(result);
        }
        



        [HttpGet("{id}/{status}")]
        public async Task<IActionResult> UpdateStatus(Guid id, string status)
        {
            int result = 0;
            try
            {
                var salesInvoice = await context.SalesInvoices.Include(si=>si.SalesInvoiceItems)
                    .Where(si=>si.ID == id).SingleOrDefaultAsync();
                
                salesInvoice.Status = status;
                context.Update(salesInvoice);     

                //Update Stock

                var setting = await context.Settings.FindAsync(new Guid(SETTING_ID));
               
                if (setting.IsEnableStockTracking)
                {
                    if (status == "Canceled")
                    {
                        foreach(var sii in salesInvoice.SalesInvoiceItems) 
                        {
                            var product = await context.Products.Where(p=>p.ID == sii.ProductId).SingleOrDefaultAsync();
                            product.Stock = product.Stock + sii.Qty;
                            context.Update(product);
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
                var salesInvoice = await context.SalesInvoices.FindAsync(id);
                context.Remove(salesInvoice);

                var salesInvoiceItems = await context.SalesInvoiceItems.Where(sii => sii.SalesInvoiceId == id)
                    .ToListAsync();
                
                var salesPayments = await context.SalesPayments.Where(sp=>sp.SalesInvoiceId == id)
                    .ToListAsync();

                context.RemoveRange(salesInvoiceItems);
                context.RemoveRange(salesPayments);

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
