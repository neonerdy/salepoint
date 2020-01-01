
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using SalePointAPI.Models;

namespace SalePointAPI
{
    public class AppDbContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Outlet> Outlets { get; set; }
        public DbSet<OutletEmployee> OutletEmployees { get; set; }
        public DbSet<OutletProduct> OutletProducts { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; } 
        public DbSet<Product> Products { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<PurchaseItem> PurchaseItems { get; set; }
        public DbSet<Sales> Sales { get; set; }
        public DbSet<SalesItem> SalesItems { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<ExpenseCategory> ExpenseCatgories { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<JobTitle> JobTitles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<PaymentType> PaymentTypes { get; set; }
        public DbSet<ExpenseGroup> ExpenseGroups { get; set; }
        public DbSet<Setting> Settings { get; set; }


       
        protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder)
        {
            optionBuilder.UseNpgsql("host=localhost;database=corbis;username=postgres;password=password123");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Outlet>(entity => 
            {
                entity.ToTable("outlets");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.OutletName).HasColumnName("outlet_name");
                entity.Property(e => e.Address).HasColumnName("address");
                entity.Property(e => e.City).HasColumnName("city");
                entity.Property(e => e.Province).HasColumnName("province");
                entity.Property(e => e.Phone).HasColumnName("phone");
                entity.Property(e => e.OpeningDate).HasColumnName("opening_date");
                entity.Property(e => e.Manager).HasColumnName("manager");
                
            });

            
            modelBuilder.Entity<Employee>(entity => 
            {
                entity.ToTable("employees");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.EmployeeName).HasColumnName("employee_name");
                entity.Property(e => e.JoinDate).HasColumnName("join_date");
                entity.Property(e => e.Address).HasColumnName("address");
                entity.Property(e => e.City).HasColumnName("city");
                entity.Property(e => e.Phone).HasColumnName("phone");
                entity.Property(e => e.Email).HasColumnName("email");
                entity.Property(e => e.JobTitleId).HasColumnName("job_title_id");
                entity.Property(e => e.Photo).HasColumnName("photo");
                entity.Property(e => e.IsActive).HasColumnName("is_active");
            });


            modelBuilder.Entity<OutletEmployee>(entity => 
            {
                entity.ToTable("outlet_employees");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.OutletId).HasColumnName("outlet_id");
                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            });

            
            modelBuilder.Entity<ProductCategory>(entity => 
            {
                entity.ToTable("product_categories");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.CategoryName).HasColumnName("category_name");
                entity.Property(e => e.Notes).HasColumnName("notes");
            });

            modelBuilder.Entity<Product>(entity => 
            {
                entity.ToTable("products");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.ProductCode).HasColumnName("product_code");
                entity.Property(e => e.ProductName).HasColumnName("product_name");
                entity.Property(e => e.Picture).HasColumnName("picture");
                entity.Property(e => e.CategoryId).HasColumnName("category_id");
                entity.Property(e => e.Brand).HasColumnName("brand");
                entity.Property(e => e.Model).HasColumnName("model");
                entity.Property(e => e.PurchasePrice).HasColumnName("purchase_price");
                entity.Property(e => e.SalePrice).HasColumnName("sale_price");
                entity.Property(e => e.Stock).HasColumnName("stock");
                entity.Property(e => e.Unit).HasColumnName("unit");
                entity.Property(e => e.Description).HasColumnName("description");
                entity.Property(e => e.CreatedDate).HasColumnName("created_date");
                entity.Property(e => e.ModifiedDate).HasColumnName("modified_date");
            });


            modelBuilder.Entity<Customer>(entity => 
            {
                entity.ToTable("customers");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.CustomerName).HasColumnName("customer_name");
                entity.Property(e => e.Address).HasColumnName("address");
                entity.Property(e => e.City).HasColumnName("city");
                entity.Property(e => e.Province).HasColumnName("province");
                entity.Property(e => e.ZipCode).HasColumnName("zip_code");
                entity.Property(e => e.Phone).HasColumnName("phone");
                entity.Property(e => e.Email).HasColumnName("email");
                entity.Property(e => e.IsActive).HasColumnName("is_active");
            });


            modelBuilder.Entity<Sales>(entity => 
            {
                entity.ToTable("sales");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.OutletId).HasColumnName("outlet_id");
                entity.Property(e => e.InvoiceCode).HasColumnName("invoice_code");
                entity.Property(e => e.CustomerId).HasColumnName("customer_id");
                entity.Property(e => e.InvoiceDate).HasColumnName("invoice_date");
                entity.Property(e => e.CustomerPO).HasColumnName("customer_po");
                entity.Property(e => e.PaymentTypeId).HasColumnName("payment_type_id");
                entity.Property(e => e.Notes).HasColumnName("notes");
                entity.Property(e => e.Amount).HasColumnName("amount");
                entity.Property(e => e.Tax).HasColumnName("tax");
                entity.Property(e => e.ServiceCharge).HasColumnName("service_charge");
                entity.Property(e => e.SubTotal).HasColumnName("sub_total");
                entity.Property(e => e.Total).HasColumnName("total");
                entity.Property(e => e.Status).HasColumnName("status");
                entity.Property(e => e.CreatedDate).HasColumnName("created_date");
                entity.Property(e => e.ModifiedDate).HasColumnName("modified_date");
            });


            modelBuilder.Entity<SalesItem>(entity => 
            {
                entity.ToTable("sale_items");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.SalesId).HasColumnName("sales_id");
                entity.Property(e => e.ProductId).HasColumnName("product_id");
                entity.Property(e => e.Qty).HasColumnName("qty");
                entity.Property(e => e.Price).HasColumnName("price");
            });


            modelBuilder.Entity<Account>(entity => 
            {
                entity.ToTable("accounts");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.AccountName).HasColumnName("account_name");
                entity.Property(e => e.AccountType).HasColumnName("account_type");
                entity.Property(e => e.Balance).HasColumnName("balance");
                entity.Property(e => e.Notes).HasColumnName("notes");
            });


            modelBuilder.Entity<ExpenseCategory>(entity => 
            {
                entity.ToTable("expense_categories");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.CategoryName).HasColumnName("category_name");
                entity.Property(e => e.CategoryGroup).HasColumnName("category_group");
                entity.Property(e => e.Budget).HasColumnName("budget");
            });


            modelBuilder.Entity<Expense>(entity => 
            {
                entity.ToTable("expenses");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.OutletId).HasColumnName("outlet_id");
                entity.Property(e => e.Date).HasColumnName("date");
                entity.Property(e => e.CategoryId).HasColumnName("category_id");
                entity.Property(e => e.AccountId).HasColumnName("account_id");
                entity.Property(e => e.Amount).HasColumnName("amount");
                entity.Property(e => e.Notes).HasColumnName("notes");
                entity.Property(e => e.CreatedDate).HasColumnName("created_date");
                entity.Property(e => e.ModifiedDate).HasColumnName("modified_date");
            });



            modelBuilder.Entity<Supplier>(entity => 
            {
                entity.ToTable("suppliers");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.SupplierName).HasColumnName("supplier_name");
                entity.Property(e => e.Address).HasColumnName("address");
                entity.Property(e => e.City).HasColumnName("city");
                entity.Property(e => e.Province).HasColumnName("province");
                entity.Property(e => e.ZipCode).HasColumnName("zip_code");
                entity.Property(e => e.Phone).HasColumnName("phone");
                entity.Property(e => e.Email).HasColumnName("email");
                entity.Property(e => e.ContactPerson).HasColumnName("contact_person");
                entity.Property(e => e.ContactPhone).HasColumnName("contact_phone");
                entity.Property(e => e.IsActive).HasColumnName("is_active");
           
            });



            modelBuilder.Entity<Purchase>(entity => 
            {
                entity.ToTable("purchases");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.PurchaseCode).HasColumnName("purchase_code");
                entity.Property(e => e.SupplierId).HasColumnName("supplier_id");
                entity.Property(e => e.PurchaseDate).HasColumnName("purchase_date");
                entity.Property(e => e.SupplierInvoice).HasColumnName("supplier_invoice");
                entity.Property(e => e.PaymentTypeId).HasColumnName("payment_type_id");
                entity.Property(e => e.PaymentAccountId).HasColumnName("payment_account_id");
                entity.Property(e => e.Notes).HasColumnName("notes");
                entity.Property(e => e.Amount).HasColumnName("amount");
                entity.Property(e => e.Tax).HasColumnName("tax");
                entity.Property(e => e.ServiceCharge).HasColumnName("service_charge");
                entity.Property(e => e.Total).HasColumnName("total");
                entity.Property(e => e.Status).HasColumnName("status");
                entity.Property(e => e.CreatedDate).HasColumnName("created_date");
                entity.Property(e => e.ModifiedDate).HasColumnName("modified_date");
            });


            modelBuilder.Entity<PurchaseItem>(entity => 
            {
                entity.ToTable("purchase_items");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.PurchaseId).HasColumnName("purchase_id");
                entity.Property(e => e.ProductId).HasColumnName("product_id");
                entity.Property(e => e.Qty).HasColumnName("qty");
                entity.Property(e => e.Price).HasColumnName("price");
            });

            
            modelBuilder.Entity<User>(entity => 
            {
                entity.ToTable("users");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.UserName).HasColumnName("user_name");
                entity.Property(e => e.Password).HasColumnName("password");
                entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
                entity.Property(e => e.CreatedDate).HasColumnName("created_date");
                entity.Property(e => e.ModifiedDate).HasColumnName("modified_date");
            });



            modelBuilder.Entity<UserAccess>(entity => 
            {
                entity.ToTable("user_access");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.UserId).HasColumnName("user_id");
                entity.Property(e => e.ComponentName).HasColumnName("component_name");
                entity.Property(e => e.ComponentType).HasColumnName("component_type");
                entity.Property(e => e.IsView).HasColumnName("is_view");
                entity.Property(e => e.IsCreate).HasColumnName("is_create");
                entity.Property(e => e.IsUpdate).HasColumnName("is_update");
                entity.Property(e => e.IsDelete).HasColumnName("is_delete");
                entity.Property(e => e.CreatedDate).HasColumnName("created_date");
                entity.Property(e => e.ModifiedDate).HasColumnName("modified_date");
           
            });


            modelBuilder.Entity<JobTitle>(entity => 
            {
                entity.ToTable("job_titles");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.TitleName).HasColumnName("title_name");
                entity.Property(e => e.Description).HasColumnName("description");
            });


            modelBuilder.Entity<PaymentType>(entity => 
            {
                entity.ToTable("payment_types");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.PaymentName).HasColumnName("payment_name");
                entity.Property(e => e.Description).HasColumnName("description");
            });


            modelBuilder.Entity<ExpenseGroup>(entity => 
            {
                entity.ToTable("expense_groups");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.GroupName).HasColumnName("group_name");
                entity.Property(e => e.Description).HasColumnName("description");
            });

            
            modelBuilder.Entity<Setting>(entity => 
            {
                entity.ToTable("settings");
                entity.Property(e => e.ID).HasColumnName("id");
                entity.Property(e => e.SettingName).HasColumnName("setting_name");
                entity.Property(e => e.Value).HasColumnName("value");
                entity.Property(e => e.Description).HasColumnName("description");
            });










        

        

      
        }

    }
}