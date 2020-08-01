
import React, {Component} from 'react';

import Footer from '../Shared/Footer';
import Product from './Product';
import axios from 'axios';
import {Link} from 'react-router-dom';
import config from '../Shared/Config';


class ProductList extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            initialProducts: [],
            products: []
        }
    }


    componentDidMount() {
        
        this.getCategories();
        this.getProducts();


    }


    getProducts = () => {

        axios.get(config.serverUrl + '/api/product/getall').then(response=> {
            this.setState({
                initialProducts: response.data,
                products: response.data
            })
            
        })

    }


    getCategories = () => {
        axios.get(config.serverUrl + '/api/productcategory/getall').then(response=> {
            this.setState({
                categories: response.data
            })
        })
    }

    
    editProduct = (id) => {
        this.props.history.push('/edit-product/' + id);
    }



    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        this.filterProduct(e);
    }




    filterProduct = (e) => {

        let filteredProduct = this.state.initialProducts.filter(p => p.categoryId == e.target.value.toLowerCase());
            
        if (e.target.value === '') {
            this.setState( {
                products: this.state.initialProducts
            })
        }
        else {
            this.setState( {
                products: filteredProduct
            })
    
        }
    }


    searchProduct = (e) => {


        let filteredProduct = this.state.initialProducts.filter(p => p.productName.toLowerCase().includes(e.target.value.toLowerCase()));
            
        if (e.target.value === '') {
            this.setState( {
                products: this.state.initialProducts
            })
        }
        else {
            this.setState( {
                products: filteredProduct
            })
    
        }
    }


    addCategory = () => {
        this.props.history.push('/add-product-category');
    }



    
    render() {


      
        return(

            <div id="page-wrapper" class="gray-bg">
                
                    <div class="row wrapper border-bottom white-bg page-heading">
                        <div class="col-lg-4">
                            <h2>Products ({this.state.products.length})</h2>
                        
                        </div>

                      

                        <div class="col-lg-8">
                            <div class="title-action">
                           
                                    <div class="btn-group">

                                        <input type="text" class="form-control" placeholder="Search" onChange={this.searchProduct}/>
                                        &nbsp;&nbsp;&nbsp;

                                        <select class="form-control" onChange={this.onValueChange}>
                                            <option value="">Select Category</option>
                                            {this.state.categories.map(c=> 
                                                <option value={c.id}>{c.categoryName}</option>    
                                            )}
                                        </select>

                                      &nbsp;

                                      <button data-toggle="dropdown" class="btn btn-default dropdown-toggle" aria-expanded="false"><i class="fa fa-bookmark-o"></i>+</button>
                                <ul class="dropdown-menu" x-placement="bottom-start">
                                    <li><a class="dropdown-item" onClick={this.addCategory}>Add Category</a></li>
                                    <li><a class="dropdown-item" href="#">Stock Transfer</a></li>
                                </ul>
                                &nbsp;

                                <Link to="/add-product" class="btn btn-success">Add New Product</Link> 
                              
                             


                               </div>
                                    
                                

                            </div>
                          
                        </div>
                    </div>



                <div class="row">
                  
                  
                    <div class="col-lg-12">
                        <div class="wrapper wrapper-content animated fadeInRight">
                        
                        <div class="row">
                                       
                            {this.state.products.map(p=> 

                                <Product id = {p.id} 
                                    productName = {p.productName}
                                    picture = {p.picture} 
                                    price = {p.salePrice}
                                    stock = {p.stock} 
                                    categoryName = {p.category.categoryName}
                                    editProduct = {()=>this.editProduct(p.id)}
                                />
                            )}

                     
                        </div>
                        

                        </div>
                    </div>
                </div>

                
                <Footer/>

        </div>


        )
    }

}

export default ProductList;