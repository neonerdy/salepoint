
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import config from '../Shared/Config';
import axios from 'axios';
import '../App.css';
import uuid from 'uuid';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';


class PointOfSaleAdd extends Component
{
    
    constructor(props) {
        super(props);

        this.salesDate = React.createRef()

        this.state = {
            error: {},
            id: uuid.v4(),
            customers: [],
            cashiers: [],
            products: [],
            salesCode: '',
            customerId: '',
            salesDate: '',
            cashierId: '',
            notes: '',
            productId: '',
            qty: '1',
            taxPct: '10',
            discountPct: '0',
            salesItems: [],
            subTotal: 0,
            tax: 0,
            discount: 0,
            total: 0
        }
    }


    componentDidMount() {

        this.getCustomers();
        this.getCashiers();
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


    getCashiers = () => {

        axios.get(config.serverUrl + '/api/employee/getall').then(response=> {
            this.setState({
                cashiers: response.data
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


    addSalesItems = (productId) => {
      
        axios.get(config.serverUrl + '/api/product/getbyid/' + productId).then(response=> {

            let salesItem = {};

            salesItem.id = uuid.v4();
            salesItem.pointOfSaleId = this.state.id;
            salesItem.productId = productId; 
            salesItem.productName = response.data.productName;
            salesItem.qty = parseInt(this.state.qty);
            salesItem.price = parseFloat(response.data.salePrice);
            salesItem.taxPct = parseInt(this.state.taxPct);
            salesItem.discountPct = parseInt(this.state.discountPct);
            
          
            this.setState({
               salesItems: [...this.state.salesItems, salesItem],
                error: {},
                productId: ''
            })

            this.reCalculateTotal(this.state.salesItems);
        })       

    }



    removeSalesItem = (id) => {

        const data = this.state.salesItems.filter(si=> si.id !== id);
        
        this.setState({
            salesItems: data,
        })

        this.reCalculateTotal(data);
    }



    validateSales = () => {

        let isValid = true;
        let error = {};

      
        if (this.state.salesCode === '') {
            error.salesCode = 'is required';
            isValid = false;
        }

        if (this.state.customerId === '') {
            error.customerId = 'is required';
            isValid = false;
        }

        if (this.salesDate.current.value === '') {
            error.salesDate = 'is required';
            isValid = false;
        }

        if (this.state.cashierId === '') {
            error.cashierId = 'is required';
            isValid = false;
        }
        
       
        if (this.state.salesItems.length < 1) {
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

            let sales = {
                id: this.state.id,
                salesCode: this.state.salesCode,
                customerId: this.state.customerId,
                cashierId: this.state.cashierId,
                notes: this.state.notes,
                amount: parseFloat(this.state.subTotal),
                tax: parseInt(this.state.tax),
                discount: parseInt(this.state.discount),
                total: parseFloat(this.state.total),
                status: 'Paid',                                
                pointOfSaleItems: this.state.salesItems
            }

            console.log(sales);


            axios.post(config.serverUrl + '/api/pointofsale/save', sales).then(response=> {
                this.props.history.push('/pos');
            })

        }
    }

    cancelAdd = () => {
        this.props.history.push('/pos');
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

                    <h2>Add New Sale</h2>
                </div>
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">

                      <br/>
                            <form autocomplete="off">

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Sales #</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="salesCode" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.salesCode}</span>
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

                                
                                 <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Sales Date</label>
                                    <div class="input-group date col-md-7 col-sm-12 required">
                                          <div class="input-group date" data-provide="datepicker" data-date-autoclose="true" data-date-today-highlight="true">
                                                <input type="text" class="form-control" ref={this.salesDate}/>
                                                <div class="input-group-addon">
                                                    <span class="fa fa-calendar"></span>
                                                </div>
                                           </div>

                                    </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.salesDate}</span>
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Cashier</label>
                                    
                                    <div class="col-md-7 col-sm-12 required">
                                        <select name="cashierId" class="form-control" onChange={this.onValueChange}>
                                            <option value="">Select Cashier</option>
                                            {this.state.cashiers.map(s=> 
                                                <option value={s.id}>{s.employeeName}</option>
                                            )}
                                        </select>
                                       
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.cashierId}</span>

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
                                        &nbsp;&nbsp;<a onClick={()=>this.addSalesItems(this.state.productId)} class="btn btn-sm btn-default">
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
                                                    {this.state.salesItems.map(si=> 
                                                    <tr key={si.id}>
                                                       <td width="30%">{si.productName}</td>
                                                       <td width="10%" align="right">{si.qty}</td>
                                                       <td width="20%" align="right">{si.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                       <td width="10%" align="right">{si.discountPct} %</td>
                                                       <td width="10%" align="right">{si.taxPct} %</td>
                                                       <td width="20%" align="right">{(si.qty * si.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                       <td align="right">
                                                            <a onClick={()=>this.removeSalesItem(si.id)}><i class="fa fa-trash"></i></a>

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


export default PointOfSaleAdd;