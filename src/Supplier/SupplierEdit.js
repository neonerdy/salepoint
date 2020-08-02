
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import config from '../Shared/Config';
import axios from 'axios';
import '../App.css';
import Switch from 'react-switchery-component';
import 'react-switchery-component/react-switchery-component.css';


class SupplierEdit extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            id: '',
            supplierName: '',
            address: '',
            city: '',
            province: '',
            zipCode: '',
            phone: '',
            email: '',
            contactPerson: '',
            contactPhone: '',
            isActive: true
        }


    }

    componentDidMount(){
        let id = this.props.match.params.id;
        this.getSupplierById(id);
    }


    getSupplierById = (id) => {

        axios.get(config.serverUrl + '/api/supplier/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                supplierName: response.data.supplierName,
                address: response.data.address,
                city: response.data.city,
                province: response.data.province,
                zipCode: response.data.zipCode,
                phone: response.data.phone,
                email: response.data.email,
                contactPerson: response.data.contactPerson,
                contactPhone: response.data.contactPhone,
                isActive: response.data.isActive
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



    validateCustomer = () => {

        let isValid = true;
        let error = {};

        if (this.state.supplierName === '') {
            error.supplierName = 'is required';
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



    updateSupplier = () => {

        let isValid = this.validateCustomer();
    
        if (isValid) {
        
            let supplier = {
                id: this.state.id,
                supplierName: this.state.supplierName,
                address: this.state.address,
                city: this.state.city,
                province: this.state.province,
                zipCode: this.state.zipCode,
                phone: this.state.phone,
                email: this.state.email,
                contactPerson: this.state.contactPerson,
                contactPhone: this.state.contactPhone,
                isActive: this.state.isActive
            }

            axios.put(config.serverUrl + '/api/supplier/update', supplier).then(response=> {
                this.props.history.push('/supplier');
            })

        }

    }

    cancelUpdate = () => {
        this.props.history.push('/supplier');
    }



    render() {

        let errStyle = {
            color: 'darkred'
        }

        return(
            <div id="page-wrapper" class="gray-bg">
                
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">
                    <h2>Update Supplier </h2>
                </div>
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">

                      <br/>
                            <form>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Supplier Name</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="supplierName" onChange={this.onValueChange} value={this.state.supplierName}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.supplierName}</span>
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
                                        name="province" onChange={this.onValueChange} value={this.state.province}/></div>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Zip Code</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" name="zipCode" 
                                        onChange={this.onValueChange} value={this.state.zipCode}/></div>
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

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Contact Person</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" name="contactPerson" 
                                        onChange={this.onValueChange} value={this.state.contactPerson}/></div>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Contact Phone</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" 
                                        name="contactPhone" onChange={this.onValueChange} value={this.state.contactPhone}/></div>
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
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelUpdate}>Cancel</a>
                                        <button type="button" onClick={this.updateSupplier} class="btn btn-success"><i class="fa fa-check icon-white"></i> Update</button>
                                    </div>

                                
                                

                            </form>



                      </div>
                      


                </div>

            
            </div>
            
            
        </div>

        <br/><br/>
        <Footer/>

        </div>
        )
    }

}


export default SupplierEdit;
