
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import {Link} from 'react-router-dom';
import config from '../Shared/Config';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import Header from '../Shared/Header';
import NavBar from '../Shared/NavBar';

class SalesInvoiceRpt extends Component
{
   
    constructor(props) {
        super(props);
        this.state = {
            company: {},
            customers: [],
            customerName: 'All',
            salesInvoices: [],
            start: moment().subtract(29, 'days'),
            end: moment()
        }
    }


    componentDidMount() {
        
        window.scrollTo(0, 0);

        this.getCompanyById('E8DC5367-D553-4232-E621-08D84993E0DB');
        this.getCustomers();
        this.getSalesInvoices();
    }

  
    handleCallback = (start, end) => {
        this.setState({ start, end});
    }


    getCompanyById = (id) => {
        axios.get(config.serverUrl + '/api/company/getById/' + id).then(response=> {
            this.setState({
                company: response.data
            })

        })
    }


    getCustomers = () => {
        axios.get(config.serverUrl + '/api/customer/getall').then(response=> {
            this.setState({
                customers: response.data
            })
        })
    }


    getSalesInvoices = () => {
        axios.get(config.serverUrl + '/api/salesinvoice/getall').then(response=> {
            this.setState({
                salesInvoices: response.data
            })
        })
    }




    render() {

       
        let label = this.state.start.format('MMMM D, YYYY') + ' - ' + this.state.end.format('MMMM D, YYYY'); 
        let totalInvoice = 0;
        let totalPaid = 0;
        
        this.state.salesInvoices.map(si=> {
            totalInvoice += si.total;
            totalPaid += si.amountPaid;
        });

        let totalUnpaid = totalInvoice - totalPaid;

        return(
     
            <div>

                <Header/>
                <NavBar/>
                
                <div id="page-wrapper" class="gray-bg">
                    <div class="row wrapper border-bottom white-bg page-heading">
                        
                        <div class="col-lg-5">
                            <h2>Reports</h2>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item">
                                    Sales Invoice
                                </li>    
                                <li class="breadcrumb-item">
                                    {this.state.customerName}
                                </li>                        
                            </ol>
                            

                        </div>
                        <div class="col-lg-7">
                            <div class="title-action">

                            <div class="btn-group2">

                            <DateRangePicker
                                            initialSettings={{
                                            startDate: this.state.start.toDate(),
                                            endDate: this.state.end.toDate(),
                                            ranges: {
                                                Today: [moment().toDate(), moment().toDate()],
                                                Yesterday: [
                                                moment().subtract(1, 'days').toDate(),
                                                moment().subtract(1, 'days').toDate(),
                                                ],
                                                'Last 7 Days': [
                                                moment().subtract(6, 'days').toDate(),
                                                moment().toDate(),
                                                ],
                                                'Last 30 Days': [
                                                moment().subtract(29, 'days').toDate(),
                                                moment().toDate(),
                                                ],
                                                'This Month': [
                                                moment().startOf('month').toDate(),
                                                moment().endOf('month').toDate(),
                                                ],
                                                'Last Month': [
                                                moment().subtract(1, 'month').startOf('month').toDate(),
                                                moment().subtract(1, 'month').endOf('month').toDate(),
                                                ],
                                            },
                                            }}
                                            onCallback={this.handleCallback}
                                        >
                                            <div
                                            id="reportrange"
                                        
                                            style={{
                                                background: '#fff',
                                                cursor: 'pointer',
                                                padding: '5px 10px',
                                                border: '1px solid #ccc',
                                                width: '100%',
                                            }}
                                            >
                                            <i className="fa fa-calendar"></i>&nbsp;
                                            <span>{label}</span> <i className="fa fa-caret-down"></i>
                                            </div>
                                        </DateRangePicker>
                                    
                                        &nbsp;&nbsp;


                                        <select class="form-control" onChange={this.onValueChange}>
                                        <option value="">Customer</option>
                                        {this.state.customers.map(c=> 
                                            <option value={c.id}>{c.customerName}</option>    
                                        )}
                                    </select>
                                


                                    &nbsp;
                                    
                                    <button class="btn btn-default"><i class="fa fa-filter"></i></button>
                                    &nbsp;&nbsp;&nbsp;


                                    <button data-toggle="dropdown" class="btn btn-success dropdown-toggle" aria-expanded="false"><i class="fa fa-archive"></i></button>
                                    <ul class="dropdown-menu" x-placement="bottom-start">
                                        <li><Link to="/employee-rpt" class="dropdown-item">Employee</Link></li>
                                        <li><Link to="/product-rpt" class="dropdown-item">Product</Link></li>
                                        <li><Link to="/customer-rpt" class="dropdown-item">Customer</Link></li>
                                        <li><Link to="/supplier-rpt" class="dropdown-item">Supplier</Link></li>
                                        <li class="dropdown-divider"></li>
                                        <li><Link to="/pos-rpt" class="dropdown-item">Point of Sale by Customer</Link></li>
                                        <li><Link to="/pos-rpt" class="dropdown-item">Point of Sale by Category</Link></li>
                                        <li><Link to="/pos-rpt" class="dropdown-item">Point of Sale by Product</Link></li>
                                        <li class="dropdown-divider"></li>
                                        <li><Link to="/sales-invoice-rpt" class="dropdown-item">Sales Invoice by Customer</Link></li>
                                        <li><Link to="/sales-invoice-rpt" class="dropdown-item">Sales Invoice by Category</Link></li>
                                        <li><Link to="/sales-invoice-rpt" class="dropdown-item">Sales Invoice by Product</Link></li>
                                        <li class="dropdown-divider"></li>
                                        <li><Link to="/purchase-invoice-rpt" class="dropdown-item">Purchase Invoice by Supplier</Link></li>
                                        <li><Link to="/purchase-invoice-rpt" class="dropdown-item">Purchase Invoice by Category</Link></li>
                                        <li><Link to="/purchase-invoice-rpt" class="dropdown-item">Purchase Invoice by Product</Link></li>
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
                                
                                
                                        <h2>Sales Invoice ({this.state.salesInvoices.length})</h2>
                                        <span class="label label-primary">{this.state.customerName}</span>
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
                                            <th>Invoice Code</th>
                                            <th>Customer Name</th>
                                            <th>Invoice Date</th>
                                            <th>Due Date</th>
                                            <th>Sales Person</th>
                                            <th>Total Invoice</th>
                                            <th>Amount Paid</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        
                                        <tbody>
                                            
                                            {this.state.salesInvoices.map(si=> 
                                                
                                            <tr key={si.id}>
                                                    <td>{si.invoiceCode}</td>
                                                    <td>{si.customerName}</td>
                                                    <td>{moment(si.invoiceDate).format("MM/DD/YYYY")}</td>
                                                    <td>{moment(si.dueDate).format("MM/DD/YYYY")}</td>
                                                    <td>{si.salesPerson}</td>
                                                    <td>{si.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                    <td>{si.amountPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                    <td>{si.status}</td>
                                            </tr>
                                                
                                            )} 
                                
                                        </tbody>



                                    </table>
                                </div>

                                <table class="table invoice-total">
                                    <tbody>
                                    <tr>
                                        <td><strong>Total Invoice :</strong></td>
                                        <td>{totalInvoice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Total Paid :</strong></td>
                                        <td>{totalPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Total Unpaid :</strong></td>
                                        <td>{totalUnpaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    </tr>
                                    
                                    </tbody>
                                </table>
            
                    
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

export default SalesInvoiceRpt;
