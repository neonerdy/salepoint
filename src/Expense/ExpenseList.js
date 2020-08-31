
import React, {Component} from 'react';

import Footer from '../Shared/Footer';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import config from '../Shared/Config';
import moment from 'moment';
import ExpenseChart from './ExpenseChart';
import Expense from './Expense';
import {Link} from 'react-router-dom';


class ExpenseList extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            initialExpenses: [],
            expenses: [],
            accounts: [],
            expenseMonth: ''
            
        }
    }


    componentDidMount() {
        
        this.getExpenses();
        this.getAssetAccounts();

        this.setState({
            expenseTitle: this.convertMonth(moment(new Date()).format('MM')) + ' ' + moment(new Date()).format('YYYY')
        })

    }




    getExpenses = () => {

        axios.get(config.serverUrl + '/api/expense/getall').then(response=> {
            this.setState({
                expenses: response.data,
                initialExpenses: response.data
            })

        })
    }

    getAssetAccounts = () => {
        axios.get(config.serverUrl + '/api/account/getall').then(response=> {
            this.setState({
                accounts: response.data
            })

        })
    }



    addExpense = () => {
        this.props.history.push('/add-expense');
    }

    editExpense = (id) => {
        this.props.history.push('/edit-expense/' + id);
    }

    addAccount = () => {
        this.props.history.push('/add-account');
    }

   
    convertMonth = (day) => {
        
        let monthString = '';
        switch(day) {
            case '1' : 
                monthString = 'January';
                break;
            case '2' :
                monthString = 'February';
                break;
            case '3' :
                monthString = 'March';
                break;
            case '4' :
                monthString = 'April';
                break;
            case '5' :
                monthString = 'May';
                break;
            case '6' :
                monthString = 'June';
                break;
            case '7' :
                monthString = 'July';
                break;
            case '8' :
                monthString = 'August';
                break;
            case '9' :
                monthString = 'September';
                break;
            case '10' :
                monthString = 'October';
                break;
            case '11' :
                monthString = 'November';
                break;
            case '12' :
                monthString = 'December';
                break;
            
            default:

        }

        return monthString;
    }


    onMonthChange = (e) => {

        if (e.target.value !== '') {
            this.setState({
                expenseTitle: this.convertMonth(e.target.value) + ' ' + moment(new Date()).format('YYYY')
            })
        }
    }

    onSearchChange = (e) => {

        let filteredExpense = this.state.initialExpenses.filter(expense => expense.categoryName.toLowerCase()
            .includes(e.target.value.toLowerCase()) || 
             expense.date.toLowerCase().includes(e.target.value) ||
             expense.accountName.toLowerCase().includes(e.target.value.toLowerCase()) ||
             expense.ledgerCode.toLowerCase().includes(e.target.value.toLowerCase()));
             
        if (e.target.value === '')
        {
            this.setState( {
                expenses: this.state.initialExpenses
            })
        }
        else {
            this.setState( {
                expenses: filteredExpense
            })
    
        }
        
    }

  
    render() {

        let totalExpenses = 0;
        this.state.expenses.map(e=> 
            totalExpenses += e.amount
        )

        return(
        
              <div id="page-wrapper" class="gray-bg">


                    <div class="row wrapper border-bottom white-bg page-heading">
                        <div class="col-lg-8">

                            <h2>Expenses </h2>
                        </div>
                        <div class="col-lg-4">
                            <div class="title-action">

                                <div class="btn-group">

                                    <select name="expenseMonth" class="form-control" onChange={this.onMonthChange}> 
                                        <option value="">Select Month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                    &nbsp;&nbsp;
                                    <button class="btn btn-default"><i class="fa fa-filter"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    
                                    <Link to="/add-expense" class="btn btn-success">Add New Expense </Link>

                                </div>

                            </div>
                        </div>
                    </div>

                    <br/>
              
                    <div class="row">
                    <div class="col-lg-12">

                        <div class="ibox">

                              <div class="ibox-content">

                              <ul class="nav nav-tabs">
                                    <li><a class="nav-link active show" data-toggle="tab" href="#tab-1">Expense</a></li>
                                    <li><a class="nav-link " data-toggle="tab" href="#tab-2">Account</a></li>
                                </ul>

                           
                                 <div class="tab-content">
                                    <div id="tab-1" class="tab-pane active show">


                                     <div class="row">
                                         
                                        <div class="col-lg-4">
                                            
                                            <div class="ibox ">
                
                                                    <div class="ibox-title">
                                                        <h5>{this.state.expenseTitle}</h5>
                                                    </div>
                                                    <div class="ibox-content ibox-heading">
                                                        <p><input type="text" class="form-control" placeholder="Search" onChange={this.onSearchChange}/></p>
                                                        <h3>{this.state.expenses.length} Expenses, Total : {totalExpenses}</h3>
                                                    </div>

                                                    <Scrollbars style={{ height: 600 }}>

                                                    <div class="ibox-content inspinia-timeline">
                                                            {this.state.expenses.map(e=> 
                                                                <Expense 
                                                                    data = {e}
                                                                    date = {moment(e.date).format('MM/DD/YYYY')}
                                                                    categoryName = {e.categoryName}
                                                                    accountName = {e.accountName}
                                                                    amount = {e.amount}
                                                                    editExpense = {()=>this.editExpense(e.id)}
                                                                />
                                                            )}
                                                        </div>

                                                    </Scrollbars>
                                                

                                                </div>

                                            </div>



                                        <ExpenseChart/>
                                     </div>
                        
                                        
                                    </div>


                                    <div id="tab-2" class="tab-pane show">
                                                               
                                    <br/>
                                    <div class="row">

                                        {this.state.accounts.map(a=> 
                                            
                                            <div class="col-lg-2">
                                                <div class="widget style1">
                                                    <div class="row">
                                                    <div>
                                                        <span>
                                                            <h4>{a.accountName}</h4></span>
                                                        <h2 class="font-bold">{a.balance}</h2>
                                                        <span>Balance</span>
                                                    </div>
                                                
                                                    </div>
                                                </div>
                                            </div>
                                            )}
                                
      
                                         </div>

                                    </div>

                        
                            
                            
                            </div>




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

export default ExpenseList;
