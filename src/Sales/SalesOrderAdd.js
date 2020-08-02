
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import config from '../Shared/Config';
import axios from 'axios';
import '../App.css';
import uuid from 'uuid';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';


class SalesOrderAdd extends Component
{
    
    constructor(props) {
        super(props);

        this.orderDate = React.createRef()

        this.state = {
            error: {},
            id: uuid.v4(),
            customers: [],
            salesPersons: [],
            products: [],
            salesOrderCode: '',
            customerId: '',
            orderDate: '',
            salesPersonId: '',
            notes: '',
            productId: '',
            qty: '1',
            taxPct: '10',
            discountPct: '0',
            salesOrderItems: [],
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


    addSalesOrderItems = (productId) => {
      
        axios.get(config.serverUrl + '/api/product/getbyid/' + productId).then(response=> {

            let salesOrderItem = {};

            salesOrderItem.id = uuid.v4();
            salesOrderItem.salesOrderId = this.state.id;
            salesOrderItem.productId = productId; 
            salesOrderItem.productName = response.data.productName;
            salesOrderItem.qty = this.state.qty;
            salesOrderItem.price = response.data.salePrice;
            salesOrderItem.taxPct = this.state.taxPct;
            salesOrderItem.discountPct = this.state.discountPct;
            
          
            this.setState({
                salesOrderItems: [...this.state.salesOrderItems, salesOrderItem],
                error: {},
                productId: ''
            })

            this.reCalculateTotal(this.state.salesOrderItems);
        })       

    }



    removeSalesOrderItem = (id) => {

        const data = this.state.salesOrderItems.filter(si=> si.id !== id);
        
        this.setState({
            salesOrderItems: data,
        })

        this.reCalculateTotal(data);
    }



    validateSalesOrder = () => {

        let isValid = true;
        let error = {};

      
        if (this.state.salesOrderCode === '') {
            error.salesOrderCode = 'is required';
            isValid = false;
        }

        if (this.state.customerId === '') {
            error.customerId = 'is required';
            isValid = false;
        }

        if (this.orderDate.current.value === '') {
            error.orderDate = 'is required';
            isValid = false;
        }

        if (this.state.salesPersonId === '') {
            error.salesPersonId = 'is required';
            isValid = false;
        }
        
       
        if (this.state.salesOrderItems.length < 1) {
            error.productId = 'Product is empty';
            isValid = false;
        }


        this.setState({
            error: error 
        })

        return isValid;

    }


    saveSalesOrder = () => {

        let isValid = this.validateSalesOrder();

        if (isValid) {

            let salesOrder = {
                id: this.state.id,
                salesOrderCode: this.state.salesOrderCode,
                customerId: this.state.customerId,
                orderDate: this.orderDate.current.value,
                salesPersonId: this.state.salesPersonId,
                notes: this.state.notes,
                amount: this.state.subTotal,
                tax: this.state.tax,
                discount: this.state.discount,
                total: this.state.total,
                status: 'New',                                
                salesOrderItems: this.state.salesOrderItems
            }

            console.log(salesOrder);


            axios.post(config.serverUrl + '/api/salesorder/save', salesOrder).then(response=> {
                this.props.history.push('/sales-order');
            })

        }
    }

    cancelAdd = () => {
        this.props.history.push('/sales-order');
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

                    <h2>Add New Order</h2>
                </div>
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">

                      <br/>
                            <form autocomplete="off">

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Sales Order #</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="salesOrderCode" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.salesOrderCode}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Customer Name</label>
                                    
                                    <div class="col-md-7 col-sm-12 required">
                                        <select name="customerId" class="form-control" onChange={this.onValueChange}>
                                            <option value="">Select Customer</option>
                                            {this.state.customers.map(c=> 
                                                <option value={c.id}>{c.customerName}</option>
                                            )}
                                        </select>
                                       
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.customerId}</span>

                                 </div>

                                
                                 <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Order Date</label>
                                    <div class="input-group date col-md-7 col-sm-12 required">
                                          <div class="input-group date" data-provide="datepicker" data-date-autoclose="true" data-date-today-highlight="true">
                                                <input type="text" class="form-control" ref={this.orderDate}/>
                                                <div class="input-group-addon">
                                                    <span class="fa fa-calendar"></span>
                                                </div>
                                           </div>

                                    </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.orderDate}</span>
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
                                        &nbsp;&nbsp;<a onClick={()=>this.addSalesOrderItems(this.state.productId)} class="btn btn-sm btn-default">
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
                                                    {this.state.salesOrderItems.map(si=> 
                                                    <tr key={si.id}>
                                                       <td width="30%">{si.productName}</td>
                                                       <td width="10%" align="right">{si.qty}</td>
                                                       <td width="20%" align="right">{si.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                       <td width="10%" align="right">{si.discountPct} %</td>
                                                       <td width="10%" align="right">{si.taxPct} %</td>
                                                       <td width="20%" align="right">{(si.qty * si.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                       <td align="right">
                                                            <a onClick={()=>this.removeSalesOrderItem(si.id)}><i class="fa fa-trash"></i></a>

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
                                        <button type="button" onClick={this.saveSalesOrder} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
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


export default SalesOrderAdd;