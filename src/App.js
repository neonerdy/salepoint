import React, {Component, Fragment} from 'react';

import EmployeeAdd from './Employee/EmployeeAdd';
import EmployeeEdit from './Employee/EmployeeEdit';
import ProductList from './Product/ProductList';
import AddProduct from './Product/ProductAdd';
import ExpenseList from './Expense/ExpenseList';
import Header from './Shared/Header';

import Customer from './Customer/Customer';
import CustomerAdd from './Customer/CustomerAdd';
import CustomerEdit from './Customer/CustomerEdit';
import SupplierAdd from './Supplier/SupplierAdd';
import SupplierEdit from './Supplier/SupplierEdit';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './Shared/NavBar';
import AccountAdd from './Expense/AccountAdd';
import AccountEdit from './Expense/AccountEdit';
import ExpenseAdd from './Expense/ExpenseAdd';
import ExpenseEdit from './Expense/ExpenseEdit';

import MasterData from './Master/MasterData';
import ProductCategoryAdd from './Product/ProductCategoryAdd';
import UnitAdd from './Product/UnitAdd';
import Dashboard from './Dashboard/Dashboard';
import ProductEdit from './Product/ProductEdit';
import ProductCategoryEdit from './Product/ProductCategoryEdit';
import UnitEdit from './Product/UnitEdit';
import RoleAdd from './Employee/RoleAdd';
import RoleEdit from './Employee/RoleEdit';
import UserAdd from './Setting/UserAdd';
import UserEdit from './Setting/UserEdit';
import PaymentTypeAdd from './Payment/PaymentTypeAdd';
import PaymentTypeEdit from './Payment/PaymentTypeEdit';
import SettingEdit from './Setting/SettingEdit';
import Employee from './Employee/Employee';
import Product from './Product/Product';
import Payment from './Payment/Payment';
import PointOfSale from './Sales/PointOfSale';
import PointOfSaleAdd from './Sales/PointOfSaleAdd';
import PurchaseInvoice from './Invoice/PurchaseInvoice';
import PurchaseInvoiceAdd from './Invoice/PurchaseInvoiceAdd';
import PurchasePayment from './Payment/PurchasePayment';
import PurchaseInvoiceEdit from './Invoice/PurchaseInvoiceEdit';
import SalesInvoice from './Invoice/SalesInvoice';
import SalesInvoiceAdd from './Invoice/SalesInvoiceAdd';
import SalesInvoiceEdit from './Invoice/SalesInvoiceEdit';
import SalesPayment from './Payment/SalesPayment';
import Supplier from './Supplier/Supplier';
import ExpenseCategoryAdd from './Expense/ExpenseCategoryAdd';
import ExpenseCategoryEdit from './Expense/ExpenseCategoryEdit';
import Setting from './Setting/Setting';
import User from './Setting/User';
import ProductRpt from './Report/ProductRpt';
import EmployeeRpt from './Report/EmployeeRpt';
import SalesInvoiceRpt from './Report/SalesInvoiceRpt';
import RoleAccess from './Setting/RoleAccess';
import RoleAccessAdd from './Setting/RoleAccessAdd';




class App extends Component
{



  render() {

   

    return(

      <Router>
          <Fragment>
            <Header/>
            <NavBar/>
            <div id="wrapper">

              <Switch>
                <Route exact path="/" component={Dashboard}/>

                <Route exact path="/setting" component={Setting}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/master-data" component={MasterData}/>
                <Route exact path="/employee" component={Employee}/>
                <Route exact path="/product" component={Product}/>
                <Route exact path="/customer" component={Customer}/>
                <Route exact path="/supplier" component={Supplier}/>
                <Route exact path="/pos" component={PointOfSale}/>
                <Route exact path="/purchase-invoice" component={PurchaseInvoice}/>
                <Route exact path="/sales-invoice" component={SalesInvoice}/>
                <Route exact path="/purchase-payment/:id" component={PurchasePayment}/>
                <Route exact path="/sales-payment/:id" component={SalesPayment}/>
                <Route exact path="/expense" component={ExpenseList}/>
                <Route exact path="/payment" component={Payment}/>
                <Route exact path="/user" component={User}/>
                <Route exact path="/role-access" component={RoleAccess}/>
                
                
             
                <Route exact path="/add-product-category" component={ProductCategoryAdd}/>
                <Route exact path="/add-unit" component={UnitAdd}/>
                <Route exact path="/add-role" component={RoleAdd}/>
                <Route exact path="/add-user" component={UserAdd}/>
                <Route exact path="/add-payment-type" component={PaymentTypeAdd}/>
                <Route exact path="/add-account" component={AccountAdd}/>
                <Route exact path="/add-expense-category" component={ExpenseCategoryAdd}/>
                <Route exact path="/add-role-access" component={RoleAccessAdd}/>
                
                <Route exact path="/add-customer" component={CustomerAdd}/>
                <Route exact path="/add-supplier" component={SupplierAdd}/>
                <Route exact path="/add-product" component={AddProduct}/>
                <Route exact path="/add-employee" component={EmployeeAdd}/>
                <Route exact path="/add-pos" component={PointOfSaleAdd}/>
                <Route exact path="/add-purchase-invoice" component={PurchaseInvoiceAdd}/>
                <Route exact path="/add-sales-invoice" component={SalesInvoiceAdd}/>
                <Route exact path="/add-expense" component={ExpenseAdd}/>

                <Route exact path="/edit-product-category/:id" component={ProductCategoryEdit}/>
                <Route exact path="/edit-unit/:id" component={UnitEdit}/>
                <Route exact path="/edit-role/:id" component={RoleEdit}/>
                <Route exact path="/edit-user/:id" component={UserEdit}/>
                <Route exact path="/edit-payment-type/:id" component={PaymentTypeEdit}/>
                <Route exact path="/edit-account/:id" component={AccountEdit}/>
                <Route exact path="/edit-expense-category/:id" component={ExpenseCategoryEdit}/>
               
                <Route exact path="/edit-setting/:id" component={SettingEdit}/>
                <Route exact path="/edit-supplier/:id" component={SupplierEdit}/>
                <Route exact path="/edit-customer/:id" component={CustomerEdit}/>
                <Route exact path="/edit-employee/:id" component={EmployeeEdit}/>
                <Route exact path="/edit-product/:id" component={ProductEdit}/>
                <Route exact path="/edit-purchase-invoice/:id" component={PurchaseInvoiceEdit}/>
                <Route exact path="/edit-sales-invoice/:id" component={SalesInvoiceEdit}/>
                <Route exact path="/edit-expense/:id" component={ExpenseEdit}/>


                <Route exact path="/product-rpt" component={ProductRpt}/>
                <Route exact path="/employee-rpt" component={EmployeeRpt}/>
                <Route exact path="/sales-invoice-rpt" component={SalesInvoiceRpt}/>
                
              </Switch>
            </div>
          </Fragment>



      </Router>
  
  
 

    )
  }
}



export default App;
