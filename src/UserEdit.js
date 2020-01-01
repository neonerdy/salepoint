
import React, {Component} from 'react';
import Footer from './Footer';
import axios from 'axios';
import config from './Config';


class UserEdit extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            id: '',
            employees: [],
            userName: '',
            password: '',
            employeeId: ''
        }
    }


    componentDidMount() {
        
        let id = this.props.match.params.id;
        this.getEmployees();
        this.getUserById(id);
    }


    getEmployees = () => {
        axios.get(config.serverUrl + '/api/employee/getall').then(response=> {
            this.setState({
                employees: response.data
            })
        })
    }


    getUserById = (id) => {

        axios.get(config.serverUrl + '/api/user/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                userName: response.data.userName,
                password: response.data.password,
                employeeId: response.data.employeeId
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



    updateUser = () => {

        let isValid = this.validateUser();

        if (isValid) {

            let user = {
                id: this.state.id,
                userName: this.state.userName,
                password: this.state.password,
                employeeId: this.state.employeeId
            }

            axios.put(config.serverUrl + '/api/user/update', user).then(response=> {
                this.props.history.push('/master-data');
            })
        }
    }



    cancelUpdate = () => {
        this.props.history.push('/master-data');
    }


    render() {

        let errStyle = {
            color: 'darkred'
        }


        return(
           
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
                                        <select class="form-control" name="employeeId" onChange={this.onValueChange} value={this.state.employeeId}>
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
                                        <input type="text" class="form-control" name="userName" onChange={this.onValueChange} value={this.state.userName}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.userName}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Password</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control" name="password" onChange={this.onValueChange} value={this.state.password}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.password}</span>
                                </div>


                                
                                <br/><br/>

                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelUpdate}>Cancel</a>&nbsp;

                                        <button type="button" onClick={this.updateUser} class="btn btn-success"><i class="fa fa-check icon-white"></i> Update</button>
                                </div>

                             
                            </form>



                      </div>
                      


                </div>

            
            </div>
            
            
        </div>

        
        <Footer/>

        </div>
        )

    }


}


export default UserEdit;
