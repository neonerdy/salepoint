
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import config from '../Shared/Config';


class SettingEdit extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            id: '',
            settingName: '',
            value: '',
            description: ''
        }
    }


    componentDidMount() {

        let id = this.props.match.params.id;
        this.getSettingById(id);
    }   


    
    getSettingById = (id) => {
        axios.get(config.serverUrl + '/api/setting/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                settingName: response.data.settingName,
                value: response.data.value,
                description: response.data.description
            })
        }) 
    }



    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    validateSetting = () => {

        let isValid = true;
        let error = {};

        if (this.state.settingName === '') {
            error.settingName = 'is required';
            isValid = false;
        }

        if (this.state.value === '') {
            error.value = 'is required';
            isValid = false;
        }
               
        this.setState({
            error: error 
        })

        return isValid;

    }



    updateSetting = () => {

        let isValid = this.validateSetting();

        if (isValid) {

            let setting = {
                id: this.state.id,
                settingName: this.state.settingName,
                value: this.state.value,
                description: this.state.description
            }

            axios.put(config.serverUrl + '/api/setting/update', setting).then(response=> {
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
                    <h2>Edit Setting</h2>
                </div>
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">

                      <br/>
                            <form>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Setting Name</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control" name="settingName" onChange={this.onValueChange} value={this.state.settingName} disabled/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.settingName}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Value</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control" name="value" onChange={this.onValueChange} value={this.state.value}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.value}</span>
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
                                        <button type="button" onClick={this.updateSetting} class="btn btn-success"><i class="fa fa-check icon-white"></i> Update</button>
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


export default SettingEdit;
