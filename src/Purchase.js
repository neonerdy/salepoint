
import React, {Component} from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import Header from './Header';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import config from './Config';
import moment from 'moment';


class Purchase extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            purchases: [],
            initialPurchases: [],
            id: '',
            purchaseCode: '',
            purchaseDate: '',
            supplierInvoice: '',
            supplierName: '',
            supplierAddress: '',
            supplierCity: '',
            supplierPhone: '',
            purchaseItems: [],
            subTotal: 0,
            tax: 0,
            serviceCharge: 0,
            total: 0,
            status: ''
        }
        
    }

    componentDidMount() {
   
        window.scrollTo(0, 0);
        this.getPurchaseWithTopOne();
    }


    getTopPurchases = () => {
        
        if (this.state.purchases.length > 0) {
            this.getPurchaseDetail(this.state.purchases[0].id);
        }
    }

    getPurchaseWithTopOne = () => {

        axios.get(config.serverUrl + '/api/purchase/getall').then(response=> {
            this.setState({
                purchases: response.data,
                initialPurchases: response.data
            })

            this.getTopPurchases();
        })
    }



    getPurchases = () => {

        axios.get(config.serverUrl + '/api/purchase/getall').then(response=> {
            this.setState({
                purchases: response.data,
                initialPurchases: response.data
            })

        })
    }

    
    getPurchaseDetail = (id) => {

        axios.get(config.serverUrl + '/api/purchase/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                purchaseCode: response.data.purchaseCode,
                supplierInvoice: response.data.supplierInvoice,
                purchaseDate: response.data.purchaseDate,
                supplierName: response.data.supplierName,
                supplierAddress: response.data.supplierAddress,
                supplierCity: response.data.supplierCity,
                supplierPhone: response.data.supplierPhone,
                purchaseItems: response.data.purchaseItems,
                subTotal: response.data.amount,
                tax: response.data.tax,
                serviceCharge: response.data.serviceCharge,
                total: response.data.total,
                status: response.data.status
            })

        
        })


    }



    addPurchase = () => {
        this.props.history.push('/add-purchase');
    }

    
    editPurchase = (id) => {
        this.props.history.push('/edit-purchase/' + id);
    }


    deletePurchase = (id) => {

        axios.delete(config.serverUrl + '/api/purchase/delete/' + id).then(response=> {
            this.getPurchaseWithTopOne();
        })
    }



    updateStatus = (id, status) => {

        axios.get(config.serverUrl + '/api/purchase/updatestatus/' + id + '/' + status).then(response=> {
            this.getPurchases();
            this.getPurchaseDetail(id);
        })
    }


    renderStatus = (status) => {

        if (status ==='New') {
            return(
               <span class="label float-right label-primary">{status.toUpperCase()}</span> 
            )
        } else if (status === 'Paid') {
            return(
                <span class="label float-right label-warning">{status.toUpperCase()}</span> 
             )
        } else if (status === 'Canceled') {
            return(
                <span class="label float-right label-danger">{status.toUpperCase()}</span> 
            )
        }
    }


    onSearchPurchase = (e) => {


        let x = e.target.value.toLowerCase();
      
        let filteredPurchase = this.state.initialPurchases.filter(p => 
            p.purchaseCode.toLowerCase().includes(x) ||
            p.supplierName.toLowerCase().includes(x) ||
            p.status.toLowerCase().includes(x)
         );
            
        
        if (e.target.value === '') {
            this.setState( {
                purchases: this.state.initialPurchases
            })
        }
        else {
            this.setState( {
                purchases: filteredPurchase
            })
    
        }
    }




    render() {

        let color='';
        
        if (this.state.status === 'New') {
            color = '#1ab394';
        } else if (this.state.status === 'Paid') {
            color = '#f8ac59';
        } else if (this.state.status === 'Canceled') {
            color = '#ed5565';
        }

        let invBorderStyle = {
            borderColor: color
        }
        

        return(
       
                <div id="page-wrapper" class="gray-bg">

                     {/* DELETE */}

                     <div id="deletePurchase" class="modal fade" role="dialog">
                            
                            <div class="modal-dialog">
                                
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h4>Delete Purchase</h4>
                                    </div>
                                    <div class="modal-body">
                                    Are you sure want to delete '{this.state.purchaseCode}' ?
                                    </div>

                                    <div class="modal-footer">
                                        <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                                        <button class="btn btn-label btn-danger" onClick={()=>this.deletePurchase(this.state.id)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>



                    
                        <div class="row wrapper border-bottom white-bg page-heading">
                            <div class="col-lg-8">
                                <h2>Purchases ({this.state.purchases.length})</h2>
                            
                            </div>
                            <div class="col-lg-4">
                                <div class="title-action">
                                <div class="btn-group">
                                
                                <select name="expenseMonth" class="form-control" onChange={this.onMonthChange}> 
                                        <option value="">Select Month</option>
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
                                    &nbsp;&nbsp;
                                    <button class="btn btn-default"><i class="fa fa-filter"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                
                                </div>


                                   &nbsp;&nbsp;
                                    <a href="#" onClick={this.addPurchase} class="btn btn-success">Add New Purchase</a>
                                </div>
                            </div>
                            
                        </div>

                        <div class="fh-breadcrumb">

                <div class="fh-column">
                    
                <Scrollbars  style={{ width: 240, height: 800 }}>
                    
                <div>

                    <ul class="list-group elements-list">
                        <input type="text" class="form-control" onChange={this.onSearchPurchase}/>
                        
                        {this.state.purchases.map(p=> 
                        
                            <li key={p.id} class="list-group-item">
                                <a class="nav-link" onClick={()=>this.getPurchaseDetail(p.id)}>
                                    <small class="float-right text-muted"><i class="fa fa-clock"></i>{moment(p.purchaseDate).format('MM/DD/YYYY')}</small>
                                    <strong>{p.purchaseCode}</strong>
                                    <div class="small m-t-xs">
                                        {p.supplierName}
                                        <p class="m-b-none">
                                        {this.renderStatus(p.status)}
                                        Total : {p.total}
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
                    
                <div class="ibox-title" style={invBorderStyle}>
                    <h5>{this.state.status.toUpperCase()}</h5>
                    <div class="ibox-tools">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-ellipsis-h"></i></a>
                            <ul class="dropdown-menu dropdown-user">
                                <li><a onClick={()=>this.editPurchase(this.state.id)} class="dropdown-item">Edit</a></li>
                                <li><a data-toggle="modal" data-target="#deletePurchase" class="dropdown-item">Delete</a></li>
                                <li><a onClick={()=>this.updateStatus(this.state.id,'Paid')} class="dropdown-item">Changed to Paid</a></li>
                                <li><a onClick={()=>this.updateStatus(this.state.id,'Canceled')} class="dropdown-item">Changed to Canceled</a></li>
                            </ul>
                    </div>                          
                </div>


                    <div class="ibox-content p-xl">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h5>From:</h5>
                                    <address>
                                        <strong>{this.state.supplierName}</strong><br/>
                                        {this.state.supplierAddress} <br/>
                                        {this.state.supplierCity} <br/>
                                        {this.state.supplierPhone}
                                    </address>
                                </div>

                                <div class="col-sm-6 text-right">
                                    <h4>Purchase No: </h4>
                                    <h4 class="text-navy">{this.state.purchaseCode}</h4>
                                    <h4>Supplier Invoice No: </h4>
                                    <h4 class="text-navy">{this.state.supplierInvoice}</h4>
                                   

                                    <span>To:</span>
                                    <address>
                                        <strong>Wayne Enterprise, Inc.</strong><br/>
                                        112 Street Avenu, 1080<br/>
                                        Gotham City, 445611<br/>
                                        (120) 9000-4321
                                    </address>
                                    <p>
                                        <span><strong>Purchase Date :</strong> {moment(this.state.purchaseDate).format('YYYY/MM/DD')}</span><br/>
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
                                        <th>Total Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.purchaseItems.map(pi=> 
                                    <tr key={pi.id}>
                                        <td>{pi.productName}</td>
                                        <td>{pi.qty}</td>
                                        <td>{pi.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td>{(pi.qty * pi.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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
                                    <td><strong>Service Charge :</strong></td>
                                    <td>{this.state.serviceCharge.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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


export default Purchase;