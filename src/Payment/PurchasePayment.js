import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import config from '../Shared/Config';
import axios from 'axios';
import '../App.css';
import uuid from 'uuid';
import moment from 'moment';
import Header from '../Shared/Header';
import NavBar from '../Shared/NavBar';


class PurchasePayment extends Component
{
    constructor(props) {

        super(props);
        
        this.paymentDate = React.createRef()
             
        this.state = {
            error: {},
            paymentTypes: [],
            accounts: [],
            purchaseInvoiceId: '',
            invoiceCode: '',
            supplierId: '',
            amount: 0,
            total: 0,
            totalPaid: 0,
            outstanding: '',
            totalAmountPaid: 0,
            id: uuid.v4(),
            paymentDate: '',
            paymentTypeId: '',
            amountPaid: '',
            notes: ''
        }
    }


    componentDidMount() {

        this.getPaymentTypes();
        let id = this.props.match.params.id;
        this.getPurchaseInvoiceById(id);
    }


     onValueChange = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value
        })
    
    }

    

    getPurchaseInvoiceById = (id) => {

        axios.get(config.serverUrl + '/api/purchaseinvoice/getbyid/' + id).then(response=> {
            this.setState({
                purchaseInvoiceId: id,
                invoiceCode: response.data.invoiceCode,
                supplierId: response.data.supplierId,
                amount: response.data.amount,
                total: response.data.total,
                totalPaid: response.data.amountPaid,
                outstanding: response.data.total -  response.data.amountPaid
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


    cancelPay = () => {
        this.props.history.push('/purchase-invoice');
    }


    validatePurchasePayment = () => {

        let isValid = true;
        let error = {};

        if (this.paymentDate.current.value === '') {
            error.paymentDate = 'is required';
            isValid = false;
        }

        if (this.state.paymentTypeId === '') {
            error.paymentTypeId = 'is required';
            isValid = false;
        }

        if (this.state.amountPaid === '') {
            error.amountPaid = 'is required';
            isValid = false;
        }

        
        this.setState({
            error: error 
        })

        return isValid;

    }



    payInvoice = () => {

        let isValid = this.validatePurchasePayment();

        if (isValid) {

            let purchasePayment = {
                id: uuid.v4(),
                purchaseInvoiceId: this.state.purchaseInvoiceId,       
                paymentDate: new Date(moment(this.paymentDate.current.value).add(1,'d')),
                paymentTypeId: this.state.paymentTypeId,
                amountPaid: parseFloat(this.state.amountPaid),
                notes: this.state.notes,
            }

            axios.post(config.serverUrl + '/api/purchasepayment/save', purchasePayment).then(response=> {
                this.props.history.push('/purchase-invoice');
            })

        }

    }





    


    render() {

        let errStyle = {
            color: 'darkred'
        }


        return( 

        <div>

            <Header/>
            <NavBar/>

            <div id="page-wrapper" class="gray-bg">

                <div class="row wrapper border-bottom white-bg page-heading">
                    <div class="col-lg-8">
                        <h2>Pay Invoice</h2>
                    </div>
                </div>

            <br/>

            <div class="row">
                
                    <div class="col-lg-12">

                        <div class="ibox">
                        
                            <div class="ibox-content">

                            <br/>
                        
                        <form autoComplete="off">
                        
                            <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Invoice Number</label>
                                <div class="col-md-7 col-sm-12"><input type="text" class="form-control" 
                                    name="invoiceCode" onChange={this.onValueChange} value={this.state.invoiceCode} disabled/>
                                </div>
                            </div>

                            <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Total Invoice</label>
                                <div class="col-md-7 col-sm-12">
                                    <input type="text" class="form-control" name="amount" onChange={this.onValueChange} value={this.state.total} disabled/>
                                </div>
                            </div>

                            <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Total Paid</label>
                                <div class="col-md-7 col-sm-12">
                                    <input type="text" class="form-control" name="totalPaid" onChange={this.onValueChange} value={this.state.totalPaid} disabled/>
                                </div>
                            </div>
                            
                            <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Outstanding</label>
                                <div class="col-md-7 col-sm-12">
                                    <input type="text" class="form-control" name="outstanding" onChange={this.onValueChange} value={this.state.outstanding} disabled/>
                                </div>
                            </div>

                            <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Payment Date</label>
                                <div class="input-group date col-md-7 col-sm-12 required">
                                    <div class="input-group date" data-provide="datepicker" data-date-autoclose="true" data-date-today-highlight="true">
                                        <input type="text" class="form-control" ref={this.paymentDate}/>
                                        <div class="input-group-addon">
                                            <span class="fa fa-calendar"></span>
                                        </div>
                                    </div>
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.paymentDate}</span>
                            </div>
        

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Payment Method</label>
                            
                                    <div class="col-md-7 col-sm-12 required">
                                        <select name="paymentTypeId" class="form-control" onChange={this.onValueChange}>
                                            <option value="">Select Payment Types</option>
                                            {this.state.paymentTypes.map(p=> 
                                                <option value={p.id}>{p.paymentTypeName}</option>    
                                            )}
                                            </select>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.paymentTypeId}</span>
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Amount Paid</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="number" class="form-control" 
                                        name="amountPaid" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.amountPaid}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Notes</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" 
                                        name="notes" onChange={this.onValueChange}/>
                                    </div>
                                </div>

                                <br/><br/>
                                    
                                <div class="hr-line-dashed"></div>
                                <div class="text-right">
                                    <a class="btn btn-link text-left" href="#" onClick={this.cancelPay}>Cancel</a>
                                    <button type="button" onClick={this.payInvoice} class="btn btn-success"><i class="fa fa-credit-card"></i>&nbsp;&nbsp;Pay</button>
                                </div>


                            </form>

                            </div>



                        </div>


                    </div>


                    </div>
            </div>
       
        </div>
                                               

        )

    }


}

export default PurchasePayment;
