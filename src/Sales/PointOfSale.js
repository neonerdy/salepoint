
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import config from '../Shared/Config';
import moment from 'moment';
import { Link } from 'react-router-dom';


class PointOfSale extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            initialSales: [],
            company: {},
            id: '',
            salesCode: '',
            salesDate: '',
            customerName: '',
            customerAddress: '',
            customerCity: '',
            customerPhone: '',
            salesItems: [],
            subTotal: 0,
            tax: 0,
            discount: 0,
            total: 0,
            status: ''
        }
        
    }

    componentDidMount() {
   
        window.scrollTo(0, 0);

        this.getCompanyById('E8DC5367-D553-4232-E621-08D84993E0DB');
        this.getSalesWithTopOne();
    }



    getCompanyById = (id) => {
       
        axios.get(config.serverUrl + '/api/company/getById/' + id).then(response=> {
            this.setState({
                company: response.data
            })
        })
    }


    getTopSales = () => {
        
        if (this.state.sales.length > 0) {
            this.getSalesDetail(this.state.sales[0].id);
        }
    }

    getSalesWithTopOne = () => {

        axios.get(config.serverUrl + '/api/pointofsale/getall').then(response=> {
            this.setState({
                sales: response.data,
                initialSales: response.data
            })

            this.getTopSales();
        })
    }



    getSales = () => {

        axios.get(config.serverUrl + '/api/pointofsale/getall').then(response=> {
            this.setState({
                sales: response.data,
                initialSales: response.data
            })

        })
    }

    
    getSalesDetail = (id) => {

        axios.get(config.serverUrl + '/api/pointofsale/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                salesCode: response.data.salesCode,
                salesDate: response.data.salesDate,
                customerName: response.data.customerName,
                customerAddress: response.data.customerAddress,
                customerCity: response.data.customerCity,
                customerPhone: response.data.customerPhone,
                cashierName: response.data.cashierName,
                subTotal: response.data.amount,
                tax: response.data.tax,
                discount: response.data.discount,
                total: response.data.total,
                status: response.data.status,
                salesItems: response.data.saleItems,
            })

        
        })


    }



    editSales = (id) => {
        this.props.history.push('/edit-pos/' + id);
    }


    deleteSales = (id) => {

        axios.delete(config.serverUrl + '/api/pointofsale/delete/' + id).then(response=> {
            this.getSalesWithTopOne();
        })
    }



    updateStatus = (id, status) => {

        axios.get(config.serverUrl + '/api/pointofsale/updatestatus/' + id + '/' + status).then(response=> {
            this.getSales();
            this.getSalesDetail(id);
        })
    }


    renderStatus = (status) => {

        if (status ==='Paid') {
            return(
               <span class="label float-right label-primary">{status.toUpperCase()}</span> 
            )
        } else if (status === 'Canceled') {
            return(
                <span class="label float-right label-danger">{status.toUpperCase()}</span> 
            )
        }
    }


    renderMenu = (status) => {

       
       if (status == 'Paid') {
            return(
                <ul class="dropdown-menu dropdown-user">
                    <li><a onClick={()=>this.updateStatus(this.state.id,'Canceled')} class="dropdown-item">Cancel Sale</a></li>
                </ul>
              
             )
        }
        else if (status == 'Canceled') {
            return(
                <ul class="dropdown-menu dropdown-user">
                    <li><a data-toggle="modal" data-target="#deleteSales" class="dropdown-item">Delete</a></li>
                </ul>
             )
        }


    }



    onSearchSales = (e) => {


        let x = e.target.value.toLowerCase();
      
        let filteredSales = this.state.initialSales.filter(so => 
            so.salesCode.toLowerCase().includes(x) ||
            so.customerName.toLowerCase().includes(x) ||
            so.status.toLowerCase().includes(x)
         );
            
        
        if (e.target.value === '') {
            this.setState( {
                sales: this.state.initialSales
            })
        }
        else {
            this.setState( {
                sales: filteredSales
            })
    
        }
    }




    render() {

        let color='';
        
        if (this.state.status === 'Paid') {
            color = '#1ab394';
        } else if (this.state.status === 'Canceled') {
            color = '#ed5565';
        }

        let paperBorderStyle = {
            borderColor: color
        }
        

        return(
       
                <div id="page-wrapper" class="gray-bg">

                     {/* DELETE */}

                     <div id="deleteSales" class="modal fade" role="dialog">
                            
                            <div class="modal-dialog">
                                
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h4>Delete Sales</h4>
                                    </div>
                                    <div class="modal-body">
                                    Are you sure want to delete '{this.state.salesCode}' ?
                                    </div>

                                    <div class="modal-footer">
                                        <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                                        <button class="btn btn-label btn-danger" onClick={()=>this.deleteSales(this.state.id)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                   
                        <div class="row wrapper border-bottom white-bg page-heading">
                            <div class="col-lg-4">
                                <h2>Point of Sale ({this.state.sales.length})</h2>
                            
                            </div>
                            <div class="col-lg-8">
                                <div class="title-action">
                                <div class="btn-group">
                                
                                 <select name="salesMonth" class="form-control" onChange={this.onMonthChange}> 
                                        <option value="">Month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                    &nbsp;
                                    <select name="salesYear" class="form-control"> 
                                        <option value="">Year</option>
                                        <option value="2019">2019</option>
                                        <option value="2020">2020</option>
                                    </select>

                                    &nbsp;&nbsp;
                                    <button class="btn btn-default"><i class="fa fa-filter"></i></button>
                                    <button class="btn btn-default"><i class="fa fa-print"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                
                                </div>

                                     &nbsp;&nbsp;
                                    <Link to="/add-pos" class="btn btn-success">Add New Sale</Link>

                                </div>
                            </div>
                            
                        </div>

                        <div class="fh-breadcrumb">

                         <div class="fh-column">
                            
                            <Scrollbars  style={{ width: 240, height: 800 }}>
                                
                            <div>

                                <ul class="list-group elements-list">
                                    <input type="text" class="form-control" onChange={this.onSearchSales}/>
                                    
                                    {this.state.sales.map(s=> 
                                    
                                        <li key={s.id} class="list-group-item">
                                            <a class="nav-link" onClick={()=>this.getSalesDetail(s.id)}>
                                                <small class="float-right text-muted"><i class="fa fa-clock"></i>{moment(s.salesDate).format('MM/DD/YYYY')}</small>
                                                <strong>{s.salesCode}</strong>
                                                <div class="small m-t-xs">
                                                    <p class="m-b-none">
                                                    {this.renderStatus(s.status)}
                                                    Total : {s.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                                    </p>
                                                </div>
                                            </a>
                                        </li>
                                        
                                    )}


                                </ul>

                            </div>

                            </Scrollbars>


                          </div>



                <div>

                    <br/>

                       <div class="row">

                            <div class="btn-group">
                                <div class="col-lg-8">
                                       
                                </div>
                            </div>

                            <div class="col-lg-4">
                                

                            </div>

                        </div>
                        
                        <Scrollbars  style={{ width: 1010, height: 800 }} autoHide
                        >
                                     
                 <div class="col-lg-12">
                <div class="wrapper wrapper-content animated fadeInRight">
                    
                <div class="ibox-title" style={paperBorderStyle}>
                    <h5>{this.state.status.toUpperCase()}</h5>
                    <div class="ibox-tools">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-ellipsis-h"></i></a>
                            {this.renderMenu(this.state.status)}
                    </div>                          
                </div>


                    <div class="ibox-content p-xl">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h5>From:</h5>
                                    <address>
                                        <strong>{this.state.company.companyName}</strong><br/>
                                        {this.state.company.address} <br/>
                                        {this.state.company.city} <br/>
                                        {this.state.company.phone}
                                    </address>
                                </div>

                                <div class="col-sm-6 text-right">
                                    <h4>Sale No : </h4>
                                    <h4 class="text-navy">{this.state.salesCode}</h4>
                                    <span>To:</span>
                                    <address>
                                        <strong>{this.state.customerName}</strong><br/>
                                        {this.state.customerAddress} <br/>
                                        {this.state.customerCity} <br/>
                                        {this.state.customerPhone}
                                    </address>
                                    <p>
                                        <span><strong>Sale Date :</strong> {moment(this.state.salesDate).format('YYYY/MM/DD')}</span><br/>
                                    </p>
                                </div>
                            </div>

                            <div class="table-responsive m-t">
                                <table class="table invoice-table">
                                    <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Discount</th>
                                        <th>Tax</th>
                                        <th>Total Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.salesItems.map(si=> 
                                    <tr key={si.id}>
                                        <td>{si.productName}</td>
                                        <td>{si.qty}</td>
                                        <td>{si.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td>{si.discountPct} %</td>
                                        <td>{si.taxPct} %</td>
                                        <td>{(si.qty * si.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>

                            <table class="table invoice-total">
                                <tbody>
                                <tr>
                                    <td><strong>Sub Total :</strong></td>
                                    <td>{this.state.subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                                <tr>
                                    <td><strong>Tax :</strong></td>
                                    <td>{this.state.tax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                                <tr>
                                    <td><strong>Discount :</strong></td>
                                    <td>{this.state.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                                <tr>
                                    <td><strong>Total :</strong></td>
                                    <td>{this.state.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                                </tbody>
                            </table>
                            
                        </div>
                </div>
            </div>



                               
                     </Scrollbars>


                    
                  
                    
                </div>
               
               


            </div>

                

             <Footer/>
                
                
           </div>

        )
    }


}


export default PointOfSale;
