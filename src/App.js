import React, {Component, Fragment} from 'react';

import EmployeeList from './EmployeeList';
import EmployeeAdd from './EmployeeAdd';
import EmployeeEdit from './EmployeeEdit';
import OutletList from './OutletList';
import ProductList from './ProductList';
import AddProduct from './ProductAdd';


import Partner from './Partner';
import Sales from './Sales';
import ExpenseList from './ExpenseList';
import Header from './Header';
import CustomerAdd from './CustomerAdd';
import CustomerEdit from './CustomerEdit';
import SupplierAdd from './SupplierAdd';
import SupplierEdit from './SupplierEdit';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './NavBar';
import SalesAdd from './SalesAdd';
import AccountAdd from './AccountAdd';
import AccountEdit from './AccountEdit';
import ExpenseCategoryAdd from './ExpenseCategoryAdd';
import ExpenseCategoryEdit from './ExpenseCategoryEdit';
import ExpenseAdd from './ExpenseAdd';
import ExpenseEdit from './ExpenseEdit';
import OutletAdd from './OutletAdd';
import MasterData from './MasterData';
import ProductCategoryAdd from './ProductCategoryAdd';
import Dashboard from './Dashboard';
import Purchase from './Purchase';
import PurchaseAdd from './PurchaseAdd';
import ProductEdit from './ProductEdit';
import ProductCategoryEdit from './ProductCategoryEdit';
import JobTitleAdd from './JobTitleAdd';
import JobTitleEdit from './JobTitleEdit';
import UserAdd from './UserAdd';
import UserEdit from './UserEdit';
import PaymentTypeAdd from './PaymentTypeAdd';
import PaymentTypeEdit from './PaymentTypeEdit';
import ExpenseGroupAdd from './ExpenseGroupAdd';
import ExpenseGroupEdit from './ExpenseGroupEdit';
import SettingEdit from './SettingEdit';
import SalesEdit from './SalesEdit';
import PurchaseEdit from './PurchaseEdit';
import OutletEdit from './OutletEdit';


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
                <Route exact path="/employee" component={EmployeeList}/>
                <Route exact path="/outlet" component={OutletList}/>
                <Route exact path="/product" component={ProductList}/>
                <Route exact path="/partner" component={Partner}/>
                <Route exact path="/sales" component={Sales}/>
                <Route exact path="/purchase" component={Purchase}/>
                <Route exact path="/expense" component={ExpenseList}/>
             
                <Route exact path="/add-product-category" component={ProductCategoryAdd}/>
                <Route exact path="/add-job-title" component={JobTitleAdd}/>
                <Route exact path="/add-user" component={UserAdd}/>
                <Route exact path="/add-payment-type" component={PaymentTypeAdd}/>
                <Route exact path="/add-expense-group" component={ExpenseGroupAdd}/>
                <Route exact path="/add-outlet" component={OutletAdd}/>
                <Route exact path="/add-customer" component={CustomerAdd}/>
                <Route exact path="/add-supplier" component={SupplierAdd}/>
                <Route exact path="/add-product" component={AddProduct}/>
                <Route exact path="/add-employee" component={EmployeeAdd}/>
                <Route exact path="/add-sales" component={SalesAdd}/>
                <Route exact path="/add-purchase" component={PurchaseAdd}/>
                <Route exact path="/add-expense" component={ExpenseAdd}/>
                <Route exact path="/add-account" component={AccountAdd}/>
                <Route exact path="/add-expense-category" component={ExpenseCategoryAdd}/>
                
                <Route exact path="/edit-product-category/:id" component={ProductCategoryEdit}/>
                <Route exact path="/edit-job-title/:id" component={JobTitleEdit}/>
                <Route exact path="/edit-user/:id" component={UserEdit}/>
                <Route exact path="/edit-payment-type/:id" component={PaymentTypeEdit}/>
                <Route exact path="/edit-expense-group/:id" component={ExpenseGroupEdit}/>
                <Route exact path="/edit-setting/:id" component={SettingEdit}/>
                <Route exact path="/edit-outlet/:id" component={OutletEdit}/>
                <Route exact path="/edit-supplier/:id" component={SupplierEdit}/>
                <Route exact path="/edit-customer/:id" component={CustomerEdit}/>
                <Route exact path="/edit-employee/:id" component={EmployeeEdit}/>
                <Route exact path="/edit-product/:id" component={ProductEdit}/>
                <Route exact path="/edit-sales/:id" component={SalesEdit}/>
                <Route exact path="/edit-purchase/:id" component={PurchaseEdit}/>
                <Route exact path="/edit-expense/:id" component={ExpenseEdit}/>
                <Route exact path="/edit-account/:id" component={AccountEdit}/>
                <Route exact path="/edit-expense-category/:id" component={ExpenseCategoryEdit}/>
                

              </Switch>
            </div>
          </Fragment>



      </Router>
  
  
 

    )
  }
}



export default App;
