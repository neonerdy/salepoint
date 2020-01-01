
import React, {Component} from 'react';
import Footer from './Footer';
import axios from 'axios';
import config from './Config';


class AccountEdit extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            id: '',
            accountName: '',
            accountType: '',
            balance: '',
            notes: ''
        }
    }

    componentDidMount() {

        let id = this.props.match.params.id;
        this.getAccountById(id);
    }


    getAccountById = (id) => {

        axios.get(config.serverUrl + '/api/account/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                accountName: response.data.accountName,
                accountType: response.data.accountType,
                balance: response.data.balance,
                notes: response.data.notes
            })
        })
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


    updateAccount = () => {

        let isValid = this.validateAccount();

        if (isValid) {

            let account = {
                id: this.state.id,
                accountName: this.state.accountName,
                accountType: this.state.accountType,
                balance: this.state.balance
            }

            axios.put(config.serverUrl + '/api/account/update', account).then(response=> {
                this.props.history.push('/expense');
            })
        }
    }


    deleteAccount = (id) => {

        axios.delete(config.serverUrl + '/api/account/delete/' + id).then(response=> {
            this.props.history.push('/expense');
        })
    }



    cancelUpdate = () => {
        this.props.history.push('/expense');
    }


    render() {

        let errStyle = {
            color: 'darkred'
        }


        return(
           
           <div id="page-wrapper" class="gray-bg">

            <div id="deleteAccount" class="modal fade" role="dialog">
                
                <div class="modal-dialog">
                    
                    <div class="modal-content">

                          <div class="modal-header">
                            <h4>Delete Category</h4>
                          </div>
                          <div class="modal-body">
                          Are you sure want to delete '{this.state.accountName}' ?
                          </div>

                          <div class="modal-footer">
                            <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                            <button class="btn btn-label btn-danger" onClick={()=>this.deleteAccount(this.state.id)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                          </div>
                        
                      </div>
                  </div>
            </div>

                
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">

                    <h2>Edit Account </h2>
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
                                        <input type="text" class="form-control" name="accountName" onChange={this.onValueChange} value={this.state.accountName}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.accountName}</span>
                                </div>
                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Account Type</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <select name="accountType" class="form-control" onChange={this.onValueChange} value={this.state.accountType}> 
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
                                        name="balance" onChange={this.onValueChange} value={this.state.balance}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.balance}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Notes</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" name="notes" 
                                        onChange={this.onValueChange} value={this.state.notes}/></div>
                                </div>

                                <br/><br/>

                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelUpdate}>Cancel</a>
                                        <button type="button" onClick={this.updateAccount} class="btn btn-success"><i class="fa fa-check icon-white"></i> Update</button>
                                        &nbsp;&nbsp;&nbsp;
                                        <a data-toggle="modal" data-target="#deleteAccount" ><i class="fa fa-trash"></i></a>

                                 
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


export default AccountEdit;
