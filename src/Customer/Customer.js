
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import config from '../Shared/Config';
import { Link } from 'react-router-dom';


class Customer extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            customerId: '',
            customerName: '',
        }
    }


    componentDidMount() {
        this.getCustomers();
    }


    getCustomers = () => {
        axios.get(config.serverUrl + '/api/customer/getall').then(response=> {
            this.setState({
                customers: response.data
            })
        })
    }


    addCustomer = () => {
        this.props.history.push('/add-customer');
    }

    editCustomer = (id) => {
        this.props.history.push('/edit-customer/' + id);
    }
  
    deleteCustomer = (id) => {
        axios.delete(config.serverUrl + '/api/customer/delete/' + id).then(response=> {
            this.getCustomers();
        })
    }


    onDeleteCustomer = (customerId, customerName) => {
        this.setState({
            customerId: customerId,
            customerName: customerName
        })
    }


    render() {

      
        return(
          

            <div id="page-wrapper" class="gray-bg">


               <div id="deleteCustomer" class="modal fade" role="dialog">
                
                  <div class="modal-dialog">
                      
                      <div class="modal-content">

                            <div class="modal-header">
                              <h4>Delete Customer</h4>
                            </div>
                            <div class="modal-body">
                            Are you sure want to delete '{this.state.customerName}' ?
                            </div>

                            <div class="modal-footer">
                              <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                              <button class="btn btn-label btn-danger" onClick={()=>this.deleteCustomer(this.state.customerId)} data-dismiss="modal">
                                  <label><i class="ti-check"></i></label> YES</button>
                            </div>
                          
                        </div>
                    </div>
                </div>

                    <div class="row wrapper border-bottom white-bg page-heading">
                        <div class="col-lg-8">

                            <h2>Customers ({this.state.customers.length})</h2>
                        </div>
                        <div class="col-lg-4">
                            <div class="title-action">

                               <div class="btn-group">
                                    <Link to="/add-customer" class="btn btn-success">Add New Customer</Link>
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
                                    <li><a class="nav-link active show" data-toggle="tab" href="#tab-1">Customers</a></li>
                                </ul>

                                <div class="tab-content">
                                    <div id="tab-1" class="tab-pane active show">

                                         <table class="table table-hover table-striped">
                                         
                                            <thead>
                                                <th>Customer Name</th>
                                                <th>Address</th>
                                                <th>City</th>
                                                <th>Phone</th>
                                                <th>E-Mail</th>
                                                <th></th>
                                                <th></th>
                                                
                                            </thead>
                                           
                                            <tbody>
                                            
                                            {this.state.customers.map(c=> 
                                               
                                               <tr key={c.id}>
                                                    <td>{c.customerName}</td>
                                                    <td>{c.address}</td>
                                                    <td>{c.city}</td>
                                                    <td>{c.phone}</td>
                                                    <td>{c.email}</td>
                                                    <td class="middle">
                                                        {c.isActive === false? 
                                                            <span class="label label-danger">Not Active</span>
                                                        : null
                                                        }
                                                    </td>
                                                    <td class="right">
                                                        <a onClick={()=>this.editCustomer(c.id)}><i class="fa fa-edit"></i></a>
                                                        &nbsp;&nbsp;
                                                        <a data-toggle="modal" data-target="#deleteCustomer" onClick={()=>this.onDeleteCustomer(c.id,c.customerName)}><i class="fa fa-trash"></i></a>
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

                
                <Footer/>

        </div>



        )
    }


}

export default Customer;
