
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import config from '../Shared/Config';
import moment from 'moment';


class Payment extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            salesPayments: [],
            purchasePayments: []
        }
    }


    componentDidMount() {

        this.getPurchasePayments();
        this.getSalesPayments();

        console.log("hello");

     
    }
    
    getPurchasePayments = () => {

        axios.get(config.serverUrl + '/api/purchasepayment/getall').then(response=> {
            this.setState({
                purchasePayments: response.data
            })

            
        })

    }


    getSalesPayments = () => {

        axios.get(config.serverUrl + '/api/salespayment/getall').then(response=> {
            this.setState({
                salesPayments: response.data
            })

            console.log(response.data);
            
        })
    }



    addSalesPayment = () => {
        this.props.history.push('/add-sales-payment');
    }



    
    render() {

      
        return(
          

            <div id="page-wrapper" class="gray-bg">


               <div id="deleteCustomer" class="modal fade" role="dialog">
                
                  <div class="modal-dialog">
                      
                      <div class="modal-content">

                            <div class="modal-header">
                              <h4>Delete Customer</h4>
                            </div>
                            <div class="modal-body">
                            Are you sure want to delete '{this.state.customerName}' ?
                            </div>

                            <div class="modal-footer">
                              <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                              <button class="btn btn-label btn-danger" onClick={()=>this.deleteCustomer(this.state.customerId)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                            </div>
                          
                        </div>
                    </div>
                </div>


                <div id="deleteSupplier" class="modal fade" role="dialog">
                
                  <div class="modal-dialog">
                      
                      <div class="modal-content">

                            <div class="modal-header">
                              <h4>Delete Supplier</h4>
                            </div>
                            <div class="modal-body">
                            Are you sure want to delete '{this.state.supplierName}' ?
                            </div>

                            <div class="modal-footer">
                                <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                                <button class="btn btn-label btn-danger" onClick={()=>this.deleteSupplier(this.state.supplierId)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                            </div>
                          
                        </div>
                    </div>
                </div>


                    <div class="row wrapper border-bottom white-bg page-heading">
                        <div class="col-lg-8">

                            <h2>Payments</h2>
                        </div>
                        <div class="col-lg-4">
                            <div class="title-action">

                            <div class="btn-group">
                            <button data-toggle="dropdown" class="btn btn-success dropdown-toggle" aria-expanded="false">Add New Payment</button>
                            <ul class="dropdown-menu" x-placement="bottom-start">
                                <li><a class="dropdown-item" href="#" onClick={this.addSupplier}>Purchase Payment</a></li>
                                <li><a class="dropdown-item" href="#" onClick={this.addSalesPayment}>Sales Payment</a></li>
                                   
                                </ul>
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
                                    <li><a class="nav-link active show" data-toggle="tab" href="#tab-1">Purchase Payments ({this.state.purchasePayments.length})</a></li>
                                    <li><a class="nav-link" data-toggle="tab" href="#tab-2">Sales Payments ({this.state.salesPayments.length})</a></li>
                                </ul>

                                <div class="tab-content">
                                    <div id="tab-1" class="tab-pane active show">

                           
                                         <table class="table table-hover table-striped">
                                         
                                            <thead>
                                                <th>Payment Date</th>
                                                <th>Supplier Name</th>
                                                <th>From Account</th>
                                                <th>Payment Method</th>
                                                <th>Amount</th>
                                                <th>Notes</th>
                                                <th></th>  
                                            </thead>
                                           
                                            <tbody>
                                               {this.state.purchasePayments.map(pp=> 
                                                <tr>
                                                    <td>{moment(pp.paymentDate).format('MM/DD/YYYY')}</td>
                                                    <td>{pp.supplierName}</td>
                                                    <td>{pp.accountName}</td>
                                                    <td>{pp.paymentMethod}</td>
                                                    <td>{pp.totalAmountPaid}</td>
                                                    <td></td>
                                                    <td>
                                                        <a><i class="fa fa-edit"></i></a>
                                                        &nbsp;&nbsp;
                                                        <a data-toggle="modal" data-target="#deleteCustomer"><i class="fa fa-trash"></i></a>
                                                    </td>
                                                
                                                </tr>
                                                )}
                                            
                                          
                                            </tbody>
                                        </table>


                                    </div>
                                
                                    <div id="tab-2" class="tab-pane show">

                                    <table class="table table-hover table-striped">
                                           
                                            <thead>
                                                <th>Payment Date</th>
                                                <th>Customer Name</th>
                                                <th>To Account</th>
                                                <th>Payment Method</th>
                                                <th>Amount</th>
                                                <th>Notes</th>
                                                <th></th>  
                                            </thead>
                                           
                                           
                                            <tbody>
                                               {this.state.salesPayments.map(sp=> 
                                                <tr>
                                                    <td>{moment(sp.paymentDate).format('MM/DD/YYYY')}</td>
                                                    <td>{sp.customerName}</td>
                                                    <td>{sp.accountName}</td>
                                                    <td>{sp.paymentMethod}</td>
                                                    <td>{sp.totalAmountPaid}</td>
                                                    <td></td>
                                                    <td>
                                                        <a><i class="fa fa-edit"></i></a>
                                                        &nbsp;&nbsp;
                                                        <a data-toggle="modal" data-target="#deleteCustomer"><i class="fa fa-trash"></i></a>
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



        )
    }


}

export default Payment;
