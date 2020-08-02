
import React, {Component} from 'react';
import Footer from '../Shared/Footer';
import axios from 'axios';
import config from '../Shared/Config';


class UnitEdit extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            unitName: '',
            description: ''
        }
    }


    componentDidMount() {

        let id = this.props.match.params.id;
        this.getUnitById(id);
    }



    getUnitById = (id) => {

        axios.get(config.serverUrl + '/api/unit/getbyid/' + id).then(response=> {
           this.setState({
               id: response.data.id,
               unitName: response.data.unitName,
               description: response.data.description
           }) 
        }) 
    }



    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    validateUnit = () => {

        let isValid = true;
        let error = {};

        if (this.state.unitName === '') {
            error.unitName = 'is required';
            isValid = false;
        }
               
        this.setState({
            error: error 
        })

        return isValid;

    }



    updateUnit = () => {

        let isValid = this.validateUnit();

        if (isValid) {

            let unit = {
                id: this.state.id,
                unitName: this.state.unitName,
                description: this.state.description
            }

            axios.put(config.serverUrl + '/api/unit/update', unit).then(response=> {
                this.props.history.push('/master-data');
            })
        }
    }



    cancelAdd = () => {
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
                    <h2>Edit Unit</h2>
                </div>
            </div>

        <br/>

        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">

                      <br/>
                            <form>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Category Name</label>
                                    <div class="col-md-7 col-sm-12 required">
                                        <input type="text" class="form-control" name="unitName" onChange={this.onValueChange} value={this.state.unitName}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.unitName}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Description</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input type="text" class="form-control" name="description" onChange={this.onValueChange} value={this.state.description}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.description}</span>
                                </div>
                                <br/><br/>

                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>&nbsp;

                                        <button type="button" onClick={this.updateUnit} class="btn btn-success"><i class="fa fa-check icon-white"></i> Update</button>
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


export default UnitEdit;
