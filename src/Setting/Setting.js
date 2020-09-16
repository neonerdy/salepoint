
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import moment from 'moment';
import config from '../Shared/Config';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';

class Setting extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            error: {},
            companyName: '',
            address: '',
            city: '',
            province: '',
            zipCode: '',
            phone: '',
            email: '',
        }
    }


    componentDidMount() {
        this.getSettingById('E8DC5367-D553-4232-E621-08D84993E0DB');
    }


    getSettingById = (id) => {

        axios.get(config.serverUrl + "/api/company/getbyid/" + id).then(response=> {
            this.setState({
                id: response.data.id,
                companyName: response.data.companyName,
                address: response.data.address,
                city: response.data.city,
                province: response.data.province,
                zipCode: response.data.zipCode,
                phone: response.data.phone,
                email: response.data.email
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

        if (this.state.companyName === '') {
            error.companyName = 'is required';
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


        this.setState({
            error: error 
        })

        return isValid;

    }



    

    updateSetting = () => {

        let isValid = this.validateSetting();

        if (isValid) {

            let setting = {
                id: this.state.id,
                companyName: this.state.companyName,
                address: this.state.address,
                city: this.state.city,
                province: this.state.province,
                zipCode: this.state.zipCode,
                phone: this.state.phone,
                email: this.state.email
            }

            axios.put(config.serverUrl + '/api/company/update', setting).then(response=> {
                this.props.history.push('/master-data');
            })

        }


    }

    cancelUpdate = () => {
        this.props.history.push('/dashboard');
    }



    render() {

        
        let errStyle = {
            color: 'darkred'
        }

        return(
            <div id="page-wrapper" class="gray-bg">
                
                <div id="deleteUser" class="modal fade" role="dialog">
                
                <div class="modal-dialog">
                    
                    <div class="modal-content">

                          <div class="modal-header">
                            <h4>Delete User</h4>
                          </div>
                          <div class="modal-body">
                          Are you sure want to delete '{this.state.userName}' ?
                          </div>

                          <div class="modal-footer">
                            <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                            <button class="btn btn-label btn-danger" onClick={()=>this.deleteUser(this.state.userId)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                          </div>
                        
                      </div>
                  </div>
              </div>




            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">
                    <h2>Setting </h2>
                </div>
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">
                                
                                <ul class="nav nav-tabs">
                                    <li><a class="nav-link active show" data-toggle="tab" href="#tab-1">Company</a></li>
                                </ul>

                                <div class="tab-content">
                                    <div id="tab-1" class="tab-pane active show">


                                        <br/>
                                        <form>

                                            <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Company Name</label>
                                                <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                                    name="companyName" onChange={this.onValueChange} value={this.state.companyName}/>
                                                </div>
                                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.companyName}</span>
                                            </div>

                                            <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Address</label>
                                                <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                                    name="address" onChange={this.onValueChange} value={this.state.address}/>
                                                </div>
                                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.address}</span>
                                            </div>

                                            <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>City</label>
                                                <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                                    name="city" onChange={this.onValueChange} value={this.state.city}/>
                                                </div>
                                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.city}</span>
                                            </div>


                                            <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Province</label>
                                                <div class="col-md-7 col-sm-12"><input type="text" class="form-control" 
                                                    name="province" onChange={this.onValueChange} value={this.state.province}/>
                                                </div>
                                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.province}</span>
                                            </div>


                                            <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Zip Code</label>
                                                <div class="col-md-7 col-sm-12"><input type="text" class="form-control" 
                                                    name="zipCode" onChange={this.onValueChange} value={this.state.zipCode}/>
                                                </div>
                                            </div>


                                            <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Phone</label>
                                                <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                                    name="phone" onChange={this.onValueChange} value={this.state.phone}/>
                                                </div>
                                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.phone}</span>
                                            </div>

                                            <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>E-Mail</label>
                                                <div class="col-md-7 col-sm-12"><input type="text" class="form-control" 
                                                    name="email" onChange={this.onValueChange} value={this.state.email}/>
                                                </div>
                                            </div>
                                            

                                            <br/><br/>

                                            <div class="hr-line-dashed"></div>
                                        

                                            <div class="text-right">
                                                <button type="button" onClick={this.updateSetting} class="btn btn-success"><i class="fa fa-check icon-white"></i> Update</button>
                                            </div>
                                            

                                        </form>

                                    </div>

                                   


                                </div>
                      </div>
                      


                </div>

            
            </div>
            
            
        </div>

        <br/>
        <br/>
        

        <Footer/>

        </div>

        )
    }


}


export default Setting;
