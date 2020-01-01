
import React, {Component} from 'react';
import Footer from './Footer';
import axios from 'axios';
import config from './Config';


class ProductCategoryEdit extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            error: {},
            categoryName: '',
            notes: ''
        }
    }


    componentDidMount() {

        let id = this.props.match.params.id;
        this.getProductCategoryById(id);
    }



    getProductCategoryById = (id) => {

        axios.get(config.serverUrl + '/api/productcategory/getbyid/' + id).then(response=> {
           this.setState({
               id: response.data.id,
               categoryName: response.data.categoryName,
               notes: response.data.notes
           }) 
        }) 
    }



    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    validateProductCategory = () => {

        let isValid = true;
        let error = {};

        if (this.state.categoryName === '') {
            error.categoryName = 'is required';
            isValid = false;
        }
               
        this.setState({
            error: error 
        })

        return isValid;

    }



    updateProductCategory = () => {

        let isValid = this.validateProductCategory();

        if (isValid) {

            let category = {
                id: this.state.id,
                categoryName: this.state.categoryName,
                notes: this.state.notes
            }

            axios.put(config.serverUrl + '/api/productcategory/update', category).then(response=> {
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
                    <h2>Edit Product Category</h2>
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
                                        <input type="text" class="form-control" name="categoryName" onChange={this.onValueChange} value={this.state.categoryName}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.categoryName}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Description</label>
                                    <div class="col-md-7 col-sm-12">
                                        <input type="text" class="form-control" name="notes" onChange={this.onValueChange} value={this.state.notes}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.notes}</span>
                                </div>
                                <br/><br/>

                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelAdd}>Cancel</a>&nbsp;

                                        <button type="button" onClick={this.updateProductCategory} class="btn btn-success"><i class="fa fa-check icon-white"></i> Update</button>
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


export default ProductCategoryEdit;
