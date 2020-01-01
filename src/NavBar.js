
import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class NavBar extends Component
{

    constructor(props) {
        super(props);
    }

    onEmployeeClicked =()=> {
        this.props.history.push('/employee');
    }

    onOutletClicked =()=> {
        this.props.history.push('/outlet');
    }



    render() {
        return(
            <div>
                <nav class="navbar-default navbar-static-side" role="navigation">
                    <div class="sidebar-collapse">
                        <ul class="nav metismenu" id="side-menu">
                            <li class="nav-header">
                                {/*}
                                <div class="dropdown profile-element">
                                    <img alt="image" class="rounded-circle" src="img/profile_small.jpg"/>
                                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                                        <span class="block m-t-xs font-bold">David Williams</span>
                                        <span class="text-muted text-xs block">Art Director <b class="caret"></b></span>
                                    </a>
                                    <ul class="dropdown-menu animated fadeInRight m-t-xs">
                                        <li><a class="dropdown-item" href="profile.html">Profile</a></li>
                                        <li><a class="dropdown-item" href="contacts.html">Contacts</a></li>
                                        <li><a class="dropdown-item" href="mailbox.html">Mailbox</a></li>
                                        <li class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="login.html">Logout</a></li>
                                    </ul>
                                </div>
                                {*/}
                                <div class="logo-element">
                                    CBS
                                </div>
                            </li>
                            <li>
                                <Link to="/dashboard"><i class="fa fa-desktop"></i> <span class="nav-label">Dashboards</span></Link>
                            </li>
                           
                            <li>
                                <Link to="/master-data"><i class="fa fa-puzzle-piece"></i> <span class="nav-label">Master Data</span></Link>
                            </li>
                        
                            <li>
                                <Link to="/outlet"><i class="fa fa-th-large"></i> <span class="nav-label">Outlets</span></Link>
                            </li>
                        
                        
                            <li>
                            <Link to="/employee"><i class="fa fa-star"></i> <span class="nav-label">Employees</span> </Link>
                            </li>
                            <li>
                                <Link to="/product"><i class="fa fa-dropbox"></i> <span class="nav-label">Products</span></Link>
                            </li>
                            <li>
                                <Link to="/partner"><i class="fa fa-user"></i> <span class="nav-label">Partners</span></Link>
                            </li>
                           
                            <li>
                                <Link to="/sales"><i class="fa fa-shopping-cart"></i> <span class="nav-label">Sales</span></Link>
                            </li>

                            <li>
                                <Link to="/purchase"><i class="fa fa-calendar-check-o"></i> <span class="nav-label">Purchases</span></Link>
                            </li>

                            <li>
                                <Link to="/expense"><i class="fa fa-files-o"></i> <span class="nav-label">Expenses</span></Link>
                            </li>
                            <li>
                               
                            </li>
                            
                            
                            
                            
                        </ul>

                    </div>



                    </nav>

            </div>
        )
    }


}

export default NavBar;