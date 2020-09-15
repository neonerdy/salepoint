
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
            company: {},
            categoryName: 'All',
            categories: [],
            initialProducts: [],
            products: [],
            productId: '',
            productName: ''
        }
    }


    componentDidMount() {
        
        window.scrollTo(0, 0);

        this.getCompanyById('E8DC5367-D553-4232-E621-08D84993E0DB');
        this.getCategories();
        this.getProducts();


    }


    getCompanyById = (id) => {
       
        axios.get(config.serverUrl + '/api/company/getById/' + id).then(response=> {
            this.setState({
                company: response.data
            })

        })
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


    getCategoryById = (id) => {
        axios.get(config.serverUrl + '/api/productcategory/getbyid/' + id).then(response=> {
            this.setState({
                categoryName: response.data.categoryName
            })
        })
    }

    
    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

        this.filterProduct(e);

        if (e.target.value != '') {
            this.getCategoryById(e.target.value.toLowerCase());
        }else {
            this.setState({
                categoryName: 'All'
            })
        }
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


    showEmployee = () => {
        this.props.history.push('/employee-rpt');
    }



    render() {

     
        return(
     
            <div id="page-wrapper" class="gray-bg">


                 <div class="row wrapper border-bottom white-bg page-heading">
                     <div class="col-lg-8">
                         <h2>Reports</h2>
                         <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                Product
                            </li>    
                            <li class="breadcrumb-item">
                                 {this.state.categoryName}
                            </li>                        
                        </ol>
                        

                     </div>
                     <div class="col-lg-4">
                         <div class="title-action">

                         <div class="btn-group">

                                <select class="form-control" onChange={this.onValueChange}>
                                    <option value="">Product Category</option>
                                    {this.state.categories.map(c=> 
                                        <option value={c.id}>{c.categoryName}</option>    
                                    )}
                                </select>
                                &nbsp;
                                <button class="btn btn-default"><i class="fa fa-filter"></i></button>
                                <button class="btn btn-default"><i class="fa fa-print"></i></button>
                                &nbsp;&nbsp;&nbsp;


                                <button data-toggle="dropdown" class="btn btn-success dropdown-toggle" aria-expanded="false"><i class="fa fa-archive"></i></button>
                                <ul class="dropdown-menu" x-placement="bottom-start">
                                    <li><Link to="/employee-rpt" class="dropdown-item">Employee</Link></li>
                                    <li><Link to="/product-rpt" class="dropdown-item">Product</Link></li>
                                    <li><Link to="/customer-rpt" class="dropdown-item">Customer</Link></li>
                                    <li><Link to="/supplier-rpt" class="dropdown-item">Supplier</Link></li>
                                    <li><Link to="/pos-rpt" class="dropdown-item">Point of Sale</Link></li>
                                    <li><Link to="/sales-invoice-rpt" class="dropdown-item">Sales Invoice</Link></li>
                                    <li><Link to="/purchase-invoice-rpt" class="dropdown-item">Purchase Invoice</Link></li>
                                    <li><Link to="/expense-rpt" class="dropdown-item">Expense</Link></li>
                                </ul>
                                &nbsp;
                        
                         </div>

                         </div>
                     </div>
                 </div>

                 <div class="wrapper wrapper-content animated fadeInRight">

            <div class="row">
            <div class="col-lg-12">

                    <div class="ibox-content p-xl">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h2>Products ({this.state.products.length})</h2>
                                    <span class="label label-primary">{this.state.categoryName}</span>
                                 </div>

                                <div class="col-sm-6 text-right">
                                   
                                    <address>
                                        <strong>{this.state.company.companyName}</strong><br/>
                                        {this.state.company.address}<br/>
                                        {this.state.company.city}<br/>
                                        <abbr title="Phone"></abbr> {this.state.company.phone}
                                    </address>
                                    
                                </div>
                            </div>

                            <div>
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Product Code</th>
                                        <th>Category</th>
                                        <th>Purchase Price</th>
                                        <th>Sale Price</th>
                                        <th>Stock</th>
                                        <th>Unit</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {this.state.products.map(p=> 
                                            
                                            <tr key={p.id}>
                                                 <td>{p.productName}</td>
                                                 <td>{p.productCode}</td>
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
                                                                                           </tr>
                                            
                                         )} 
                               
                                    </tbody>
                                </table>
                            </div>

                          

                        
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
