
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import config from '../Shared/Config';
import moment from 'moment';
import uuid from 'uuid';
import Switch from 'react-switchery-component';
import 'react-switchery-component/react-switchery-component.css';


class ExpenseAdd extends Component
{

    constructor(props) {
        super(props);

        this.ledgerDateText = React.createRef()


        this.state = {
            error: {},
            today: new Date(), 
            expenses: [],
            accounts: [],
            id: uuid.v4(),
            ledgerCode: '',
            date: '',
            expenseId: '',
            accountId: '',
            amount: '',
            description: '',
            isPosted: true
        }
    }


    componentDidMount() {
        this.getExpenses();
        this.getAccounts();
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onPostChanged = (e) => {
        this.setState({isPosted: e.target.checked})
    }


    
    getExpenses = () => {
  
        axios.get(config.serverUrl + '/api/account/getexpense').then(response=> {
            this.setState({
                expenses: response.data
            })
        })
    }



    getAccounts = () => {
  
        axios.get(config.serverUrl + '/api/account/getasset').then(response=> {
            this.setState({
                accounts: response.data
            })
        })
      }



    validateExpense = () => {

        let isValid = true;
        let error = {};

        
        if (this.state.ledgerCode === '') {
            error.ledgerCode = 'is required';
            isValid = false;
        }

        if (this.ledgerDateText.current.value === '') {
            error.date = 'is required';
            isValid = false;
        }
        
        if (this.state.expenseId === '') {
            error.expenseId = 'is required';
            isValid = false;
        }

        if (this.state.accountId === '') {
            error.accountName = 'is required';
            isValid = false;
        }

        if (this.state.amount === '') {
            error.amount = 'is required';
            isValid = false;
        }

        if (this.state.description === '') {
            error.description = 'is required';
            isValid = false;
        }


        this.setState({
            error: error 
        })

        return isValid;

    }


    saveExpense = () => {

        let isValid = this.validateExpense();

        if (isValid) {

            let ledgerItems = [
                {id: uuid.v4(), generalLedgerId: this.state.id, accountId: this.state.expenseId, debet: parseFloat(this.state.amount), credit:0},
                {id: uuid.v4(), generalLedgerId: this.state.id, accountId: this.state.accountId, debet: 0, credit: parseFloat(this.state.amount)}
            ];

            let generalLedger = {
                id: this.state.id,
                ledgerCode: this.state.ledgerCode,
                ledgerDate: this.ledgerDateText.current.value,
                description: this.state.description,
                amount: parseFloat(this.state.amount),
                status: this.state.isPosted == true ? 'Posted' : 'New',
                generalLedgerItems: ledgerItems
            }

            console.log(generalLedger);

            axios.post(config.serverUrl + '/api/generalledger/save', generalLedger).then(response=> {
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

                    <h2>Add Expense</h2>
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

                        <form autoComplete="off">

                               <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Ledger Code</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="ledgerCode" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.ledgerCode}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Date</label>
                                    <div class="input-group date col-md-7 col-sm-12 required">
                                          <div class="input-group date" data-provide="datepicker" data-date-autoclose="true" data-date-today-highlight="true">
                                                <input type="text" name="date" class="form-control" ref={this.ledgerDateText}/>
                                                <div class="input-group-addon">
                                                    <span class="fa fa-calendar"></span>
                                                </div>
                                           </div>

                                    </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.date}</span>
                                </div>
                                


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Expense Name</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <select name="expenseId" class="form-control" onChange={this.onValueChange}> 
                                            <option value="">Select Expense</option>
                                            {this.state.expenses.map(e=> 
                                                <option value={e.id}>{e.accountName}</option>
                                            )} 
                                        </select>    
                                      
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.expenseId}</span>
                                </div>
                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>From Account</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <select name="accountId" class="form-control" onChange={this.onValueChange}> 
                                            <option value="">Select Account</option>
                                            {this.state.accounts.map(a=> 
                                                <option value={a.id}>{a.accountName}</option>
                                            )} 
                                        </select>    


                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.accountName}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Amount</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="number" class="form-control" 
                                        name="amount" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.amount}</span>
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Description</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="description" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.description}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Post</label>
                                    <div class="col-md-7 col-sm-12">

                                    <Switch
                                        color="#1ab394"
                                        checked={this.state.isPosted}
                                        onChange={this.onPostChanged} />
                                    </div>

                                </div>

                                <br/><br/>

                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>
                                        <button type="button" onClick={this.saveExpense} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
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


export default ExpenseAdd;

