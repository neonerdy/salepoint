
import React, {Component} from 'react';

import Footer from '../Shared/Footer';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import config from '../Shared/Config';
import moment from 'moment';
import ExpenseChart from './ExpenseChart';
import Expense from './Expense';
import {Link} from 'react-router-dom';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';



class ExpenseList extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            accounts: [],
            expenseMonth: '',
            expenseData: [],
            expenseColor: [],
            startDate: moment().subtract(29, 'days'),
            endDate: moment()
        }
    }


    componentDidMount() {
      
        this.getExpenses(this.state.startDate.toDate(), this.state.endDate.toDate());
        this.getExpenseChart(this.state.startDate.toDate(), this.state.endDate.toDate());

        this.getAccounts();

        this.setState({
            expenseTitle: moment(this.state.startDate.toDate()).format('MM/DD/YYYY') + ' - ' 
                + moment(this.state.endDate.toDate()).format('MM/DD/YYYY')
        })

    }

    getRandomColor = () => {

        let graphColors = [];

        for(let i=0;i<this.state.expenseData.length;i++) {

            let randomR = Math.floor((Math.random() * 255));
            let randomG = Math.floor((Math.random() * 255));
            let randomB = Math.floor((Math.random() * 255));
    
            let graphBackground = "rgb(" 
                    + randomR + ", " 
                    + randomG + ", " 
                    + randomB + ")";
                
            let hue = Math.floor(Math.random() * 360);
            let pastel = 'hsl(' + hue + ', 100%, 80%)';

            graphColors.push(graphBackground);
        }

        this.setState({
            expenseColor: graphColors
        })
        
    }



    handleDateCallback = (startDate, endDate) => {
        this.setState({ startDate, endDate});
    }


    filterExpense = () => {
        this.getExpenses(this.state.startDate.toDate(), this.state.endDate.toDate());
        this.getExpenseChart(this.state.startDate.toDate(), this.state.endDate.toDate());

        this.setState({
            expenseTitle: moment(this.state.startDate.toDate()).format('MM/DD/YYYY') + ' - ' 
                + moment(this.state.endDate.toDate()).format('MM/DD/YYYY')
        })

    }

    
    


    getExpenseChart  = (startDate, endDate) => {

        var dateRange = {
            startDate: startDate,
            endDate: endDate
        }

        axios.post(config.serverUrl + '/api/expense/getmonthlychart', dateRange).then(response => {
           
            let totalExpenses = 0;

            for(let i=0;i<response.data.length;i++) {
                totalExpenses += parseFloat(response.data[i].amount);
            }

            let expenses=[];

            for(let i=0;i<response.data.length;i++) {
            
                let percentage = ((response.data[i].amount/totalExpenses) * 100).toFixed(0);
                let expense = {};
            
                expense.categoryName = response.data[i].categoryName + ' ( ' + percentage + '% )';
                expense.total = parseFloat(response.data[i].amount);
                
                expenses.push(expense);
            }
            
            this.setState({
                expenseData: expenses
            })

            this.getRandomColor();

        })       
    }




    getExpenses = (startDate, endDate) => {

        var dateRange = {
            startDate: startDate,
            endDate: endDate
        }


        axios.post(config.serverUrl + '/api/expense/getbydate', dateRange).then(response=> {
            this.setState({
                expenses: response.data,
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


    searchExpense = (q) => {

        axios.get(config.serverUrl + '/api/expense/getbysearch/' + q).then(response=> {
            this.setState({
                expenses: response.data,
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

   
    
    onSearchChange = (e) => {

        if (e.key === 'Enter') {
            if (e.target.value === '') 
            {
                this.getExpenses(this.state.startDate.toDate(), this.state.endDate.toDate());   
                this.setState({
                    expenseTitle: moment(this.state.startDate.toDate()).format('MM/DD/YYYY') + ' - ' 
                        + moment(this.state.endDate.toDate()).format('MM/DD/YYYY')
                })
            } 
            else 
            {
                this.searchExpense(e.target.value.toLowerCase());
                this.setState({
                    expenseTitle: 'Search'
                })
            }
        }

    }

  
    render() {

        let dateLabel = this.state.startDate.format('MMMM D, YYYY') + ' - ' + this.state.endDate.format('MMMM D, YYYY'); 
     
        let totalExpenses = 0;
        this.state.expenses.map(e=> 
            totalExpenses += e.amount
        )

        return(
        
              <div id="page-wrapper" class="gray-bg">


                    <div class="row wrapper border-bottom white-bg page-heading">
                        <div class="col-lg-4">

                            <h2>Expenses </h2>
                        </div>
                        <div class="col-lg-8">
                            <div class="title-action">

                                <div class="btn-group">

                                  
                                <DateRangePicker
                                        initialSettings={{
                                        startDate: this.state.startDate.toDate(),
                                        endDate: this.state.endDate.toDate(),
                                        ranges: {
                                            Today: [moment().toDate(), moment().toDate()],
                                            Yesterday: [
                                            moment().subtract(1, 'days').toDate(),
                                            moment().subtract(1, 'days').toDate(),
                                            ],
                                            'Last 7 Days': [
                                            moment().subtract(6, 'days').toDate(),
                                            moment().toDate(),
                                            ],
                                            'Last 30 Days': [
                                            moment().subtract(29, 'days').toDate(),
                                            moment().toDate(),
                                            ],
                                            'This Month': [
                                            moment().startOf('month').toDate(),
                                            moment().endOf('month').toDate(),
                                            ],
                                            'Last Month': [
                                            moment().subtract(1, 'month').startOf('month').toDate(),
                                            moment().subtract(1, 'month').endOf('month').toDate(),
                                            ],
                                        },
                                        }}
                                        onCallback={this.handleDateCallback}
                                    >
                                        <div
                                        id="reportrange"
                                       
                                        style={{
                                            background: '#fff',
                                            cursor: 'pointer',
                                            padding: '5px 10px',
                                            border: '1px solid #ccc',
                                            width: '100%',
                                        }}
                                        >
                                        <i className="fa fa-calendar"></i>&nbsp;
                                        <span>{dateLabel}</span> <i className="fa fa-caret-down"></i>
                                        </div>
                                    </DateRangePicker>
                                   
                                    &nbsp;&nbsp;
                                    <button class="btn btn-default" onClick={this.filterExpense}><i class="fa fa-filter"></i></button>

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
                                                        <p><input type="text" class="form-control" placeholder="Search" onKeyPress={this.onSearchChange}/></p>
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



                                        <ExpenseChart
                                            expenseData = {this.state.expenseData}
                                            expenseColor = {this.state.expenseColor}
                                        />
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
