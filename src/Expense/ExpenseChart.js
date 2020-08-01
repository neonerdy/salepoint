
import React, {Component} from 'react';
import axios from 'axios';
import config from '../Shared/Config';
import {Doughnut} from 'react-chartjs-2';



export class ExpenseChart extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            expenseData: [],
            expenseColor: [],
        }
    }

    componentDidMount() {
        this.getMonthlyExpenses();
    }

    getMonthlyExpenses  = () => {
        axios.get(config.serverUrl + '/api/expense/getmonthly').then(response => {
           
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




    render() {

        let totalExpense = 0;
        this.state.expenseData.map(e=> 
            totalExpense += totalExpense + parseFloat(e.total)    
        )

        const data = {
            labels: this.state.expenseData.map(expense=>expense.categoryName),
            datasets: [{
                data: this.state.expenseData.map(expense=>expense.total),
                backgroundColor: this.state.expenseColor,
            }]
        };

        return(
            <div class="col-lg-8">
              <div class="ibox ">
                    
                    <div class="ibox-title">
                        <h5>Chart</h5>
                    </div>

                    <div class="ibox-content">
                        <div id="expense">
                              <Doughnut data={data}/>
                        </div>
                        
                    </div> 

                </div>
            </div>

        )
    }



}

export default ExpenseChart;