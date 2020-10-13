
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

class PointOfSaleRpt extends Component
{
   
    constructor(props) {
        super(props);
        this.state = {
            company: {},
            customers: [],
            customerName: 'All',
            pointOfSales: [],
            startDate: moment().subtract(29, 'days'),
            endDate: moment()
        }
    }


    componentDidMount() {
        
        window.scrollTo(0, 0);

        this.getCompanyById('E8DC5367-D553-4232-E621-08D84993E0DB');
        this.getCustomers();
        this.getPointOfSales(this.state.startDate.toDate(), this.state.endDate.toDate());

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


    getPointOfSales = (startDate, endDate) => {

        var dateRange = {
            startDate: startDate,
            endDate: endDate
        }

        axios.post(config.serverUrl + '/api/pointofsale/getbydate', dateRange).then(response=> {
            this.setState({
                pointOfSales: response.data
            })
        })
    }




    render() {

       
        let dateLabel = this.state.startDate.format('MMMM D, YYYY') + ' - ' + this.state.endDate.format('MMMM D, YYYY'); 
        let totalSales = 0;
        
        this.state.pointOfSales.map(si=> {
            totalSales += si.total;
        });

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
                                    Point of Sale
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
                                        <li><Link to="/pos-category-rpt" class="dropdown-item">Point of Sale by Product Category</Link></li>
                                        <li class="dropdown-divider"></li>
                                        <li><Link to="/sales-invoice-rpt" class="dropdown-item">Sales Invoice by Customer</Link></li>
                                        <li><Link to="/sales-invoice-rpt" class="dropdown-item">Sales Invoice by Product Category</Link></li>
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
                                
                                
                                        <h2>Point of Sale by Customer ({this.state.pointOfSales.length})</h2>
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
                                            <th>Sale Code</th>
                                            <th>Customer Name</th>
                                            <th>Date</th>
                                            <th>Cashier</th>
                                            <th>Payment Type</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        
                                        <tbody>
                                            
                                            {this.state.pointOfSales.map(pos=> 
                                                
                                            <tr key={pos.id}>
                                                    <td>{pos.salesCode}</td>
                                                    <td>{pos.customerName}</td>
                                                    <td>{moment(pos.salesDate).format("MM/DD/YYYY")}</td>
                                                    <td>{pos.cashier}</td>
                                                    <td>{pos.paymentType}</td>
                                                    <td>{pos.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                    <td>{pos.status}</td>
                                            </tr>
                                                
                                            )} 
                                
                                        </tbody>



                                    </table>
                                </div>

                                <table class="table invoice-total">
                                    <tbody>
                                    <tr>
                                        <td><strong>Total Sales :</strong></td>
                                        <td>{totalSales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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

export default PointOfSaleRpt;
