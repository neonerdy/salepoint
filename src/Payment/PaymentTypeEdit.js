
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import config from '../Shared/Config';


class PaymentTypeEdit extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            id: '',
            paymentTypeName: '',
            description: ''
        }
    }


    componentDidMount() {

        let id = this.props.match.params.id;
        this.getPaymentTypeById(id);
    }   


    
    getPaymentTypeById = (id) => {
        axios.get(config.serverUrl + '/api/paymenttype/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                paymentTypeName: response.data.paymentTypeName,
                description: response.data.description
            })
        }) 
    }



    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    validatePaymentType = () => {

        let isValid = true;
        let error = {};

        if (this.state.paymentTypeName === '') {
            error.paymentTypeName = 'is required';
            isValid = false;
        }
               
        this.setState({
            error: error 
        })

        return isValid;

    }



    updatePaymentType = () => {

        let isValid = this.validatePaymentType();

        if (isValid) {

            let paymentType = {
                id: this.state.id,
                paymentTypeName: this.state.paymentTypeName,
                description: this.state.description
            }

            axios.put(config.serverUrl + '/api/paymenttype/update', paymentType).then(response=> {
                this.props.history.push('/master-data');
            })
        }
    }



    cancelUpdate = () => {
        this.props.history.push('/master-data');
    }


    render() {

        let errStyle = {
            color: 'darkred'
        }


        return(
           
           <div id="page-wrapper" class="gray-bg">
                
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">
                    <h2>Edit Payment Type</h2>
                </div>
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">

                      <br/>
                            <form>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Payment Name</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control" name="paymentTypeName" onChange={this.onValueChange} value={this.state.paymentTypeName}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.paymentTypeName}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Description</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input type="text" class="form-control" name="description" onChange={this.onValueChange} value={this.state.description}/>
                                    </div>
                                </div>
                                <br/><br/>

                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelUpdate}>Cancel</a>&nbsp;
                                        <button type="button" onClick={this.updatePaymentType} class="btn btn-success"><i class="fa fa-check icon-white"></i> Update</button>
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


export default PaymentTypeEdit;
