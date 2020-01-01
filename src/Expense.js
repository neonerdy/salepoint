
import React, {Component} from 'react';


class Expense extends Component
{
    constructor(props) {
        super(props);
    }


    renderOverBudget = (expense) => {

        if (expense.amount > expense.categoryBudget) {
            let overBudget = expense.amount - expense.categoryBudget;
            return(
                <div>
                    <span class="label label-danger">Over Budget</span>
                    &nbsp;&nbsp;
                    <span class="label label-default">+ {overBudget}</span>
                </div>
            )
        }
        

    }


    render() {

        return(
            <div class="timeline-item" style={{cursor: 'pointer'}} onClick={this.props.editExpense}>
            <div class="row">
                <div class="col-4 date">
                    <i class="fa fa-calendar"></i>
                    {this.props.date}
                    <br/>
                    <small class="text-navy">{this.props.categoryGroup.toUpperCase()}</small>
                </div>
                <div class="col content no-top-border">
                    <p class="m-b-xs">{this.props.categoryName} From {this.props.accountName}</p>
                    <p>{this.props.amount}</p>
                    <p> {this.renderOverBudget(this.props.data)}</p>

                </div>
            </div>
        </div>
        )
    }



}

export default Expense;
