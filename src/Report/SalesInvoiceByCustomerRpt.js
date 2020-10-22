
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

class SalesInvoiceByCustomerRpt extends Component
{
   
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            customerId: '',
            customerName: 'All',
            salesInvoices: [],
            startDate: moment().subtract(29, 'days'),
            endDate: moment()
        }
    }


    componentDidMount() {
        
        window.scrollTo(0, 0);

        this.getCustomers();
        this.getSalesInvoices(this.state.startDate.toDate(), this.state.endDate.toDate(), this.state.customerId);
    }

  
    handleDateCallback = (startDate, endDate) => {
        this.setState({ startDate, endDate});
    }


    getCustomers = () => {
        axios.get(config.serverUrl + '/api/customer/getall').then(response=> {
            this.setState({
                customers: response.data
            })
        })
    }


    
    getCustomerById = (id) => {
        axios.get(config.serverUrl + '/api/customer/getbyid/' + id).then(response=> {
            this.setState({
                customerName: response.data.customerName
            })
        })
    }


    
    getSalesInvoices = (startDate, endDate, customerId) => {

        var filter = {
            startDate: startDate,
            endDate: endDate,
            keyword: customerId
        }

        axios.post(config.serverUrl + '/api/salesinvoice/getbycustomer', filter).then(response=> {
            this.setState({
                salesInvoices: response.data
            })
        
            if (customerId !== '') {
                this.getCustomerById(customerId);
             } else {
                this.setState({
                    customerName: 'All'
                })
             }
        })
    }



    onValueChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })

    }


    filterSalesInvoices = () => {
        this.getSalesInvoices(this.state.startDate.toDate(), this.state.endDate.toDate(), this.state.customerId);
    }



    render() {

       
        let dateLabel = this.state.startDate.format('MMMM D, YYYY') + ' - ' + this.state.endDate.format('MMMM D, YYYY'); 
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
                                        startDate: this.state.startDate.toDate(),
                                        endDate: this.state.endDate.toDate(),
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
                                        onCallback={this.handleDateCallback}
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
                                        <span>{dateLabel}</span> <i className="fa fa-caret-down"></i>
                                        </div>
                                    </DateRangePicker>
                         



                                        &nbsp;&nbsp;


                                        <select class="form-control" name="customerId" onChange={this.onValueChange}>
                                        <option value="">Customer</option>
                                        {this.state.customers.map(c=> 
                                            <option value={c.id}>{c.customerName}</option>    
                                        )}
                                    </select>
                                
                                    &nbsp;
                                    
                                    <button class="btn btn-default" onClick={this.filterSalesInvoices}><i class="fa fa-filter"></i></button>
                                    &nbsp;&nbsp;&nbsp;


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
                                        <li><Link to="/purchase-invoice-rpt" class="dropdown-item">Purchase Invoice by Supplier</Link></li>
                                        <li><Link to="/purchase-invoice-rpt" class="dropdown-item">Purchase Invoice by Product Category</Link></li>
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

export default SalesInvoiceByCustomerRpt;

