
import React, {Component} from 'react';
import Footer from './Footer';
import axios from 'axios';
import config from './Config';
import moment from 'moment';

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';



class Accounting extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            accounts: [],
            generalLedgers: [],
            ledgerId: '',
            ledgerCode: ''
        }
    }


    componentDidMount() {

        this.getGeneralLedgers();
        this.getAccounts();    
    }


    getGeneralLedgers = () => {

        axios.get(config.serverUrl + '/api/generalledger/getall').then(response=> {
            this.setState({
                generalLedgers: response.data
            })
        })
    }



    getAccounts = () => {

        axios.get(config.serverUrl + '/api/account/getgrouped').then(response=> {
            
            let accounts = [];

            for(let i=0;i< response.data.length; i++)
            {
                let account = {};
                account.accountType = response.data[i].accountType;
                account.accountItems = response.data[i].accountItems;

                accounts.push(account);
            }
            
            console.log(accounts);
            
            this.setState({
                accounts: accounts
            })
        })
    }


    updateStatus = (id,status) => {

        axios.get(config.serverUrl + '/api/generalledger/updatestatus/' + id + "/" + status).then(response=> {
            this.getGeneralLedgers();
        })

    }


    addGeneralLedger = () => {
        this.props.history.push('/add-general-ledger');
    }

    editGeneralLedger = (id) => {
        this.props.history.push('/edit-general-ledger/' + id);
    }


    deleteGeneralLedger = (id) => {
        axios.delete(config.serverUrl + '/api/generalledger/delete/' + id).then(response=> {
            this.getGeneralLedgers();
        })
    }

    
    onDeleteGeneralLedger = (ledgerId, ledgerCode) => {
        this.setState({
            ledgerId: ledgerId,
            ledgerCode: ledgerCode
        })
    }



    addAccount = () => {
        this.props.history.push('/add-account');
    }

    editAccount = (id) => {
        this.props.history.push('/edit-account/' + id);
    }



    renderStatus = (status) => {

        if (status === 'New') {
            return(
                <span class="label label-warning">{status.toUpperCase()}</span>
            )
        } else if (status === 'Posted') {
            return(
                <span class="label label-primary">{status.toUpperCase()}</span>
            )
        }

    }

    
    render() {

      
        return(
          

            <div id="page-wrapper" class="gray-bg">


                <div id="deleteGeneralLedger" class="modal fade" role="dialog">
                
                  <div class="modal-dialog">
                      
                      <div class="modal-content">

                            <div class="modal-header">
                              <h4>Delete Geenral Ledger</h4>
                            </div>
                            <div class="modal-body">
                            Are you sure want to delete '{this.state.ledgerCode}' ?
                            </div>

                            <div class="modal-footer">
                                <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                                <button class="btn btn-label btn-danger" onClick={()=>this.deleteGeneralLedger(this.state.ledgerId)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                            </div>
                          
                        </div>
                    </div>
                </div>


                    <div class="row wrapper border-bottom white-bg page-heading">
                        <div class="col-lg-8">

                            <h2>Accounting</h2>
                        </div>
                        <div class="col-lg-4">
                            <div class="title-action">

                            <div class="btn-group">
                            <button data-toggle="dropdown" class="btn btn-success dropdown-toggle" aria-expanded="false">Add New</button>
                            <ul class="dropdown-menu" x-placement="bottom-start">
                                <li><a class="dropdown-item" href="#" onClick={this.addGeneralLedger}>General Ledger</a></li>
                                   
                                <li><a class="dropdown-item" href="#" onClick={this.addAccount}>Chart of Account</a></li>
                                </ul>
                        </div>

                            </div>
                        </div>
                    </div>

                <br/>

                <div class="row">
                    <div class="col-lg-12">

                        <div class="ibox">

                              <div class="ibox-content">

                               <ul class="nav nav-tabs">
                                    <li><a class="nav-link active show" data-toggle="tab" href="#tab-1">Geeneral Ledgers ({this.state.generalLedgers.length})</a></li>
                                    <li><a class="nav-link " data-toggle="tab" href="#tab-2">Chart of Accounts ({this.state.accounts.length})</a></li>
                                </ul>

                                <div class="tab-content">
                                    <div id="tab-1" class="tab-pane active show">

                                         <table class="table table-hover table-striped">
                                         
                                            <thead>
                                                <th width="10%">Ledger Number</th>
                                                <th width="10%">Date</th>
                                                <th width="30%">Description</th>
                                                <th width="10%">Amount</th>
                                                <th align="right" width="10%">Status</th>
                                                <th width="15%">Modified Date</th>
                                                <th align="right" width="15%"></th>
                                                
                                            </thead>
                                           
                                            <tbody>
                                                {this.state.generalLedgers.map(gl=> 
                                                <tr>
                                                    <td width="10%">{gl.ledgerCode}</td>
                                                    <td width="10%">{moment(gl.ledgerDate).format('MM/DD/YYYY')}</td>
                                                    <td width="30%">{gl.description}</td>
                                                    <td width="10%">{gl.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                                    <td width="10%">{this.renderStatus(gl.status)}</td>
                                                    <td width="15%">{moment(gl.modifiedDate).format("MM/DD/YYYY hh:mm:ss")}</td>
                                                    <td align="right" width="15%">
                                                    
                                                    
                                                    <a onClick={()=>this.updateStatus(gl.id, "Posted")}><i class="fa fa-check-circle"></i></a>
                                                        &nbsp;&nbsp;&nbsp;
                                                       
                                                        <a onClick={()=>this.editGeneralLedger(gl.id)}><i class="fa fa-edit"></i></a>
                                                        &nbsp;&nbsp;
                                                        <a onClick={()=>this.onDeleteGeneralLedger(gl.id, gl.ledgerCode)} data-toggle="modal" data-target="#deleteGeneralLedger"><i class="fa fa-trash"></i></a>
                                                    
                                                    </td>

                                                </tr>
                                                )}
                                          
                                            </tbody>
                                        </table>

                                    </div>
                                
                                    <div id="tab-2" class="tab-pane show">

                                    <Accordion allowZeroExpanded="true">
                                           
                                         {this.state.accounts.map(a=> 
                                              
                                            <AccordionItem>
                                                <AccordionItemHeading>
                                                    <AccordionItemButton>
                                                    {a.accountType}
                                                    </AccordionItemButton>
                                                </AccordionItemHeading>
                                                <AccordionItemPanel>
                                                    <table class="table">
                                                        <tbody>
                                                            {a.accountItems.map(ai=> 
                                                            <tr>    
                                                                <td>{ai.accountCode} - {ai.accountName}</td>
                                                                <td align="right">
                                                                    <a onClick={()=>this.editAccount(ai.id)}><i class="fa fa-edit"></i></a>
                                                                    &nbsp;&nbsp;
                                                                    <a data-toggle="modal" data-target="#deleteAccount"><i class="fa fa-trash"></i></a>
                                                                </td>
                                                            </tr>
                                                            )}
                                                        </tbody>
                                                      </table>
                           
                                                </AccordionItemPanel>
                                            </AccordionItem>
                                            
                                            )}

                          
                                        </Accordion>

                          
                                    </div>
                                
                                
                                
                                </div>




                              </div>
                              


                        </div>

                    
                    </div>
                    
                    
                </div>

                
                <Footer/>

        </div>



        )
    }


}

export default Accounting;
