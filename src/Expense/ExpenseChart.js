
import React, {Component} from 'react';
import axios from 'axios';
import config from '../Shared/Config';
import {Doughnut} from 'react-chartjs-2';



export class ExpenseChart extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            //expenseData: [],
            expenseColor: [],
        }
    }


    render() {

        let totalExpense = 0;
        this.props.expenseData.map(e=> 
            totalExpense += totalExpense + parseFloat(e.total)    
        )

        const data = {
            labels: this.props.expenseData.map(expense=>expense.categoryName),
            datasets: [{
                data: this.props.expenseData.map(expense=>expense.total),
                backgroundColor: this.props.expenseColor,
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