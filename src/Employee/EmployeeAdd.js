
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import Employee from './Employee';
import axios from 'axios';
import moment from 'moment';
import config from '../Shared/Config';
import Switch from 'react-switchery-component';
import 'react-switchery-component/react-switchery-component.css';
import Header from '../Shared/Header';
import NavBar from '../Shared/NavBar';


class EmployeeAdd extends Component
{
    constructor(props) {
        super(props);

        this.joinDate = React.createRef()

        this.state = {
            error: {},
            roles: [],
            employeeName: '',
            roleId: '',
            joinDate: '',
            address: '',
            city: '',
            phone: '',
            email: '',
            isActive: true
        }
    }


    componentDidMount() {
        this.getRoles();
    }


    getRoles = () => {
        axios.get(config.serverUrl + '/api/role/getall').then(response=> {
            this.setState({
                roles: response.data
            })
        })
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onActiveChanged = (e) => {
        this.setState({isActive: e.target.checked})
    }


    validateEmployee = () => {

        let isValid = true;
        let error = {};

        if (this.state.employeeName === '') {
            error.employeeName = 'is required';
            isValid = false;
        }

        if (this.state.roleId === '') {
            error.roleId = 'is requred';
            isValid = false;
        }

        
        if (this.joinDate.current.value === '') {
            error.joinDate = 'is required';
            isValid = false;
        }

        if (this.state.address === '') {
            error.address = 'is required';
            isValid = false;
        }

        if (this.state.city === '') {
            error.city = 'is required';
            isValid = false;
        }

        if (this.state.phone === '') {
            error.phone = 'is required';
            isValid = false;
        }

        if (this.state.email === '') {
            error.email = 'is required';
            isValid = false;
        }


        this.setState({
            error: error 
        })

        return isValid;

    }

    
    saveEmployee = () => {

        let isValid = this.validateEmployee();

        if (isValid) {

            let employee = {
                employeeName: this.state.employeeName,
                roleId: this.state.roleId,
                joinDate: new Date(this.joinDate.current.value),
                address: this.state.address,
                city: this.state.city,
                phone: this.state.phone,
                email: this.state.email,
                isActive: this.state.isActive
            }

            axios.post(config.serverUrl + '/api/employee/save', employee).then(response=> {
                this.props.history.push('/employee');
            })

        }


    }

    cancelAdd = () => {
        this.props.history.push('/employee');
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
                        <h2>Add Employee </h2>
                    </div>
                </div>

            <br/>

            <div class="row">
                <div class="col-lg-12">

                    <div class="ibox">

                        <div class="ibox-content">

                        <br/>
                            <form autoComplete="off">
                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Employee Name</label>
                                        <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                            name="employeeName" onChange={this.onValueChange}/>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.employeeName}</span>
                                    </div>

                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Role</label>
                                        <div class="col-md-7 col-sm-12 required">
                                            <select class="form-control" name="roleId" onChange={this.onValueChange}>
                                            <option value="">Please Select Role</option>
                                                {this.state.roles.map(r=> 
                                                    <option key={r.id} value={r.id}>{r.roleName}</option> 
                                                )}
                                            </select>

                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.roleId}</span>
                                    </div>

                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Join Date</label>
                                        <div class="input-group date col-md-7 col-sm-12 required">
                                            <div class="input-group date" data-provide="datepicker" data-date-autoclose="true" data-date-today-highlight="true">
                                                    <input type="text" name="joinDate" class="form-control" ref={this.joinDate}/>
                                                    <div class="input-group-addon">
                                                        <span class="fa fa-calendar"></span>
                                                    </div>
                                            </div>

                                        </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.joinDate}</span>
                                    </div>
                                    


                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Address</label>
                                        <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                            name="address" onChange={this.onValueChange}/>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.address}</span>
                                    </div>


                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>City</label>
                                        <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                            name="city" onChange={this.onValueChange}/>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.city}</span>
                                    </div>

                                
                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Phone</label>
                                        <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                            name="phone" onChange={this.onValueChange}/>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.phone}</span>
                                    </div>

                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>E-Mail</label>
                                        <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                            name="email" onChange={this.onValueChange}/>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.email}</span>
                                    </div>


                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Active</label>
                                        <div class="col-md-7 col-sm-12">

                                        <Switch
                                            color="#1ab394"
                                            checked={this.state.isActive}
                                            onChange={this.onActiveChanged} />
                                        </div>

                                    </div>

                                    

                                    <br/><br/>

                                    <div class="hr-line-dashed"></div>
                                

                                    <div class="text-right">
                                            <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>
                                            <button type="button" onClick={this.saveEmployee} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
                                        </div>

                                </form>

                        </div>
                        


                    </div>

                
                </div>
                
                
            </div>

            <br/> <br/>                                           
            
            <Footer/>

            </div>

        </div>

       )
    }


}


export default EmployeeAdd;
