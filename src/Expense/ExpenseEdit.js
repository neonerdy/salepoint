
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import config from '../Shared/Config';
import moment from 'moment';
import uuid from 'uuid';
import Switch from 'react-switchery-component';
import 'react-switchery-component/react-switchery-component.css';
import Header from '../Shared/Header';
import NavBar from '../Shared/NavBar';


class ExpenseEdit extends Component
{

    constructor(props) {
        super(props);

        this.date = React.createRef()


        this.state = {
            error: {},
            today: new Date(), 
            expenseCategories: [],
            accounts: [],
            id: uuid.v4(),
            date: '',
            expenseCategoryId: '',
            accountId: '',
            amount: '',
            description: '',
            createdDate: '',
            modifiedDate: ''
        }
    }


    componentDidMount() {

        let id = this.props.match.params.id;

        this.getExpenseCategories();
        this.getAccounts();
        this.getExpenseById(id);
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onPostChanged = (e) => {
        this.setState({isPosted: e.target.checked})
    }


    getExpenseById = (id) => {
  
        axios.get(config.serverUrl + '/api/expense/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                date: response.data.date,
                expenseCategoryId: response.data.categoryId,
                accountId: response.data.accountId,
                amount: response.data.amount,
                currentAmount: response.data.amount,
                description: response.data.description,
                createdDate: response.data.createdDate,
                modifiedDate: response.data.modifiedDate
            })
        })
    }
    

    
    getExpenseCategories = () => {
  
        axios.get(config.serverUrl + '/api/expensecategory/getall').then(response=> {
            this.setState({
                expenseCategories: response.data
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

     
        if (this.date.current.value === '') {
            error.date = 'is required';
            isValid = false;
        }
        
        if (this.state.expenseCategoryId === '') {
            error.expenseCategoryId = 'is required';
            isValid = false;
        }

        if (this.state.accountId === '') {
            error.accountId = 'is required';
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


    updateExpense = () => {

        let isValid = this.validateExpense();

        if (isValid) {
          
            let expense = {
                id: this.state.id,
                date: new Date(moment(this.date.current.value).add(1,'d')),
                categoryId: this.state.expenseCategoryId,
                accountId: this.state.accountId,
                amount: parseFloat(this.state.amount),
                currentAmount: parseFloat(this.state.currentAmount),
                description: this.state.description,
                createdDate: this.state.createdDate,
                modifiedDate: this.state.modifiedDate
            }

        
            axios.put(config.serverUrl + '/api/expense/update', expense).then(response=> {
                this.props.history.push('/expense');
            })

        }
    }



    deleteExpense = (id) => {

        axios.delete(config.serverUrl + '/api/expense/delete/' + id).then(response=> {
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

            <div>

                <Header/>
                <NavBar/>
                
                <div id="page-wrapper" class="gray-bg">

                    <div id="deleteExpense" class="modal fade" role="dialog">
                    
                    <div class="modal-dialog">
                        
                        <div class="modal-content">

                            <div class="modal-header">
                                <h4>Delete Expense</h4>
                            </div>
                            <div class="modal-body">
                            Are you sure want to delete this expense ?
                            </div>

                            <div class="modal-footer">
                                <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                                <button class="btn btn-label btn-danger" onClick={()=>this.deleteExpense(this.state.id)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                            </div>
                            
                        </div>
                    </div>

                </div>

                    
                <div class="row wrapper border-bottom white-bg page-heading">
                    <div class="col-lg-8">

                        <h2>Update Expense</h2>
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

                            <form autoComplete="off">

                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Date</label>
                                        <div class="input-group date col-md-7 col-sm-12 required">
                                            <div class="input-group date" data-provide="datepicker" data-date-autoclose="true" data-date-today-highlight="true">
                                                    <input type="text" name="date" class="form-control" ref={this.date} 
                                                    value={moment(this.state.date).format("MM/DD/YYYY")}/>
                                                    <div class="input-group-addon">
                                                        <span class="fa fa-calendar"></span>
                                                    </div>
                                            </div>

                                        </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.date}</span>
                                    </div>
                                    


                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Expense Category</label>
                                        <div class="col-md-7 col-sm-12 required">
                                            <select name="expenseCategoryId" class="form-control" onChange={this.onValueChange}
                                                value={this.state.expenseCategoryId} disabled> 
                                                <option value="">Select Expense</option>
                                                {this.state.expenseCategories.map(e=> 
                                                    <option value={e.id}>{e.categoryName}</option>
                                                )} 
                                            </select>    
                                        
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.expenseCategoryId}</span>
                                    </div>
                                    
                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>From Account</label>
                                        <div class="col-md-7 col-sm-12 required">
                                            <select name="accountId" class="form-control" onChange={this.onValueChange} value={this.state.accountId} disabled> 
                                                <option value="">Select Account</option>
                                                {this.state.accounts.map(a=> 
                                                    <option value={a.id}>{a.accountName}</option>
                                                )} 
                                            </select>    


                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.accountId}</span>
                                    </div>

                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Amount</label>
                                        <div class="col-md-7 col-sm-12 required"><input type="number" class="form-control" 
                                            name="amount" onChange={this.onValueChange} value={this.state.amount}/>
                                        </div>
                                        &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.amount}</span>
                                    </div>


                                    <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Description</label>
                                        <div class="col-md-7 col-sm-12"><input type="text" class="form-control" 
                                            name="description" onChange={this.onValueChange} value={this.state.description}/>
                                        </div>
                                    </div>

                                    <br/><br/>

                                    <div class="hr-line-dashed"></div>
                                

                                    <div class="text-right">
                                            <a class="btn btn-link text-left" href="#" onClick={this.cancelUpdate}>Cancel</a>
                                            <button type="button" onClick={this.updateExpense} class="btn btn-success"><i class="fa fa-check icon-white"></i> Update</button>
                                            &nbsp;&nbsp;&nbsp;
                                            <a data-toggle="modal" data-target="#deleteExpense"><i class="fa fa-trash"></i></a>
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


export default ExpenseEdit;

