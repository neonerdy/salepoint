
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

        this.date = React.createRef()


        this.state = {
            error: {},
            today: new Date(), 
            expenseCategories: [],
            accounts: [],
            id: uuid.v4(),
            date: '',
            expenseCategoryId: '',
            accountId: '',
            amount: '',
            description: ''
        }
    }


    componentDidMount() {
        this.getExpenseCategories();
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


    
    getExpenseCategories = () => {
  
        axios.get(config.serverUrl + '/api/expensecategory/getall').then(response=> {
            this.setState({
                expenseCategories: response.data
            })
        })
    }



    getAccounts = () => {
  
        axios.get(config.serverUrl + '/api/account/getall').then(response=> {
            this.setState({
                accounts: response.data
            })
        })
      }



    validateExpense = () => {

        let isValid = true;
        let error = {};

     
        if (this.date.current.value === '') {
            error.date = 'is required';
            isValid = false;
        }
        
        if (this.state.expenseCategoryId === '') {
            error.expenseCategoryId = 'is required';
            isValid = false;
        }

        if (this.state.accountId === '') {
            error.accountId = 'is required';
            isValid = false;
        }

        if (this.state.amount === '') {
            error.amount = 'is required';
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
          
            let expense = {
                id: this.state.id,
                date: new Date(this.date.current.value),
                categoryId: this.state.expenseCategoryId,
                accountId: this.state.accountId,
                amount: parseFloat(this.state.amount),
                description: this.state.description,
            }

        
            axios.post(config.serverUrl + '/api/expense/save', expense).then(response=> {
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

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Date</label>
                                    <div class="input-group date col-md-7 col-sm-12 required">
                                          <div class="input-group date" data-provide="datepicker" data-date-autoclose="true" data-date-today-highlight="true">
                                                <input type="text" name="date" class="form-control" ref={this.date}/>
                                                <div class="input-group-addon">
                                                    <span class="fa fa-calendar"></span>
                                                </div>
                                           </div>

                                    </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.date}</span>
                                </div>
                                


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Expense Category</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <select name="expenseCategoryId" class="form-control" onChange={this.onValueChange}> 
                                            <option value="">Select Expense</option>
                                            {this.state.expenseCategories.map(e=> 
                                                <option value={e.id}>{e.categoryName}</option>
                                            )} 
                                        </select>    
                                      
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.expenseCategoryId}</span>
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
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.accountId}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Amount</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="number" class="form-control" 
                                        name="amount" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.amount}</span>
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Description</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" 
                                        name="description" onChange={this.onValueChange}/>
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

