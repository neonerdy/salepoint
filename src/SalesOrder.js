
import React, {Component} from 'react';
import Footer from './Footer';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import config from './Config';
import moment from 'moment';


class SalesOrder extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            salesOrders: [],
            initialSalesOrders: [],
            id: '',
            salesOrderCode: '',
            orderDate: '',
            customerName: '',
            customerAddress: '',
            customerCity: '',
            customerPhone: '',
            salesOrderItems: [],
            subTotal: 0,
            tax: 0,
            discount: 0,
            total: 0,
            status: ''
        }
        
    }

    componentDidMount() {
   
        window.scrollTo(0, 0);
        this.getSalesOrderWithTopOne();
    }


    getTopSalesOrders = () => {
        
        if (this.state.salesOrders.length > 0) {
            this.getSalesOrderDetail(this.state.salesOrders[0].id);
        }
    }

    getSalesOrderWithTopOne = () => {

        axios.get(config.serverUrl + '/api/salesorder/getall').then(response=> {
            this.setState({
                salesOrders: response.data,
                initialSalesOrders: response.data
            })

            this.getTopSalesOrders();
        })
    }



    getSalesOrders = () => {

        axios.get(config.serverUrl + '/api/salesorder/getall').then(response=> {
            this.setState({
                salesOrders: response.data,
                initialSalesOrders: response.data
            })

        })
    }

    
    getSalesOrderDetail = (id) => {

        axios.get(config.serverUrl + '/api/salesorder/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                salesOrderCode: response.data.salesOrderCode,
                orderDate: response.data.orderDate,
                customerName: response.data.customerName,
                customerAddress: response.data.customerAddress,
                customerCity: response.data.customerCity,
                customerPhone: response.data.customerPhone,
                salesOrderItems: response.data.salesOrderItems,
                subTotal: response.data.amount,
                tax: response.data.tax,
                discount: response.data.discount,
                total: response.data.total,
                status: response.data.status
            })

        
        })


    }



    addSalesOrder = () => {
        this.props.history.push('/add-sales-order');
    }

    
    editSalesOrder = (id) => {
        this.props.history.push('/edit-sales-order/' + id);
    }


    deleteSalesOrder = (id) => {

        axios.delete(config.serverUrl + '/api/salesorder/delete/' + id).then(response=> {
            this.getSalesOrderWithTopOne();
        })
    }



    updateStatus = (id, status) => {

        axios.get(config.serverUrl + '/api/salesorder/updatestatus/' + id + '/' + status).then(response=> {
            this.getSalesOrders();
            this.getSalesOrderDetail(id);
        })
    }


    renderStatus = (status) => {

        if (status ==='New') {
            return(
               <span class="label float-right label-primary">{status.toUpperCase()}</span> 
            )
        } else if (status === 'Sent') {
            return(
                <span class="label float-right label-warning">{status.toUpperCase()}</span> 
             )
        } else if (status === 'Canceled') {
            return(
                <span class="label float-right label-danger">{status.toUpperCase()}</span> 
            )
        }
    }


    onSearchSalesOrder = (e) => {


        let x = e.target.value.toLowerCase();
      
        let filteredSalesOrders = this.state.initialSalesOrders.filter(so => 
            so.salesOrderCode.toLowerCase().includes(x) ||
            so.customerName.toLowerCase().includes(x) ||
            so.status.toLowerCase().includes(x)
         );
            
        
        if (e.target.value === '') {
            this.setState( {
                salesOrders: this.state.initialSalesOrders
            })
        }
        else {
            this.setState( {
                salesOrders: filteredSalesOrders
            })
    
        }
    }




    render() {

        let color='';
        
        if (this.state.status === 'New') {
            color = '#1ab394';
        } else if (this.state.status === 'Sent') {
            color = '#f8ac59';
        } else if (this.state.status === 'Canceled') {
            color = '#ed5565';
        }

        let paperBorderStyle = {
            borderColor: color
        }
        

        return(
       
                <div id="page-wrapper" class="gray-bg">

                     {/* DELETE */}

                     <div id="deleteSalesOrder" class="modal fade" role="dialog">
                            
                            <div class="modal-dialog">
                                
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h4>Delete Sales Order</h4>
                                    </div>
                                    <div class="modal-body">
                                    Are you sure want to delete '{this.state.salesOrderCode}' ?
                                    </div>

                                    <div class="modal-footer">
                                        <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                                        <button class="btn btn-label btn-danger" onClick={()=>this.deleteSalesOrder(this.state.id)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                   
                        <div class="row wrapper border-bottom white-bg page-heading">
                            <div class="col-lg-8">
                                <h2>Sales Orders ({this.state.salesOrders.length})</h2>
                            
                            </div>
                            <div class="col-lg-4">
                                <div class="title-action">
                                <div class="btn-group">
                                
                                <select name="purchaseOrderMonth" class="form-control" onChange={this.onMonthChange}> 
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
                                    <a href="#" onClick={this.addSalesOrder} class="btn btn-success">Add New Sales Order</a>
                                </div>
                            </div>
                            
                        </div>

                        <div class="fh-breadcrumb">

                         <div class="fh-column">
                            
                            <Scrollbars  style={{ width: 240, height: 800 }}>
                                
                            <div>

                                <ul class="list-group elements-list">
                                    <input type="text" class="form-control" onChange={this.onSearchSalesOrder}/>
                                    
                                    {this.state.salesOrders.map(so=> 
                                    
                                        <li key={so.id} class="list-group-item">
                                            <a class="nav-link" onClick={()=>this.getSalesOrderDetail(so.id)}>
                                                <small class="float-right text-muted"><i class="fa fa-clock"></i>{moment(so.orderDate).format('MM/DD/YYYY')}</small>
                                                <strong>{so.salesOrderCode}</strong>
                                                <div class="small m-t-xs">
                                                    {so.customerName}
                                                    <p class="m-b-none">
                                                    {this.renderStatus(so.status)}
                                                    Total : {so.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                        
                        <Scrollbars  style={{ width: 1010, height: 800 }} autoHide
                        >
                                     
                 <div class="col-lg-12">
                <div class="wrapper wrapper-content animated fadeInRight">
                    
                <div class="ibox-title" style={paperBorderStyle}>
                    <h5>{this.state.status.toUpperCase()}</h5>
                    <div class="ibox-tools">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-ellipsis-h"></i></a>
                            <ul class="dropdown-menu dropdown-user">
                                <li><a onClick={()=>this.editSalesOrder(this.state.id)} class="dropdown-item">Edit</a></li>
                                <li><a data-toggle="modal" data-target="#deleteSalesOrder" class="dropdown-item">Delete</a></li>
                                <li><a onClick={()=>this.updateStatus(this.state.id,'Sent')} class="dropdown-item">Send Sales Order</a></li>
                                <li><a onClick={()=>this.updateStatus(this.state.id,'Canceled')} class="dropdown-item">Cancel Sales Order</a></li>
                            </ul>
                    </div>                          
                </div>


                    <div class="ibox-content p-xl">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h5>From:</h5>
                                    <address>
                                        <strong>{this.state.customerName}</strong><br/>
                                        {this.state.customerAddress} <br/>
                                        {this.state.customerCity} <br/>
                                        {this.state.customerPhone}
                                    </address>
                                </div>

                                <div class="col-sm-6 text-right">
                                    <h4>Sales Order No : </h4>
                                    <h4 class="text-navy">{this.state.salesOrderCode}</h4>
                                    <span>To:</span>
                                    <address>
                                        <strong>{this.state.customerName}</strong><br/>
                                        {this.state.customerAddress} <br/>
                                        {this.state.customerCity} <br/>
                                        {this.state.customerPhone}
                                    </address>
                                    <p>
                                        <span><strong>Order Date :</strong> {moment(this.state.orderDate).format('YYYY/MM/DD')}</span><br/>
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
                                        <th>Discount</th>
                                        <th>Tax</th>
                                        <th>Total Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.salesOrderItems.map(si=> 
                                    <tr key={si.id}>
                                        <td>{si.productName}</td>
                                        <td>{si.qty}</td>
                                        <td>{si.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td>{si.discountPct} %</td>
                                        <td>{si.taxPct} %</td>
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
                                    <td><strong>Discount :</strong></td>
                                    <td>{this.state.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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


export default SalesOrder;
