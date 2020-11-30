
import React, {Component} from 'react';

import Footer from '../Shared/Footer';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import config from '../Shared/Config';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import Header from '../Shared/Header';
import NavBar from '../Shared/NavBar';

class Dashboard extends Component
{
    constructor(props) {
        super(props);
        
        this.state = {
            totalSales: '',
            totalPurchase: '',
            totalExpense: '',
            startDate: moment().subtract(29, 'days'),
            endDate: moment()
        }
    }


    componentDidMount() {

        this.getTotalSales(this.state.startDate.toDate(), this.state.endDate.toDate());
        this.getTotalPurchase(this.state.startDate.toDate(), this.state.endDate.toDate());
        this.getTotalExpense(this.state.startDate.toDate(), this.state.endDate.toDate());
    }


    handleDateCallback = (startDate, endDate) => {
        this.setState({ startDate, endDate});
    }

    
    getTotalPurchase = (startDate, endDate) => {

        var dateRange = {
            startDate: startDate,
            endDate: endDate
        }

        axios.post(config.serverUrl + '/api/purchaseinvoice/gettotalpurchase', dateRange).then(response=> {
            this.setState({
                totalPurchase: response.data,
            })
        })
    }


    getTotalSales = (startDate, endDate) => {

        var dateRange = {
            startDate: startDate,
            endDate: endDate
        }

        axios.post(config.serverUrl + '/api/salesinvoice/gettotalsales', dateRange).then(response=> {
            this.setState({
                totalSales: response.data,
            })
        })
    }



    getTotalExpense = (startDate, endDate) => {

        var dateRange = {
            startDate: startDate,
            endDate: endDate
        }

        axios.post(config.serverUrl + '/api/expense/gettotalexpense', dateRange).then(response=> {
            this.setState({
                totalExpense: response.data,
            })
        })
    }



    filterDashboard = () => {
    
        this.getTotalSales(this.state.startDate.toDate(), this.state.endDate.toDate());
        this.getTotalPurchase(this.state.startDate.toDate(), this.state.endDate.toDate());
        this.getTotalExpense(this.state.startDate.toDate(), this.state.endDate.toDate());
    }





    render()
    {

        let dateLabel = this.state.startDate.format('MMMM D, YYYY') + ' - ' + this.state.endDate.format('MMMM D, YYYY'); 
        let profiltLoss = this.state.totalSales - (this.state.totalPurchase+this.state.totalExpense);

        return (

        <div>
            
            <Header/>
            <NavBar/>

            <div id="page-wrapper" class="gray-bg">
                
            <div class="row wrapper border-bottom white-bg page-heading">
                
                <div class="col-lg-4">
                    <h2>Dashboard</h2>
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
                        <button class="btn btn-default" onClick={this.filterDashboard}><i class="fa fa-filter"></i></button>

                    </div>
                      
                    </div>
                </div>
            </div>

            <div class="wrapper wrapper-content animated fadeInRight">
                    
                        <div class="row">
                    <div class="col-lg-3">
                        <div class="widget style1 red-bg">
                                <div class="row">
                                
                                    <div class="col-8">
                                        <span> PURCHASES </span>
                                            <h2 class="font-bold">{this.state.totalPurchase}</h2>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget style1 navy-bg">
                            <div class="row">
                                
                                <div class="col-8">
                                    <span> SALES</span>
                                    <h2 class="font-bold">{this.state.totalSales}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget style1 lazur-bg">
                            <div class="row">
                            
                                <div class="col-8">
                                    <span> EXPENSES</span>
                                         <h2 class="font-bold">{this.state.totalExpense}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget style1 yellow-bg">
                            <div class="row">
                                <div class="col-8">
                                    
                                        <div class="row">
                                            <div class="col-8">
                                                <span> PROFIT LOSS</span>
                                                <h2 class="font-bold">{profiltLoss}</h2>
                                            </div>
                                        </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br/><br/>

            
            </div>

        </div>

        </div>

        )


    }


}


export default Dashboard;