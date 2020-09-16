
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import config from '../Shared/Config';
import Switch from 'react-switchery-component';
import 'react-switchery-component/react-switchery-component.css';


class RoleAccessAdd extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            roles: [],
            roleId: '',
            isAllowDashboard: true,
            isAllowMasterData: true,
            isAllowEmployee: true,
            isAllowProduct: true,
            isAllowCustomer: true,
            isAllowSupplier: true,
            isAllowPointOfSale: true,
            isAllowPurchaseInvoice: true,
            isAllowSalesInvoice: true,
            isAllowExpense: true,
            isAllowReport: true,
            isAllowUser: true
        }
    }


    componentDidMount() {
        this.getRoles();
    }

    onDashboardChange = (e) =>  {
        this.setState({isAllowDashboard: e.target.checked})
    }

    onMasterDataChange = (e) =>  {
        this.setState({isAllowMasterData: e.target.checked})
    }

    onEmployeeChange = (e) =>  {
        this.setState({isAllowEmployee: e.target.checked})
    }

    onProductChange = (e) =>  {
        this.setState({isAllowProduct: e.target.checked})
    }

    onCustomerChange = (e) =>  {
        this.setState({isAllowCustomer: e.target.checked})
    }

    onSupplierChange = (e) =>  {
        this.setState({isAllowSupplier: e.target.checked})
    }

    onPointOfSaleChange = (e) =>  {
        this.setState({isAllowPointOfSale: e.target.checked})
    }

    onPurchaseInvoiceChange = (e) =>  {
        this.setState({isAllowPurchaseInvoice: e.target.checked})
    }

    onSalesInvoiceChange = (e) =>  {
        this.setState({isAllowSalesInvoice: e.target.checked})
    }

    onExpenseChange = (e) =>  {
        this.setState({isAllowExpense: e.target.checked})
    }

    onReportChange = (e) =>  {
        this.setState({isAllowReport: e.target.checked})
    }

    onUserChange = (e) =>  {
        this.setState({isAllowUser: e.target.checked})
    }



    getRoles = () => {
        axios.get(config.serverUrl + '/api/role/getall').then(response=> {
            this.setState({
                roles: response.data
            })
        })
    }



    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    validateRoleAccess = () => {

        let isValid = true;
        let error = {};

        if (this.state.roleId === '') {
            error.roleId = 'is required';
            isValid = false;
        }

        this.setState({
            error: error 
        })

        return isValid;

    }



    saveRoleAccess = () => {

        let isValid = this.validateRoleAccess();

        if (isValid) {

            let roleAccess = {
                roleId: this.state.roleId,
                isAllowDashboard: this.state.isAllowDashboard,
                isAllowMasterData: this.state.isAllowMasterData,
                isAllowEmployee: this.state.isAllowEmployee,
                isAllowProduct: this.state.isAllowProduct,
                isAllowCustomer: this.state.isAllowCustomer,
                isAllowSupplier: this.state.isAllowSupplier,
                isAllowPointOfSale: this.state.isAllowPointOfSale,
                isAllowPurchaseInvoice: this.state.isAllowPurchaseInvoice,
                isAllowSalesInvoice: this.state.isAllowSalesInvoice,
                isAllowExpense: this.state.isAllowExpense,
                isAllowReport: this.state.isAllowReport,
                isAllowUser: this.state.isAllowUser
            }

            console.log(roleAccess);

            axios.post(config.serverUrl + '/api/roleaccess/save', roleAccess).then(response=> {
                this.props.history.push('/role-access');
            })
        }
    }



    cancelAdd = () => {
        this.props.history.push('/role-access');
    }


    render() {

        let errStyle = {
            color: 'darkred'
        }


        return(
           
           <div id="page-wrapper" class="gray-bg">
                
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">
                    <h2>Add Role Access</h2>
                </div>
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">

                      <br/>
                            <form>


                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Role</label>
                                    
                                    <div class="col-md-7 col-sm-12 required">
                                        <select class="form-control" name="roleId" onChange={this.onValueChange}>
                                            <option value="">Select Role</option>
                                            {this.state.roles.map(r=> 
                                                <option value={r.id} key={r.id}>{r.roleName}</option>
                                            )}
                                        </select>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.roleId}</span>
                                </div>

                                 
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>
                                    Allow Access
                                    </label>
                                    <div class="col-md-7 col-sm-12">
                                    
                                        <table border="0" width="100%" class="table table-striped">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                         <span>Dashboard</span> <p></p>
                                                        <Switch
                                                            color="#1ab394"
                                                            checked={this.state.isAllowDashboard}
                                                            onChange={this.onDashboardChange} />
                                                    </td>
                                                    <td>
                                                        <span>Master Data</span> <p></p>
                                                        <Switch
                                                            color="#1ab394"
                                                            checked={this.state.isAllowMasterData}
                                                            onChange={this.onMasterDataChange} />
                                                    </td>
                                                    <td>
                                                        <span>Employee</span> <p></p>
                                                        <Switch
                                                            color="#1ab394"
                                                            checked={this.state.isAllowEmployee}
                                                            onChange={this.onEmployeeChange} />
                                                    </td>
                                                    <td>
                                                        <span>Product</span> <p></p>
                                                        <Switch
                                                            color="#1ab394"
                                                            checked={this.state.isAllowProduct}
                                                            onChange={this.onProductChange} />
                                                    </td>
                                                    <td>
                                                        <span>Customer</span> <p></p>
                                                        <Switch
                                                            color="#1ab394"
                                                            checked={this.state.isAllowCustomer}
                                                            onChange={this.onCustomerChange} />
                                                    </td>
                                                    <td>
                                                        <span>Supplier</span> <p></p>
                                                        <Switch
                                                            color="#1ab394"
                                                            checked={this.state.isAllowSupplier}
                                                            onChange={this.onSupplierChange} />
                                                    </td>
                                                    


                                                </tr>
                                                

                                                <tr>
                                                     <td>
                                                        <span>Point of Sale</span> <p></p>
                                                        <Switch
                                                            color="#1ab394"
                                                            checked={this.state.isAllowPointOfSale}
                                                            onChange={this.onPointOfSaleChange} />
                                                        </td>
                                                        <td>
                                                            <span>Purchase Invoice</span> <p></p>
                                                            <Switch
                                                                color="#1ab394"
                                                                checked={this.state.isAllowPurchaseInvoice}
                                                                onChange={this.onPurchaseInvoiceChange} />
                                                        </td>
                                                        <td>
                                                            <span>Sales Invoice</span> <p></p>
                                                            <Switch
                                                                color="#1ab394"
                                                                checked={this.state.isAllowSalesInvoice}
                                                                onChange={this.onSalesInvoiceChange} />
                                                        </td>
                                                        <td>
                                                            <span>Expense</span> <p></p>
                                                            <Switch
                                                                color="#1ab394"
                                                                checked={this.state.isAllowExpense}
                                                                onChange={this.onExpenseChange} />
                                                        </td>
                                                        <td>
                                                            <span>Report</span> <p></p>
                                                            <Switch
                                                                color="#1ab394"
                                                                checked={this.state.isAllowReport}
                                                                onChange={this.onReportChange} />
                                                        </td>
                                                        <td>
                                                            <span>User</span> <p></p>
                                                            <Switch
                                                                color="#1ab394"
                                                                checked={this.state.isAllowUser}
                                                                onChange={this.onUserChange} />

                                                        </td>


                                                </tr>
                                                </tbody>
                                               
                                        </table>        


                                    </div>
                                </div>


                           
                                
                                <br/><br/>

                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>&nbsp;

                                        <button type="button" onClick={this.saveRoleAccess} class="btn btn-success"><i class="fa fa-check icon-white"></i> Save</button>
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


export default RoleAccessAdd;
