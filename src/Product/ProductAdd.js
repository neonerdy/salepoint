
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import config from '../Shared/Config';
import axios from 'axios';

import Switch from 'react-switchery-component';
import 'react-switchery-component/react-switchery-component.css';


class ProductAdd extends Component
{
    constructor(props) {
        
        super(props);

        this.state = {
            error: {},
            categories: [],
            productCode: '',
            productName: '',
            categoryId: '',
            brand: '',
            model: '',
            purchasePrice: '',
            salePrice: '',
            stock: '',
            unit: '',
            description: '',
            isTrackingStock: true,
            isDiscontinued: false
        }
    }


    componentDidMount() {
        this.getCategories();
    }

    
    getCategories = () => {
        
        axios.get(config.serverUrl + '/api/productcategory/getall').then(response=> {
            this.setState({
                categories: response.data
            })
        })
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onTrackingStockChange = (e) =>  {
        this.setState({isTrackingStock: e.target.checked})
   
    }

    onDiscontinuedChanged = (e) => {
        this.setState({isDiscontinued: e.target.checked})
    }

    

    validateProduct = () => {

        let isValid = true;
        let error = {};

        if (this.state.productCode === '') {
            error.productCode = 'is required';
            isValid = false;
        }
      
        if (this.state.productName === '') {
            error.productName = 'is required';
            isValid = false;
        }

        
        if (this.state.categoryId === '') {
            error.categoryId = 'is required';
            isValid = false;
        }

        if (this.state.purchasePrice === '') {
            error.purchasePrice = 'is required';
            isValid = false;
        }

        if (this.state.salePrice === '') {
            error.salePrice = 'is required';
            isValid = false;
        }

        if (this.state.stock === '') {
            error.stock = 'is required';
            isValid = false;
        }

        if (this.state.unit === '') {
            error.unit = 'is required';
            isValid = false;
        }

        this.setState({
            error: error 
        })

        return isValid;

    }

    
    saveProduct = () => {

       
       let isValid = this.validateProduct();

        if (isValid) {

            let product = {
                productCode: this.state.productCode,
                productName: this.state.productName,
                categoryId: this.state.categoryId,
                brand: this.state.brand,
                model: this.state.model,
                purchasePrice: this.state.purchasePrice,
                salePrice: this.state.salePrice,
                stock: this.state.stock,
                unit: this.state.unit,
                description: this.state.description,
                isTrackingStock: this.state.isTrackingStock,
                isDiscontinued: this.state.isDiscontinued
            }

            axios.post(config.serverUrl + '/api/product/save', product).then(response=> {
                this.props.history.push('/product');
            })

        }
    
    }



    cancelAdd = () => {
        this.props.history.push('/product');
    }



    render() {


        let errStyle = {
            color: 'darkred'
        }

        return(
            <div id="page-wrapper" class="gray-bg">
                
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">

                    <h2>Add Product </h2>
                </div>
            </div>

             <br/>


        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">

                      <br/>
                            <form>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Product Code</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="productCode" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.productCode}</span>
                                </div>
                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Product Name</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="productName" onChange={this.onValueChange}/>
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.productName}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Category</label>
                                    
                                    <div class="col-md-7 col-sm-12 required">
                                        <select class="form-control" name="categoryId" onChange={this.onValueChange}>
                                            <option value="">Select Category</option>
                                            {this.state.categories.map(c=> 
                                                <option value={c.id} key={c.id}>{c.categoryName}</option>
                                            )}
                                        </select>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.categoryId}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Brand</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" name="brand" onChange={this.onValueChange}/></div>
                                </div>
                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Model</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" name="model" onChange={this.onValueChange}/></div>
                                </div>
                                
                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Purchase Price</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="number" class="form-control" 
                                        name="purchasePrice" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.purchasePrice}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Sale Price</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="number" class="form-control" 
                                        name="salePrice" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.salePrice}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Stock</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="number" class="form-control" 
                                        name="stock" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.stock}</span>
                                </div>
                                 
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Unit</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="unit" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.unit}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Description</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" name="description" onChange={this.onValueChange}/></div>
                                </div>
                               
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Stock Tracking</label>
                                    <div class="col-md-7 col-sm-12">

                                    <Switch
                                        color="#1ab394"
                                        checked={this.state.isTrackingStock}
                                        onChange={this.onTrackingStockChange} />
                                    </div>

                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Discontinued</label>
                                    <div class="col-md-7 col-sm-12">

                                    <Switch
                                        color="#1ab394"
                                        checked={this.state.isDiscontinued}
                                        onChange={this.onDiscontinuedChanged} />
                                    </div>

                                </div>


                             
                                <br/>

                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>
                                        <button type="button" onClick={this.saveProduct} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
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

export default ProductAdd;



