
import React, {Component} from 'react';
import Footer from './Footer';
import axios from 'axios';
import config from './Config';


class AccountAdd extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            accountName: '',
            accountType: '',
            balance: '',
            notes: ''
        }
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    validateAccount = () => {

        let isValid = true;
        let error = {};

        if (this.state.accountName === '') {
            error.accountName = 'is required';
            isValid = false;
        }
        
        if (this.state.accountType === '') {
            error.accountType = 'is required';
            isValid = false;
        }

        if (this.state.balance === '') {
            error.balance = 'is required';
            isValid = false;
        }

        this.setState({
            error: error 
        })

        return isValid;

    }


    saveAccount = () => {

        let isValid = this.validateAccount();

        if (isValid) {

            let account = {
                accountName: this.state.accountName,
                accountType: this.state.accountType,
                balance: this.state.balance
            }

            axios.post(config.serverUrl + '/api/account/save', account).then(response=> {
                this.props.history.push('/expense');
            })
        }
    }



    cancelAdd = () => {
        this.props.history.push('/expense');
    }


    render() {

        let errStyle = {
            color: 'darkred'
        }


        return(
           
           <div id="page-wrapper" class="gray-bg">
                
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">

                    <h2>Add Account </h2>
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

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Account Name</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control" name="accountName" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.accountName}</span>
                                </div>
                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Account Type</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <select name="accountType" class="form-control" onChange={this.onValueChange}> 
                                            <option value="">Select Account Type</option>
                                            <option value="Cash">Cash</option> 
                                            <option value="Bank">Bank</option> 
                                            <option value="Credit Card">Credit Card</option> 
                                        </select>    

                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.accountType}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Balance</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="number" class="form-control" 
                                        name="balance" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.balance}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Notes</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" name="notes" onChange={this.onValueChange}/></div>
                                </div>

                                <br/><br/>

                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>
                                        <button type="button" onClick={this.saveAccount} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
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


export default AccountAdd;
