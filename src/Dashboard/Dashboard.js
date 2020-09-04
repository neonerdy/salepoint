
import React, {Component} from 'react';

import NavBar from '../Shared/NavBar';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import config from '../Shared/Config';


class Dashboard extends Component
{
    constructor(props) {
        super(props);
    }


    render()
    {

        return (

            <div id="page-wrapper" class="gray-bg">
                
            <div class="row wrapper border-bottom white-bg page-heading">
                
                <div class="col-lg-8">
                    <h2>Dashboard</h2>
                </div>
                <div class="col-lg-4">
                    <div class="title-action">
                      
                    </div>
                </div>
            </div>

            <div class="wrapper wrapper-content animated fadeInRight">
                    
                        <div class="row">
                    <div class="col-lg-3">
                        <div class="widget style1 red-bg">
                                <div class="row">
                                
                                    <div class="col-8">
                                        <span> PURCHASES </span>
                                        <h2 class="font-bold">6,200</h2>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget style1 navy-bg">
                            <div class="row">
                                
                                <div class="col-8">
                                    <span> SALES</span>
                                    <h2 class="font-bold">14,000</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget style1 lazur-bg">
                            <div class="row">
                            
                                <div class="col-8">
                                    <span> EXPENSES</span>
                                    <h2 class="font-bold">4,500</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="widget style1 yellow-bg">
                            <div class="row">
                                <div class="col-8">
                                    
                                        <div class="row">
                                            <div class="col-8">
                                                <span> PROFIT LOSS</span>
                                                <h2 class="font-bold">9,500</h2>
                                            </div>
                                        </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br/><br/>

            
            </div>

        </div>

        )


    }


}


export default Dashboard;