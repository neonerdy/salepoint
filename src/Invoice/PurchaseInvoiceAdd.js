
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import config from '../Shared/Config';
import axios from 'axios';
import '../App.css';
import uuid from 'uuid';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import moment from 'moment';
import Header from '../Shared/Header';
import NavBar from '../Shared/NavBar';


class PurchaseInvoiceAdd extends Component
{
    
    constructor(props) {

        super(props);

        this.invoiceDate = React.createRef()
        this.dueDate = React.createRef()

        this.state = {
            error: {},
            recordCounter: {},
            setting: {},
            id: uuid.v4(),
            suppliers: [],
            products: [],
            invoiceCode: '',
            supplierId: '',
            invoiceDate: '',
            dueDate: '',
            notes: '',
            productId: '',
            qty: '1',
            taxPct: '10',
            discountPct: '0',
            purchaseInvoiceItems: [],
            subTotal: 0,
            tax: 0,
            discount: 0,
            total: 0
        }
    }


    componentDidMount() {

        let today = new Date();
        let month = today.getMonth()+1;
        let year = today.getFullYear();

        this.getRecordCounter(month,year);

        this.getSuppliers();
        this.getProducts();

    }


    onValueChange = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value
        })
    
    }


    getSettingById = (id) => {

        axios.get(config.serverUrl + '/api/setting/getbyid/' + id).then(response=> {
            this.setState({
                setting: response.data
            })
            this.generateInvoiceCode();
        })
    }


    getRecordCounter = (month, year) => {

        axios.get(config.serverUrl + '/api/recordcounter/getbymonth/' + month + "/" + year).then(response=> {
            this.setState({
                recordCounter: response.data
            })
            this.getSettingById('E8DC5367-D553-4232-E621-08D84993E0DB');
        })

    }

    zeroPad = (num, places) =>  {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }


    generateInvoiceCode = () => {

        let date = new Date();
        let month = date.getMonth() + 1;
        month = month < 10 ? ("0" + month) : month;

        let year = date.getFullYear();
        year = year.toString().substr(2, year.length);

        let isShowMonthAndYear = this.state.setting.isShowMonthAndYear;
       
        let delimiter = this.state.setting.delimiter;
        let purchaseInvoicePrefix = this.state.setting.purchaseInvoicePrefix;
        let code = "";
        
        if (isShowMonthAndYear) {
            if (purchaseInvoicePrefix !== '') { 
                code = purchaseInvoicePrefix + delimiter + month + year + delimiter;
            } else {
                code = month + year + delimiter;
            }
        } else {
            if (purchaseInvoicePrefix !== '') {
                code = purchaseInvoicePrefix + delimiter;
            }
        }
                
        let newCounter = 0;

        let purchaseInvoiceLastCounter = this.state.recordCounter.purchaseInvoiceLastCounter; 

        if (purchaseInvoiceLastCounter == 0) {
            code = code + "00001";
        }
        else {
            newCounter = purchaseInvoiceLastCounter + 1;
            code = code + this.zeroPad(newCounter,5);
       }

       this.setState({
            invoiceCode: code
       })

    }



    getSuppliers = () => {

        axios.get(config.serverUrl + '/api/supplier/getall').then(response=> {
            this.setState({
                suppliers: response.data
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
        let totalTax = 0;
        let totalDiscount = 0;
       
        data.map(pi=> 
        {    
            let totalAmount  =  pi.price * pi.qty;
            let tax = (pi.taxPct/100) * totalAmount;
            let discount = (pi.discountPct/100) * totalAmount;
            
            totalTax += tax;
            totalDiscount = totalDiscount + discount;
            subTotal += totalAmount;     

        });

        let total = (subTotal+totalTax) - totalDiscount; 

        this.setState({
            subTotal: subTotal,
            tax: totalTax,
            discount: totalDiscount,
            total: total 
        })       

    }


    addPurchaseInvoiceItems = (productId) => {
      
        axios.get(config.serverUrl + '/api/product/getbyid/' + productId).then(response=> {

            let purchaseInvoiceItem = {};
            purchaseInvoiceItem.id = uuid.v4();
            purchaseInvoiceItem.purchaseInvoiceId = this.state.id;
            purchaseInvoiceItem.productId = productId; 
            purchaseInvoiceItem.productName = response.data.productName;
            purchaseInvoiceItem.qty = parseInt(this.state.qty);
            purchaseInvoiceItem.price = parseFloat(response.data.salePrice);
            purchaseInvoiceItem.taxPct = parseInt(this.state.taxPct);
            purchaseInvoiceItem.discountPct = parseInt(this.state.discountPct);
            
          
            this.setState({
                purchaseInvoiceItems: [...this.state.purchaseInvoiceItems, purchaseInvoiceItem],
                error: {},
                productId: ''
            })

            this.reCalculateTotal(this.state.purchaseInvoiceItems);
        })       

    }



    removePurchaseInvoiceItem = (id) => {

        const data = this.state.purchaseInvoiceItems.filter(pi=> pi.id !== id);
        
        this.setState({
            purchaseInvoiceItems: data,
        })

        this.reCalculateTotal(data);
    }




    validatePurchaseInvoice = () => {

        let isValid = true;
        let error = {};

      
        if (this.state.invoiceCode === '') {
            error.invoiceCode = 'is required';
            isValid = false;
        }

        if (this.state.supplierId === '') {
            error.supplierId = 'is required';
            isValid = false;
        }

        if (this.invoiceDate.current.value === '') {
            error.invoiceDate = 'is required';
            isValid = false;
        }

        if (this.dueDate.current.value === '') {
            error.dueDate = 'is required';
            isValid = false;
        }
       
        if (this.state.purchaseInvoiceItems.length < 1) {
            error.productId = 'Product is empty';
            isValid = false;
        }


        this.setState({
            error: error 
        })

        return isValid;

    }


    savePurchaseInvoice = () => {

        let isValid = this.validatePurchaseInvoice();

        if (isValid) {

            let purchaseInvoice = {
                id: this.state.id,
                invoiceCode: this.state.invoiceCode,
                supplierId: this.state.supplierId,
                invoiceDate: new Date(moment(this.invoiceDate.current.value).add(1,'d')),
                dueDate: new Date(moment(this.dueDate.current.value).add(1,'d')),
                notes: this.state.notes,
                amount: parseFloat(this.state.subTotal),
                amountPaid: 0,
                tax: parseFloat(this.state.tax),
                discount: parseFloat(this.state.discount),
                total: parseFloat(this.state.total),
                status: 'New',                                
                purchaseInvoiceItems: this.state.purchaseInvoiceItems
            }

            console.log(purchaseInvoice);


            axios.post(config.serverUrl + '/api/purchaseinvoice/save', purchaseInvoice).then(response=> {
                this.props.history.push('/purchase-invoice');
            })

        }
    }

    cancelAdd = () => {
        this.props.history.push('/purchase-invoice');
    }




    render()
    {
       
        let errStyle = {
            color: 'darkred'
        }

        let productList = [];
        
         this.state.products.map(p=> {
            let product = {};
            product.id = p.id;
            product.text = p.productName;
            productList.push(product);
         })

        

       
        return(

            <div>

                <Header/>
                <NavBar/>

                <div id="page-wrapper" class="gray-bg">

        
                <div class="row wrapper border-bottom white-bg page-heading">
                    <div class="col-lg-8">

                        <h2>Add Purchase Invoice</h2>
                    </div>
                </div>

            <br/>

            <div class="row">
                <div class="col-lg-12">

                    <div class="ibox">

                        <div class="ibox-content">

                        <br/>
                                <form autocomplete="off">

                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Invoice #</label>
                                        <div class="col-md-7 col-sm-12 required">
                                            {this.state.setting.isEnableAutomaticNumbering == true ? 
                                            <input type="text" class="form-control" name="invoiceCode" onChange={this.onValueChange}  value={this.state.invoiceCode} disabled/>
                                                : <input type="text" class="form-control" name="invoiceCode" onChange={this.onValueChange}/>
                                            }    
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.invoiceCode}</span>
                                    </div>

                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Supplier Name</label>
                                        
                                        <div class="col-md-7 col-sm-12 required">
                                            <select name="supplierId" class="form-control" onChange={this.onValueChange}>
                                                <option value="">Select Supplier</option>
                                                {this.state.suppliers.map(s=> 
                                                    <option value={s.id}>{s.supplierName}</option>
                                                )}
                                            </select>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.supplierId}</span>

                                    </div>

                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Invoice Date</label>
                                        <div class="input-group date col-md-7 col-sm-12 required">
                                            <div class="input-group date" data-provide="datepicker" data-date-autoclose="true" data-date-today-highlight="true">
                                                    <input type="text" class="form-control" ref={this.invoiceDate}/>
                                                    <div class="input-group-addon">
                                                        <span class="fa fa-calendar"></span>
                                                    </div>
                                            </div>

                                        </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.invoiceDate}</span>
                                    </div>

                                    
                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Due Date</label>
                                        <div class="input-group date col-md-7 col-sm-12 required">
                                            <div class="input-group date" data-provide="datepicker" data-date-autoclose="true" data-date-today-highlight="true">
                                                    <input type="text" class="form-control" ref={this.dueDate}/>
                                                    <div class="input-group-addon">
                                                        <span class="fa fa-calendar"></span>
                                                    </div>
                                            </div>

                                        </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.dueDate}</span>
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



                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}></label>
                                    
                                        <div class="col-md-4 col-sm-12">
                                            <p>Product Name</p>

                                            <Select2 className="form-control"
                                                data={productList}
                                                onChange={(e) => { this.setState({productId: e.target.value}) }}
                                                value={this.state.productId}
                                                options={{
                                                    placeholder: 'Select Product',
                                                }}
                                                />
                                    
                                        </div>

                                        <div class="col-md-1 col-sm-12">
                                            <p>Qty</p>
                                            <input name="qty" type="number" class="form-control" onChange={this.onValueChange} defaultValue="1"/>
                                        </div>

                                        <div class="col-md-1 col-sm-12">
                                            <p>Tax (%)</p>
                                            <input name="taxPct" type="number" class="form-control" onChange={this.onValueChange} defaultValue="10"/>
                                        </div>
                                        

                                        <div class="col-md-1 col-sm-12 required">
                                            <p>Disc (%)</p>
                                            <input name="discountPct" type="number" class="form-control" onChange={this.onValueChange} defaultValue="0"/>
                                        </div>

                                        <div class="col-md-2 col-sm-1">
                                            
                                            <span style={errStyle}>{this.state.error.productId}</span>
                                            &nbsp;&nbsp;<a onClick={()=>this.addPurchaseInvoiceItems(this.state.productId)} class="btn btn-sm btn-default">
                                            <i class="fa fa-shopping-cart"></i> Add</a>
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
                                                        <th width="30%" class="text-left">Product Name</th>
                                                        <th width="10%" class="text-right">Qty</th>
                                                        <th width="20%" class="text-right">Price</th>
                                                        <th width="10%" class="text-right">Discount</th>
                                                        <th width="10%" class="text-right">Tax</th>
                                                        <th width="20%" class="text-right">Amount</th>
                                                        <th></th>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.purchaseInvoiceItems.map(pii=> 
                                                        <tr key={pii.id}>
                                                        <td width="30%">{pii.productName}</td>
                                                        <td width="10%" align="right">{pii.qty}</td>
                                                        <td width="20%" align="right">{pii.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                        <td width="10%" align="right">{pii.discountPct} %</td>
                                                        <td width="10%" align="right">{pii.taxPct} %</td>
                                                        <td width="20%" align="right">{(pii.qty * pii.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                        <td align="right">
                                                                <a onClick={()=>this.removePurchaseInvoiceItem(pii.id)}><i class="fa fa-trash"></i></a>

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
                                            <div>Discount : {this.state.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                            <div>Tax : {this.state.tax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                            <br/>
                                            <div><h3>Total : {this.state.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h3></div>
                                        </div>
                                    </div>

                                    <br/><br/>
                                    
                                    <div class="hr-line-dashed"></div>
                                

                                    <div class="text-right">
                                            <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>
                                            <button type="button" onClick={this.savePurchaseInvoice} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
                                    </div>


                                </form>



                        </div>
                        


                    </div>

                
                </div>
                
                
            </div>

            <br/><br/>

            
            <Footer/>

            </div>

        </div>
       

        )
    }

}


export default PurchaseInvoiceAdd;