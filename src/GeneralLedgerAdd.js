
import React, {Component} from 'react';
import Footer from './Footer';
import config from './Config';
import axios from 'axios';
import './App.css';
import uuid from 'uuid';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';


class GeneralLedgerAdd extends Component
{
    
    constructor(props) {
        super(props);

        this.ledgerDate = React.createRef()
      
        this.state = {
            error: {},
            accounts: [],
            id: uuid.v4(),
            ledgerCode: '',
            ledgerDate: '',
            description: '',
            amount: 0,
            debet: 0,
            credit: 0,
            totalDebet: 0,
            totalCredit: 0,
            generalLedgerItems: []
        }
    }


    componentDidMount() {
        this.getAccounts();
    }


    getAccounts = () => {

        axios.get(config.serverUrl + '/api/account/getall').then(response=> {
            this.setState({
                accounts: response.data
            })
        })
    }



    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }




    reCalculateTotal = (data) => {

        let totalDebet = 0;
        let totalCredit = 0;
       
        data.map(gli=> 
        {    
            totalDebet +=  parseFloat(gli.debet);
            totalCredit += parseFloat(gli.credit);     

        });
        
        this.setState({
            totalDebet: totalDebet,
            totalCredit: totalCredit 
        })       

    }




    addGeneralLedgerItems = (accountId) => {
      
        axios.get(config.serverUrl + '/api/account/getbyid/' + accountId).then(response=> {

            let generalLedgerItem = {};
            generalLedgerItem.id = uuid.v4();
            generalLedgerItem.generalLedgerId = this.state.id;
            generalLedgerItem.accountId = accountId; 
            generalLedgerItem.accountCode = response.data.accountCode;
            generalLedgerItem.accountName = response.data.accountName;
            generalLedgerItem.debet = this.state.debet;
            generalLedgerItem.credit = this.state.credit;
            
          
            this.setState({
                generalLedgerItems: [...this.state.generalLedgerItems, generalLedgerItem],
                error: {},
                accountId: '',
                debet: 0,
                credit: 0
            })

            this.reCalculateTotal(this.state.generalLedgerItems);
        })       

    }



    removeGeneralLedgerItem = (id) => {

        const data = this.state.generalLedgerItems.filter(gli=> gli.id !== id);
        
        this.setState({
            generalLedgerItems: data,
        })

        this.reCalculateTotal(data);
    }



    validateGeneralLedger = () => {

        let isValid = true;
        let error = {};

      
        if (this.state.ledgerCode === '') {
            error.ledgerCode = 'is required';
            isValid = false;
        }

        if (this.ledgerDate.current.value === '') {
            error.ledgerDate = 'is required';
            isValid = false;
        }

             
        if (this.state.generalLedgerItems.length < 1) {
            error.accountId = 'Account is empty';
            isValid = false;
        }


        this.setState({
            error: error 
        })

        return isValid;

    }




    saveGeneralLedger = () => {

        let isValid = this.validateGeneralLedger();

        if (isValid) {

            let generalLedger = {
                id: this.state.id,
                ledgerCode: this.state.ledgerCode,
                ledgerDate: this.ledgerDate.current.value,
                description: this.state.description,
                status: 'New',                                
                amount: this.state.totalDebet,
                generalLedgerItems: this.state.generalLedgerItems
            }

            axios.post(config.serverUrl + '/api/generalledger/save', generalLedger).then(response=> {
                this.props.history.push('/accounting');
            })

        }
    }





    cancelAdd = () => {
        this.props.history.push('/accounting');
    }




    render()
    {
       
        let errStyle = {
            color: 'darkred'
        }

        let accountList = [];
        
         this.state.accounts.map(p=> {
            let account = {};
            account.id = p.id;
            account.text = p.accountCode + "-" + p.accountName;
            accountList.push(account);
         })


        return(
            <div id="page-wrapper" class="gray-bg">
                
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">

                    <h2>Add General Ledger</h2>
                </div>
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">

                      <br/>
                            <form autoComplete="off">

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Journal #</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="ledgerCode" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.ledgerCode}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Ledger Date</label>
                                    <div class="input-group date col-md-7 col-sm-12 required">
                                        <div class="input-group date" data-provide="datepicker" data-date-autoclose="true" data-date-today-highlight="true">
                                            <input type="text" class="form-control" ref={this.ledgerDate}/>
                                            <div class="input-group-addon">
                                                <span class="fa fa-calendar"></span>
                                            </div>
                                        </div>
                                    </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.ledgerDate}</span>
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Description</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" 
                                        name="description" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.description}</span>
                                </div>

                                <br/>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right',color:'grey'}}><b>Add Account</b></label>
                                

                                <div class="col-md-7 col-sm-12 hr-line-dashed"></div>
                                
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}></label>
                                
                                    <div class="col-md-3 col-sm-12">
                                        <p>Account Name</p>
                                         <Select2 className="form-control"
                                            data={accountList}
                                            onChange={(e) => { this.setState({accountId: e.target.value}) }}
                                            value={this.state.accountId}
                                            options={{
                                                placeholder: 'Select Account',
                                            }}
                                         />
                                   
                                    </div>

                                    <div class="col-md-2 col-sm-12">
                                        <p>Debet</p>
                                         <input name="debet" type="number" class="form-control" onChange={this.onValueChange} value={this.state.debet}/>
                                    </div>

                                    <div class="col-md-2 col-sm-12 required">
                                        <p>Credit</p>
                                         <input name="credit" type="number" class="form-control" onChange={this.onValueChange} value={this.state.credit}/>
                                    </div>
                                    
                                 
                                    <div class="col-md-2 col-sm-1">
                                       
                                        <span style={errStyle}>{this.state.error.accountId}</span>
                                        &nbsp;&nbsp;<a onClick={()=>this.addGeneralLedgerItems(this.state.accountId)} class="btn btn-sm btn-default">
                                         <i class = "fa fa">Add</i></a>
                                    </div>


                                </div>

                          
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}></label>
                                    <div class="col-md-7 col-sm-12">
                                    

                                    <ul class="nav nav-tabs">
                                        <li><a class="nav-link active show" data-toggle="tab" href="#tab-1"><i class="fa fa-puzzle-piece"></i> Items</a></li>
                                    </ul>

                                    <div class="tab-content">
                                        <div id="tab-1" class="tab-pane active show">

                                        <table class="table table-hover table-striped">
                                                <thead>
                                                    <th width="50%" class="text-left">Account Name</th>
                                                    <th width="20%" class="text-right">Debet</th>
                                                    <th width="20%" class="text-right">Credit</th>
                                                    <th></th>
                                                </thead>
                                                <tbody>
                                                    {this.state.generalLedgerItems.map(gli=>
                                                        <tr> 
                                                            <td width="50%">{gli.accountCode}-{gli.accountName}</td>
                                                            <td width="20%" align="right">{gli.debet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                            <td width="20%" align="right">{gli.credit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                            <td align="right">
                                                                <a onClick={()=>this.removeGeneralLedgerItem(gli.id)}><i class="fa fa-trash"></i></a>

                                                            </td>
                                                        </tr>
                                                    )}                           
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>

                                    
                                    </div>
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}></label>
                                    <div class="col-md-7 col-sm-12" style={{textAlign:'right'}}>
                                        <div>Debet : {this.state.totalDebet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div> 
                                        <div>Credit : {this.state.totalCredit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                                    </div>
                                </div>

                                <br/><br/>
                                
                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>
                                        <button type="button" onClick={this.saveGeneralLedger} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
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


export default GeneralLedgerAdd;
