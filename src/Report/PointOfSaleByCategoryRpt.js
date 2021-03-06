
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

class PointOfSaleByCategoryRpt extends Component
{
   
    constructor(props) {
        super(props);
        this.state = {
            category: {},
            categories: [],
            categoryId: '',
            categoryName: 'All',
            pointOfSales: [],
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),        }
    }


    componentDidMount() {
        
        window.scrollTo(0, 0);

        this.getCategories();
        this.getPointOfSales(this.state.startDate.toDate(), this.state.endDate.toDate(), this.state.categoryId);

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


    getPointOfSales = (startDate, endDate, categoryId) => {

        var filter = {
            startDate: startDate,
            endDate: endDate,
            keyword: categoryId
        }

        axios.post(config.serverUrl + '/api/pointofsale/getbycategory', filter).then(response=> {
            this.setState({
                pointOfSales: response.data
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


    filterPointOfSales = () => {

        this.getPointOfSales(this.state.startDate.toDate(), this.state.endDate.toDate(), this.state.categoryId);
        
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
                                    Sales
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
                                        <option value="">All Product Category</option>
                                        {this.state.categories.map(c=> 
                                            <option value={c.id}>{c.categoryName}</option>    
                                        )}
                                    </select>
                                
                                    &nbsp;
                                    
                                    <button class="btn btn-default" onClick={this.filterPointOfSales}><i class="fa fa-filter"></i></button>
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
                                        <h2>Point of Sale by Category ({this.state.pointOfSales.length})</h2>
                                        <span class="label label-primary">{this.state.categoryName}</span>
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

export default PointOfSaleByCategoryRpt;
