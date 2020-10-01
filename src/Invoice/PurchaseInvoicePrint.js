
import React, {Component} from 'react';
import axios from 'axios';
import config from '../Shared/Config';
import moment from 'moment';
import '../App.css';

class PurchaseInvoicePrint extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            setting: {},
            salesInvoices: [],
            id: '',
            invoiceCode: '',
            invoiceDate: '',
            dueDate: '',
            supplierName: '',
            supplierAddress: '',
            supplierCity: '',
            supplierPhone: '',
            purchaseInvoiceItems: [],
            subTotal: 0,
            tax: 0,
            discount: 0,
            total: 0,
            status: '',
         }
        
    }

    componentDidMount() {
   
        this.getSettingById('E8DC5367-D553-4232-E621-08D84993E0DB');
    }


    handleDateCallback = (startDate, endDate) => {
        this.setState({ startDate, endDate});
    }


    getSettingById = (id) => {
       
        axios.get(config.serverUrl + '/api/setting/getById/' + id).then(response=> {
            this.setState({
                setting: response.data
            })

            this.getPurchaseInvoiceDetail(this.props.match.params.id);
        })
    }

    getPurchaseInvoiceDetail = (id) => {

        axios.get(config.serverUrl + '/api/purchaseinvoice/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                invoiceCode: response.data.invoiceCode,
                invoiceDate: response.data.invoiceDate,
                dueDate: response.data.dueDate,
                supplierName: response.data.supplierName,
                supplierAddress: response.data.supplierAddress,
                supplierCity: response.data.supplierCity,
                supplierPhone: response.data.supplierPhone,
                purchaseInvoiceItems: response.data.purchaseInvoiceItems,
                subTotal: response.data.amount,
                tax: response.data.tax,
                discount: response.data.discount,
                total: response.data.total,
                status: response.data.status
            })

        })

    }



    render() {

     
       
      

        return(
       
       
            <div class="fh-breadcrumb">
  
                <div>

                    <br/>

                       <div class="row">

                            <div class="btn-group">
                                <div class="col-lg-8">
                                       
                                </div>
                            </div>

                            <div class="col-lg-4">
                                

                            </div>

                        </div>
                        
                                     
                 <div class="col-lg-12">
                <div class="wrapper wrapper-content animated fadeInRight">
                  
                    <div class="ibox-content p-xl">
                           
                           <table border="0" width="100%">
                                <tr>
                                    <td valign="top">
                                    <div>From:</div><br/>
                                    <div>
                                        <strong>{this.state.supplierName}</strong><br/>
                                        {this.state.supplierAddress} <br/>
                                        {this.state.supplierCity} <br/>
                                        {this.state.setting.supplierPhone}
                                    </div>
                         

                                    </td>
                                    <td valign="top" align="right">

                                    <div>Invoice No : </div>
                                    <div>{this.state.invoiceCode}</div>
                                    <br/>
                                    <div>To:</div><br/>
                                    <div>
                                        <strong>{this.state.setting.companyName}</strong><br/>
                                        {this.state.setting.address} <br/>
                                        {this.state.setting.city} <br/>
                                        {this.state.setting.phone}
                                    </div>
                                    <p>
                                        <span>Invoice Date : {moment(this.state.invoiceDate).format('MM/DD/YYYY')}</span><br/>
                                    </p>

                                    </td>
                                </tr>
                                
                           </table>
                           <p></p>
                           
                            <div class="table-responsive m-t">
                                <table class="table invoice-table" border="1" style={{borderCollapse:'collapse', borderSpacing: '10px'}} width="100%">
                                    <thead>
                                    <tr>
                                        <th align="left">Product Name</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Discount</th>
                                        <th>Tax</th>
                                        <th>Total Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.purchaseInvoiceItems.map(pii=> 
                                    <tr key={pii.id}>
                                        <td>{pii.productName}</td>
                                        <td align="right">{pii.qty}</td>
                                        <td align="right">{pii.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                        <td align="right">{pii.discountPct} %</td>
                                        <td align="right">{pii.taxPct} %</td>
                                        <td align="right">{(pii.qty * pii.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                            <p></p>
                            <table class="table invoice-total" border="0" width="100%">
                                <tbody>
                                <tr>
                                    <td width="90%" align="right"><strong>Sub Total :</strong></td>
                                    <td width="10%" align="right">{this.state.subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                                <tr>
                                    <td align="right"><strong>Tax :</strong></td>
                                    <td align="right">{this.state.tax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                                <tr>
                                    <td align="right"><strong>Discount :</strong></td>
                                    <td align="right">{this.state.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                                <tr>
                                    <td align="right"><strong>Total :</strong></td>
                                    <td align="right">{this.state.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                                </tbody>
                            </table>
                            
                        </div>
                </div>
            </div>

      
                    
                </div>
               
               


            </div>

         

        )
    }


}


export default PurchaseInvoicePrint;