
import React, {Component} from 'react';
import Footer from './Footer';
import axios from 'axios';
import './App.css';
import config from './Config';
import uuid from 'uuid';


class SalesAdd extends Component
{
   
    constructor(props) {
        super(props);
        this.state = {
            error: {},
            saleId: uuid.v4(),
            outlets: [],
            customers: [],
            paymentTypes: [],
            products: [],
            outletId: '',
            invoiceCode: '',
            customerId: '',
            invoiceDate: '',
            customerPo: '',
            paymentTypeId: '',
            notes: '',
            productId: '',
            qty: "1",
            saleItems: [],
            subTotal: 0,
            tax: 0,
            serviceCharge: 0,
            total: 0
        }
    }


    componentDidMount() {

        this.getOutlets();
        this.getCustomers();
        this.getPaymentTypes();
        this.getProducts();
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    getOutlets = () => {
    
        axios.get(config.serverUrl + '/api/outlet/getall').then(response=> {
            this.setState({
                outlets: response.data
            })
        })
    }



    getCustomers = () => {

        axios.get(config.serverUrl + '/api/customer/getall').then(response=> {
            this.setState({
                customers: response.data
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

    
    getProducts = () => {

        axios.get(config.serverUrl + '/api/product/getall').then(response=> {
            this.setState({
                products: response.data
            })
        })
    }


    reCalculateTotal = (data) => {

        let subTotal = 0;
     
        data.map(si=> 
            subTotal += si.price * si.qty    
        )

        let tax = 0.1 * subTotal;
        let serviceCharge = 0.05 * subTotal;
        let total= subTotal + tax + serviceCharge; 

        this.setState({
            subTotal: subTotal,
            tax: tax,
            serviceCharge: serviceCharge,
            total: total
        })       

    }


    addSaleItems = (productId) => {
      
        axios.get(config.serverUrl + '/api/product/getbyid/' + productId).then(response=> {

            let saleItem = {};
            saleItem.id = uuid.v4();
            saleItem.saleId = this.state.saleId;
            saleItem.productId = productId; 
            saleItem.productName = response.data.productName;
            saleItem.qty = this.state.qty;
            saleItem.price = response.data.salePrice;

            this.setState({
                saleItems: [...this.state.saleItems, saleItem],
                error: {}
            })

            this.reCalculateTotal(this.state.saleItems);
        })       

    }



    removeSaleItem = (id) => {

        const data = this.state.saleItems.filter(si=> si.id !== id);
        
        this.setState({
            saleItems: data,
        })

        this.reCalculateTotal(data);
    }



    validateSales = () => {

        let isValid = true;
        let error = {};

        if (this.state.outletId === '') {
            error.outletId = 'is required';
            isValid = false;
        }

        if (this.state.invoiceCode === '') {
            error.invoiceCode = 'is required';
            isValid = false;
        }

        if (this.state.customerId === '') {
            error.customerId = 'is required';
            isValid = false;
        }

        if (this.state.invoiceDate === '') {
            error.invoiceDate = 'is required';
            isValid = false;
        }

        if (this.state.paymentTypeId === '') {
            error.paymentTypeId = 'is required';
            isValid = false;
        }

        if (this.state.saleItems.length < 1) {
            error.productId = 'Product is empty';
            isValid = false;
        }


        this.setState({
            error: error 
        })

        return isValid;

    }


    saveSales = () => {

        let isValid = this.validateSales();

        if (isValid) {

            let sale = {
                id: this.state.saleId,
                outletId: this.state.outletId,
                invoiceCode: this.state.invoiceCode,
                customerId: this.state.customerId,
                invoiceDate: this.state.invoiceDate,
                customerPo: this.state.customerPo,
                paymentTypeId: this.state.paymentTypeId,
                notes: this.state.notes,
                amount: this.state.subTotal,
                tax: this.state.tax,
                serviceCharge: this.state.serviceCharge,
                subTotal: this.state.subTotal,
                total: this.state.total,
                status: 'New',                                
                salesItems: this.state.saleItems
            }

            console.log(sale);
            
            axios.post(config.serverUrl + '/api/sales/save', sale).then(response=> {
                this.props.history.push('/sales');
            })

        }
    }

    cancelAdd = () => {
        this.props.history.push('/sales');
    }



    render() {
       
      
        let errStyle = {
            color: 'darkred'
        }

        return(
            <div id="page-wrapper" class="gray-bg">
                
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">

                    <h2>Add Sales</h2>
                </div>
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">

                      <br/>
                            <form>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Outlet</label>
                                     <div class="col-md-7 col-sm-12 required">
                                        
                                      <select class="form-control" name="outletId" onChange={this.onValueChange}>
                                            
                                            <option value="">Select Outlet</option>
                                            {this.state.outlets.map(o=> 
                                                <option value={o.id} key={o.id}>{o.outletName}</option>    
                                            )} 
                                      </select>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.outletId}</span>
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Invoice #</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="invoiceCode" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.invoiceCode}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Customer Name</label>
                                    
                                    <div class="col-md-7 col-sm-12 required">
                                        <select class="form-control" name="customerId" onChange={this.onValueChange}>
                                            <option value="">Select Customer</option>
                                            {this.state.customers.map(c=> 
                                                <option value={c.id} key={c.id}>{c.customerName}</option>    
                                            )}
                                        </select>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.customerId}</span>
                                </div>

                                
                                <div class="form-group  row" id="data_1"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Invoice Date</label>
                                    <div class="input-group date col-md-7 col-sm-12 required" id="data_1">
                                        <input type="text" class="form-control" name="invoiceDate" onChange={this.onValueChange}/>
                                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.invoiceDate}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Customer PO #</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" 
                                        name="customerPo" onChange={this.onValueChange}/>
                                    </div>
                                </div>

                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Payment Type</label>
                                     <div class="col-md-7 col-sm-12 required">
                                        
                                      <select class="form-control" 
                                          name="paymentTypeId" onChange={this.onValueChange}>
                                            
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
                                        name="notes" onChange={this.onValueChange}/>
                                    </div>
                                </div>

                                <br/>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right',color:'grey'}}><b>Add Product</b></label>
                             
                                    <div class="col-md-7 col-sm-12 hr-line-dashed"></div>
                                
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Product Name</label>
                                    
                                    <div class="col-md-5 col-sm-12">
                                        <select class="form-control" name="productId" onChange={this.onValueChange}>
                                            <option value="">Select Product</option>
                                            {this.state.products.map(p=> 
                                                <option value={p.id} key={p.id}>{p.productName}</option>    
                                            )}

                                        </select>
                                    </div>

                                    <div class="col-md-2 col-sm-12 required">
                                         <input name="qty" type="number" class="form-control" onChange={this.onValueChange} value={this.state.qty}/>
                                    </div>

                                    <div class="col-md-2 col-sm-1">
                                        <span style={errStyle}>{this.state.error.productId}</span>
                                        &nbsp;&nbsp;<a onClick={()=>this.addSaleItems(this.state.productId)} class="btn btn-sm btn-default"><i class="fa fa-shopping-cart"></i> Add</a>
                                    </div>
                                </div>

                          
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}></label>
                                    <div class="col-md-7 col-sm-12">
                                    

                                    <ul class="nav nav-tabs">
                                        <li><a class="nav-link active show" data-toggle="tab" href="#tab-1"><i class="fa fa-dropbox"></i> Items</a></li>
                                    </ul>

                                    <div class="tab-content">
                                        <div id="tab-1" class="tab-pane active show">

                                            <table class="table table-hover table-striped">
                                                <thead>
                                                    <th width="40%" class="text-left">Product Name</th>
                                                    <th width="10%" class="text-right">Qty</th>
                                                    <th width="20%" class="text-right">Price</th>
                                                    <th width="20%" class="text-right">Amount</th>
                                                    <th></th>
                                                </thead>
                                                <tbody>
                                                    {this.state.saleItems.map(si=> 
                                                    <tr key={si.id}>
                                                       <td width="40%">{si.productName}</td>
                                                       <td width="10%" align="right">
                                                          {si.qty}
                                                        </td>
                                                       <td width="20%" align="right">{si.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                       <td width="20%" align="right">{(si.qty * si.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                       <td width="10%" align="right">
                                                            <a onClick={()=>this.removeSaleItem(si.id)}><i class="fa fa-trash"></i></a>

                                                       </td>
                                                    </tr>
                                                    )}
                                                    
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    
                                    
                                    </div>
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}></label>
                                    <div class="col-md-7 col-sm-12" style={{textAlign:'right'}}>
                                        <div>Sub Total : {this.state.subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div> 
                                        <div>Tax : {this.state.tax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                        <div>Service Charge : {this.state.serviceCharge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                        <br/>
                                        <div><h3>Total : {this.state.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3></div>
                                    </div>
                                </div>


                                <br/><br/>
                                



                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>
                                        <button type="button" onClick={this.saveSales} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
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


export default SalesAdd;