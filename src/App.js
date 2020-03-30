import React, {Component, Fragment} from 'react';

import EmployeeAdd from './EmployeeAdd';
import EmployeeEdit from './EmployeeEdit';
import ProductList from './ProductList';
import AddProduct from './ProductAdd';
import Partner from './Partner';
import ExpenseList from './ExpenseList';
import Header from './Header';
import CustomerAdd from './CustomerAdd';
import CustomerEdit from './CustomerEdit';
import SupplierAdd from './SupplierAdd';
import SupplierEdit from './SupplierEdit';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './NavBar';
import AccountAdd from './AccountAdd';
import AccountEdit from './AccountEdit';
import ExpenseAdd from './ExpenseAdd';
import ExpenseEdit from './ExpenseEdit';
import MasterData from './MasterData';
import ProductCategoryAdd from './ProductCategoryAdd';
import Dashboard from './Dashboard';
import ProductEdit from './ProductEdit';
import ProductCategoryEdit from './ProductCategoryEdit';
import JobTitleAdd from './JobTitleAdd';
import JobTitleEdit from './JobTitleEdit';
import UserAdd from './UserAdd';
import UserEdit from './UserEdit';
import PaymentTypeAdd from './PaymentTypeAdd';
import PaymentTypeEdit from './PaymentTypeEdit';
import SettingEdit from './SettingEdit';
import Employee from './Employee';
import Product from './Product';
import Payment from './Payment';
import SalesPaymentAdd from './SalesPaymentAdd';
import SalesOrder from './SalesOrder';
import SalesOrderAdd from './SalesOrderAdd';
import SalesOrderEdit from './SalesOrderEdit';
import PurchaseInvoice from './PurchaseInvoice';
import PurchaseInvoiceAdd from './PurchaseInvoiceAdd';
import PurchasePayment from './PurchasePayment';
import PurchaseInvoiceEdit from './PurchaseInvoiceEdit';
import SalesInvoice from './SalesInvoice';
import SalesInvoiceAdd from './SalesInvoiceAdd';
import SalesInvoiceEdit from './SalesInvoiceEdit';
import SalesPayment from './SalesPayment';



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
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/master-data" component={MasterData}/>
                <Route exact path="/employee" component={Employee}/>
                <Route exact path="/product" component={Product}/>
                <Route exact path="/partner" component={Partner}/>
                <Route exact path="/sales-order" component={SalesOrder}/>
                <Route exact path="/purchase-invoice" component={PurchaseInvoice}/>
                <Route exact path="/sales-invoice" component={SalesInvoice}/>
                <Route exact path="/purchase-payment/:id" component={PurchasePayment}/>
                <Route exact path="/sales-payment/:id" component={SalesPayment}/>
                <Route exact path="/expense" component={ExpenseList}/>
                <Route exact path="/payment" component={Payment}/>
             
                <Route exact path="/add-product-category" component={ProductCategoryAdd}/>
                <Route exact path="/add-job-title" component={JobTitleAdd}/>
                <Route exact path="/add-user" component={UserAdd}/>
                <Route exact path="/add-payment-type" component={PaymentTypeAdd}/>
                <Route exact path="/add-customer" component={CustomerAdd}/>
                <Route exact path="/add-supplier" component={SupplierAdd}/>
                <Route exact path="/add-product" component={AddProduct}/>
                <Route exact path="/add-employee" component={EmployeeAdd}/>
                <Route exact path="/add-sales-order" component={SalesOrderAdd}/>
                <Route exact path="/add-purchase-invoice" component={PurchaseInvoiceAdd}/>
                <Route exact path="/add-sales-invoice" component={SalesInvoiceAdd}/>
                <Route exact path="/add-expense" component={ExpenseAdd}/>
                <Route exact path="/add-account" component={AccountAdd}/>
                <Route exact path="/add-sales-payment" component={SalesPaymentAdd}/>

                <Route exact path="/edit-product-category/:id" component={ProductCategoryEdit}/>
                <Route exact path="/edit-job-title/:id" component={JobTitleEdit}/>
                <Route exact path="/edit-user/:id" component={UserEdit}/>
                <Route exact path="/edit-payment-type/:id" component={PaymentTypeEdit}/>
                <Route exact path="/edit-setting/:id" component={SettingEdit}/>
                <Route exact path="/edit-supplier/:id" component={SupplierEdit}/>
                <Route exact path="/edit-customer/:id" component={CustomerEdit}/>
                <Route exact path="/edit-employee/:id" component={EmployeeEdit}/>
                <Route exact path="/edit-product/:id" component={ProductEdit}/>
                <Route exact path="/edit-purchase-invoice/:id" component={PurchaseInvoiceEdit}/>
                <Route exact path="/edit-sales-invoice/:id" component={SalesInvoiceEdit}/>
                <Route exact path="/edit-sales-order/:id" component={SalesOrderEdit}/>
                <Route exact path="/edit-expense/:id" component={ExpenseEdit}/>
                <Route exact path="/edit-account/:id" component={AccountEdit}/>
                                

              </Switch>
            </div>
          </Fragment>



      </Router>
  
  
 

    )
  }
}



export default App;
