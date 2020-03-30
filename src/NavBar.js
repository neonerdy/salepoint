
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';


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


    getNavLinkClass = path => {
        return this.props.history.location.pathname === path
            ? "active"
            : "";
    };



    render() {
        return(
            <div>
                <nav class="navbar-default navbar-static-side" role="navigation">
                    <div class="sidebar-collapse">
                        <ul class="nav metismenu" id="side-menu">
                            <li class="nav-header">
                                <div class="logo-element">
                                    CBS
                                </div>
                            </li>
                            <li className={this.getNavLinkClass("/dashboard")}>
                                <Link to="/dashboard"><i class="fa fa-desktop"></i> <span class="nav-label">Dashboards</span></Link>
                            </li>
                           
                            <li className={this.getNavLinkClass("/master-data")}>
                                <Link to="/master-data"><i class="fa fa-th-large"></i> <span class="nav-label">Master Data</span></Link>
                            </li>
                        
                            <li className={this.getNavLinkClass("/employee")}>
                                 <Link to="/employee"><i class="fa fa-star"></i> <span class="nav-label">Employees</span> </Link>
                            </li>
                            
                            <li className={this.getNavLinkClass("/product")}>
                                <Link to="/product"><i class="fa fa-dropbox"></i> <span class="nav-label">Products</span></Link>
                            </li>

                            <li className={this.getNavLinkClass("/partner")}>
                                <Link to="/partner"><i class="fa fa-user"></i> <span class="nav-label">Partners</span></Link>
                            </li>

                            <li className={this.getNavLinkClass("/sales-order")}>
                                <Link to="/sales-order"><i class="fa  fa-briefcase"></i><span class="nav-label"> Point of Sale</span></Link>
                            </li>
                            

                            <li className={this.getNavLinkClass("/purchase-invoice")}>
                                <Link to="/purchase-invoice"><i class="fa fa-calendar-check-o"></i><span class="nav-label"> Purchase Invoice</span></Link>
                            </li>

                            <li className={this.getNavLinkClass("/sales-invoice")}>
                                <Link to="/sales-invoice"><i class="fa fa-files-o"></i><span class="nav-label"> Sales Invoice</span></Link>
                            </li>
                           
                   
                            <li className={this.getNavLinkClass("/payment")}>
                                <Link to="/payment"><i class="fa fa-credit-card"></i> <span class="nav-label">Payments</span></Link>
                            </li>
                            
                            <li className={this.getNavLinkClass("/expense")}>
                                <Link to="/expense"><i class="fa fa-dollar"></i> <span class="nav-label">Expenses</span></Link>
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

export default withRouter(NavBar);