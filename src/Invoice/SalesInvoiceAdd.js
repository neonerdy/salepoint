
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import config from '../Shared/Config';
import axios from 'axios';
import '../App.css';
import uuid from 'uuid';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';



class SalesInvoiceAdd extends Component
{
    
    constructor(props) {
        super(props);

        this.invoiceDate = React.createRef()
        this.dueDate = React.createRef()
     
        this.state = {
            error: {},
            id: uuid.v4(),
            customers: [],
            salesPersons:[],
            products: [],
            invoiceCode: '',
            customerId: '',
            invoiceDate: '',
            dueDate: '',
            salesPersonId: '',
            notes: '',
            productId: '',
            qty: '1',
            taxPct: '10',
            discountPct: '0',
            salesInvoiceItems: [],
            subTotal: 0,
            tax: 0,
            discount: 0,
            total: 0
        }
    }


    componentDidMount() {

        this.getCustomers();
        this.getSalesPersons();
        this.getProducts();
    }

    onValueChange = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value
        })
    
    }

    getCustomers = () => {

        axios.get(config.serverUrl + '/api/customer/getall').then(response=> {
            this.setState({
                customers: response.data
            })
        })
    }


    getSalesPersons = () => {

        axios.get(config.serverUrl + '/api/employee/getall').then(response=> {
            this.setState({
                salesPersons: response.data
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
       
        data.map(si=> 
        {    
            let totalAmount  =  si.price * si.qty;
            let tax = (si.taxPct/100) * totalAmount;
            let discount = (si.discountPct/100) * totalAmount;
            
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


    addSalesInvoiceItems = (productId) => {
      
        axios.get(config.serverUrl + '/api/product/getbyid/' + productId).then(response=> {

            let salesInvoiceItem = {};
            salesInvoiceItem.id = uuid.v4();
            salesInvoiceItem.salesInvoiceId = this.state.id;
            salesInvoiceItem.productId = productId; 
            salesInvoiceItem.productName = response.data.productName;
            salesInvoiceItem.qty = this.state.qty;
            salesInvoiceItem.price = response.data.salePrice;
            salesInvoiceItem.taxPct = this.state.taxPct;
            salesInvoiceItem.discountPct = this.state.discountPct;
            
          
            this.setState({
                salesInvoiceItems: [...this.state.salesInvoiceItems, salesInvoiceItem],
                error: {},
                productId: ''
            })

            this.reCalculateTotal(this.state.salesInvoiceItems);
        })       

    }



    removeSalesInvoiceItem = (id) => {

        const data = this.state.salesInvoiceItems.filter(pi=> pi.id !== id);
        
        this.setState({
            salesInvoiceItems: data,
        })

        this.reCalculateTotal(data);
    }




    validateSalesInvoice = () => {

        let isValid = true;
        let error = {};

      
        if (this.state.invoiceCode === '') {
            error.invoiceCode = 'is required';
            isValid = false;
        }

        if (this.state.customerId === '') {
            error.customerId = 'is required';
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

        if (this.state.salesPersonId === '') {
            error.salesPersonId = 'is required';
            isValid = false;
        }

        if (this.state.salesInvoiceItems.length < 1) {
            error.productId = 'Product is empty';
            isValid = false;
        }


        this.setState({
            error: error 
        })

        return isValid;

    }



    saveSalesInvoice = () => {

        let isValid = this.validateSalesInvoice();

        if (isValid) {

            let salesInvoice = {
                id: this.state.id,
                invoiceCode: this.state.invoiceCode,
                customerId: this.state.customerId,
                invoiceDate: this.invoiceDate.current.value,
                dueDate: this.dueDate.current.value,
                salesPersonId: this.state.salesPersonId,
                notes: this.state.notes,
                amount: this.state.subTotal,
                amountPaid: 0,
                tax: this.state.tax,
                discount: this.state.discount,
                total: this.state.total,
                status: 'New',                                
                salesInvoiceItems: this.state.salesInvoiceItems
            }

            console.log(salesInvoice);


            axios.post(config.serverUrl + '/api/salesinvoice/save', salesInvoice).then(response=> {
                this.props.history.push('/sales-invoice');
            })

        }
    }

    cancelAdd = () => {
        this.props.history.push('/sales-invoice');
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
            <div id="page-wrapper" class="gray-bg">

       
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">

                    <h2>Add Sales Invoice</h2>
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
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="invoiceCode" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.invoiceCode}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Customer Name</label>
                                    
                                    <div class="col-md-7 col-sm-12 required">
                                        <select name="customerId" class="form-control" onChange={this.onValueChange}>
                                            <option value="">Select Customer</option>
                                            {this.state.customers.map(s=> 
                                                <option value={s.id}>{s.customerName}</option>
                                            )}
                                        </select>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.customerId}</span>

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



                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Sales Person</label>
                                    
                                    <div class="col-md-7 col-sm-12 required">
                                        <select name="salesPersonId" class="form-control" onChange={this.onValueChange}>
                                            <option value="">Select Sales Person</option>
                                            {this.state.salesPersons.map(s=> 
                                                <option value={s.id}>{s.employeeName}</option>
                                            )}
                                        </select>
                                       
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.salesPersonId}</span>

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
                                        &nbsp;&nbsp;<a onClick={()=>this.addSalesInvoiceItems(this.state.productId)} class="btn btn-sm btn-default">
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
                                                    {this.state.salesInvoiceItems.map(sii=> 
                                                    <tr key={sii.id}>
                                                       <td width="30%">{sii.productName}</td>
                                                       <td width="10%" align="right">{sii.qty}</td>
                                                       <td width="20%" align="right">{sii.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                       <td width="10%" align="right">{sii.discountPct} %</td>
                                                       <td width="10%" align="right">{sii.taxPct} %</td>
                                                       <td width="20%" align="right">{(sii.qty * sii.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                       <td align="right">
                                                            <a onClick={()=>this.removeSalesInvoiceItem(sii.id)}><i class="fa fa-trash"></i></a>

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
                                        <button type="button" onClick={this.saveSalesInvoice} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
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


export default SalesInvoiceAdd;

