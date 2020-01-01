
import React, {Component} from 'react';
import Footer from './Footer';
import axios from 'axios';
import config from './Config';
import { timingSafeEqual } from 'crypto';


class ExpenseCategoryEdit extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            id: '',
            categoryName: '',
            categoryGroup: '',
            budget: '',
        }
    }


    componentDidMount() {

        let id = this.props.match.params.id;
        this.getExpenseCategoryById(id);

       

    }


    getExpenseCategoryById = (id) => {

        axios.get(config.serverUrl + '/api/expensecategory/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                categoryName: response.data.categoryName,
                categoryGroup: response.data.categoryGroup,
                budget: response.data.budget
            })

            console.log(this.state.categoryName);

           
        })

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


    updateExpenseCategory = () => {

        let isValid = this.validateExpenseCategory();

        if (isValid) {

            let category = {
                id: this.state.id,
                categoryName: this.state.categoryName,
                categoryGroup: this.state.categoryGroup,
                budget: this.state.budget
            }

            axios.put(config.serverUrl + '/api/expensecategory/update', category).then(response=> {
                this.props.history.push('/expense');
            })
        }
    }

    deleteCategory = (id) => {
        
        axios.delete(config.serverUrl + '/api/expensecategory/delete/' + id).then(response=> {
            this.props.history.push('/expense');
        })
    } 



    cancelUpdate = () => {
        this.props.history.push('/expense');
    }


    render() {

        let errStyle = {
            color: 'darkred'
        }


        return(
           
           <div id="page-wrapper" class="gray-bg">


            <div id="deleteCategory" class="modal fade" role="dialog">
                
                <div class="modal-dialog">
                    
                    <div class="modal-content">

                          <div class="modal-header">
                            <h4>Delete Category</h4>
                          </div>
                          <div class="modal-body">
                          Are you sure want to delete '{this.state.categoryName}' ?
                          </div>

                          <div class="modal-footer">
                            <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                            <button class="btn btn-label btn-danger" onClick={()=>this.deleteCategory(this.state.id)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                          </div>
                        
                      </div>
                  </div>
            </div>

                
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">

                    <h2>Edit Category</h2>
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
                                        <input type="text" class="form-control" name="categoryName" onChange={this.onValueChange} value={this.state.categoryName}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.categoryName}</span>
                                </div>
                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Group</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <select name="categoryGroup" class="form-control" onChange={this.onValueChange} value={this.state.categoryGroup}> 
                                            <option value="">Select Group</option>
                                            <option value="Bills">Bills</option> 
                                            <option value="Entertainment">Entertainment</option> 
                                        </select>    

                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.categoryGroup}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Budget</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="number" class="form-control" 
                                        name="budget" onChange={this.onValueChange} value={this.state.budget}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.budget}</span>
                                </div>

                                <br/><br/>

                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelUpdate}>Cancel</a>
                                         <button type="button" onClick={this.updateExpenseCategory} class="btn btn-success"><i class="fa fa-check icon-white"></i> Update</button>
                                         &nbsp;&nbsp;&nbsp;
                                         <a data-toggle="modal" data-target="#deleteCategory" ><i class="fa fa-trash"></i></a>


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


export default ExpenseCategoryEdit;
