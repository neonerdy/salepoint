
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import config from '../Shared/Config';
import Header from '../Shared/Header';
import NavBar from '../Shared/NavBar';


class UserAdd extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            employees: [],
            userName: '',
            password: '',
            employeeId: ''
        }
    }


    componentDidMount() {
        this.getEmployees();
    }


    getEmployees = () => {
        axios.get(config.serverUrl + '/api/employee/getall').then(response=> {
            this.setState({
                employees: response.data
            })
        })
    }



    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    validateUser = () => {

        let isValid = true;
        let error = {};

        if (this.state.userName === '') {
            error.userName = 'is required';
            isValid = false;
        }

        if (this.state.password === '') {
            error.password = 'is required';
            isValid = false;
        }

        if (this.state.employeeId === '') {
            error.employeeId = 'is required';
            isValid = false;
        }


               
        this.setState({
            error: error 
        })

        return isValid;

    }



    saveUser = () => {

        let isValid = this.validateUser();

        if (isValid) {

            let user = {
                userName: this.state.userName,
                password: this.state.password,
                employeeId: this.state.employeeId
            }

            axios.post(config.serverUrl + '/api/user/save', user).then(response=> {
                this.props.history.push('/user');
            })
        }
    }



    cancelAdd = () => {
        this.props.history.push('/user');
    }


    render() {

        let errStyle = {
            color: 'darkred'
        }


        return(

            <div>

                <Header/>
                <NavBar/>
                
                <div id="page-wrapper" class="gray-bg">
                        
                    <div class="row wrapper border-bottom white-bg page-heading">
                        <div class="col-lg-8">
                            <h2>Add User</h2>
                        </div>
                    </div>

                <br/>

                <div class="row">
                    <div class="col-lg-12">

                        <div class="ibox">

                            <div class="ibox-content">

                            <br/>
                                    <form>


                                        <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Employee</label>
                                            
                                            <div class="col-md-7 col-sm-12 required">
                                                <select class="form-control" name="employeeId" onChange={this.onValueChange}>
                                                    <option value="">Select Employee</option>
                                                    {this.state.employees.map(e=> 
                                                        <option value={e.id} key={e.id}>{e.employeeName}</option>
                                                    )}
                                                </select>
                                            </div>
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.employeeId}</span>
                                        </div>

                                        <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>User Name</label>
                                            <div class="col-md-7 col-sm-12 required">
                                                <input type="text" class="form-control" name="userName" onChange={this.onValueChange}/>
                                            </div>
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.userName}</span>
                                        </div>

                                        <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Password</label>
                                            <div class="col-md-7 col-sm-12 required">
                                                <input type="text" class="form-control" name="password" onChange={this.onValueChange}/>
                                            </div>
                                            &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.password}</span>
                                        </div>


                                        
                                        <br/><br/>

                                        <div class="hr-line-dashed"></div>
                                    

                                        <div class="text-right">
                                                <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>&nbsp;

                                                <button type="button" onClick={this.saveUser} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
                                        </div>

                                    
                                    </form>



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


export default UserAdd;
