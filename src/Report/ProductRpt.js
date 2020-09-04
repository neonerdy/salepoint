
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import {Link} from 'react-router-dom';
import config from '../Shared/Config';


class ProductRpt extends Component
{
   
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            initialProducts: [],
            products: [],
            productId: '',
            productName: ''
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



    render() {

     
        return(
     
            <div id="page-wrapper" class="gray-bg">


                 <div class="row wrapper border-bottom white-bg page-heading">
                     <div class="col-lg-4">
                         <h2>Reports</h2>
                         <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                Product
                            </li>    
                            <li class="breadcrumb-item">
                                 All
                            </li>                        
                        </ol>
                        

                     </div>
                     <div class="col-lg-8">
                         <div class="title-action">

                         <div class="btn-group">

                                <select class="form-control" onChange={this.onValueChange}>
                                    <option value="">Select Product Category</option>
                                    {this.state.categories.map(c=> 
                                        <option value={c.id}>{c.categoryName}</option>    
                                    )}
                                </select>
                                &nbsp;
                                <button class="btn btn-default"><i class="fa fa-filter"></i></button>
                                &nbsp;&nbsp;&nbsp;

                                <button data-toggle="dropdown" class="btn btn-default dropdown-toggle" aria-expanded="false">
                                    <i class="fa fa-archive"></i></button>
                                <ul class="dropdown-menu" x-placement="bottom-start">
                                   <li><a class="dropdown-item" >Employee</a></li>
                                   <li><a class="dropdown-item" >Product</a></li>
                                   <li><a class="dropdown-item" >Customer</a></li>
                                   <li><a class="dropdown-item" >Supplier</a></li>
                                   <li><a class="dropdown-item" >Point of Sale</a></li>
                                   <li><a class="dropdown-item" >Sales Invoice</a></li>
                                   <li><a class="dropdown-item" >Purchase Invoice</a></li>
                                   <li><a class="dropdown-item" >Expense</a></li>
                                   
                             
                                </ul>
                                &nbsp;
                        
                         </div>

                         </div>
                     </div>
                 </div>


                 

             <br/>

      
             
             <Footer/>

     </div>
 
            
            
        )
    }



}

export default ProductRpt;
