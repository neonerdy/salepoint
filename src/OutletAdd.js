
import React, {Component} from 'react';
import Footer from './Footer';
import axios from 'axios';
import config from './Config';
import uuid from 'uuid';

class OutletAdd extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            employees: [],
            id: uuid.v4(),
            outletName: '',
            address: '',
            city: '',
            province: '',
            phone: '',
            manager: '',
            openingDate: '',
            outletEmployees: [],
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


    addOutletEmployee = (employeeId) => {
      
        axios.get(config.serverUrl + '/api/employee/getbyid/' + employeeId).then(response=> {

            let outletEmployee = {};
            outletEmployee.id = uuid.v4();
            outletEmployee.outletId = this.state.id;
            outletEmployee.employeeId = employeeId;
            outletEmployee.employeeName = response.data.employeeName;
         
            this.setState({
                outletEmployees: [...this.state.outletEmployees, outletEmployee],
                error: {}
            })

        })       

    }



    removeOutletEmployee = (id) => {

        const data = this.state.outletEmployees.filter(eo=> eo.id !== id);
        
        this.setState({
            outletEmployees: data,
        })
    }



    validateOutlet = () => {

        let isValid = true;
        let error = {};

        if (this.state.outletName === '') {
            error.outletName = 'is required';
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

        if (this.state.province === '') {
            error.province = 'is required';
            isValid = false;
        }

        if (this.state.phone === '') {
            error.phone = 'is required';
            isValid = false;
        }

        if (this.state.manager === '') {
            error.manager = 'is required';
            isValid = false;
        }

        if (this.state.openingDate === '') {
            error.openingDate = 'is required';
            isValid = false;
        }

        if (this.state.outletEmployees.length < 1) {
            error.employeeId = 'Employee is empty';
            isValid = false;
        }




        this.setState({
            error: error 
        })

        return isValid;

    }



    saveOutlet = () => {

        let isValid = this.validateOutlet();

        if (isValid) {

            let outlet = {
                id: this.state.id,
                outletName: this.state.outletName,
                address: this.state.address,
                city: this.state.city,
                province: this.state.province,
                phone: this.state.phone,
                manager: this.state.manager,
                openingDate: this.state.openingDate,
                outletEmployees: this.state.outletEmployees
            }

            console.log(outlet);

            axios.post(config.serverUrl + '/api/outlet/save', outlet).then(response=> {
                this.props.history.push('/outlet');
            })
        }
    }



    cancelAdd = () => {
        this.props.history.push('/outlet');
    }


    render() {

        let errStyle = {
            color: 'darkred'
        }


        return(
           
           <div id="page-wrapper" class="gray-bg">
                
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">

                    <h2>Add Outlet</h2>
                </div>
                <div class="col-lg-4">
                    <div class="title-action">
                  
                    </div>
                </div>
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">

                      <br/>
                            <form>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Outlet Name</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control" name="outletName" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.outletName}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Address</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control" name="address" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.address}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>City</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control" name="city" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.city}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Province</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control" name="province" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.province}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Phone</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control" name="phone" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.phone}</span>
                                </div>

                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Manager</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control" name="manager" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.manager}</span>
                                </div>

                                 
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Opening Date</label>
                                    <div class="input-group date col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control"  
                                            name="openingDate" onChange={this.onValueChange}/>
                                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>

                                    </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.openingDate}</span>
                                </div>

                                <br/>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right',color:'grey'}}><b>Add Employees</b></label>
                                    <div class="col-md-7 col-sm-12 hr-line-dashed"></div>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Employee Name</label>
                                    
                                    <div class="col-md-7 col-sm-12">
                                        <select class="form-control" name="employeeId" onChange={this.onValueChange}>
                                            <option value="">Select Employee</option>
                                            {this.state.employees.map(e=> 
                                                <option value={e.id} key={e.id}>{e.employeeName}</option>    
                                            )}

                                        </select>
                                    </div>

                                  
                                    <div class="col-md-2 col-sm-1">
                                        <span style={errStyle}>{this.state.error.employeeId}</span>
                                        &nbsp;&nbsp;<a onClick={()=>this.addOutletEmployee(this.state.employeeId)} class="btn btn-sm btn-default"><i class="fa fa-shopping-cart"></i> Add</a>
                                    </div>
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}></label>
                                    <div class="col-md-7 col-sm-12">
                                    

                                    <ul class="nav nav-tabs">
                                        <li><a class="nav-link active show" data-toggle="tab" href="#tab-1"><i class="fa fa-dropbox"></i> Items</a></li>
                                    </ul>

                                    <div class="tab-content">
                                        <div id="tab-1" class="tab-pane active show">

                                            <table class="table table-hover table-striped">
                                                <tbody>
                                                    {this.state.outletEmployees.map(oe=> 
                                                    <tr key={oe.id}>
                                                       <td>{oe.employeeName}</td>
                                                       <td width="10%" align="right">
                                                            <a onClick={()=>this.removeOutletEmployee(oe.id)}><i class="fa fa-trash"></i></a>
                                                       </td>
                                                    </tr>
                                                    )}
                                                    
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    
                                    
                                    </div>
                                </div>




                              


                                <br/><br/>

                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>
                                        <button type="button" onClick={this.saveOutlet} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
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


export default OutletAdd;
