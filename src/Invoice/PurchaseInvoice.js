
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import config from '../Shared/Config';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';


class PurchaseInvoice extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            error: {},
            setting: {},
            purchaseInvoices: [],
            purchasePayments: [],
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
            status: '',
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            purchasePaymentId: '',
            paymentDate: ''
        }
        
    }

    componentDidMount() {
   
        window.scrollTo(0, 0);
        
        this.getSettingById('E8DC5367-D553-4232-E621-08D84993E0DB');
        this.getPurchaseInvoiceWithTopOne(this.state.startDate.toDate(), this.state.endDate.toDate());
    }


      
    handleDateCallback = (startDate, endDate) => {
        this.setState({ startDate, endDate});
    }


    getTopPurchaseInvoices = () => {
        
        if (this.state.purchaseInvoices.length > 0) {
            this.getPurchaseInvoiceDetail(this.state.purchaseInvoices[0].id);
        }
    }

    getPurchaseInvoiceWithTopOne = (startDate, endDate) => {

        var dateRange = {
            startDate: startDate,
            endDate: endDate
        }

           axios.post(config.serverUrl + '/api/purchaseinvoice/getbydate', dateRange).then(response=> {
            this.setState({
                purchaseInvoices: response.data,
            })

            this.getTopPurchaseInvoices();
        })
    }



    getPurchasePayments = (id) => {
      
        axios.get(config.serverUrl + '/api/purchasepayment/getbyinvoiceid/' + id).then(response=> {
            this.setState({
                purchasePayments: response.data
            })
      })
    }




    getSettingById = (id) => {
       
        axios.get(config.serverUrl + '/api/setting/getById/' + id).then(response=> {
            this.setState({
                setting: response.data
            })

        })
    }



    getPurchaseInvoices = (startDate, endDate) => {

        var dateRange = {
            startDate: startDate,
            endDate: endDate
        }

        axios.post(config.serverUrl + '/api/purchaseinvoice/getbydate', dateRange).then(response=> {
            this.setState({
                purchaseInvoices: response.data,
            })

        })
    }


    searchPurchaseInvoice = (startDate, endDate, keyword) => {
      
        var search = {
            startDate: startDate,
            endDate: endDate,
            keyword: keyword
        } 

        axios.post(config.serverUrl + '/api/purchaseinvoice/getbysearch', search).then(response=> {
            this.setState({
                purchaseInvoices: response.data,
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

        this.getPurchasePayments(id);

    }



    addPurchaseInvoice = () => {
        this.props.history.push('/add-purchase-invoice');
    }

    
    editPurchaseInvoice = (id) => {
        this.props.history.push('/edit-purchase-invoice/' + id);
    }


    deletePurchaseInvoice = (id) => {

        axios.delete(config.serverUrl + '/api/purchaseinvoice/delete/' + id).then(response=> {
            this.getPurchaseInvoiceWithTopOne(this.state.startDate.toDate(), this.state.endDate.toDate());
        })
    }


    deletePurchasePayment = (id) => {
        
        axios.delete(config.serverUrl + '/api/purchasepayment/delete/' + id).then(response=> {
            this.getPurchaseInvoiceDetail(this.state.id);
            this.getPurchaseInvoices(this.state.startDate.toDate(), this.state.endDate.toDate());
        })
    }

    
    onDeletePurchasePayment = (purchasePaymentId, paymentDate) => {
        this.setState({
            purchasePaymentId: purchasePaymentId,
            paymentDate: paymentDate
        })
    }




    updateStatus = (id, status) => {

        axios.get(config.serverUrl + '/api/purchaseinvoice/updatestatus/' + id + '/' + status).then(response=> {
            this.getPurchaseInvoices(this.state.startDate.toDate(), this.state.endDate.toDate());
            this.getPurchaseInvoiceDetail(id);
        })
    }


    filterPurchaseInvoice = () => {
        this.getPurchaseInvoiceWithTopOne(this.state.startDate.toDate(), this.state.endDate.toDate());
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


    renderMenu = (status) => {

        if (status == 'New') {
            return(
                <ul class="dropdown-menu dropdown-user">
                    <li><a onClick={()=>this.editPurchaseInvoice(this.state.id)} class="dropdown-item">Edit</a></li>
                    <li><a data-toggle="modal" data-target="#deletePurchaseInvoice" class="dropdown-item">Delete</a></li>
                    <li><a onClick={()=>this.payInvoice(this.state.id)}>Pay Invoice</a></li>
                    <li><a onClick={()=>this.updateStatus(this.state.id,'Canceled')} class="dropdown-item">Cancel Invoice</a></li>
                </ul>
            )
        }
        else if (status == 'Partial') {
            return(
                <ul class="dropdown-menu dropdown-user">
                    <li><a onClick={()=>this.payInvoice(this.state.id)}>Pay Invoice</a></li>
                    <li><a onClick={()=>this.updateStatus(this.state.id,'Canceled')} class="dropdown-item">Cancel Invoice</a></li>
                </ul>
              
             )
        }
        else if (status == 'Paid') {
            return(
                <ul class="dropdown-menu dropdown-user">
                </ul>
             )
        }
        else if (status == 'Canceled') {
            return(
                <ul class="dropdown-menu dropdown-user">
                    <li><a data-toggle="modal" data-target="#deletePurchaseInvoice" class="dropdown-item">Delete</a></li>
                </ul>
             )
        }


    }



    onSearchPurchaseInvoice = (e) => {

        if (e.key === 'Enter') {
            if (e.target.value === '') 
            {
                this.getPurchaseInvoiceWithTopOne(this.state.startDate.toDate(), this.state.endDate.toDate());     
            } 
            else 
            {
                this.searchPurchaseInvoice( 
                    this.state.startDate.toDate(), 
                    this.state.endDate.toDate(),
                    e.target.value.toLowerCase()
                 );
            }
        }
      
    }


    payInvoice = (id) => {
        this.props.history.push('/purchase-payment/' + id);
    }




    render() {

        let dateLabel = this.state.startDate.format('MMMM D, YYYY') + ' - ' + this.state.endDate.format('MMMM D, YYYY'); 
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

        let paymentHistoryStyle = {
            borderColor: 'lightgray',
            backgroundColor: '#f3f3f4'
        }

        
        let errStyle = {
            color: 'darkred'
        }

        

        return(
       
                <div id="page-wrapper" class="gray-bg">

                     {/* DELETE INVOICE*/}

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


                        {/* DELETE PAYMENT */}

                        <div id="deletePurchasePayment" class="modal fade" role="dialog">
                            
                            <div class="modal-dialog">
                                
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4>Delete Purchase Payment</h4>
                                    </div>
                                    <div class="modal-body">
                                        Are you sure want to delete this payment '{this.state.paymentDate}' ?
                                    </div>

                                    <div class="modal-footer">
                                        <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                                        <button class="btn btn-label btn-danger" onClick={()=>this.deletePurchasePayment(this.state.purchasePaymentId)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                                    </div>
                                </div>
                            </div>
                        </div>



                    <div class="row wrapper border-bottom white-bg page-heading">
                            <div class="col-lg-4">
                                <h2>Purchase Invoices ({this.state.purchaseInvoices.length})</h2>
                            
                            </div>
                            <div class="col-lg-8">
                                <div class="title-action">
                                <div class="btn-group">
                                
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
                                    <button class="btn btn-default" onClick={this.filterPurchaseInvoice}><i class="fa fa-filter"></i></button>
                                    <button class="btn btn-default"><i class="fa fa-print"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;

                                </div>


                                   &nbsp;&nbsp;
                                    <a href="#" onClick={this.addPurchaseInvoice} class="btn btn-success">Add New Invoice</a>
                                </div>
                            </div>
                            
                        </div>

                        <div class="fh-breadcrumb">

                           <div class="fh-column">
                            
                            <Scrollbars  style={{ width: 240, height: 800 }} autoHide>
                                
                            <div>

                                <ul class="list-group elements-list">
                                    <input type="text" class="form-control" onKeyPress={this.onSearchPurchaseInvoice}/>
                                    
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
                            {this.renderMenu(this.state.status)}
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
                                        <strong>{this.state.setting.companyName}</strong><br/>
                                        {this.state.setting.address} <br/>
                                        {this.state.setting.city} <br/>
                                        {this.state.setting.phone}
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


            {this.state.purchasePayments.length > 0 ?                                  
            <div class="col-lg-12">
                <div class="wrapper wrapper-content animated fadeInRight">

                <div class="ibox-title" style={paymentHistoryStyle}>
                <h5>PAYMENT HISTORY</h5>
                
                </div>
                
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                            <tr>
                                <th width="12%">Payment Date</th>
                                <th width="12%">Payment Type</th>
                                <th width="15%">Amount Paid</th>
                                <th width="46%">Notes</th>
                                <th align="right"></th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.purchasePayments.map(pp=> 

                                <tr>
                                    <td>{moment(pp.paymentDate).format('MM/DD/YYYY')}</td>
                                    <td>{pp.paymentMethod}</td>
                                    <td>{pp.amountPaid}</td>
                                    <td></td>
                                    
                                    <td align="right">
                                        {this.state.status == 'Partial' ? 
                                             <a data-toggle="modal" data-target="#deletePurchasePayment" 
                                             onClick={()=>this.onDeletePurchasePayment(pp.id, moment(pp.paymentDate).format('MM/DD/YYYY'))}>
                                                 <i class="fa fa-trash"></i>
                                            </a>
                                         : 
                                            null
                                        }
                                    </td>
                               </tr>
            
                                )}                              

                            </tbody>
                        </table>
                    </div>


                </div>

                </div>

            : null
            }


                

                               
             </Scrollbars>


                    
                  
                    
                </div>
               
               


            </div>

                

             <Footer/>
                
                
           </div>

        )
    }


}


export default PurchaseInvoice;