
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import { Scrollbars } from 'react-custom-scrollbars';

import axios from 'axios';
import config from '../Shared/Config';


class MasterData extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            productCategories: [],
            productCategoryId: '',
            productCategoryName: '',
            units: [],
            unitId: '',
            unitName: '',
            jobTitles: [],
            jobTitleId: '', 
            titleName: '',
            accounts: [],
            accountId: '',
            accountName: '',
            expenseCategories: [],
            expenseCategoryId: '',
            expenseCategoryName: '',
            users: [],
            userId: '', 
            userName: '',
            paymentTypes: [],
            paymentTypeId: '',
            paymentTypeName: '',
        }
    }


    componentDidMount() {

        this.getProductCategories();
        this.getUnits();
        this.getJobTitles();
        //this.getUsers();
        this.getPaymentTypes();
        this.getAccounts();
        this.getExpenseCategories();
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    

   /* PRODUCT CATEGORY */


    getProductCategories = () => {

        axios.get(config.serverUrl + '/api/productcategory/getall').then(response=> {
            this.setState({
                productCategories: response.data
            })
        })
    }


    addProductCategory = () => {
        this.props.history.push('/add-product-category');
    }


    editProductCategory = (id) => {
        this.props.history.push('/edit-product-category/' + id)
    }



    onDeleteProductCategory = (productCategoryId, productCategoryName) => {
        this.setState({
            productCategoryId: productCategoryId,
            productCategoryName: productCategoryName
        })
    }

    deleteProductCategory = (id) => {

        axios.delete(config.serverUrl + '/api/productcategory/delete/' + id).then(response=> {
            this.getProductCategories();
        })
    }



    /* UNIT */


    getUnits = () => {

        axios.get(config.serverUrl + '/api/unit/getall').then(response=> {
            this.setState({
                units: response.data
            })
        })
    }


    addUnit = () => {
        this.props.history.push('/add-unit');
    }


    editUnit = (id) => {
        this.props.history.push('/edit-unit/' + id)
    }


    onDeleteUnit = (unitId, unitName) => {
        this.setState({
            unitId: unitId,
            unitName: unitName
        })
    }

    deleteUnit = (id) => {

        axios.delete(config.serverUrl + '/api/unit/delete/' + id).then(response=> {
            this.getUnits();
        })
    }



    /* JOB TITLES */

    getJobTitles = () => {
        axios.get(config.serverUrl + '/api/jobtitle/getall').then(response=> {
            this.setState({
                jobTitles: response.data
            })
        })
    }

    addJobTitle = () => {
        this.props.history.push('/add-job-title');
    }

    editJobTitle = (id) => {
        this.props.history.push('/edit-job-title/' + id);
    }

    onDeleteJobTitle = (jobTitleId, titleName) => {
        this.setState({
            jobTitleId: jobTitleId,
            titleName: titleName
        })
    }

    deleteJobTitle = (id) => {

        axios.delete(config.serverUrl + '/api/jobTitle/delete/' + id).then(response=> {
            this.getJobTitles();
        })
    }


    /* USER */


    getUsers = () => {
        axios.get(config.serverUrl + '/api/user/getall').then(response=> {
            this.setState({
                users: response.data
            })
        })
    }


    addUser = () => {
        this.props.history.push('/add-user');
    }

    editUser = (id) => {
        this.props.history.push('/edit-user/' + id);
    }

    onDeleteUser = (userId, userName) => {
        this.setState({
            userId: userId,
            userName: userName
        })
    }

    deleteUser = (id) => {

        axios.delete(config.serverUrl + '/api/user/delete/' + id).then(response=> {
            this.getUsers();
        })
    }


    /* PAYMENET TYPE */


     getPaymentTypes = () => {
        axios.get(config.serverUrl + '/api/paymenttype/getall').then(response=> {
            this.setState({
                paymentTypes: response.data
            })
        })
    }


    addPaymentType = () => {
        this.props.history.push('/add-payment-type');
    }

    editPaymentType = (id) => {
        this.props.history.push('/edit-payment-type/' + id);
    }

    onDeletePaymentType = (paymentTypeId, paymentTypeName) => {
        this.setState({
            paymentTypeId: paymentTypeId,
            paymentTypeName: paymentTypeName
        })
    }

    deletePaymentType = (id) => {

        axios.delete(config.serverUrl + '/api/paymenttype/delete/' + id).then(response=> {
            this.getPaymentTypes();
        })
    }




     /* ACCOUNT */


     getAccounts = () => {
        axios.get(config.serverUrl + '/api/account/getall').then(response=> {
            this.setState({
                accounts: response.data
            })
        })
    }


    addAccount = () => {
        this.props.history.push('/add-account');
    }

    editAccount = (id) => {
        this.props.history.push('/edit-account/' + id);
    }

    onDeleteAccount = (accountId, accountName) => {
        this.setState({
            accountId: accountId,
            accountName: accountName
        })
    }

    deleteAccount = (id) => {

        axios.delete(config.serverUrl + '/api/account/delete/' + id).then(response=> {
            this.getAccounts();
        })
    }



      /* EXPENSE CATEGORY */


    getExpenseCategories = () => {
        axios.get(config.serverUrl + '/api/expensecategory/getall').then(response=> {
            this.setState({
                expenseCategories: response.data
            })
        })
    }


    addExpenseCategory = () => {
        this.props.history.push('/add-expense-category');
    }

    editExpenseCategory = (id) => {
        this.props.history.push('/edit-expense-category/' + id);
    }

    onDeleteExpenseCategory = (expenseCategoryId, expenseCategoryName) => {
        this.setState({
            expenseCategoryId: expenseCategoryId,
            expenseCategoryName: expenseCategoryName
        })
    }

    deleteExpenseCategory = (id) => {

        axios.delete(config.serverUrl + '/api/expensecategory/delete/' + id).then(response=> {
            this.getExpenseCategories();
        })
    }



    render() {

        let errStyle = {
            color: 'darkred'
        }


        return(
           
           <div id="page-wrapper" class="gray-bg">

               <div id="deleteProductCategory" class="modal fade" role="dialog">
                
                <div class="modal-dialog">
                    
                    <div class="modal-content">

                          <div class="modal-header">
                            <h4>Delete Product Category</h4>
                          </div>
                          <div class="modal-body">
                          Are you sure want to delete '{this.state.productCategoryName}' ?
                          </div>

                          <div class="modal-footer">
                            <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                            <button class="btn btn-label btn-danger" onClick={()=>this.deleteProductCategory(this.state.productCategoryId)} data-dismiss="modal">
                                <label><i class="ti-check"></i></label> YES</button>
                          </div>
                        
                      </div>
                  </div>
              </div>


              <div id="deleteUnit" class="modal fade" role="dialog">
                
                <div class="modal-dialog">
                    
                    <div class="modal-content">

                          <div class="modal-header">
                            <h4>Delete Unit</h4>
                          </div>
                          <div class="modal-body">
                          Are you sure want to delete '{this.state.unitName}' ?
                          </div>

                          <div class="modal-footer">
                            <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                            <button class="btn btn-label btn-danger" onClick={()=>this.deleteUnit(this.state.unitId)} 
                                data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                          </div>
                        
                      </div>
                  </div>
              </div>



              <div id="deleteJobTitle" class="modal fade" role="dialog">
                
                <div class="modal-dialog">
                    
                    <div class="modal-content">

                          <div class="modal-header">
                            <h4>Delete Job Title</h4>
                          </div>
                          <div class="modal-body">
                          Are you sure want to delete '{this.state.titleName}' ?
                          </div>

                          <div class="modal-footer">
                            <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                            <button class="btn btn-label btn-danger" onClick={()=>this.deleteJobTitle(this.state.jobTitleId)} data-dismiss="modal">
                                <label><i class="ti-check"></i></label> YES</button>
                          </div>
                        
                      </div>
                  </div>
              </div>

            {/*}

              <div id="deleteUser" class="modal fade" role="dialog">
                
                <div class="modal-dialog">
                    
                    <div class="modal-content">

                          <div class="modal-header">
                            <h4>Delete User</h4>
                          </div>
                          <div class="modal-body">
                          Are you sure want to delete '{this.state.userName}' ?
                          </div>

                          <div class="modal-footer">
                            <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                            <button class="btn btn-label btn-danger" onClick={()=>this.deleteUser(this.state.userId)} data-dismiss="modal">
                                <label><i class="ti-check"></i></label> YES</button>
                          </div>
                        
                      </div>
                  </div>
              </div>
            {*/}

              <div id="deletePaymentType" class="modal fade" role="dialog">
                
                <div class="modal-dialog">
                    
                    <div class="modal-content">

                          <div class="modal-header">
                            <h4>Delete Payment Type</h4>
                          </div>
                          <div class="modal-body">
                          Are you sure want to delete '{this.state.paymentTypeName}' ?
                          </div>

                          <div class="modal-footer">
                            <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                            <button class="btn btn-label btn-danger" onClick={()=>this.deletePaymentType(this.state.paymentTypeId)} data-dismiss="modal">
                                <label><i class="ti-check"></i></label> YES</button>
                          </div>
                        
                      </div>
                  </div>
              </div>


              <div id="deleteAccount" class="modal fade" role="dialog">
                
                <div class="modal-dialog">
                    
                    <div class="modal-content">

                          <div class="modal-header">
                            <h4>Delete Account</h4>
                          </div>
                          <div class="modal-body">
                          Are you sure want to delete '{this.state.accountTypeName}' ?
                          </div>

                          <div class="modal-footer">
                            <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                            <button class="btn btn-label btn-danger" onClick={()=>this.deleteAccount(this.state.accountId)} data-dismiss="modal">
                                <label><i class="ti-check"></i></label> YES</button>
                          </div>
                        
                      </div>
                  </div>
              </div>



              <div id="deleteExpenseCategory" class="modal fade" role="dialog">
                
                <div class="modal-dialog">
                    
                    <div class="modal-content">

                          <div class="modal-header">
                            <h4>Delete Expense Category</h4>
                          </div>
                          <div class="modal-body">
                          Are you sure want to delete '{this.state.expenseCategoryName}' ?
                          </div>

                          <div class="modal-footer">
                            <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                            <button class="btn btn-label btn-danger" onClick={()=>this.deleteExpenseCategory(this.state.expenseCategoryId)} data-dismiss="modal">
                                <label><i class="ti-check"></i></label> YES</button>
                          </div>
                        
                      </div>
                  </div>
              </div>



   
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">
                     <h2>Master Data</h2>
                </div>
                <div class="col-lg-4">
                        <div class="title-action">

                            <div class="btn-group">
                                <button data-toggle="dropdown" class="btn btn-success dropdown-toggle" aria-expanded="false">Add New</button>
                                <ul class="dropdown-menu" x-placement="bottom-start">
                                    <li><a class="dropdown-item" onClick={this.addProductCategory}>Product Category</a></li>
                                    <li><a class="dropdown-item" onClick={this.addUnit}>Unit</a></li>
                                    <li><a class="dropdown-item" onClick={this.addJobTitle}>Job Title</a></li>
                                    <li><a class="dropdown-item" onClick={this.addPaymentType}>Payment Type</a></li>
                                    <li><a class="dropdown-item" onClick={this.addAccount}>Account</a></li>
                                    <li><a class="dropdown-item" onClick={this.addExpenseCategory}>Expense Category</a></li>
                                    
                                </ul>
                             </div>
                         </div>
                </div>        
            </div>

        <br/>

        <div class="row">



        <div class="col-lg-4">


                <div class="ibox-content">
                    <h2>Product Categories ({this.state.productCategories.length})</h2>
                    
                    
                    <Scrollbars style={{ height: 310 }}>

                    <ul class="todo-list m-t ui-sortable">

                        {this.state.productCategories.map(c=> 

                            <li key = {c.id}>
                                <span class="m-l-xs">{c.categoryName}</span>
                                <small class="float-right">
                                    <a onClick={()=>this.editProductCategory(c.id)}><i class="fa fa-edit"></i></a> &nbsp;&nbsp;
                                    <a data-toggle="modal" data-target="#deleteProductCategory" 
                                    onClick={()=>this.onDeleteProductCategory(c.id, c.categoryName)}><i class="fa fa-trash"></i></a>
                                    &nbsp;&nbsp;
                                </small>
                            </li>
                        
                         )}

                    </ul>
                    </Scrollbars>

                </div>



            </div>



            <div class="col-lg-4">

                <div class="ibox-content">
                    <h2>Units ({this.state.units.length})</h2>
                    
                    <Scrollbars style={{ height: 310 }}>

                    <ul class="todo-list m-t ui-sortable">
                    
                        {this.state.units.map(u=> 
                        <li key={u.id}>
                            <span class="m-l-xs">{u.unitName}</span>
                            <small class="float-right">
                                <a onClick={()=>this.editUnit(u.id)}><i class="fa fa-edit"></i></a> &nbsp;&nbsp;
                                <a data-toggle="modal" data-target="#deleteUnit" 
                                    onClick={()=>this.onDeleteUnit(u.id, u.unitName)}><i class="fa fa-trash"></i></a>
                                    &nbsp;&nbsp;
                            </small>
                        </li>
                        )}

                    </ul>
                    </Scrollbars>

                </div>

            </div>





            <div class="col-lg-4">


                <div class="ibox-content">
                    <h2>Job Titles ({this.state.jobTitles.length})</h2>
                    
                    <Scrollbars style={{ height: 310 }}>

                    <ul class="todo-list m-t ui-sortable">
                     
                        {this.state.jobTitles.map(jt=> 
                        <li key={jt.id}>
                            <span class="m-l-xs">{jt.jobTitleName}</span>
                            <small class="float-right">
                                <a onClick={()=>this.editJobTitle(jt.id)}><i class="fa fa-edit"></i></a> &nbsp;&nbsp;
                                 <a data-toggle="modal" data-target="#deleteJobTitle" 
                                    onClick={()=>this.onDeleteJobTitle(jt.id, jt.jobTitleName)}><i class="fa fa-trash"></i></a>
                                    &nbsp;&nbsp;
                            </small>
                        </li>
                        )}

                    </ul>
                    </Scrollbars>

                </div>
               
            </div>



            <div class="col-lg-4">

                <div class="ibox-content">
                    <h2>Payment Types ({this.state.paymentTypes.length})</h2>
                    
                    <Scrollbars style={{ height: 310 }}>

                    <ul class="todo-list m-t ui-sortable">
                    
                        {this.state.paymentTypes.map(pt=> 
                        <li key={pt.id}>
                            <span class="m-l-xs">{pt.paymentTypeName}</span>
                            <small class="float-right">
                            <a onClick={()=>this.editPaymentType(pt.id)}><i class="fa fa-edit"></i></a> &nbsp;&nbsp;
                            <a data-toggle="modal" data-target="#deletePaymentType" 
                                onClick={()=>this.onDeletePaymentType(pt.id, pt.paymentTypeName)}><i class="fa fa-trash"></i></a>
                                &nbsp;&nbsp;
                            </small>

                        </li>
                        )}

                        
                    </ul>
                    </Scrollbars>

                </div>

            </div>


            <div class="col-lg-4">

                <div class="ibox-content">
                    <h2>Accounts ({this.state.accounts.length})</h2>
                    
                    <Scrollbars style={{ height: 310 }}>

                    <ul class="todo-list m-t ui-sortable">
                    
                        {this.state.accounts.map(acc=> 
                        <li key={acc.id}>
                            <span class="m-l-xs">{acc.accountName}</span>
                            <small class="float-right">
                            <a onClick={()=>this.editAccount(acc.id)}><i class="fa fa-edit"></i></a> &nbsp;&nbsp;
                            <a data-toggle="modal" data-target="#deleteAccount" 
                                onClick={()=>this.onDeleteAccount(acc.id, acc.accountName)}><i class="fa fa-trash"></i></a>
                                &nbsp;&nbsp;
                            </small>

                        </li>
                        )}

                        
                    </ul>
                    </Scrollbars>

                </div>

                </div>



              <div class="col-lg-4">

                <div class="ibox-content">
                    <h2>Expense Categories ({this.state.expenseCategories.length})</h2>
                    
                    <Scrollbars style={{ height: 310 }}>

                    <ul class="todo-list m-t ui-sortable">
                    
                        {this.state.expenseCategories.map(ec=> 
                        <li key={ec.id}>
                            <span class="m-l-xs">{ec.categoryName}</span>
                            <small class="float-right">
                            <a onClick={()=>this.editExpenseCategory(ec.id)}><i class="fa fa-edit"></i></a> &nbsp;&nbsp;
                            <a data-toggle="modal" data-target="#deleteExpenseCategory" 
                                onClick={()=>this.onDeleteExpenseCategory(ec.id, ec.categoryName)}><i class="fa fa-trash"></i></a>
                                &nbsp;&nbsp;
                            </small>
                        </li>
                        )}

                        
                    </ul>
                    </Scrollbars>

                </div>

              </div>




            {/*}                

            <div class="col-lg-4">


                <div class="ibox-content">
                    <h2>Users ({this.state.users.length})</h2>
                    
                    <Scrollbars style={{ height: 310 }}>

                    <ul class="todo-list m-t ui-sortable">
                    
                        {this.state.users.map(u=> 
                        <li key={u.id}>
                            <span class="m-l-xs">{u.employee.employeeName}
                        <small class="label label-primary"><i class="fa fa-lock"></i> {u.userName}</small>
                            </span>
                            <small class="float-right">
                                 <a onClick={()=>this.editUser(u.id)}><i class="fa fa-edit"></i></a> &nbsp;&nbsp;
                                 <a data-toggle="modal" data-target="#deleteUser" 
                                    onClick={()=>this.onDeleteUser(u.id, u.userName)}><i class="fa fa-trash"></i></a>
                                    &nbsp;&nbsp;
                            </small>

                        </li>
                        )}
                    </ul>
                    </Scrollbars>

                </div>



                </div>
                
                       {*/}                   



               



        </div>

        
        <br/><br/><br/>          

        
        <Footer/>

        </div>
        )

    }


}


export default MasterData;
