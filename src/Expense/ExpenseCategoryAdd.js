
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import config from '../Shared/Config';
import Header from '../Shared/Header';
import NavBar from '../Shared/NavBar';


class ExpenseCategoryAdd extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            categoryName: '',
            monthlyBudget: '',
            description: ''
        }
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    validateExpenseCategory = () => {

        let isValid = true;
        let error = {};

        
        if (this.state.categoryName === '') {
            error.categoryName = 'is required';
            isValid = false;
        }
        
        if (this.state.monthlyBudget === '') {
            error.monthlyBudget = 'is required';
            isValid = false;
        }

        this.setState({
            error: error 
        })

        return isValid;

    }


    saveExpenseCategory = () => {

        let isValid = this.validateExpenseCategory();

        if (isValid) {

            let expenseCategory = {
                categoryName: this.state.categoryName,
                monthlyBudget: parseFloat(this.state.monthlyBudget),
                description: this.state.description,
            }

            axios.post(config.serverUrl + '/api/expensecategory/save', expenseCategory).then(response=> {
                this.props.history.push('/master-data');
            })
        }
    }



    cancelAdd = () => {
        this.props.history.push('/master-data');
    }


    render() {

        let errStyle = {
            color: 'darkred'
        }


        return(

            <div>
        
                <Header/>
                <NavBar/>
        
            <div id="page-wrapper" class="gray-bg">
                    
                <div class="row wrapper border-bottom white-bg page-heading">
                    <div class="col-lg-8">
                        <h2>Add Expense Category</h2>
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
                                <form>

                                    
                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Category Name</label>
                                        <div class="col-md-7 col-sm-12 required">
                                            <input type="text" class="form-control" name="categoryName" onChange={this.onValueChange}/>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.categoryName}</span>
                                    </div>
                            
                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Monthly Budget</label>
                                        <div class="col-md-7 col-sm-12 required"><input type="number" class="form-control" 
                                            name="monthlyBudget" onChange={this.onValueChange}/>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.monthlyBudget}</span>
                                    </div>

                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Description</label>
                                        <div class="col-md-7 col-sm-12"><input type="text" class="form-control" name="description" onChange={this.onValueChange}/></div>
                                    </div>

                                    <br/><br/>

                                    <div class="hr-line-dashed"></div>
                                

                                    <div class="text-right">
                                            <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>
                                            <button type="button" onClick={this.saveExpenseCategory} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
                                        </div>


                                </form>



                        </div>
                        


                    </div>

                
                </div>
                
                
            </div>

            
            <Footer/>

            </div>

        
        </div>
        
        )

    }


}


export default ExpenseCategoryAdd;
