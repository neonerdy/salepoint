
import React, {Component} from 'react';
import Footer from './Footer';
import Employee from './Employee';
import axios from 'axios';
import moment from 'moment';
import config from './Config';


class EmployeeAdd extends Component
{
    constructor(props) {
        super(props);

        this.fileTxt = React.createRef();

        this.state = {
            error: {},
            jobTitles: [],
            employeeName: '',
            jobTitleId: '',
            photo: '',
            joinDate: '',
            address: '',
            city: '',
            phone: '',
            email: '',
            displayProgress: '',
            uploadPercentage: '',
            barPercentage: '',
            files: ''
        }
    }


    componentDidMount() {
        this.getJobTitles();
    }


    getJobTitles = () => {
        axios.get(config.serverUrl + '/api/jobtitle/getall').then(response=> {
            this.setState({
                jobTitles: response.data
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
            error.photo = 'is required';
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

    
    saveEmployee = () => {

        let isValid = this.validateEmployee();

        if (isValid) {

            let employee = {
                employeeName: this.state.employeeName,
                photo: this.state.photo,
                joinDate: this.state.joinDate,
                address: this.state.address,
                city: this.state.city,
                phone: this.state.phone,
                jobTitleId: this.state.jobTitleId,
                email: this.state.email
            }

            console.log(employee);

            axios.post(config.serverUrl + '/api/employee/save', employee).then(response=> {
                this.props.history.push('/employee');
            })

        }


    }

    cancelAdd = () => {
        this.props.history.push('/employee');
    }



    doneUpload =()=> {
        
        this.fileTxt.current.value = '';
        this.setState({
            error: {},
            uploadPercentage: '',
            barPercentage: '0%',
            files: ''
        })
    }


    validateUpload = () => {

        let isValid = true;
        let error = {};

        if (this.state.files[0] == undefined) {
            error.fileName = 'File name is required';
            isValid = false;
        }

        this.setState({
            error: error
        })

        return isValid;

    }


    uploadAttachment = () => {

        let isValid = this.validateUpload();
        
        if (isValid)
        {
     
            let formData = new FormData();
            
            formData.append('file', this.state.files[0]);

            axios.post(config.serverUrl + "/api/file/uploadfile",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent)=> {
                    var percentDone = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
                    this.setState({
                        displayProgress: 'true',
                        uploadPercentage: percentDone + "%",
                        barPercentage: percentDone + "%"
                    })
                    
                }
            }
            ).then(()=> {
                    console.log('SUCCESS UPLOAD ATTACHMENT !!');
                    this.setState({
                        photo: this.state.files[0].name
                    })
            })
            .catch(()=> {
                console.log('UPLOAD ATTACHMENT FAILURE !!');
            });
        
        }
         


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
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>
                                        <button type="button" onClick={this.saveEmployee} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
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


export default EmployeeAdd;
