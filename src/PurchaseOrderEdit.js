
import React, {Component} from 'react';
import Footer from './Footer';
import config from './Config';
import axios from 'axios';
import './App.css';
import uuid from 'uuid';
import moment from 'moment';

import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';


class PurchaseOrderEdit extends Component
{
    
    constructor(props) {
        super(props);

        this.orderDate = React.createRef()

        this.state = {
            error: {},
            suppliers: [],
            products: [],
            id: '',
            purchaseOrderCode: '',
            supplierId: '',
            orderDate: '',
            notes: '',
            createdDate: '',
            productId: '',
            qty: '1',
            taxPct: '10',
            discountPct: '0',
            subTotal: 0,
            tax: 0,
            discount: 0,
            total: 0,
            status: '',
            purchaseOrderItems: []
        }
    }


    componentDidMount() {

        this.getSuppliers();
        this.getProducts();
        
        let id = this.props.match.params.id;
        this.getPurchaseOrderById(id);    
    }

    

    getPurchaseOrderById = (id) => {
        
        axios.get(config.serverUrl + '/api/purchaseorder/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                purchaseOrderCode: response.data.purchaseOrderCode ,
                supplierId: response.data.supplierId,
                orderDate: response.data.orderDate,
                notes: response.data.notes,
                subTotal: response.data.amount,
                tax: response.data.tax,
                discount: response.data.discount,
                total: response.data.total, 
                createdDate: response.data.createdDate,
                status: response.data.status,
                purchaseOrderItems: response.data.purchaseOrderItems
            })
        })
    }



    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    
    
    onProductChange = selectedOption => {
        this.setState(
          { productId: selectedOption.value }
        );
    };    


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


    addPurchaseOrderItems = (productId) => {
      
        axios.get(config.serverUrl + '/api/product/getbyid/' + productId).then(response=> {

            let purchaseOrderItem = {};
            purchaseOrderItem.id = uuid.v4();
            purchaseOrderItem.purchaseOrderId = this.state.id;
            purchaseOrderItem.productId = productId; 
            purchaseOrderItem.productName = response.data.productName;
            purchaseOrderItem.qty = this.state.qty;
            purchaseOrderItem.price = response.data.salePrice;
            purchaseOrderItem.taxPct = this.state.taxPct;
            purchaseOrderItem.discountPct = this.state.discountPct;
            
          
            this.setState({
                purchaseOrderItems: [...this.state.purchaseOrderItems, purchaseOrderItem],
                error: {},
                productId: ''
            })

            this.reCalculateTotal(this.state.purchaseOrderItems);
        })       

    }



    removePurchaseOrderItem = (id) => {

        const data = this.state.purchaseOrderItems.filter(pi=> pi.id !== id);
        
        this.setState({
            purchaseOrderItems: data,
        })

        this.reCalculateTotal(data);
    }



    validatePurchaseOrder = () => {

        let isValid = true;
        let error = {};

      
        if (this.state.purchaseOrderCode === '') {
            error.purchaseOrderCode = 'is required';
            isValid = false;
        }

        if (this.state.supplierId === '') {
            error.supplierId = 'is required';
            isValid = false;
        }

        if (this.orderDate.current.value === '') {
            error.orderDate = 'is required';
            isValid = false;
        }
       
        if (this.state.purchaseOrderItems.length < 1) {
            error.productId = 'Product is empty';
            isValid = false;
        }


        this.setState({
            error: error 
        })

        return isValid;

    }


    updatePurchaseOrder = () => {

        let isValid = this.validatePurchaseOrder();

        if (isValid) {

            let purchaseOrder = {
                id: this.state.id,
                purchaseOrderCode: this.state.purchaseOrderCode,
                supplierId: this.state.supplierId,
                orderDate: this.orderDate.current.value,
                notes: this.state.notes,
                amount: this.state.subTotal,
                tax: this.state.tax,
                discount: this.state.discount,
                total: this.state.total,
                status: this.state.status,
                createdDate: this.state.createdDate,                                
                purchaseOrderItems: this.state.purchaseOrderItems
            }

            console.log(purchaseOrder);


            axios.put(config.serverUrl + '/api/purchaseorder/update', purchaseOrder).then(response=> {
                this.props.history.push('/purchase-order');
            })

        }
    }

    cancelUpdate = () => {
        this.props.history.push('/purchase-order');
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

                    <h2>Edit Purchase Order</h2>
                </div>
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">

                      <br/>
                            <form autocomplete="off">

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Purchase Order #</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="purchaseOrderCode" onChange={this.onValueChange} value={this.state.purchaseOrderCode}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.purchaseOrderCode}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Supplier Name</label>
                                    
                                    <div class="col-md-7 col-sm-12 required">
                                        
                                        <select name="supplierId" class="form-control" onChange={this.onValueChange} value={this.state.supplierId}>
                                            <option value="">Select Supplier</option>
                                            {this.state.suppliers.map(s=> 
                                                <option value={s.id}>{s.supplierName}</option>
                                            )}
                                        </select>

                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.supplierId}</span>
                                 </div>

                                
                                 <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Order Date</label>
                                    <div class="input-group date col-md-7 col-sm-12 required">
                                          <div class="input-group date" data-provide="datepicker" data-date-autoclose="true" data-date-today-highlight="true">
                                                <input type="text" class="form-control" ref={this.orderDate} value={moment(this.state.orderDate).format('MM/DD/YYYY')}/>
                                                <div class="input-group-addon">
                                                    <span class="fa fa-calendar"></span>
                                                </div>
                                           </div>
                                        </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.orderDate}</span>
                                </div>

                             
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Notes</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" 
                                        name="notes" onChange={this.onValueChange} value={this.state.notes}/>
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
                                         <p>Discount (%)</p>
                                         <input name="discountPct" type="number" class="form-control" onChange={this.onValueChange} defaultValue="0"/>
                                    </div>

                                    <div class="col-md-2 col-sm-1">
                                        <span style={errStyle}>{this.state.error.productId}</span>
                                        &nbsp;&nbsp;<a onClick={()=>this.addPurchaseOrderItems(this.state.productId)} class="btn btn-sm btn-default">
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
                                                    {this.state.purchaseOrderItems.map(pi=> 
                                                    <tr key={pi.id}>
                                                       <td width="30%">{pi.productName}</td>
                                                       <td width="10%" align="right">{pi.qty}</td>
                                                       <td width="20%" align="right">{pi.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                       <td width="10%" align="right">{pi.discountPct} %</td>
                                                       <td width="10%" align="right">{pi.taxPct} %</td>
                                                       <td width="20%" align="right">{(pi.qty * pi.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                       <td align="right">
                                                            <a onClick={()=>this.removePurchaseOrderItem(pi.id)}><i class="fa fa-trash"></i></a>

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
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelUpdate}>Cancel</a>
                                        <button type="button" onClick={this.updatePurchaseOrder} class="btn btn-success"><i class="fa fa-check icon-white"></i> Update</button>
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


export default PurchaseOrderEdit;
