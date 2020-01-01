
import React, {Component} from 'react';
import Footer from './Footer';
import config from './Config';
import axios from 'axios';
import './App.css';
import uuid from 'uuid';

class PurchaseAdd extends Component
{
    
    constructor(props) {
        super(props);
        this.state = {
            error: {},
            id: uuid.v4(),
            suppliers: [],
            paymentTypes: [],
            paymentAccounts: [],
            products: [],
            purchaseCode: '',
            supplierId: '',
            purchaseDate: '',
            supplierInvoice: '',
            paymentTypeId: '',
            paymentAccountId: '',
            notes: '',
            productId: '',
            qty: "1",
            purchaseItems: [],
            subTotal: 0,
            tax: 0,
            serviceCharge: 0,
            total: 0
        }
    }


    componentDidMount() {

        this.getSuppliers();
        this.getPaymentTypes();
        this.getPaymentAccounts();
        this.getProducts();
    }



    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    getSuppliers = () => {

        axios.get(config.serverUrl + '/api/supplier/getall').then(response=> {
            this.setState({
                suppliers: response.data
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


    getPaymentAccounts = () => {
        
        axios.get(config.serverUrl + '/api/account/getall').then(response=> {
            this.setState({
                paymentAccounts: response.data
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
     
        data.map(pi=> 
            subTotal += pi.price * pi.qty    
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


    addPurchaseItems = (productId) => {
      
        axios.get(config.serverUrl + '/api/product/getbyid/' + productId).then(response=> {

            let purchaseItem = {};
            purchaseItem.id = uuid.v4();
            purchaseItem.saleId = this.state.saleId;
            purchaseItem.productId = productId; 
            purchaseItem.productName = response.data.productName;
            purchaseItem.qty = this.state.qty;
            purchaseItem.price = response.data.salePrice;

            this.setState({
                purchaseItems: [...this.state.purchaseItems, purchaseItem],
                error: {}
            })

            this.reCalculateTotal(this.state.purchaseItems);
        })       

    }



    removePurchaseItem = (id) => {

        const data = this.state.purchaseItems.filter(pi=> pi.id !== id);
        
        this.setState({
            purchaseItems: data,
        })

        this.reCalculateTotal(data);
    }



    validatePurchase = () => {

        let isValid = true;
        let error = {};

      
        if (this.state.purchaseCode === '') {
            error.purchaseCode = 'is required';
            isValid = false;
        }

        if (this.state.supplierId === '') {
            error.supplierId = 'is required';
            isValid = false;
        }

        if (this.state.purchaseDate === '') {
            error.purchaseDate = 'is required';
            isValid = false;
        }

        if (this.state.supplierInvoice === '') {
            error.supplierInvoice = 'is required';
            isValid = false;
        }

        if (this.state.paymentTypeId === '') {
            error.paymentTypeId = 'is required';
            isValid = false;
        }

        if (this.state.paymentAccountId === '') {
            error.paymentAccountId = 'is required';
            isValid = false;
        }

        if (this.state.purchaseItems.length < 1) {
            error.productId = 'Product is empty';
            isValid = false;
        }


        this.setState({
            error: error 
        })

        return isValid;

    }


    savePurchase = () => {

        let isValid = this.validatePurchase();

        if (isValid) {

            let purchase = {
                id: this.state.id,
                purchaseCode: this.state.purchaseCode,
                supplierId: this.state.supplierId,
                purchaseDate: this.state.purchaseDate,
                supplierInvoice: this.state.supplierInvoice,
                paymentTypeId: this.state.paymentTypeId,
                paymentAccountId: this.state.paymentAccountId,
                notes: this.state.notes,
                amount: this.state.subTotal,
                tax: this.state.tax,
                serviceCharge: this.state.serviceCharge,
                total: this.state.total,
                status: 'New',                                
                purchaseItems: this.state.purchaseItems
            }

            console.log(purchase);


            axios.post(config.serverUrl + '/api/purchase/save', purchase).then(response=> {
                this.props.history.push('/purchase');
            })

        }
    }

    cancelAdd = () => {
        this.props.history.push('/purchase');
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

                    <h2>Add Purchase</h2>
                </div>
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">

                      <br/>
                            <form>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Purchase #</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="purchaseCode" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.purchaseCode}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Supplier Name</label>
                                    
                                    <div class="col-md-7 col-sm-12 required">
                                        <select class="form-control" name="supplierId" onChange={this.onValueChange}>
                                            <option value="">Select Supplier</option>
                                            {this.state.suppliers.map(s=> 
                                                <option key={s.id} value={s.id}>{s.supplierName}</option>    
                                            )}
                                        </select>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.supplierId}</span>
                                 </div>

                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Purchase Date</label>
                                    <div class="input-group date col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control" name="purchaseDate" onChange={this.onValueChange}/>
                                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.purchaseDate}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Supplier Invoice #</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" 
                                        name="supplierInvoice" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.supplierInvoice}</span>
                                </div>

     
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Payment Type</label>
                                     <div class="col-md-7 col-sm-12 required">
                                        
                                      <select class="form-control" name="paymentTypeId" onChange={this.onValueChange}>
                                            
                                            <option value="">Select Payment Type</option>
                                            {this.state.paymentTypes.map(pt=> 
                                                <option key={pt.id} value={pt.id}>{pt.paymentName}</option>
                                            )}
                                       </select>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.paymentTypeId}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Payment Account</label>
                                     <div class="col-md-7 col-sm-12 required">
                                      <select class="form-control" name="paymentAccountId" onChange={this.onValueChange}>
                                            <option value="">Select Payment Account</option>
                                             {this.state.paymentAccounts.map(pa=> 
                                                <option key={pa.id} value={pa.id}>{pa.accountName}</option>     
                                            )}                                               
                                       </select>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.paymentAccountId}</span>
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Notes</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" 
                                        name="notes" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.notes}</span>
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
                                        &nbsp;&nbsp;<a onClick={()=>this.addPurchaseItems(this.state.productId)} class="btn btn-sm btn-default"><i class="fa fa-shopping-cart"></i> Add</a>
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
                                                    {this.state.purchaseItems.map(pi=> 
                                                    <tr key={pi.id}>
                                                       <td width="40%">{pi.productName}</td>
                                                       <td width="10%" align="right">
                                                          {pi.qty}
                                                        </td>
                                                       <td width="20%" align="right">{pi.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                       <td width="20%" align="right">{(pi.qty * pi.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                       <td width="10%" align="right">
                                                            <a onClick={()=>this.removePurchaseItem(pi.id)}><i class="fa fa-trash"></i></a>

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


export default PurchaseAdd;