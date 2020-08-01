
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import config from '../Shared/Config';
import axios from 'axios';
import '../App.css';
import uuid from 'uuid';
import moment from 'moment';

class SalesPaymentAdd extends Component
{
    
    constructor(props) {
        super(props);

        this.paymentDate = React.createRef()
    
        this.state = {
            error: {},
            accounts: [],
            customers: [],
            paymentTypes: [],
            initSalesInvoices: [],
            salesInvoices: [],
            invoice: {}
        }
    }


    componentDidMount() {

        this.getCustomers();
        this.getAccounts();
        this.getPaymentTypes();
    }

    
    getCustomers = () => {
        
        axios.get(config.serverUrl + '/api/customer/getall').then(response=> {
            this.setState({
                customers: response.data
            })
        }) 
    }

    getAccounts = () => {

        axios.get(config.serverUrl + '/api/account/getall').then(response=> {
            this.setState({
                accounts: response.data
            })
        })
    }


    getPaymentTypes = () => {

        axios.get(config.serverUrl + '/api/paymenttype/getall').then(response=> {
            this.setState({
                paymentTypes: response.data
            })
        })
    }


    getInvoicesByCustomerId = (id) => {

        axios.get(config.serverUrl + '/api/salesinvoice/getbycustomerid/' + id).then(response=> {
            this.setState({
                salesInvoices: response.data
            })
        })

    }

    getInvoiceById = (id) => {

        axios.get(config.serverUrl + '/api/salesinvoice/getbyidcompact/' + id).then(response=> {
            this.setState({
                invoice: response.data,
            })
        })
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onCustomerChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        this.getInvoicesByCustomerId(e.target.value);
    }

    onInvoiceChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        
        this.getInvoiceById(e.target.value);
    }



    


    cancelAdd = () => {
        this.props.history.push('/payment');
    }




    render()
    {
       
        let errStyle = {
            color: 'darkred'
        }

        return(
            <div id="page-wrapper" class="gray-bg">
                
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">

                    <h2>Add Sales Payment</h2>
                </div>
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">

                      <br/>
                            <form>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Customer Name</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <select class="form-control" name="customerId" onChange={this.onCustomerChange}>
                                            <option value="">Select Customer</option>
                                            {this.state.customers.map(c=> 
                                                <option value={c.id} key={c.id}>{c.customerName}</option> 
                                            )}
                                        </select>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.customerId}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Payment Date</label>
                                    <div class="input-group date col-md-7 col-sm-12 required">
                                        <div class="input-group date" data-provide="datepicker" data-date-autoclose="true" data-date-today-highlight="true">
                                            <input type="text" class="form-control" ref={this.ledgerDate}/>
                                            <div class="input-group-addon">
                                                <span class="fa fa-calendar"></span>
                                            </div>
                                        </div>
                                    </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.paymentDate}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Account Name</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <select class="form-control" name="accountId" onChange={this.onValueChange}>
                                            <option value="">Select Account</option>
                                            {this.state.accounts.map(a=> 
                                                <option value={a.id} key={a.id}>{a.accountName}</option>    
                                            )}
                                        </select>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.accountId}</span>
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Payment Type</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <select class="form-control" name="paymentTypeId" onChange={this.onValueChange}>
                                            <option value="">Select Payment Type</option>
                                            {this.state.paymentTypes.map(pt=> 
                                                <option value={pt.id} key={pt.id}>{pt.paymentName}</option>
                                            )}
                                        </select>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.paymentTypeId}</span>
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Notes</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" 
                                        name="description" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.description}</span>
                                </div>

                                <br/>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right',color:'grey'}}><b>Add Invoice</b></label>
                                

                                <div class="col-md-7 col-sm-12 hr-line-dashed"></div>
                                
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Invoice</label>
                                
                                    <div class="col-md-7 col-sm-12">
                                        <select class="form-control" name="accountId" onChange={this.onInvoiceChange}>
                                            <option value="">Select Invoice</option>
                                            {this.state.salesInvoices.map(si=> 
                                                <option value={si.id} key={si.id}>{si.invoiceCode} - {moment(si.dueDate).format('MM/DD/YYYY')}</option>    
                                            )}
                                        </select>
                                        <br/>
                                            <div>Total Invoice : {this.state.invoice.total} </div>
                                            <div>Total Paid : {this.state.invoice.amountPaid}</div>
                                      
                                    </div>

                                 
                                    <div class="col-md-2 col-sm-1">
                                        <span style={errStyle}>{this.state.error.productId}</span>
                                        &nbsp;&nbsp;<a onClick={()=>this.addPurchaseItems(this.state.productId)} class="btn btn-sm btn-default"><i class="fa fa-shopping-cart"></i> Add</a>
                                    </div>

                                </div>

                          
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}></label>
                                    <div class="col-md-7 col-sm-12">
                                    

                                    <ul class="nav nav-tabs">
                                        <li><a class="nav-link active show" data-toggle="tab" href="#tab-1"><i class="fa fa-puzzle-piece"></i> Items</a></li>
                                    </ul>

                                    <div class="tab-content">
                                        <div id="tab-1" class="tab-pane active show">

                                        <table class="table table-hover table-striped">
                                                <thead>
                                                    <th class="text-left">Invoice #</th>
                                                    <th class="text-right">Due Date</th>
                                                    <th class="text-right">Total Invoice</th>
                                                    <th class="text-right">Total Paid</th>
                                                    <th class="text-right">Amount Paid</th>
                                                    
                                                    
                                                    <th></th>
                                                </thead>
                                                <tbody>
                                                    
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>

                                    
                                    </div>
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}></label>
                                    <div class="col-md-7 col-sm-12" style={{textAlign:'right'}}>
                                        <div>Total : 0</div> 
                                    </div>
                                </div>

                                <br/><br/>
                                
                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>
                                        <button type="button" onClick={this.savePurchase} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
                                </div>


                            </form>



                      </div>
                      


                </div>

            
            </div>
            
            
        </div>

        <br/><br/>

        
        <Footer/>

        </div>
        )
    }

}


export default SalesPaymentAdd;
