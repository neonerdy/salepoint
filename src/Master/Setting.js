
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import Employee from '../Employee/Employee';
import axios from 'axios';
import moment from 'moment';
import config from '../Shared/Config';


class Setting extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            error: {},
            id: '',
            companyName: '',
            companyAddress: '',
            companyCity: '',
            companyPhone: '',
            companyEmail: ''
        }
    }


    componentDidMount() {
    
    }


    getSettingById = (id) => {

        axios.get(server.config + "/api/setting/getbyid/" + id).then(response=> {
            this.setState({
                id: response.data.id,
                companyName: response.data.companyName,
                companyAddress: response.data.companyAddress,
                companyCity: response.data.companyCity,
                companyPhone: response.data.companyPhone,
                companyEmail: response.data.companyEmail
            })

        }) 
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }




    validateSetting = () => {

        let isValid = true;
        let error = {};

        if (this.state.employeeName === '') {
            error.employeeName = 'is required';
            isValid = false;
        }

        
        this.setState({
            error: error 
        })

        return isValid;

    }



    

    updateSetting = () => {

        let isValid = this.validateSetting();

        if (isValid) {

            let setting = {
                employeeName: this.state.employeeName,
            }

            axios.put(config.serverUrl + '/api/setting/update', setting).then(response=> {
                this.props.history.push('/dashboard');
            })

        }


    }

    cancelUpdate = () => {
        this.props.history.push('/setting');
    }



    render() {

        
        let errStyle = {
            color: 'darkred'
        }

        return(
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
                            <form>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Employee Name</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="employeeName" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.employeeName}</span>
                                </div>

                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Photo</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="photo" onChange={this.onValueChange} value={this.state.photo}/>
                                    </div>
                                    <div class="col-md-2 col-sm-1">
                                        <span style={errStyle}>{this.state.error.photo}</span>
                                        &nbsp;&nbsp; <a href="#" class="btn btn-sm btn-default" data-toggle="modal" data-target="#addAttachment">Add Photo</a>
                                    </div>
                                </div>

                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Role</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <select class="form-control" name="jobTitleId" onChange={this.onValueChange}>
                                           <option value="">Please Select Role</option>
                                            {this.state.jobTitles.map(jt=> 
                                                <option key={jt.id} value={jt.id}>{jt.titleName}</option> 
                                            )}
                                        </select>

                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.role}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Join Date</label>
                                    <div class="input-group date col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control" name="joinDate" onChange={this.onValueChange}/>
                                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
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
                                 

                                <br/><br/>

                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelUpdate}>Cancel</a>
                                        <button type="button" onClick={} class="btn btn-success"><i class="fa fa-check icon-white"></i> Update</button>
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


export default Setting;
