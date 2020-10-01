
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import moment from 'moment';
import config from '../Shared/Config';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import Switch from 'react-switchery-component';
import 'react-switchery-component/react-switchery-component.css';
import Header from '../Shared/Header';
import NavBar from '../Shared/NavBar';


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
            taxPct: '',
            discountPct: '',
            serviceChargePct: '',
            isEnableServiceCharge: true,
            isEnableAutomaticNumbering: true,
            isShowMonthAndYear: true,
            pointOfSalePrefix: '',
            salesInvoicePrefix: '',
            purchaseInvoicePrefix: '',
            delimiter: ''
        }
    }


    componentDidMount() {
        this.getSettingById('E8DC5367-D553-4232-E621-08D84993E0DB');
    }


    onServiceChargeChange = (e) =>  {
        this.setState({isEnableServiceCharge: e.target.checked})
    }


    onAutomaticNumberingChange = (e) =>  {
        this.setState({isEnableAutomaticNumbering: e.target.checked})
    }

    onShowMonthAndYearChange = (e) =>  {
        this.setState({isShowMonthAndYear: e.target.checked})
    }

    

    getSettingById = (id) => {

        axios.get(config.serverUrl + "/api/setting/getbyid/" + id).then(response=> {
            this.setState({
                id: response.data.id,
                companyName: response.data.companyName,
                address: response.data.address,
                city: response.data.city,
                province: response.data.province,
                zipCode: response.data.zipCode,
                phone: response.data.phone,
                email: response.data.email,
                taxPct: response.data.taxPct,
                discountPct: response.data.discountPct,
                serviceChargePct: response.data.serviceChargePct,
                isEnableServiceCharge: response.data.isEnableServiceCharge,
                isEnableAutomaticNumbering: response.data.isEnableAutomaticNumbering,
                isShowMonthAndYear: response.data.isShowMonthAndYear,
                pointOfSalePrefix: response.data.pointOfSalePrefix,
                salesInvoicePrefix: response.data.salesInvoicePrefix,
                purchaseInvoicePrefix: response.data.purchaseInvoicePrefix,
                delimiter: response.data.delimiter
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
        if (this.state.taxPct === '') {
            error.taxPct = 'is required';
            isValid = false;
        }
        if (this.state.discountPct === '') {
            error.discountPct = 'is required';
            isValid = false;
        }
        if (this.state.serviceChargePct === '') {
            error.serviceChargePct = 'is required';
            isValid = false;
        }

        /*

        if (this.state.pointOfSalePrefix === '' || this.state.salesInvoicePrefix === '' 
            || this.state.purchaseInvoicePrefix === '') {
            error.prefix = 'is required';
            isValid = false;
        }

        if (this.state.delimiter === '') {
            error.delimiter = 'is required';
            isValid = false;
        }
        */


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
                email: this.state.email,
                taxPct: parseInt(this.state.taxPct),
                discountPct: parseInt(this.state.discountPct),
                serviceChargePct: parseInt(this.state.serviceChargePct),
                isEnableServiceCharge: this.state.isEnableServiceCharge,
                isEnableAutomaticNumbering: this.state.isEnableAutomaticNumbering,
                isShowMonthAndYear: this.state.isShowMonthAndYear,
                pointOfSalePrefix: this.state.pointOfSalePrefix,
                salesInvoicePrefix: this.state.salesInvoicePrefix,
                purchaseInvoicePrefix: this.state.purchaseInvoicePrefix,
                delimiter: this.state.delimiter
                
            }

            axios.put(config.serverUrl + '/api/setting/update', setting).then(response=> {
                this.props.history.push('/dashboard');
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
        
            <div>

                <Header/>
                <NavBar/>

                <div id="page-wrapper" class="gray-bg">
            
                <div class="row wrapper border-bottom white-bg page-heading">
                    <div class="col-lg-8">
                        <h2>Settings </h2>
                    </div>
                </div>

            <br/>

            <div class="row">
                <div class="col-lg-12">

                    <div class="ibox">

                        <div class="ibox-content">
                                    
                                    <ul class="nav nav-tabs">
                                        <li><a class="nav-link active show" data-toggle="tab" href="#tab-1">Company</a></li>
                                        <li><a class="nav-link" data-toggle="tab" href="#tab-2">Invoice</a></li>
                                        <li><a class="nav-link" data-toggle="tab" href="#tab-3">Other</a></li>
                                        
                                        
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


                                        <div id="tab-2" class="tab-pane">


                                            <br/>
                                            <form>

                                        
                                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Automatic Numbering</label>
                                                    <div class="col-md-7 col-sm-12">
                                                        <Switch
                                                            color="#1ab394"
                                                            checked={this.state.isEnableAutomaticNumbering}
                                                            onChange={this.onAutomaticNumberingChange} />
                                                        <br/><br/>
                                                    </div>
                                                </div>
                                                
                                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Month and Year</label>
                                                    <div class="col-md-7 col-sm-12">
                                                        <Switch
                                                            color="#1ab394"
                                                            checked={this.state.isShowMonthAndYear}
                                                            onChange={this.onShowMonthAndYearChange} />
                                                        <br/><br/>
                                                    </div>
                                                </div>

                                                <div class="form-group  row">
                                                    <label class="col-md-3 control-label" style={{textAlign:'right'}}>Prefix</label>
                                                    <div class="col-md-7 col-sm-12">
                                                    
                                                        <div class="row">
                                                            <div class="col-sm-4">
                                                                <p>POINT OF SALE</p>
                                                            <input type="text" class="form-control" name="pointOfSalePrefix" onChange={this.onValueChange} value={this.state.pointOfSalePrefix}/>
                                                            </div>
                                                            <div class="col-sm-4">
                                                                <p>SALES INVOICE</p>
                                                                <input type="text" class="form-control" name="salesInvoicePrefix" onChange={this.onValueChange} value={this.state.salesInvoicePrefix}/>
                                                            </div>
                                                            <div class="col-sm-4">
                                                                <p>PURCHASE INVOICE</p>
                                                                <input type="text" class="form-control" name="purchaseInvoicePrefix" onChange={this.onValueChange} value={this.state.purchaseInvoicePrefix}/>
                                                            </div>

                                                        </div>
                                                    
                                                    </div>
                                                </div>


                                                <div class="form-group  row">
                                                    <label class="col-md-3 control-label" style={{textAlign:'right'}}>Delimiter</label>
                                                    <div class="col-md-7 col-sm-12">
                                                        <input type="text" class="form-control" name="delimiter" onChange={this.onValueChange} value={this.state.delimiter}/>
                                                    </div>
                                                </div>

                                                <br/><br/>

                                                <div class="hr-line-dashed"></div>
                                            

                                                <div class="text-right">
                                                    <button type="button" onClick={this.updateSetting} class="btn btn-success"><i class="fa fa-check icon-white"></i> Update</button>
                                                </div>
                                                

                                            </form>




                                        </div>



                                        <div id="tab-3" class="tab-pane">


                                            <br/>
                                            <form>

                                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Tax (%)</label>
                                                    <div class="col-md-7 col-sm-12 required">
                                                        <input type="number" class="form-control" name="taxPct" onChange={this.onValueChange} value={this.state.taxPct}/>
                                                    </div>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.taxPct}</span>
                                                </div>

                                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Discount (%)</label>
                                                
                                                    <div class="col-md-7 col-sm-12 required">
                                                        <input type="number" class="form-control" name="discountPct" onChange={this.onValueChange} value={this.state.discountPct}/>
                                                    </div>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.discountPct}</span>
                                                </div>

                                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Service Charge (%)</label>
                                                    <div class="col-md-7 col-sm-12 required">
                                                        <Switch
                                                            color="#1ab394"
                                                            checked={this.state.isEnableServiceCharge}
                                                            onChange={this.onServiceChargeChange} />
                                                        <br/><br/>
                                                        
                                                        <input type="number" class="form-control" name="serviceChargePct" onChange={this.onValueChange} value={this.state.serviceChargePct}/>
                                                    </div>
                                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.serviceChargePct}</span>
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
         </div>
        

        )
    }


}


export default Setting;
