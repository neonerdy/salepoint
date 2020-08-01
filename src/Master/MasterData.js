
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
            categories: [],
            categoryId: '',
            categoryName: '',
            jobTitles: [],
            jobTitleId: '', 
            titleName: '',
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
        this.getJobTitles();
        this.getUsers();
        this.getPaymentTypes();
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
                categories: response.data
            })
        })
    }


    addProductCategory = () => {
        this.props.history.push('/add-product-category');
    }


    editProductCategory = (id) => {
        this.props.history.push('/edit-product-category/' + id)
    }



    onDeleteProductCategory = (categoryId, categoryName) => {
        this.setState({
            categoryId: categoryId,
            categoryName: categoryName
        })
    }

    deleteProductCategory = (id) => {

        axios.delete(config.serverUrl + '/api/productcategory/delete/' + id).then(response=> {
            this.getProductCategories();
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
                          Are you sure want to delete '{this.state.categoryName}' ?
                          </div>

                          <div class="modal-footer">
                            <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                            <button class="btn btn-label btn-danger" onClick={()=>this.deleteProductCategory(this.state.categoryId)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
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
                                    <li><a class="dropdown-item" onClick={this.addJobTitle}>Job Title</a></li>
                                    <li><a class="dropdown-item" onClick={this.addUser}>User</a></li>
                                    <li><a class="dropdown-item" onClick={this.addPaymentType}>Payment Type</a></li>
                                </ul>
                             </div>
                         </div>
                </div>        
            </div>

        <br/>

        <div class="row">



        <div class="col-lg-4">


                <div class="ibox-content">
                    <h2>Product Categories ({this.state.categories.length})</h2>
                    
                    
                    <Scrollbars style={{ height: 310 }}>

                    <ul class="todo-list m-t ui-sortable">

                        {this.state.categories.map(c=> 

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
                    <h2>Job Titles ({this.state.jobTitles.length})</h2>
                    
                    <Scrollbars style={{ height: 310 }}>

                    <ul class="todo-list m-t ui-sortable">
                     
                        {this.state.jobTitles.map(jt=> 
                        <li key={jt.id}>
                            <span class="m-l-xs">{jt.titleName}</span>
                            <small class="float-right">
                                <a onClick={()=>this.editJobTitle(jt.id)}><i class="fa fa-edit"></i></a> &nbsp;&nbsp;
                                 <a data-toggle="modal" data-target="#deleteJobTitle" 
                                    onClick={()=>this.onDeleteJobTitle(jt.id, jt.titleName)}><i class="fa fa-trash"></i></a>
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
                



                <div class="col-lg-4">


                    <div class="ibox-content">
                        <h2>Payment Types ({this.state.paymentTypes.length})</h2>
                        
                        <Scrollbars style={{ height: 310 }}>

                        <ul class="todo-list m-t ui-sortable">
                        
                            {this.state.paymentTypes.map(pt=> 
                            <li key={pt.id}>
                                <span class="m-l-xs">{pt.paymentName}</span>
                                <small class="float-right">
                                 <a onClick={()=>this.editPaymentType(pt.id)}><i class="fa fa-edit"></i></a> &nbsp;&nbsp;
                                 <a data-toggle="modal" data-target="#deletePaymentType" 
                                    onClick={()=>this.onDeletePaymentType(pt.id, pt.paymentName)}><i class="fa fa-trash"></i></a>
                                    &nbsp;&nbsp;
                                </small>

                            </li>
                            )}

                            
                        </ul>
                        </Scrollbars>

                    </div>



                    </div>




        </div>

        
        <br/><br/><br/>          

        
        <Footer/>

        </div>
        )

    }


}


export default MasterData;
