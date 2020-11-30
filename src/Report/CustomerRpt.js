
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import {Link} from 'react-router-dom';
import config from '../Shared/Config';
import Header from '../Shared/Header';
import NavBar from '../Shared/NavBar';


class CustomerRpt extends Component
{
   
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        }
    }


    componentDidMount() {
        
        window.scrollTo(0, 0);
        this.getCustomers();
    }


    getCustomers =()=> {
        axios.get(config.serverUrl + '/api/customer/getall').then(response=> {
            this.setState({
                customers: response.data,
            })

        })
    }




   

    render() {

     
        return(

            <div>

                <Header/>
                <NavBar/>

                <div id="page-wrapper" class="gray-bg">

                    <div class="row wrapper border-bottom white-bg page-heading">
                        <div class="col-lg-4">
                            <h2>Reports</h2>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    Customers
                                </li>    
                                <li class="breadcrumb-item">
                                    All
                                </li>                        
                            </ol>
                            

                        </div>
                        <div class="col-lg-8">
                            <div class="title-action">

                            <div class="btn-group">
        
                                <button data-toggle="dropdown" class="btn btn-success dropdown-toggle" aria-expanded="false"><i class="fa fa-archive"></i></button>
                                <ul class="dropdown-menu" x-placement="bottom-start">
                                    <li><Link to="/employee-rpt" class="dropdown-item">Employee</Link></li>
                                    <li><Link to="/product-rpt" class="dropdown-item">Product</Link></li>
                                    <li><Link to="/customer-rpt" class="dropdown-item">Customer</Link></li>
                                    <li><Link to="/supplier-rpt" class="dropdown-item">Supplier</Link></li>
                                    <li class="dropdown-divider"></li>
                                    <li><Link to="/pos-customer-rpt" class="dropdown-item">Point of Sale by Customer</Link></li>
                                    <li><Link to="/pos-category-rpt" class="dropdown-item">Point of Sale by Product Category</Link></li>
                                    <li class="dropdown-divider"></li>
                                    <li><Link to="/sales-invoice-customer-rpt" class="dropdown-item">Sales Invoice by Customer</Link></li>
                                    <li><Link to="/sales-invoice-category-rpt" class="dropdown-item">Sales Invoice by Product Category</Link></li>
                                    <li class="dropdown-divider"></li>
                                    <li><Link to="/purchase-invoice-supplier-rpt" class="dropdown-item">Purchase Invoice by Supplier</Link></li>
                                    <li><Link to="/purchase-invoice-category-rpt" class="dropdown-item">Purchase Invoice by Product Category</Link></li>
                                    <li class="dropdown-divider"></li>
                                    <li><Link to="/expense-rpt" class="dropdown-item">Expense</Link></li>
                                </ul>
                                &nbsp;
                            
                            </div>

                            </div>
                        </div>
                    </div>

                    <div class="wrapper wrapper-content animated fadeInRight">

                <div class="row">
                <div class="col-lg-12">

                        <div class="ibox-content p-xl">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <h2>Customers ({this.state.customers.length})</h2>
                                        <span class="label label-primary">All</span>
                                    </div>

                                </div>

                                <div>
                                <table class="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>Customer Name</th>
                                            <th>Address</th>
                                            <th>City</th>
                                            <th>Phone</th>
                                            <th>E-Mail</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {this.state.customers.map(c=> 
                                                <tr>
                                                    <td>{c.customerName}</td>
                                                    <td>{c.address}</td>
                                                    <td>{c.city}</td>
                                                    <td>{c.phone}</td>
                                                    <td>{c.email}</td>
                                                    <td align="middle">
                                                        {c.isActive===false? 
                                                            <span class="label label-danger">Not Active</span>
                                                        : null
                                                        }
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

                <br/>

        
                
                <Footer/>

            </div>
 
        </div>
                        
            
        )
    }



}

export default CustomerRpt;
