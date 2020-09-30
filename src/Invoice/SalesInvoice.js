
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import config from '../Shared/Config';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import '../App.css';
import Header from '../Shared/Header';
import NavBar from '../Shared/NavBar';

class SalesInvoice extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            error: {},
            setting: {},
            salesInvoices: [],
            initialSalesInvoices: [],
            salesPayments: [],
            id: '',
            invoiceCode: '',
            invoiceDate: '',
            dueDate: '',
            customerName: '',
            customerAddress: '',
            customerCity: '',
            customerPhone: '',
            salesInvoiceItems: [],
            subTotal: 0,
            tax: 0,
            discount: 0,
            total: 0,
            status: '',
            startDate: moment().subtract(29, 'days'),
            endDate: moment(),
            salesPaymentId: '', 
            paymentDate: '',
            printUrl: ''
        }
        
    }

    componentDidMount() {
   
        window.scrollTo(0, 0);
        this.getSettingById('E8DC5367-D553-4232-E621-08D84993E0DB');
        this.getSalesInvoiceWithTopOne(this.state.startDate.toDate(), this.state.endDate.toDate());
    }


    handleDateCallback = (startDate, endDate) => {
        this.setState({ startDate, endDate});
    }



    getSettingById = (id) => {
       
        axios.get(config.serverUrl + '/api/setting/getById/' + id).then(response=> {
            this.setState({
                setting: response.data
            })
        })
    }


    getSalesPayments = (id) => {
      
        axios.get(config.serverUrl + '/api/salespayment/getbyinvoiceid/' + id).then(response=> {
            this.setState({
                salesPayments: response.data
            })
      })
    }


    getTopSalesInvoices = () => {
        
        if (this.state.salesInvoices.length > 0) {
            this.getSalesInvoiceDetail(this.state.salesInvoices[0].id);
        }
    }

    getSalesInvoiceWithTopOne = (startDate, endDate) => {

        var dateRange = {
            startDate: startDate,
            endDate: endDate
        }

        axios.post(config.serverUrl + '/api/salesinvoice/getbydate', dateRange).then(response=> {
            this.setState({
                salesInvoices: response.data,
            })

            this.getTopSalesInvoices();
        })
    }



    getSalesInvoices = (startDate, endDate) => {

        var dateRange = {
            startDate: startDate,
            endDate: endDate
        }

        axios.post(config.serverUrl + '/api/salesinvoice/getbydate', dateRange).then(response=> {
            this.setState({
                salesInvoices: response.data,
            })

        })
    }

    
    getSalesInvoiceDetail = (id) => {

        axios.get(config.serverUrl + '/api/salesinvoice/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                invoiceCode: response.data.invoiceCode,
                invoiceDate: response.data.invoiceDate,
                dueDate: response.data.dueDate,
                customerName: response.data.customerName,
                customerAddress: response.data.customerAddress,
                customerCity: response.data.customerCity,
                customerPhone: response.data.customerPhone,
                salesInvoiceItems: response.data.salesInvoiceItems,
                subTotal: response.data.amount,
                tax: response.data.tax,
                discount: response.data.discount,
                total: response.data.total,
                status: response.data.status
            })

            this.setState({
                printUrl: '/print-sales-invoice/' + id
            })
           
        
        })


        this.getSalesPayments(id);


    }


    searchSalesInvoice = (startDate, endDate, keyword) => {
      
        var search = {
            startDate: startDate,
            endDate: endDate,
            keyword: keyword
        } 

        axios.post(config.serverUrl + '/api/salesinvoice/getbysearch', search).then(response=> {
            this.setState({
                salesInvoices: response.data,
            })
        })
    }



    filterSalesInvoice = () => {
        this.getSalesInvoiceWithTopOne(this.state.startDate.toDate(), this.state.endDate.toDate());
    }



    addSalesInvoice = () => {
        this.props.history.push('/add-sales-invoice');
    }

    
    editSalesInvoice = (id) => {
        this.props.history.push('/edit-sales-invoice/' + id);
    }


    deleteSalesInvoice = (id) => {

        axios.delete(config.serverUrl + '/api/salesinvoice/delete/' + id).then(response=> {
            this.getSalesInvoiceWithTopOne(this.state.startDate.toDate(), this.state.endDate.toDate());
        })
    }



    deleteSalesPayment = (id) => {
        
        axios.delete(config.serverUrl + '/api/salespayment/delete/' + id).then(response=> {
            this.getSalesInvoiceDetail(this.state.id);
            this.getSalesInvoices(this.state.startDate.toDate(), this.state.endDate.toDate());
        })
    }

    
    onDeleteSalesPayment = (salesPaymentId, paymentDate) => {
        this.setState({
            salesPaymentId: salesPaymentId,
            paymentDate: paymentDate
        })
    }



    updateStatus = (id, status) => {

        axios.get(config.serverUrl + '/api/salesinvoice/updatestatus/' + id + '/' + status).then(response=> {
            this.getSalesInvoices(this.state.startDate.toDate(), this.state.endDate.toDate());
            this.getSalesInvoiceDetail(id);
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


    renderMenu = (status) => {

        if (status == 'New') {
            return(
                <ul class="dropdown-menu dropdown-user">
                    <li><a onClick={()=>this.editSalesInvoice(this.state.id)} class="dropdown-item">Edit</a></li>
                    <li><a data-toggle="modal" data-target="#deleteSalesInvoice" class="dropdown-item">Delete</a></li>
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
                    <li><a data-toggle="modal" data-target="#deleteSalesInvoice" class="dropdown-item">Delete</a></li>
                </ul>
             )
        }


    }





    onSearchSalesInvoice = (e) => {

        if (e.key === 'Enter') {
            if (e.target.value === '') 
            {
                this.getSalesInvoiceWithTopOne(this.state.startDate.toDate(), this.state.endDate.toDate());     
            } 
            else 
            {
                this.searchSalesInvoice(
                    this.state.startDate.toDate(), 
                    this.state.endDate.toDate(),
                    e.target.value.toLowerCase()
                );
            }
        }
     
    }


    payInvoice = (id) => {
        this.props.history.push('/sales-payment/' + id);
    }

    
    printIframe = (id) => {
    
        const iframe = document.frames
            ? document.frames[id]
            : document.getElementById(id);

        const iframeWindow = iframe.contentWindow || iframe;

        iframe.focus();
        iframeWindow.print();

        return false;
  
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
       
            <div>

                <Header/>
                <NavBar/>                
                <div id="page-wrapper" class="gray-bg">

               
                     {/* DELETE INVOICE */}

                     <div id="deleteSalesInvoice" class="modal fade" role="dialog">
                            
                            <div class="modal-dialog">
                                
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h4>Delete Sales Invoice</h4>
                                    </div>
                                    <div class="modal-body">
                                    Are you sure want to delete '{this.state.invoiceCode}' ?
                                    </div>

                                    <div class="modal-footer">
                                        <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                                        <button class="btn btn-label btn-danger" onClick={()=>this.deleteSalesInvoice(this.state.id)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>


                        {/* DELETE PAYMENT */}

                        <div id="deleteSalesPayment" class="modal fade" role="dialog">
                            
                            <div class="modal-dialog">
                                
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h4>Delete Sales Payment</h4>
                                    </div>
                                    <div class="modal-body">
                                        Are you sure want to delete this payment '{this.state.paymentDate}' ?
                                    </div>

                                    <div class="modal-footer">
                                        <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                                        <button class="btn btn-label btn-danger" onClick={()=>this.deleteSalesPayment(this.state.salesPaymentId)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>



                    <div class="row wrapper border-bottom white-bg page-heading">
                            <div class="col-lg-4">
                                <h2>Sales Invoices ({this.state.salesInvoices.length})</h2>
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
                                    <button class="btn btn-default" onClick={this.filterSalesInvoice}><i class="fa fa-filter"></i></button>
                                    <button class="btn btn-default" onClick={()=>this.printIframe('receipt')}><i class="fa fa-print"></i></button>
                                    
                                    &nbsp;&nbsp;&nbsp;&nbsp;

                             
                                </div>


                                   &nbsp;&nbsp;
                                    <a href="#" onClick={this.addSalesInvoice} class="btn btn-success">Add New Invoice</a>
                                </div>
                            </div>
                            
                        </div>

                        <div class="fh-breadcrumb">

                         <div class="fh-column">
                            
                            <input type="text" class="form-control" onKeyPress={this.onSearchSalesInvoice}/>
                               
                            <Scrollbars  style={{ width: 240, height: 745 }} autoHide>
                                
                            <div>

                                <ul class="list-group elements-list">
                                    
                                    {this.state.salesInvoices.map(si=> 
                                    
                                        <li key={si.id} class="list-group-item">
                                            <a class="nav-link" onClick={()=>this.getSalesInvoiceDetail(si.id)}>
                                                <small class="float-right text-muted"><i class="fa fa-clock"></i>{moment(si.invoiceDate).format('MM/DD/YYYY')}</small>
                                                <strong>{si.invoiceCode}</strong>
                                                <div class="small m-t-xs">
                                                    {si.customerName}
                                                    <p class="m-b-none">
                                                    {this.renderStatus(si.status)}
                                                    Total : {si.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} <br/>
                                                    Paid : {si.amountPaid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
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

                <iframe
                    id="receipt"
                    src={this.state.printUrl}
                    style={{ display: 'none' }}
                />
            
                 <div class="ibox-content p-xl">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h5>From:</h5>
                                    <address>
                                        <strong>{this.state.setting.companyName}</strong><br/>
                                        {this.state.setting.address} <br/>
                                        {this.state.setting.city} <br/>
                                        {this.state.setting.phone}
                                    </address>
                                </div>

                                <div class="col-sm-6 text-right">
                                    <h4>Invoice No : </h4>
                                    <h4 class="text-navy">{this.state.invoiceCode}</h4>
                                    <span>To:</span>
                                    <address>
                                        <strong>{this.state.customerName}</strong><br/>
                                        {this.state.customerAddress} <br/>
                                        {this.state.customerCity} <br/>
                                        {this.state.customerPhone}
                                    </address>
                                    <p>
                                        <span><strong>Invoice Date :</strong> {moment(this.state.invoiceDate).format('MM/DD/YYYY')}</span><br/>
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
                                    {this.state.salesInvoiceItems.map(sii=> 
                                    <tr key={sii.id}>
                                        <td>{sii.productName}</td>
                                        <td>{sii.qty}</td>
                                        <td>{sii.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td>{sii.discountPct} %</td>
                                        <td>{sii.taxPct} %</td>
                                        <td>{(sii.qty * sii.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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


            {this.state.salesPayments.length > 0 ?                                  
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
                                {this.state.salesPayments.map(sp=> 

                                <tr>
                                    <td>{moment(sp.paymentDate).format('MM/DD/YYYY')}</td>
                                    <td>{sp.paymentMethod}</td>
                                    <td>{sp.amountPaid}</td>
                                    <td></td>
                                    <td align="right">
                                        <a data-toggle="modal" data-target="#deleteSalesPayment" 
                                            onClick={()=>this.onDeleteSalesPayment(sp.id, moment(sp.paymentDate).format('MM/DD/YYYY'))}>
                                                <i class="fa fa-trash"></i>
                                        </a>
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

           </div>



        )
    }


}


export default SalesInvoice;