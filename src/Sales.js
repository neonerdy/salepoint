
import React, {Component} from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import Header from './Header';
import { Scrollbars } from 'react-custom-scrollbars';
import config from './Config';
import axios from 'axios';
import moment from 'moment';

class Sales extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            outlets: [],
            sales: [],
            initialSales: [],
            id: '',
            outletName: '',
            outletAddress: '',
            outletCity: '',
            outletPhone: '',
            invoiceCode: '',
            invoiceDate: '',
            customerName: '',
            customerAddress: '',
            customerCity: '',
            customerPhone: '',
            salesItems: [],
            subTotal: 0,
            tax: 0,
            serviceCharge: 0,
            total: 0,
            status: ''
        }
    }


    componentDidMount() {
        
        window.scrollTo(0, 0);
        
        this.getOutlets();
        this.getSalesWithTopOne();
        
    }


    getOutlets = () => {

        axios.get(config.serverUrl + '/api/outlet/getall').then(response=> {
            this.setState({
                outlets: response.data
            })
        })

    }

    getTopSales = () => {
        
        if (this.state.sales.length > 0) {
            this.getSalesDetail(this.state.sales[0].id);
        }
    }

    getSalesWithTopOne = () => {

        axios.get(config.serverUrl + '/api/sales/getall').then(response=> {
            this.setState({
                sales: response.data,
                initialSales: response.data
            })

            this.getTopSales();
        })
    }

    getSales = () => {

        axios.get(config.serverUrl + '/api/sales/getall').then(response=> {
            this.setState({
                sales: response.data,
                initialSales: response.data
            })

        })
    }

    
    getSalesDetail = (id) => {

        axios.get(config.serverUrl + '/api/sales/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                outletName: response.data.outletName,
                outletAddress: response.data.outletAddress,
                outletCity: response.data.outletCity,
                outletPhone: response.data.outletPhone,
                invoiceCode: response.data.invoiceCode,
                invoiceDate: response.data.invoiceDate,
                customerName: response.data.customerName,
                customerAddress: response.data.customerAddress,
                customerCity: response.data.customerCity,
                customerPhone: response.data.customerPhone,
                salesItems: response.data.salesItems,
                subTotal : response.data.subTotal,
                tax: response.data.tax,
                serviceCharge: response.data.serviceCharge,
                total: response.data.total,
                status: response.data.status,
            })

        
        })


    }



    addSales = () => {
        this.props.history.push('/add-sales');
    }

    editSales = (id) => {
        this.props.history.push('/edit-sales/' + id);
    }


    deleteSales = (id) => {

        axios.delete(config.serverUrl + '/api/sales/delete/' + id).then(response=> {
            this.getSalesWithTopOne();
        })
    }




    updateStatus = (id, status) => {

        axios.get(config.serverUrl + '/api/sales/updatestatus/' + id + '/' + status).then(response=> {
            this.getSales();
            this.getSalesDetail(id);
        })
    }

    
    renderStatus = (status) => {

        if (status ==='New') {
            return(
               <span class="label float-right label-primary">{status.toUpperCase()}</span> 
            )
        } else if (status === 'Paid') {
            return(
                <span class="label float-right label-warning">{status.toUpperCase()}</span> 
             )
        } else if (status === 'Canceled') {
            return(
                <span class="label float-right label-danger">{status.toUpperCase()}</span> 
            )
        }


    }



    onSearchSales = (e) => {


        let x = e.target.value.toLowerCase();
      
        let filteredSales = this.state.initialSales.filter(s => 
            s.invoiceCode.toLowerCase().includes(x) ||
            s.customerName.toLowerCase().includes(x) ||
            s.status.toLowerCase().includes(x)
         );
            
        
        if (e.target.value === '') {
            this.setState( {
                sales: this.state.initialSales
            })
        }
        else {
            this.setState( {
                sales: filteredSales
            })
    
        }
    }



    render() {

        let color='';
        
        if (this.state.status === 'New') {
            color = '#1ab394';
        } else if (this.state.status === 'Paid') {
            color = '#f8ac59';
        } else if (this.state.status === 'Canceled') {
            color = '#ed5565';
        }

        let invBorderStyle = {
            borderColor: color
        }
   
        return(
       
                <div id="page-wrapper" class="gray-bg">

                      {/* DELETE */}

                        <div id="deleteSales" class="modal fade" role="dialog">
                            
                            <div class="modal-dialog">
                                
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h4>Delete Sales</h4>
                                    </div>
                                    <div class="modal-body">
                                    Are you sure want to delete '{this.state.invoiceCode}' ?
                                    </div>

                                    <div class="modal-footer">
                                        <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                                        <button class="btn btn-label btn-danger" onClick={()=>this.deleteSales(this.state.id)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>


                    
                        <div class="row wrapper border-bottom white-bg page-heading">
                            <div class="col-lg-4">
                                <h2>Sales ({this.state.sales.length})</h2>
                            
                            </div>
                            <div class="col-lg-8">
                                <div class="title-action">
                                <div class="btn-group">

                                   <select name="outlet" class="form-control" onChange={this.onMonthChange}> 
                                        <option value="">Select Outlet</option>
                                        {this.state.outlets.map(o=> 
                                            <option value={o.id}>{o.outletName}</option>

                                        )}
                                       
                                    </select>
                                    &nbsp;&nbsp;

                                    <select name="expenseMonth" class="form-control" onChange={this.onMonthChange}> 
                                        <option value="">Select Month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                    &nbsp;&nbsp;
                                    <button class="btn btn-default"><i class="fa fa-filter"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;


                                </div>
                                   &nbsp;&nbsp;
                                    <a href="#" onClick={this.addSales} class="btn btn-success">Add New Sales</a>
                                </div>
                            </div>
                            
                        </div>

                        <div class="fh-breadcrumb">

                <div class="fh-column">
                    
                <Scrollbars  style={{ width: 240, height: 800 }}>
                    <div>

                        <ul class="list-group elements-list">
                            <input type="text" class="form-control" onChange={this.onSearchSales}/>
                            
                            {this.state.sales.map(s=> 
                            
                                <li key={s.id} class="list-group-item">
                                    <a class="nav-link" onClick={()=>this.getSalesDetail(s.id)}>
                                        <small class="float-right text-muted"><i class="fa fa-clock"></i>{moment(s.invoiceDate).format('MM/DD/YYYY')}</small>
                                        <strong>{s.invoiceCode}</strong>
                                        <div class="small m-t-xs">
                                            {s.customerName}
                                            <p class="m-b-none">
                                            {this.renderStatus(s.status)}
                                            Total : {s.total}
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                
                            )}

                          
                         


                        </ul>

                    </div>
                
                </Scrollbars>

                

                </div>

                <div>

                    <br/>

                       <div class="row">

                            <div class="btn-group">
                                <div class="col-lg-8">
                                       
                                </div>
                            </div>

                            <div class="col-lg-4">

                                

                            </div>

                        </div>
                        
                        <Scrollbars  style={{ width: 1010, height: 800 }}
                            autoHide
                        >
                 
                    
                 <div class="col-lg-12">
                <div class="wrapper wrapper-content animated fadeInRight">
                    
                   
                <div class="ibox-title" style={invBorderStyle}>
                    <h5>{this.state.status.toUpperCase()}</h5>
                    <div class="ibox-tools">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-ellipsis-h"></i></a>
                            <ul class="dropdown-menu dropdown-user">
                                <li><a onClick={()=>this.editSales(this.state.id)} class="dropdown-item">Edit</a></li>
                                <li><a data-toggle="modal" data-target="#deleteSales" class="dropdown-item">Delete</a></li>
                                <li><a onClick={()=>this.updateStatus(this.state.id,'Paid')} class="dropdown-item">Changed to Paid</a></li>
                                <li><a onClick={()=>this.updateStatus(this.state.id,'Canceled')} class="dropdown-item">Changed to Canceled</a></li>
                            </ul>
                    </div>                          
                </div>

                    
                    <div class="ibox-content p-xl">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h5>From:</h5>
                                    <address>
                                        <strong>{this.state.outletName}</strong><br/>
                                        {this.state.outletAddress}<br/>
                                        {this.state.outletCity}<br/>
                                        {this.state.outletPhone}
                                    </address>
                                </div>

                                <div class="col-sm-6 text-right">
                                    <h4>Invoice No.</h4>
                                    <h4 class="text-navy">{this.state.invoiceCode}</h4>
                                    <span>To:</span>
                                    <address>
                                        <strong>{this.state.customerName}</strong><br/>
                                        {this.state.customerAddress}<br/>
                                        {this.state.customerCity}<br/>
                                        {this.state.customerPhone}
                                    </address>
                                    <p>
                                        <span><strong>Invoice Date : </strong>{moment(this.state.invoiceDate).format("MM/DD/YYYY")}</span><br/>
                                    </p>
                                </div>
                            </div>

                            <div class="table-responsive m-t">
                                <table class="table invoice-table">
                                    <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Total Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.salesItems.map(si=> 
                                    <tr key={si.id}>
                                        <td>{si.productName}</td>
                                        <td>{si.qty}</td>
                                        <td>{si.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td>{(si.qty * si.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    </tr>
                                    )}
                                    
                                    </tbody>
                                </table>
                            </div>

                            <table class="table invoice-total">
                                <tbody>
                                <tr>
                                    <td><strong>Sub Total :</strong></td>
                                    <td>{this.state.subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tax :</strong></td>
                                    <td>{this.state.tax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                                <tr>
                                    <td><strong>Service Charge :</strong></td>
                                    <td>{this.state.serviceCharge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                                <tr>
                                    <td><strong>Total :</strong></td>
                                    <td>{this.state.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                                </tbody>
                            </table>
                            
                        </div>
                </div>
            </div>



                               
                     </Scrollbars>


                    
                  
                    
                </div>
               
               


            </div>

                

             <Footer/>
                
                
           </div>

        )
    }


}


export default Sales;