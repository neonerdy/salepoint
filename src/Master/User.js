
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import moment from 'moment';
import config from '../Shared/Config';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';

class User extends Component
{
    constructor(props) {
        super(props);

        this.state = {
            error: {},
            users: [],
            userId: '',
            userName: ''
        }
    }


    componentDidMount() {
        this.getUsers();
    }


    getUsers =()=> {
        axios.get(config.serverUrl + '/api/user/getall').then(response=> {
            this.setState({
                users: response.data,
            })
     })
    }

    addUser = () => {
        this.props.history.push('/add-user');
    }


    editUser = (id) => {
        this.props.history.push('/edit-user/' + id);
    }


    deleteUser = (id) => {
    
        axios.delete(config.serverUrl + '/api/user/delete/' + id).then(response=> {
            this.getUsers();
        })
    }



    onDeleteUser = (userId, userName) => {
        this.setState({
            userId: userId,
            userName: userName
        })
    }


    viewCompany = () => {
        this.props.history.push('/setting');
    }



    render() {

        
        let errStyle = {
            color: 'darkred'
        }

        return(
            <div id="page-wrapper" class="gray-bg">
                
                <div id="deleteUser" class="modal fade" role="dialog">
                
                <div class="modal-dialog">
                    
                    <div class="modal-content">

                          <div class="modal-header">
                            <h4>Delete User</h4>
                          </div>
                          <div class="modal-body">
                          Are you sure want to delete '{this.state.userName}' ?
                          </div>

                          <div class="modal-footer">
                            <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                            <button class="btn btn-label btn-danger" onClick={()=>this.deleteUser(this.state.userId)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                          </div>
                        
                      </div>
                  </div>
              </div>




            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">
                    <h2>Setting </h2>
                </div>
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">
                                
                                <ul class="nav nav-tabs">
                                    <li><a class="nav-link" data-toggle="tab" href="#tab-1" onClick={this.viewCompany}>Company</a></li>
                                    <li><a class="nav-link active show" data-toggle="tab" href="#tab-2">Users</a></li>
                                </ul>

                                <div class="tab-content">
                                    <div id="tab-1" class="tab-pane">

                                    </div>

                                    <div id="tab-2" class="tab-pane active show">
                                        <div class="title-action">
                                            <button type="button" class="btn btn-w-m btn-default" onClick={this.addUser}>Add New User &nbsp;<i class="fa fa-user-o"></i></button>
                                         </div>
                                         
                                            <ul class="todo-list m-t ui-sortable">

                                                {this.state.users.map(u=> 

                                                    <li key = {u.id}>
                                                        <span class="m-l-xs">{u.employee.employeeName}</span>
                                                        <span class="label label-secondary">{u.employee.jobTitle.jobTitleName}</span>
                                                        
                                                        <small class="float-right">
                                                            <span>{moment(u.createdDate).format("MM/DD/YYYY HH:mm:ss")}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <a onClick={()=>this.editUser(u.id)}><i class="fa fa-edit"></i></a> &nbsp;&nbsp;
                                                            <a data-toggle="modal" data-target="#deleteUser" 
                                                            onClick={()=>this.onDeleteUser(u.id, u.userName)}><i class="fa fa-trash"></i></a>
                                                            &nbsp;&nbsp;
                                                        </small>
                                                    </li>
                                                
                                                )}

                                            </ul>

                                     </div>


                                </div>
                      </div>
                      


                </div>

            
            </div>
            
            
        </div>

        <br/>
        <br/>
        

        <Footer/>

        </div>

        )
    }


}


export default User;
