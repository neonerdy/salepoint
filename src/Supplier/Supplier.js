import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import config from '../Shared/Config';
import { Link } from 'react-router-dom';


class Supplier extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            suppliers: [],
            supplierId: '',
            supplierName: ''
        }
    }


    componentDidMount() {
        this.getSuppliers();
    }


    getSuppliers = () => {
        axios.get(config.serverUrl + '/api/supplier/getall').then(response=> {
            this.setState({
                suppliers: response.data
            })
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
    
  onDeleteSupplier = (supplierId, supplierName) => {
        this.setState({
            supplierId: supplierId,
            supplierName: supplierName
        })
    }



    
    render() {

      
        return(
          

            <div id="page-wrapper" class="gray-bg">


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

                            <h2>Suppliers ({this.state.suppliers.length})</h2>
                        </div>
                        <div class="col-lg-4">
                            <div class="title-action">

                                <div class="btn-group">
                                     <Link to="/add-supplier" class="btn btn-success">Add New Supplier</Link>    
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
                                    <li><a class="nav-link active show" data-toggle="tab" href="#tab-1">Suppliers</a></li>
                                </ul>

                                <div class="tab-content">
                               
                                    <div id="tab-1" class="tab-pane active show">

                                    <table class="table table-hover table-striped">
                                        
                                         <thead>
                                                <th>Customer Name</th>
                                                <th>Address</th>
                                                <th>City</th>
                                                <th>Phone</th>
                                                <th>E-Mail</th>
                                                <th></th>
                                                <th></th>                                               
                                         </thead>
                                        
                                        <tbody>
                                            
                                            {this.state.suppliers.map(s=> 
                                               
                                               <tr key={s.id}>
                                                    <td>{s.supplierName}</td>
                                                    <td>{s.address}</td>
                                                    <td>{s.city}</td>
                                                    <td>{s.phone}</td>
                                                    <td>{s.email}</td>
                                                    <td class="middle">
                                                        {s.isActive === false? 
                                                            <span class="label label-danger">Not Active</span>
                                                        : null
                                                        }
                                                    </td>
                                                   <td class="right">
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

export default Supplier;
