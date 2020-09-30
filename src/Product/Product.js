
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import {Link} from 'react-router-dom';
import config from '../Shared/Config';
import Header from '../Shared/Header';
import NavBar from '../Shared/NavBar';


class Product extends Component
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


    searchProducts = (search)=> {
        axios.get(config.serverUrl + '/api/product/getbysearch/' + search).then(response=> {
            this.setState({
                products: response.data,
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


    deleteProduct = (id) => {
        axios.delete(config.serverUrl + '/api/product/delete/' + id).then(response=> {
            this.getProducts();
        })
    }



    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        this.filterProduct(e);
    }

    onDeleteProduct = (productId, productName) => {
        this.setState({
            productId: productId,
            productName: productName
        })
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


    /*
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
    */


    addCategory = () => {
        this.props.history.push('/add-product-category');
    }


    addUnit = () => {
        this.props.history.push('/add-unit');
    }


    onSearchChanged = (e) => {

        if (e.key === 'Enter') {
            if (e.target.value === '') 
            {
                this.getProducts();   
            } 
            else 
            {
                this.searchProducts(e.target.value.toLowerCase());
            }
        }
       
    }


  

    render() {

     
        return(

            <div>

                <Header/>
                <NavBar/>

            
                <div id="page-wrapper" class="gray-bg">


                <div id="deleteProduct" class="modal fade" role="dialog">
                
                <div class="modal-dialog">
                    
                    <div class="modal-content">

                            <div class="modal-header">
                            <h4>Delete Product</h4>
                            </div>
                            <div class="modal-body">
                            Are you sure want to delete '{this.state.productName}' ?
                            </div>

                            <div class="modal-footer">
                            <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                            <button class="btn btn-label btn-danger" onClick={()=>this.deleteProduct(this.state.productId)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                            </div>
                        
                        </div>
                    </div>
                </div>


                    <div class="row wrapper border-bottom white-bg page-heading">
                        <div class="col-lg-6">
                            <h2>Products ({this.state.products.length})</h2>
                        </div>
                        <div class="col-lg-6">
                            <div class="title-action">

                            <div class="btn-group">

                                    <input type="text" class="form-control" placeholder="Search" onKeyPress={this.onSearchChanged}/>
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
                                    <li><a class="dropdown-item" onClick={this.addUnit}>Add Unit</a></li>
                                    </ul>
                                    &nbsp;
                            
                                    <Link to="/add-product" class="btn btn-success">Add New Product </Link>
                            </div>

                            </div>
                        </div>
                    </div>

                <br/>

                <div class="row">
                    <div class="col-lg-12">

                        <div class="ibox">

                            <div class="ibox-content">

                                <ul class="nav nav-tabs">
                                    <li><a class="nav-link active show" data-toggle="tab" href="#tab-1">Products</a></li>
                                </ul>

                                <div class="tab-content">
                                    <div id="tab-1" class="tab-pane active show">

                                        <table class="table table-hover table-striped">
                                        
                                            <thead>
                                                <th>Product Code</th>
                                                <th>Product Name</th>
                                                <th>Category</th>
                                                <th>Purchase Price</th>
                                                <th>Sale Price</th>
                                                <th>Stock</th>
                                                <th>Unit</th>
                                                <th></th>
                                                <th></th>
                                            </thead>
                                            <tbody>
                                                                                        
                                            {this.state.products.map(p=> 
                                                
                                                <tr key={p.id}>
                                                    <td>{p.productCode}</td>
                                                    <td>{p.productName}</td>
                                                    <td>{p.category.categoryName}</td>
                                                    <td>{p.purchasePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                    <td>{p.salePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                    <td>{p.stock}</td>
                                                    <td>{p.unit.unitName}</td>
                                                    <td align="middle">
                                                        {p.isDiscontinued===true? 
                                                            <span class="label label-danger">Discontinued</span>
                                                        : null
                                                        }
                                                    </td>                                                  
                                                    <td align="right">
                                                        <a onClick={()=>this.editProduct(p.id)}><i class="fa fa-edit"></i></a>
                                                        &nbsp;&nbsp;
                                                        <a data-toggle="modal" data-target="#deleteProduct" onClick={()=>this.onDeleteProduct(p.id,p.productName)}>
                                                            <i class="fa fa-trash"></i></a>
                                                    </td>
                                                </tr>
                                                
                                            )}
                                            

                                            </tbody>
                                        </table>

                                    </div>
                                
                                
                                
                                
                                </div>




                            </div>
                            


                        </div>

                    
                    </div>
                    
                    
                </div>

                
                <Footer/>

        </div>

     </div>
            
            
        )
    }



}

export default Product;
