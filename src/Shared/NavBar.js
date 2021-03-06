
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';


class NavBar extends Component
{

    constructor(props) {
        super(props);
    }

    
    componentDidMount() {
        
        //this.props.history.push('/dashboard');

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
                          
                            <li className={this.getNavLinkClass("/dashboard")}>
                                <Link to="/dashboard"><i class="fa fa-th-large"></i> <span class="nav-label">Dashboards</span></Link>
                            </li>
                           
                            <li className={this.getNavLinkClass("/master-data")}>
                                <Link to="/master-data"><i class="fa fa-folder-o"></i> <span class="nav-label">Master Data</span></Link>
                            </li>
                        
                            <li className={this.getNavLinkClass("/employee")}>
                                 <Link to="/employee"><i class="fa fa-star"></i> <span class="nav-label">Employees</span> </Link>
                            </li>
                            
                            <li className={this.getNavLinkClass("/product")}>
                                <Link to="/product"><i class="fa fa-dropbox"></i> <span class="nav-label">Products</span></Link>
                            </li>

                            <li className={this.getNavLinkClass("/customer")}>
                                <Link to="/customer"> <i class="fa fa-id-card-o"></i> <span class="nav-label">Customers</span></Link>
                            </li>

                            <li className={this.getNavLinkClass("/supplier")}>
                                <Link to="/supplier"><i class="fa fa-user"></i> <span class="nav-label">Suppliers</span></Link>
                            </li>

                           
                            <li className={this.getNavLinkClass("/pos")}>
                                <Link to="/pos"><i class="fa fa-television"></i><span class="nav-label"> Point of Sale</span></Link>
                            </li>
                            
                            <li className={this.getNavLinkClass("/sales-invoice")}>
                                <Link to="/sales-invoice"><i class="fa fa-files-o"></i><span class="nav-label"> Sales Invoice</span></Link>
                            </li>
                           
                            <li className={this.getNavLinkClass("/purchase-invoice")}>
                                <Link to="/purchase-invoice"><i class="fa fa-calendar-check-o"></i><span class="nav-label"> Purchase Invoice</span></Link>
                            </li>
                            
                            <li className={this.getNavLinkClass("/expense")}>
                                <Link to="/expense"><i class="fa fa-dollar"></i> <span class="nav-label">Expenses</span></Link>
                            </li>

                            <li className={this.getNavLinkClass("/product-rpt")}>
                                <Link to="/product-rpt"><i class="fa fa-archive"></i> <span class="nav-label">Reports</span></Link>
                            </li>
  
                            
                            
                            
                        </ul>

                    </div>



                    </nav>

            </div>
        )
    }


}

export default withRouter(NavBar);