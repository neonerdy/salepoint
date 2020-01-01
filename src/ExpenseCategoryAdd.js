
import React, {Component} from 'react';
import Footer from './Footer';
import axios from 'axios';
import config from './Config';


class ExpenseCategoryAdd extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            categoryName: '',
            categoryGroup: '',
            budget: '',
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
        
        if (this.state.categoryGroup === '') {
            error.categoryGroup = 'is required';
            isValid = false;
        }

        if (this.state.budget === '') {
            error.budget = 'is required';
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

            let category = {
                categoryName: this.state.categoryName,
                categoryGroup: this.state.categoryGroup,
                budget: this.state.budget
            }

            axios.post(config.serverUrl + '/api/expensecategory/save', category).then(response=> {
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

                    <h2>Add Category</h2>
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
                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Group</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <select name="categoryGroup" class="form-control" onChange={this.onValueChange}> 
                                            <option value="">Select Group</option>
                                            <option value="Bills">Bills</option> 
                                            <option value="Entertainment">Entertainment</option> 
                                        </select>    

                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.categoryGroup}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Budget</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="number" class="form-control" 
                                        name="budget" onChange={this.onValueChange}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.budget}</span>
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
        )

    }


}


export default ExpenseCategoryAdd;
