
import React, {Component} from 'react';
import Footer from './Footer';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import config from './Config';
import moment from 'moment';


class PurchaseOrder extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            purchaseOrders: [],
            initialPurchaseOrders: [],
            id: '',
            purchaseOrderCode: '',
            orderDate: '',
            supplierName: '',
            supplierAddress: '',
            supplierCity: '',
            supplierPhone: '',
            purchaseOrderItems: [],
            subTotal: 0,
            tax: 0,
            discount: 0,
            total: 0,
            status: ''
        }
        
    }

    componentDidMount() {
   
        window.scrollTo(0, 0);
        this.getPurchaseOrderWithTopOne();
    }


    getTopPurchaseOrders = () => {
        
        if (this.state.purchaseOrders.length > 0) {
            this.getPurchaseOrderDetail(this.state.purchaseOrders[0].id);
        }
    }

    getPurchaseOrderWithTopOne = () => {

        axios.get(config.serverUrl + '/api/purchaseorder/getall').then(response=> {
            this.setState({
                purchaseOrders: response.data,
                initialPurchaseOrders: response.data
            })

            this.getTopPurchaseOrders();
        })
    }



    getPurchaseOrders = () => {

        axios.get(config.serverUrl + '/api/purchaseorder/getall').then(response=> {
            this.setState({
                purchaseOrders: response.data,
                initialPurchaseOrders: response.data
            })

        })
    }

    
    getPurchaseOrderDetail = (id) => {

        axios.get(config.serverUrl + '/api/purchaseorder/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                purchaseOrderCode: response.data.purchaseOrderCode,
                orderDate: response.data.purchaseDate,
                supplierName: response.data.supplierName,
                supplierAddress: response.data.supplierAddress,
                supplierCity: response.data.supplierCity,
                supplierPhone: response.data.supplierPhone,
                purchaseOrderItems: response.data.purchaseOrderItems,
                subTotal: response.data.amount,
                tax: response.data.tax,
                discount: response.data.discount,
                total: response.data.total,
                status: response.data.status
            })

        
        })


    }



    addPurchaseOrder = () => {
        this.props.history.push('/add-purchase-order');
    }

    
    editPurchaseOrder = (id) => {
        this.props.history.push('/edit-purchase-order/' + id);
    }


    deletePurchaseOrder = (id) => {

        axios.delete(config.serverUrl + '/api/purchaseorder/delete/' + id).then(response=> {
            this.getPurchaseOrderWithTopOne();
        })
    }



    updateStatus = (id, status) => {

        axios.get(config.serverUrl + '/api/purchaseorder/updatestatus/' + id + '/' + status).then(response=> {
            this.getPurchaseOrders();
            this.getPurchaseOrderDetail(id);
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


    onSearchPurchaseOrder = (e) => {


        let x = e.target.value.toLowerCase();
      
        let filteredPurchaseOrders = this.state.initialPurchaseOrders.filter(po => 
            po.purchaseOrderCode.toLowerCase().includes(x) ||
            po.supplierName.toLowerCase().includes(x) ||
            po.status.toLowerCase().includes(x)
         );
            
        
        if (e.target.value === '') {
            this.setState( {
                purchaseOrders: this.state.initialPurchaseOrders
            })
        }
        else {
            this.setState( {
                purchaseOrders: filteredPurchaseOrders
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

        let invBorderStyle = {
            borderColor: color
        }
        

        return(
       
                <div id="page-wrapper" class="gray-bg">

                     {/* DELETE */}

                     <div id="deletePurchaseOrder" class="modal fade" role="dialog">
                            
                            <div class="modal-dialog">
                                
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h4>Delete Purchase Order</h4>
                                    </div>
                                    <div class="modal-body">
                                    Are you sure want to delete '{this.state.purchaseOrderCode}' ?
                                    </div>

                                    <div class="modal-footer">
                                        <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                                        <button class="btn btn-label btn-danger" onClick={()=>this.deletePurchaseOrder(this.state.id)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>


                    <div class="row wrapper border-bottom white-bg page-heading">
                            <div class="col-lg-8">
                                <h2>Purchase Orders ({this.state.purchaseOrders.length})</h2>
                            
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
                                    <a href="#" onClick={this.addPurchaseOrder} class="btn btn-success">Add New Purchase Order</a>
                                </div>
                            </div>
                            
                        </div>

                        <div class="fh-breadcrumb">

                         <div class="fh-column">
                            
                            <Scrollbars  style={{ width: 240, height: 800 }}>
                                
                            <div>

                                <ul class="list-group elements-list">
                                    <input type="text" class="form-control" onChange={this.onSearchPurchaseOrder}/>
                                    
                                    {this.state.purchaseOrders.map(po=> 
                                    
                                        <li key={po.id} class="list-group-item">
                                            <a class="nav-link" onClick={()=>this.getPurchaseOrderDetail(po.id)}>
                                                <small class="float-right text-muted"><i class="fa fa-clock"></i>{moment(po.orderDate).format('MM/DD/YYYY')}</small>
                                                <strong>{po.purchaseOrderCode}</strong>
                                                <div class="small m-t-xs">
                                                    {po.supplierName}
                                                    <p class="m-b-none">
                                                    {this.renderStatus(po.status)}
                                                    Total : {po.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                    
                <div class="ibox-title" style={invBorderStyle}>
                    <h5>{this.state.status.toUpperCase()}</h5>
                    <div class="ibox-tools">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-ellipsis-h"></i></a>
                            <ul class="dropdown-menu dropdown-user">
                                <li><a onClick={()=>this.editPurchaseOrder(this.state.id)} class="dropdown-item">Edit</a></li>
                                <li><a data-toggle="modal" data-target="#deletePurchaseOrder" class="dropdown-item">Delete</a></li>
                                <li><a onClick={()=>this.updateStatus(this.state.id,'Sent')} class="dropdown-item">Send Purchase Order</a></li>
                                <li><a onClick={()=>this.updateStatus(this.state.id,'Canceled')} class="dropdown-item">Cancel Purchase Order</a></li>
                            </ul>
                    </div>                          
                </div>


                    <div class="ibox-content p-xl">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h5>From:</h5>
                                    <address>
                                        <strong>{this.state.supplierName}</strong><br/>
                                        {this.state.supplierAddress} <br/>
                                        {this.state.supplierCity} <br/>
                                        {this.state.supplierPhone}
                                    </address>
                                </div>

                                <div class="col-sm-6 text-right">
                                    <h4>Purchase Order No : </h4>
                                    <h4 class="text-navy">{this.state.purchaseOrderCode}</h4>
                                    <span>To:</span>
                                    <address>
                                        <strong>{this.state.supplierName}</strong><br/>
                                        {this.state.supplierAddress} <br/>
                                        {this.state.supplierCity} <br/>
                                        {this.state.supplierPhone}
                                    </address>
                                    <p>
                                        <span><strong>Order Date :</strong> {moment(this.state.purchaseDate).format('YYYY/MM/DD')}</span><br/>
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
                                    {this.state.purchaseOrderItems.map(pi=> 
                                    <tr key={pi.id}>
                                        <td>{pi.productName}</td>
                                        <td>{pi.qty}</td>
                                        <td>{pi.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td>{pi.discountPct} %</td>
                                        <td>{pi.taxPct} %</td>
                                        <td>{(pi.qty * pi.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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


export default PurchaseOrder;