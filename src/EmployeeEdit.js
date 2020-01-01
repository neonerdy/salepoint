
import React, {Component} from 'react';
import Footer from './Footer';
import axios from 'axios';
import moment from 'moment';
import config from './Config';


class EmployeeEdit extends Component
{
    constructor(props) {
        
        super(props);

        this.fileTxt = React.createRef();

        this.state = {
            error: {},
            jobTitles: [],
            id: '',
            employeeName: '',
            photo: '',
            joinDate: '',
            address: '',
            city: '',
            phone: '',
            email: '',
            jobTitleId: '',
            displayProgress: '',
            uploadPercentage: '',
            barPercentage: '',
            files: ''
        }
    }

    componentDidMount() {

        let id = this.props.match.params.id;
        this.getEmployeeById(id);
        this.getJobTitles();
    }


    getJobTitles = () => {

        axios.get(config.serverUrl + '/api/jobtitle/getall').then(response=> {
            this.setState({
                jobTitles: response.data
            })
        })
    }


    getEmployeeById = (id) => {

        axios.get(config.serverUrl + '/api/employee/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                employeeName: response.data.employeeName,
                photo: response.data.photo,
                joinDate: moment(response.data.joinDate).format('MM/DD/YYYY'),
                address: response.data.address,
                city: response.data.city,
                phone: response.data.phone,
                email: response.data.email,
                jobTitleId: response.data.jobTitleId,
                photo: response.data.photo
            })
        })
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onFileChange = (e) => {
        this.setState({
            files: e.target.files
        });
    }




    validateEmployee = () => {

        let isValid = true;
        let error = {};

        if (this.state.employeeName === '') {
            error.employeeName = 'is required';
            isValid = false;
        }

        if (this.state.photo === '') {
            error.employeeName = 'is required';
            isValid = false;
        }

         
        if (this.state.jobTitleId === '') {
            error.jobTitleId = 'is required';
            isValid = false;
        }
        
        if (this.state.joinDate === '') {
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

    
    updateEmployee = () => {

        let isValid = this.validateEmployee();

        if (isValid) {

            let employee = {
                id: this.state.id,
                employeeName: this.state.employeeName,
                photo: this.state.photo,
                outletId: this.state.outletId,
                joinDate: this.state.joinDate,
                address: this.state.address,
                city: this.state.city,
                phone: this.state.phone,
                email: this.state.email,
                jobTitleId: this.state.jobTitleId
            }

            axios.put(config.serverUrl + '/api/employee/update', employee).then(response=> {
                this.props.history.push('/employee');
            })

        }
    }


    deleteEmployee = (id) => {

        axios.delete(config.serverUrl + '/api/employee/delete/' + id).then(response=> {
            this.props.history.push('/employee');
        })
    
    }



    cancelUpdate = () => {
        this.props.history.push('/employee');
    }



    render() {

        
        let errStyle = {
            color: 'darkred'
        }

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
                            <button class="btn btn-label btn-danger" onClick={()=>this.deleteEmployee(this.state.id)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                          </div>
                        
                      </div>
                  </div>
            </div>



              {/* ATTACHMENT */}
            
              <div id="addAttachment" class="modal fade" role="dialog">
                
                <div class="modal-dialog" style={{width: '600px', height: '100px'}}>
                    
                    <div class="modal-content">

                          <div class="modal-header">
                            <h4>Upload Photo</h4>
                          </div>

                          <div class="modal-body">
                         
                          <div class="modal-body row">
                                    
                            <div class="col-md-12">
                                <div id="divFile" class="form-group">
                                    <input type="file" name="file" onChange={this.onFileChange} class="btn btn-default" style={{width:'380px'}} ref={this.fileTxt}/>  
                                    <br/><br/>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-success active" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{width: this.state.barPercentage}}></div>
                                    </div>
                                    {this.state.uploadPercentage}
                                 </div>
                                 <span style={errStyle}>{this.state.error.fileName}</span>
                                </div>
                                <div id="errorAddAttachment" class="form-group col-md-12"></div>     
                            </div>

                         
                          </div>

                          <div class="modal-footer">
                             <button type="button" class="btn btn-default pull-left" onClick={this.doneUpload} data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success" id="btnUpload" onClick={this.uploadAttachment}>Upload</button>

                          </div>
                        
                      </div>
                  </div>
            </div>


                
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">
                    <h2>Edit Employee </h2>
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
                                        name="employeeName" onChange={this.onValueChange} value={this.state.employeeName}/>
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
                                        <select class="form-control" name="jobTitleId" onChange={this.onValueChange} value={this.state.jobTitleId}>
                                            <option value="">Please Select Role</option>
                                            {this.state.jobTitles.map(jt=> 
                                                <option key={jt.id} value={jt.id}>{jt.titleName}</option> 
                                            )}
                                        </select>

                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.jobTitleId}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Join Date</label>
                                    <div class="input-group date col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control" value="" name="joinDate" onChange={this.onValueChange} value={this.state.joinDate}/>
                                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                                    </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.joinDate}</span>
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

                            
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Phone</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="phone" onChange={this.onValueChange} value={this.state.phone}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.phone}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>E-Mail</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="email" onChange={this.onValueChange} value={this.state.email}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.email}</span>
                                </div>
                                 

                                <br/><br/>

                                <div class="hr-line-dashed"></div>

                                    <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelUpdate}>Cancel</a>
                                        <button type="button" onClick={this.updateEmployee} class="btn btn-success"><i class="fa fa-check icon-white"></i> Update</button>
                                        &nbsp;&nbsp;&nbsp;
                                        <a data-toggle="modal" data-target="#deleteEmployee"><i class="fa fa-trash"></i></a>
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


export default EmployeeEdit;
