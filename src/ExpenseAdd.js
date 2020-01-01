
import React, {Component} from 'react';
import Footer from './Footer';
import axios from 'axios';
import config from './Config';
import moment from 'moment';

class ExpenseAdd extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            today: new Date(), 
            categories: [],
            accounts: [],
            date: '',
            outletId: '00000000-0000-0000-0000-000000000000',
            categoryId: '',
            accountId: '',
            amount: '',
            notes: ''
        }
    }


    componentDidMount() {
        this.getCategories();
        this.getAccounts();
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    
    getCategories = () => {
  
        axios.get(config.serverUrl + '/api/expensecategory/getall').then(response=> {
            this.setState({
                categories: response.data
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

        if (this.state.date === '') {
            error.date = 'is required';
            isValid = false;
        }
        
        if (this.state.categoryId === '') {
            error.categoryName = 'is required';
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


        this.setState({
            error: error 
        })

        return isValid;

    }


    saveExpense = () => {

        let isValid = this.validateExpense();

        if (isValid) {

            let expense = {
                date: this.state.date,
                outletId: this.state.outletId,
                categoryId: this.state.categoryId,
                accountId: this.state.accountId,
                amount: this.state.amount,
                notes: this.state.notes
            }

            console.log(expense);

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
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Date</label>
                                    <div class="input-group date col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control"  
                                            name="date" onChange={this.onValueChange}/>
                                        <span class="input-group-addon"><i class="fa fa-calendar"></i></span>

                                    </div>
                                  &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.date}</span>
                                </div>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Category Name</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <select name="categoryId" class="form-control" onChange={this.onValueChange}> 
                                            <option value="">Select Category</option>
                                            {this.state.categories.map(c=> 
                                                <option value={c.id}>{c.categoryName}</option>
                                            )} 
                                        </select>    
                                      
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.categoryName}</span>
                                </div>
                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Account</label>
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


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Notes</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" 
                                        name="notes" onChange={this.onValueChange}/>
                                    </div>
                                </div>


                                <br/><br/>

                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>
                                        <button type="button" onClick={this.saveExpense} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
                                    </div>

                        


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

