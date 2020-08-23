
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import config from '../Shared/Config';
import moment from 'moment';


class PurchaseInvoice extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            error: {},
            purchaseInvoices: [],
            initialPurchaseInvoices: [],
            id: '',
            invoiceCode: '',
            invoiceDate: '',
            dueDate: '',
            supplierName: '',
            supplierAddress: '',
            supplierCity: '',
            supplierPhone: '',
            purchaseInvoiceItems: [],
            subTotal: 0,
            tax: 0,
            discount: 0,
            total: 0,
            status: ''
        }
        
    }

    componentDidMount() {
   
        window.scrollTo(0, 0);
        this.getPurchaseInvoiceWithTopOne();
    }


    getTopPurchaseInvoices = () => {
        
        if (this.state.purchaseInvoices.length > 0) {
            this.getPurchaseInvoiceDetail(this.state.purchaseInvoices[0].id);
        }
    }

    getPurchaseInvoiceWithTopOne = () => {

        axios.get(config.serverUrl + '/api/purchaseinvoice/getall').then(response=> {
            this.setState({
                purchaseInvoices: response.data,
                initialPurchaseInvoices: response.data
            })

            this.getTopPurchaseInvoices();
        })
    }



    getPurchaseInvoices = () => {

        axios.get(config.serverUrl + '/api/purchaseinvoice/getall').then(response=> {
            this.setState({
                purchaseInvoices: response.data,
                initialPurchaseInvoices: response.data
            })

        })
    }

    
    getPurchaseInvoiceDetail = (id) => {

        axios.get(config.serverUrl + '/api/purchaseinvoice/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                invoiceCode: response.data.invoiceCode,
                invoiceDate: response.data.invoiceDate,
                dueDate: response.data.dueDate,
                supplierName: response.data.supplierName,
                supplierAddress: response.data.supplierAddress,
                supplierCity: response.data.supplierCity,
                supplierPhone: response.data.supplierPhone,
                purchaseInvoiceItems: response.data.purchaseInvoiceItems,
                subTotal: response.data.amount,
                tax: response.data.tax,
                discount: response.data.discount,
                total: response.data.total,
                status: response.data.status
            })

        
        })


    }



    addPurchaseInvoice = () => {
        this.props.history.push('/add-purchase-invoice');
    }

    
    editPurchaseInvoice = (id) => {
        this.props.history.push('/edit-purchase-invoice/' + id);
    }


    deletePurchaseInvoice = (id) => {

        axios.delete(config.serverUrl + '/api/purchaseinvoice/delete/' + id).then(response=> {
            this.getPurchaseInvoiceWithTopOne();
        })
    }



    updateStatus = (id, status) => {

        axios.get(config.serverUrl + '/api/purchaseinvoice/updatestatus/' + id + '/' + status).then(response=> {
            this.getPurchaseInvoices();
            this.getPurchaseInvoiceDetail(id);
        })
    }


    renderStatus = (status) => {

        if (status ==='New') {
            return(
               <span class="label float-right label-warning">{status.toUpperCase()}</span> 
            )
        } else if (status === 'Partial') {
            return(
                <span class="label float-right label-success">{status.toUpperCase()}</span> 
             )
        } else if (status === 'Paid') {
            return(
                <span class="label float-right label-primary">{status.toUpperCase()}</span> 
                )
        } else if (status === 'Canceled') {
            return(
                <span class="label float-right label-danger">{status.toUpperCase()}</span> 
            )
        }
    }


    onSearchPurchaseInvoice = (e) => {


        let x = e.target.value.toLowerCase();
      
        let filteredPurchaseInvoices = this.state.filteredPurchaseInvoices.filter(pi => 
            pi.invoiceCode.toLowerCase().includes(x) ||
            pi.supplierName.toLowerCase().includes(x) ||
            pi.status.toLowerCase().includes(x)
         );
            
        
        if (e.target.value === '') {
            this.setState( {
                purchaseInvoices: this.state.initialPurchaseInvoices
            })
        }
        else {
            this.setState( {
                purchaseInvoices: filteredPurchaseInvoices
            })
    
        }
    }


    payInvoice = (id) => {
        this.props.history.push('/purchase-payment/' + id);
    }



    render() {

        let color='';
        
        if (this.state.status === 'New') {
            color = '#f8ac59';
        } else if (this.state.status === 'Partial') {
            color = '#1c84c6';
        } else if (this.state.status === 'Paid') {
            color = '#1ab394';
        } else if (this.state.status === 'Canceled') {
            color = '#ed5565';
        }

        let invBorderStyle = {
            borderColor: color
        }

        let errStyle = {
            color: 'darkred'
        }

        

        return(
       
                <div id="page-wrapper" class="gray-bg">

                     {/* DELETE */}

                     <div id="deletePurchaseInvoice" class="modal fade" role="dialog">
                            
                            <div class="modal-dialog">
                                
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h4>Delete Purchase Invoice</h4>
                                    </div>
                                    <div class="modal-body">
                                    Are you sure want to delete '{this.state.invoiceCode}' ?
                                    </div>

                                    <div class="modal-footer">
                                        <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                                        <button class="btn btn-label btn-danger" onClick={()=>this.deletePurchaseInvoice(this.state.id)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>



                    <div class="row wrapper border-bottom white-bg page-heading">
                            <div class="col-lg-8">
                                <h2>Purchase Invoices ({this.state.purchaseInvoices.length})</h2>
                            
                            </div>
                            <div class="col-lg-4">
                                <div class="title-action">
                                <div class="btn-group">
                                
                                <select name="purchaseInvoiceMonth" class="form-control" onChange={this.onMonthChange}> 
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
                                    <a href="#" onClick={this.addPurchaseInvoice} class="btn btn-success">Add New Invoice</a>
                                </div>
                            </div>
                            
                        </div>

                        <div class="fh-breadcrumb">

                           <div class="fh-column">
                            
                            <Scrollbars  style={{ width: 240, height: 800 }}>
                                
                            <div>

                                <ul class="list-group elements-list">
                                    <input type="text" class="form-control" onChange={this.onSearchPurchaseInvoice}/>
                                    
                                    {this.state.purchaseInvoices.map(pi=> 
                                    
                                        <li key={pi.id} class="list-group-item">
                                            <a class="nav-link" onClick={()=>this.getPurchaseInvoiceDetail(pi.id)}>
                                                <small class="float-right text-muted"><i class="fa fa-clock"></i>{moment(pi.invoiceDate).format('MM/DD/YYYY')}</small>
                                                <strong>{pi.invoiceCode}</strong>
                                                <div class="small m-t-xs">
                                                    {pi.supplierName}
                                                    <p class="m-b-none">
                                                    {this.renderStatus(pi.status)}
                                                    Total : {pi.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <br/>
                                                    Paid : {pi.amountPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
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
                                <li><a onClick={()=>this.editPurchaseInvoice(this.state.id)} class="dropdown-item">Edit</a></li>
                                <li><a data-toggle="modal" data-target="#deletePurchaseInvoice" class="dropdown-item">Delete</a></li>
                                <li><a onClick={()=>this.payInvoice(this.state.id)}>Pay Invoice</a></li>
                                <li><a onClick={()=>this.updateStatus(this.state.id,'Canceled')} class="dropdown-item">Cancel Invoice</a></li>
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
                                    <h4>Invoice No : </h4>
                                    <h4 class="text-navy">{this.state.invoiceCode}</h4>
                                    <span>To:</span>
                                    <address>
                                        <strong>{this.state.supplierName}</strong><br/>
                                        {this.state.supplierAddress} <br/>
                                        {this.state.supplierCity} <br/>
                                        {this.state.supplierPhone}
                                    </address>
                                    <p>
                                        <span><strong>Invoice Date :</strong> {moment(this.state.invoiceDate).format('YYYY/MM/DD')}</span><br/>
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
                                    {this.state.purchaseInvoiceItems.map(pii=> 
                                    <tr key={pii.id}>
                                        <td>{pii.productName}</td>
                                        <td>{pii.qty}</td>
                                        <td>{pii.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td>{pii.discountPct} %</td>
                                        <td>{pii.taxPct} %</td>
                                        <td>{(pii.qty * pii.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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


export default PurchaseInvoice;