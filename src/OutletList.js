
import React, {Component} from 'react';

import NavBar from './NavBar';
import Header from './Header';
import Footer from './Footer';
import Outlet from './Outlet';
import config from './Config';

import axios from 'axios';

class OutletList extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            outlets: [],
        }
    }


    componentDidMount() {
        
        window.scrollTo(0, 0);
        this.getOutlets();
    }
 

    getOutlets = () => {

        axios.get(config.serverUrl + '/api/outlet/getall').then(response=> {
            this.setState({
                outlets: response.data
            })

            console.log(response.data);

        })
        
    }


    addOutlet = () => {
        this.props.history.push('/add-outlet');
    }

    editOutlet = (id) => {
        this.props.history.push('/edit-outlet/' + id);
    }

    
    render() {
        return(
            <div id="wrapper">

            <div id="page-wrapper" class="gray-bg">
                
                    <div class="row wrapper border-bottom white-bg page-heading">
                        <div class="col-lg-8">
                            <h2>Outlets ({this.state.outlets.length})</h2>
                        
                        </div>
                        <div class="col-lg-4">
                            <div class="title-action">
                                <a href="#" onClick={this.addOutlet} class="btn btn-success">Add New Outlet </a>
                            </div>
                        </div>
                    </div>



                <div class="row">
                    
                    <div class="col-lg-12">
                        <div class="wrapper wrapper-content animated fadeInRight">
                        
                        <div class="row">

                             {this.state.outlets.map(o=>        
                                <Outlet id = {o.id}  
                                    outletName = {o.outletName} 
                                    address = {o.address} 
                                    phone = {o.phone}
                                    city = {o.city}
                                    province = {o.province}
                                    outletEmployees = {o.outletEmployees}
                                    daily = "0"
                                    monthly = "0"
                                    yearly = "0"
                                    editOutlet = {()=>this.editOutlet(o.id)}
                                />
                                )}

                                
                                


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

export default OutletList;