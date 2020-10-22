
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

class PurchaseInvoiceByCategoryRpt extends Component
{
   
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            categoryId: '',
            categoryName: 'All',
            purchaseInvoices: [],
            startDate: moment().subtract(29, 'days'),
            endDate: moment()
        }
    }


    componentDidMount() {
        
        window.scrollTo(0, 0);

        this.getCategories();
        this.getPurchaseInvoices(this.state.startDate.toDate(), this.state.endDate.toDate(), this.state.categoryId);
    }

  
    handleDateCallback = (startDate, endDate) => {
        this.setState({ startDate, endDate});
    }


    getCategories = () => {
        axios.get(config.serverUrl + '/api/productcategory/getall').then(response=> {
            this.setState({
                categories: response.data
            })
        })
    }


    getCategoryById = (id) => {
        axios.get(config.serverUrl + '/api/productcategory/getbyid/' + id).then(response=> {
            this.setState({
                categoryName: response.data.categoryName
            })
        })
    }


    
    getPurchaseInvoices = (startDate, endDate, categoryId) => {

        var filter = {
            startDate: startDate,
            endDate: endDate,
            keyword: categoryId
        }

        axios.post(config.serverUrl + '/api/purchaseinvoice/getbycategory', filter).then(response=> {
            this.setState({
                purchaseInvoices: response.data
            })
        
            if (categoryId !== '') {
                this.getCategoryById(categoryId);
             } else {
                this.setState({
                    categoryName: 'All'
                })
             }
        })
    }



    onValueChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })

    }


    filterPurchaseInvoices = () => {
        this.getPurchaseInvoices(this.state.startDate.toDate(), this.state.endDate.toDate(), this.state.categoryId);
    }



    render() {

       
        let dateLabel = this.state.startDate.format('MMMM D, YYYY') + ' - ' + this.state.endDate.format('MMMM D, YYYY'); 
        let totalInvoice = 0;
        let totalPaid = 0;
        
        this.state.purchaseInvoices.map(pi=> {
            totalInvoice += pi.total;
            totalPaid += pi.amountPaid;
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
                                    Purchase Invoice
                                </li>    
                                <li class="breadcrumb-item">
                                    {this.state.categoryName}
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


                                        <select class="form-control" name="categoryId" onChange={this.onValueChange}>
                                        <option value="">Product Category</option>
                                        {this.state.categories.map(c=> 
                                            <option value={c.id}>{c.categoryName}</option>    
                                        )}
                                    </select>
                                
                                    &nbsp;
                                    
                                    <button class="btn btn-default" onClick={this.filterPurchaseInvoices}><i class="fa fa-filter"></i></button>
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
                                
                                
                                        <h2>Purchase Invoice ({this.state.purchaseInvoices.length})</h2>
                                        <span class="label label-primary">{this.state.categoryName}</span>
                                    </div>

                                </div>

                                <div>
                                    <table class="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>Invoice Code</th>
                                            <th>Supplier Name</th>
                                            <th>Invoice Date</th>
                                            <th>Due Date</th>
                                            <th>Total Invoice</th>
                                            <th>Amount Paid</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        
                                        <tbody>
                                            
                                            {this.state.purchaseInvoices.map(pi=> 
                                                
                                            <tr key={pi.id}>
                                                <td>{pi.invoiceCode}</td>
                                                <td>{pi.supplierName}</td>
                                                <td>{moment(pi.invoiceDate).format("MM/DD/YYYY")}</td>
                                                <td>{moment(pi.dueDate).format("MM/DD/YYYY")}</td>
                                                <td>{pi.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                <td>{pi.amountPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                <td>{pi.status}</td>
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

export default PurchaseInvoiceByCategoryRpt;

