
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import moment from 'moment';
import config from '../Shared/Config';
import {Link} from 'react-router-dom';


class Employee extends Component
{


    constructor(props) {
        super(props);
        this.state = {
            outlets: [],
            employees: [],
            initialEmployees: [],
            employeeId: '' ,
            employeeName: ''
        }
    }


    componentDidMount() {
        this.getEmployees();
    }


    getEmployees =()=> {
        axios.get(config.serverUrl + '/api/employee/getall').then(response=> {
            this.setState({
                employees: response.data,
                initialEmployees: response.data
            })

        })
    }

    addEmployee = () => {
        this.props.history.push('/add-employee');
    }


    editEmployee = (id) => {
        this.props.history.push('/edit-employee/' + id);
    }


    deleteEmployee = (id) => {
    
        axios.delete(config.serverUrl + '/api/employee/delete/' + id).then(response=> {
            this.getEmployees();
        })
    }



    onDeleteEmployee = (employeeId, employeeName) => {
        this.setState({
            employeeId: employeeId,
            employeeName: employeeName
        })
    }


    searchEmployee = (e) => {

        let filteredEmployee = this.state.initialEmployees.filter(e =>e.employeeName.toLowerCase().includes(e.target.value.toLowerCase()));
            
        if (e.target.value === '') {
            this.setState( {
                employees: this.state.initialEmployees
            })
        }
        else {
            this.setState( {
                employees: filteredEmployee
            })
    
        }
    }




    render() {

       
        return(


            <div id="page-wrapper" class="gray-bg">


               <div id="deleteEmployee" class="modal fade" role="dialog">
                
                  <div class="modal-dialog">
                      
                      <div class="modal-content">

                            <div class="modal-header">
                              <h4>Delete Employee</h4>
                            </div>
                            <div class="modal-body">
                            Are you sure want to delete '{this.state.employeeName}' ?
                            </div>

                            <div class="modal-footer">
                              <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                              <button class="btn btn-label btn-danger" onClick={()=>this.deleteEmployee(this.state.employeeId)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                            </div>
                          
                        </div>
                    </div>
                </div>


                    <div class="row wrapper border-bottom white-bg page-heading">
                       
                        <div class="col-lg-8">
                            <h2>Employees ({this.state.employees.length})</h2>
                        </div>
                        <div class="col-lg-4">
                            <div class="title-action">

                                <div class="btn-group">
                          
                                    <input type="text" class="form-control" placeholder="Search" onChange={this.searchEmployee}/>
                                    &nbsp;&nbsp;&nbsp;

                                    <Link to="/add-employee" class="btn btn-success">Add New Employee </Link>
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
                                    <li><a class="nav-link active show" data-toggle="tab" href="#tab-1">Employees</a></li>
                                </ul>

                                <div class="tab-content">
                                    <div id="tab-1" class="tab-pane active show">

                                         <table class="table table-hover table-striped">
                                         
                                            <thead>
                                                <th>Employee Name</th>
                                                <th>Address</th>
                                                <th>City</th>
                                                <th>Phone</th>
                                                <th>E-Mail</th>
                                                <th>Job Title</th>
                                                <th></th>
                                                <th></th>
                                                

                                            </thead>

                                            <tbody>
                                            
                                            {this.state.employees.map(e=> 
                                               
                                               <tr key={e.id}>
                                                    <td>{e.employeeName}</td>
                                                    <td>{e.address}</td>
                                                    <td>{e.city}</td>
                                                    <td>{e.phone}</td>
                                                    <td>{e.email}</td>
                                                    <td>{e.jobTitle.jobTitleName}</td>
                                                    <td align="middle">
                                                    {e.isActive===false? 
                                                        <span class="label label-danger">Not Active</span>
                                                    : null
                                                    }
                                                 </td>
                                                    <td align="right">
                                                        <a onClick={()=>this.editEmployee(e.id)}><i class="fa fa-edit"></i></a>
                                                        &nbsp;&nbsp;
                                                        <a data-toggle="modal" data-target="#deleteEmployee" onClick={()=>this.onDeleteEmployee(e.id,e.employeeName)}><i class="fa fa-trash"></i></a>
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

export default Employee;
