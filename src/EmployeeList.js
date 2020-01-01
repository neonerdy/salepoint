
import React, {Component} from 'react';
import Footer from './Footer';
import Employee from './Employee';
import axios from 'axios';
import moment from 'moment';
import config from './Config';
import {Link} from 'react-router-dom';


class EmployeeList extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            outlets: [],
            employees: [],
            initialEmployees: []
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


   
    onSearchEmployee = (e) => {


        let x = e.target.value.toLowerCase();
    
        let filteredEmployee = this.state.initialEmployees.filter(e => e.employeeName.toLowerCase()
            .includes(x) || 
            e.address.toLowerCase().includes(x) ||
            e.city.toLowerCase().includes(x) ||
            e.phone.toLowerCase().includes(x) ||
            e.jobTitle.titleName.toLowerCase().includes(x)
         );
            
        
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
                
                <div class="row wrapper border-bottom white-bg page-heading">
                    <div class="col-lg-4">
                        <h2>Employees ({this.state.employees.length})</h2>
                    
                    </div>
                    <div class="col-lg-8">
                        <div class="title-action">
                        <div class="btn-group">

                            <input type="text" class="form-control" placeholder="Search" onChange={this.onSearchEmployee}/>
                             &nbsp;&nbsp; 
                            <Link to="/add-employee" class="btn btn-success">Add New Employee </Link>
                        
                        </div>

                        </div>
                    </div>
                </div>

                 <div class="row">
                    <div class="col-lg-12">
                        <div class="wrapper wrapper-content animated fadeInRight">
                        
                        <div class="row">

                             {this.state.employees.map(emp=> 
                                <Employee 
                                    id = {emp.id} 
                                    photo = {emp.photo} 
                                    role = {emp.jobTitle.titleName} 
                                    employeeName = {emp.employeeName} 
                                    joinDate = {moment(emp.joinDate).format('MM/DD/YYYY')} 
                                    address = {emp.address}
                                    city = {emp.city} 
                                    phone = {emp.phone}
                                    email = {emp.email}
                                    editEmployee = {()=>this.editEmployee(emp.id)}
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

export default EmployeeList;
