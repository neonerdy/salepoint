
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import {Link} from 'react-router-dom';
import config from '../Shared/Config';
import Header from '../Shared/Header';
import NavBar from '../Shared/NavBar';


class EmployeeRpt extends Component
{
   
    constructor(props) {
        super(props);
        this.state = {
            company: {},
            employees: []
        }
    }


    componentDidMount() {
        
        window.scrollTo(0, 0);

        this.getCompanyById('E8DC5367-D553-4232-E621-08D84993E0DB');
        this.getEmployees();
    }


    getCompanyById = (id) => {
       
        axios.get(config.serverUrl + '/api/company/getById/' + id).then(response=> {
            this.setState({
                company: response.data
            })
        })
    }

    getEmployees =()=> {
        axios.get(config.serverUrl + '/api/employee/getall').then(response=> {
            this.setState({
                employees: response.data,
                initialEmployees: response.data
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
                                    Employees
                                </li>    
                                <li class="breadcrumb-item">
                                    All
                                </li>                        
                            </ol>
                            

                        </div>
                        <div class="col-lg-8">
                            <div class="title-action">

                            <div class="btn-group">
        
                                <button class="btn btn-default"><i class="fa fa-print"></i></button>
                                &nbsp;&nbsp;&nbsp;

                                <button data-toggle="dropdown" class="btn btn-success dropdown-toggle" aria-expanded="false"><i class="fa fa-archive"></i></button>
                                <ul class="dropdown-menu" x-placement="bottom-start">
                                    <li><Link to="/employee-rpt" class="dropdown-item">Employee</Link></li>
                                    <li><Link to="/product-rpt" class="dropdown-item">Product</Link></li>
                                    <li><Link to="/customer-rpt" class="dropdown-item">Customer</Link></li>
                                    <li><Link to="/supplier-rpt" class="dropdown-item">Supplier</Link></li>
                                    <li><Link to="/pos-rpt" class="dropdown-item">Point of Sale</Link></li>
                                    <li><Link to="/sales-invoice-rpt" class="dropdown-item">Sales Invoice</Link></li>
                                    <li><Link to="/purchase-invoice-rpt" class="dropdown-item">Purchase Invoice</Link></li>
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
                                        <h2>Employees ({this.state.employees.length})</h2>
                                        <span class="label label-primary">All</span>
                                    </div>

                                    <div class="col-sm-6 text-right">
                                    
                                        <address>
                                            <strong>{this.state.company.companyName}</strong><br/>
                                            {this.state.company.address}<br/>
                                            {this.state.company.city}<br/>
                                            <abbr title="Phone"></abbr> {this.state.company.phone}
                                        </address>
                                        
                                    </div>
                                </div>

                                <div>
                                <table class="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>Employee Name</th>
                                            <th>Address</th>
                                            <th>City</th>
                                            <th>Phone</th>
                                            <th>E-Mail</th>
                                            <th>Job Title</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            
                                            {this.state.employees.map(e=> 
                                                <tr>
                                                <td>{e.employeeName}</td>
                                                        <td>{e.address}</td>
                                                        <td>{e.city}</td>
                                                        <td>{e.phone}</td>
                                                        <td>{e.email}</td>
                                                        <td>{e.role.roleName}</td>
                                                        <td align="middle">
                                                        {e.isActive===false? 
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

export default EmployeeRpt;
