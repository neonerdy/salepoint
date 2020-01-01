
import React, {Component} from 'react';
import Footer from './Footer';
import axios from 'axios';
import config from './Config';


class Partner extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            suppliers: [],
            customerId: '',
            customerName: '',
            supplierId: '',
            supplierName: ''
        }
    }


    componentDidMount() {
        this.getCustomers();
        this.getSuppliers();
    }


    getCustomers = () => {
        axios.get(config.serverUrl + '/api/customer/getall').then(response=> {
            this.setState({
                customers: response.data
            })
        })
    }


    getSuppliers = () => {
        axios.get(config.serverUrl + '/api/supplier/getall').then(response=> {
            this.setState({
                suppliers: response.data
            })
        })
    }

    addCustomer = () => {
        this.props.history.push('/add-customer');
    }

    editCustomer = (id) => {
        this.props.history.push('/edit-customer/' + id);
    }
  
    deleteCustomer = (id) => {
        axios.delete(config.serverUrl + '/api/customer/delete/' + id).then(response=> {
            this.getCustomers();
        })
    }

    addSupplier = () => {
        this.props.history.push('/add-supplier');
    }

    editSupplier = (id) => {
        this.props.history.push('/edit-supplier/' + id);
    }

    deleteSupplier = (id) => {
        axios.delete(config.serverUrl + '/api/supplier/delete/' + id).then(response=> {
            this.getSuppliers();
        })
    }
    

    onDeleteCustomer = (customerId, customerName) => {
        this.setState({
            customerId: customerId,
            customerName: customerName
        })
    }

    onDeleteSupplier = (supplierId, supplierName) => {
        this.setState({
            supplierId: supplierId,
            supplierName: supplierName
        })
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

                            <h2>Partners</h2>
                        </div>
                        <div class="col-lg-4">
                            <div class="title-action">

                            <div class="btn-group">
                            <button data-toggle="dropdown" class="btn btn-success dropdown-toggle" aria-expanded="false">Add New</button>
                            <ul class="dropdown-menu" x-placement="bottom-start">
                                <li><a class="dropdown-item" href="#" onClick={this.addCustomer}>Customer</a></li>
                                   
                                <li><a class="dropdown-item" href="#" onClick={this.addSupplier}>Supplier</a></li>
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
                                    <li><a class="nav-link active show" data-toggle="tab" href="#tab-1"><i class="fa fa-user"></i> Customers ({this.state.customers.length})</a></li>
                                    <li><a class="nav-link" data-toggle="tab" href="#tab-2"><i class="fa fa-briefcase"></i> Suppliers ({this.state.suppliers.length})</a></li>
                                </ul>

                                <div class="tab-content">
                                    <div id="tab-1" class="tab-pane active show">

                                         <table class="table table-hover table-striped">
                                         
                                            <tbody>
                                            
                                            {this.state.customers.map(c=> 
                                               
                                               <tr key={c.id}>
                                                    <td>{c.customerName}</td>
                                                    <td>{c.address}</td>
                                                    <td>{c.city}</td>
                                                    <td>{c.phone}</td>
                                                    <td>{c.email}</td>
                                                    <td>{c.isActive}</td>
                                                    {c.isActive===true? 
                                                        <td class="client-status"><span class="label label-danger">Not Active</span></td>
                                                    : <td></td>
                                                    }
                                                    <td>
                                                        <a onClick={()=>this.editCustomer(c.id)}><i class="fa fa-edit"></i></a>
                                                        &nbsp;&nbsp;
                                                        <a data-toggle="modal" data-target="#deleteCustomer" onClick={()=>this.onDeleteCustomer(c.id,c.customerName)}><i class="fa fa-trash"></i></a>
                                                    </td>
                                                </tr>
                                               
                                            )}
                                            

                                            </tbody>
                                        </table>

                                    </div>
                                
                                    <div id="tab-2" class="tab-pane show">

                                    <table class="table table-hover table-striped">
                                        <tbody>
                                            
                                            {this.state.suppliers.map(s=> 
                                               
                                               <tr key={s.id}>
                                                    <td>{s.supplierName}</td>
                                                    <td>{s.address}</td>
                                                    <td>{s.city}</td>
                                                    <td>{s.phone}</td>
                                                    <td>{s.email}</td>
                                                    <td>{s.isActive}</td>
                                                    {s.isActive===true? 
                                                        <td class="client-status"><span class="label label-danger">Not Active</span></td>
                                                    : <td></td>
                                                    }
                                                    <td>
                                                        <a onClick={()=>this.editSupplier(s.id)}><i class="fa fa-edit"></i></a>
                                                        &nbsp;&nbsp;
                                                        <a data-toggle="modal" data-target="#deleteSupplier"  onClick={()=>this.onDeleteSupplier(s.id,s.supplierName)}><i class="fa fa-trash"></i></a>
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

export default Partner;
