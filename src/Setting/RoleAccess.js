
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import moment from 'moment';
import config from '../Shared/Config';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';

class RoleAccess extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            error: {},
            roleAccess: [],
            roleId: '',
            roleName: ''
        }
    }


    componentDidMount() {
        this.getRoleAccess();
    }


    getRoleAccess =()=> {
        axios.get(config.serverUrl + '/api/roleaccess/getall').then(response=> {
            this.setState({
                roleAccess: response.data,
            })
     })
    }

    addRoleAccess = () => {
        this.props.history.push('/add-role-access');
    }


    editRoleAccess = (id) => {
        this.props.history.push('/edit-role-access/' + id);
    }


    deleteRoleAccess = (id) => {
    
        axios.delete(config.serverUrl + '/api/roleaccess/delete/' + id).then(response=> {
            this.getRoleAccess();
        })
    }



    onDeleteRoleAccess = (roleId, roleName) => {
        this.setState({
            roleId: roleId,
            roleName: roleName
        })
    }


    viewUser = () => {
        this.props.history.push('/user');
    }


    addRoleAccess = () => {
        this.props.history.push('/add-role-access');
    }



    render() {

        
        let errStyle = {
            color: 'darkred'
        }

        return(
            <div id="page-wrapper" class="gray-bg">
                
                <div id="deleteRoleAccess" class="modal fade" role="dialog">
                
                <div class="modal-dialog">
                    
                    <div class="modal-content">

                          <div class="modal-header">
                            <h4>Delete Role Access</h4>
                          </div>
                          <div class="modal-body">
                          Are you sure want to delete '{this.state.roleName}' ?
                          </div>

                          <div class="modal-footer">
                            <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                            <button class="btn btn-label btn-danger" onClick={()=>this.deleteRoleAccess(this.state.roleId)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                          </div>
                        
                      </div>
                  </div>
              </div>




            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">
                    <h2>Users</h2>
                </div>
                <div class="col-lg-4">
                    
                    <div class="title-action">

                        <div class="btn-group">
                            <Link to="/add-role-access" class="btn btn-success">Add New Role Access </Link>
                        </div>

                    </div>

                </div>
                
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">
                                
                                <ul class="nav nav-tabs">
                                    <li><a class="nav-link" data-toggle="tab" href="#tab-1" onClick={this.viewUser}>Users</a></li>
                                    <li><a class="nav-link active show" data-toggle="tab" href="#tab-2">Role Access</a></li>
                                </ul>

                                <div class="tab-content">
                              
                                    <div id="tab-1" class="tab-pane">

                                    </div>

                                    <div id="tab-2" class="tab-pane active show">
                                    
                                         
                                         <table class="table table-hover table-striped">
                                         
                                            <thead>
                                                <th width="10%">Role</th>
                                                <th>Dashboard</th>
                                                <th>Master Data</th>
                                                <th>Employee</th>
                                                <th>Product</th>
                                                <th>Customer</th>
                                                <th>Supplier</th>
                                                <th>Point of Sale</th>
                                                <th>Purchase Invoice</th>
                                                <th>Sales Invoice</th>
                                                <th>Expense</th>
                                                <th>Report</th>
                                                <th>User</th>
                                                <th></th>
                                          
                                            </thead>

                                            <tbody>

                                                {this.state.roleAccess.map(ra=> 
                                                <tr key={ra.id}>
                                                    <td>{ra.role.roleName}</td>
                                                    <td align="center">
                                                        {ra.isAllowDashboard == true ? 
                                                            <i class="fa fa-check"></i>
                                                        : null
                                                        }
                                                    </td>
                                                    <td align="center">
                                                        {ra.isAllowMasterData == true ? 
                                                            <i class="fa fa-check"></i>
                                                        : null
                                                        }
                                                    </td>
                                                    <td align="center">
                                                        {ra.isAllowEmployee == true ? 
                                                            <i class="fa fa-check"></i>
                                                        : null
                                                        }
                                                    </td>
                                                    <td align="center">
                                                        {ra.isAllowProduct == true ? 
                                                            <i class="fa fa-check"></i>
                                                        : null
                                                        }
                                                    </td>
                                                    <td align="center">
                                                        {ra.isAllowCustomer == true ? 
                                                            <i class="fa fa-check"></i>
                                                        : null
                                                        }
                                                    </td>
                                                    <td align="center">
                                                        {ra.isAllowSupplier == true ? 
                                                            <i class="fa fa-check"></i>
                                                        : null
                                                        }
                                                    </td>        
                                                    <td align="center">
                                                        {ra.isAllowPointOfSale == true ? 
                                                            <i class="fa fa-check"></i>
                                                        : null
                                                        }
                                                    </td>
                                                    <td align="center">
                                                        {ra.isAllowPurchaseInvoice == true ? 
                                                            <i class="fa fa-check"></i>
                                                        : null
                                                        }
                                                    </td>
                                                    <td align="center">
                                                        {ra.isAllowSalesInvoice == true ? 
                                                            <i class="fa fa-check"></i>
                                                        : null
                                                        }
                                                    </td>
                                                    <td align="center">
                                                        {ra.isAllowExpense == true ? 
                                                            <i class="fa fa-check"></i>
                                                        : null
                                                        }
                                                    </td>
                                                    <td align="center">
                                                        {ra.isAllowReport == true ? 
                                                            <i class="fa fa-check"></i>
                                                        : null
                                                        }
                                                    </td>
                                                    <td align="center">
                                                        {ra.isAllowUser == true ? 
                                                            <i class="fa fa-check"></i>
                                                        : null
                                                        }
                                                    </td>

                                                   
                                                    <td align="right">
                                                         <a><i class="fa fa-edit"></i></a>
                                                        &nbsp;&nbsp;
                                                        <a data-toggle="modal" data-target="#deleteEmployee"><i class="fa fa-trash"></i></a>



                                                    </td>
                                                    
                                                </tr>
                                                )}

                                            </tbody>

                                         </table>

                                     </div>


                                </div>
                      </div>
                      


                </div>

            
            </div>
            
            
        </div>

        <br/>
        <br/>
        

        <Footer/>

        </div>

        )
    }


}


export default RoleAccess;
