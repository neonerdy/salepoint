
import React, {Component} from 'react';
import Footer from './Footer';
import config from './Config';
import axios from 'axios';
import './App.css';

class ProductEdit extends Component
{
    constructor(props) {
        
        super(props);

        this.fileTxt = React.createRef();

        this.state = {
            error: {},
            categories: [],
            id: '',
            productCode: '',
            productName: '',
            picture: '',
            categoryId: '',
            brand: '',
            model: '',
            purchasePrice: '',
            salePrice: '',
            stock: '',
            unit: '',
            description: '',
            displayProgress: '',
            uploadPercentage: '',
            barPercentage: '',
            files: ''
        }
    }


    componentDidMount() {
        
        let id = this.props.match.params.id;
        
        this.getCategories();
        this.getProductById(id);

    }


    getProductById = (id) => {

        axios.get(config.serverUrl + '/api/product/getbyid/' + id).then(response=> {
            this.setState({
                id: response.data.id,
                productCode: response.data.productCode,
                productName: response.data.productName,
                picture: response.data.picture,
                categoryId: response.data.categoryId,
                brand: response.data.brand,
                model: response.data.model,
                purchasePrice: response.data.purchasePrice,
                salePrice: response.data.salePrice,
                stock: response.data.stock,
                unit: response.data.unit,
                description: response.data.description
            })
        })
        
    }
    
    getCategories = () => {
        
        axios.get(config.serverUrl + '/api/productcategory/getall').then(response=> {
            this.setState({
                categories: response.data
            })
        })
    }


    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onFileChange = (e) => {
        this.setState({
            files: e.target.files
        });
    }

    

    validateProduct = () => {

        let isValid = true;
        let error = {};

        if (this.state.productCode === '') {
            error.productCode = 'is required';
            isValid = false;
        }
      
        if (this.state.productName === '') {
            error.productName = 'is required';
            isValid = false;
        }

        if (this.state.picture === '') {
            error.picture = 'is required';
            isValid = false;
        }

        
        if (this.state.categoryId === '') {
            error.categoryId = 'is required';
            isValid = false;
        }

        if (this.state.purchasePrice === '') {
            error.purchasePrice = 'is required';
            isValid = false;
        }

        if (this.state.salePrice === '') {
            error.salePrice = 'is required';
            isValid = false;
        }

        if (this.state.stock === '') {
            error.stock = 'is required';
            isValid = false;
        }

        if (this.state.unit === '') {
            error.unit = 'is required';
            isValid = false;
        }

        this.setState({
            error: error 
        })

        return isValid;

    }

    
    updateProduct = () => {


        let isValid = this.validateProduct();
        
        if (isValid) {

            let product = {
                id: this.state.id,
                productCode: this.state.productCode,
                productName: this.state.productName,
                picture: this.state.picture,
                categoryId: this.state.categoryId,
                brand: this.state.brand,
                model: this.state.model,
                purchasePrice: this.state.purchasePrice,
                salePrice: this.state.salePrice,
                stock: this.state.stock,
                unit: this.state.unit,
                description: this.state.description
            }

            axios.put(config.serverUrl + '/api/product/update', product).then(response=> {
                this.props.history.push('/product');
            })

        }
    
    }


    deleteProduct = (id) => {
        axios.delete(config.serverUrl + '/api/product/delete/' + id).then(response=> {
            this.props.history.push('/product');
        })
    }


    cancelUpdate = () => {
        this.props.history.push('/product');
    }




    doneUpload =()=> {
        
        this.fileTxt.current.value = '';
        this.setState({
            error: {},
            uploadPercentage: '',
            barPercentage: '0%',
            files: ''
        })
    }


    validateUpload = () => {

        let isValid = true;
        let error = {};

        if (this.state.files[0] == undefined) {
            error.fileName = 'File name is required';
            isValid = false;
        }

        this.setState({
            error: error
        })

        return isValid;

    }




    uploadPicture = () => {

        let isValid = this.validateUpload();
        
        if (isValid)
        {
     
            let formData = new FormData();
            
            formData.append('file', this.state.files[0]);

            axios.post(config.serverUrl + "/api/file/uploadfile",
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent)=> {
                    var percentDone = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
                    this.setState({
                        displayProgress: 'true',
                        uploadPercentage: percentDone + "%",
                        barPercentage: percentDone + "%"
                    })
                    
                }
            }
            ).then(()=> {
                    console.log('SUCCESS UPLOAD ATTACHMENT !!');
                    this.setState({
                        picture: this.state.files[0].name
                    })
            })
            .catch(()=> {
                console.log('UPLOAD ATTACHMENT FAILURE !!');
            });
        
        }
         
    }





    render() {


        let errStyle = {
            color: 'darkred'
        }

        return(
            <div id="page-wrapper" class="gray-bg">


            {/* DELETE */}

            <div id="deleteProduct" class="modal fade" role="dialog">
                
                <div class="modal-dialog">
                    
                    <div class="modal-content">

                          <div class="modal-header">
                            <h4>Delete Product</h4>
                          </div>
                          <div class="modal-body">
                          Are you sure want to delete '{this.state.productName}' ?
                          </div>

                          <div class="modal-footer">
                            <a class="btn btn-link text-left" href="#" data-dismiss="modal">Cancel</a>
                            <button class="btn btn-label btn-danger" onClick={()=>this.deleteProduct(this.state.id)} data-dismiss="modal"><label><i class="ti-check"></i></label> YES</button>
                          </div>
                        
                      </div>
                  </div>
            </div>


               {/* ADD PICTURE */}
            
               <div id="addPicture" class="modal fade" role="dialog">
                
                <div class="modal-dialog" style={{width: '600px', height: '100px'}}>
                    
                    <div class="modal-content">

                          <div class="modal-header">
                            <h4>Upload Picture</h4>
                          </div>

                          <div class="modal-body">
                         
                          <div class="modal-body row">
                                    
                            <div class="col-md-12">
                                <div id="divFile" class="form-group">
                                    <input type="file" name="file" onChange={this.onFileChange} class="btn btn-default" style={{width:'380px'}} ref={this.fileTxt}/>  
                                    <br/><br/>
                                    <div class="progress">
                                        <div class="progress-bar progress-bar-success active" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{width: this.state.barPercentage}}></div>
                                    </div>
                                    {this.state.uploadPercentage}
                                 </div>
                                 <span style={errStyle}>{this.state.error.fileName}</span>
                                </div>
                                <div id="errorAddAttachment" class="form-group col-md-12"></div>     
                            </div>

                         
                          </div>

                          <div class="modal-footer">
                             <button type="button" class="btn btn-default pull-left" onClick={this.doneUpload} data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success" id="btnUpload" onClick={this.uploadPicture}>Upload</button>

                          </div>
                        
                      </div>
                  </div>
            </div>


                
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-lg-8">

                    <h2>Edit Product </h2>
                </div>
            </div>

             <br/>


        <div class="row">
            <div class="col-lg-12">

                <div class="ibox">

                      <div class="ibox-content">

                      <br/>
                            <form>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Product Code</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="productCode" onChange={this.onValueChange} value={this.state.productCode}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.productCode}</span>
                                </div>
                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Product Name</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="productName" onChange={this.onValueChange} value={this.state.productName}/>
                                </div>
                                &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.productName}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Picture</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="picture" onChange={this.onValueChange} value={this.state.picture} value={this.state.picture}/>
                                    </div>
                                    <div class="col-md-2 col-sm-1">
                                        <span style={errStyle}>{this.state.error.picture}</span>
                                        &nbsp;&nbsp; <a href="#" class="btn btn-sm btn-default" data-toggle="modal" data-target="#addPicture">Add Picture</a>
                                    </div>
                                </div>
                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Category</label>
                                    
                                    <div class="col-md-7 col-sm-12 required">
                                        <select class="form-control" name="categoryId" onChange={this.onValueChange} value={this.state.categoryId}> 
                                            <option value="">Select Category</option>
                                            {this.state.categories.map(c=> 
                                                <option value={c.id} key={c.id}>{c.categoryName}</option>
                                            )}
                                        </select>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.categoryId}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Brand</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" name="brand" onChange={this.onValueChange} value={this.state.brand}/></div>
                                </div>
                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Model</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" name="model" onChange={this.onValueChange} value={this.state.model}/></div>
                                </div>
                                
                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Purchase Price</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="number" class="form-control" 
                                        name="purchasePrice" onChange={this.onValueChange} value={this.state.purchasePrice}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.purchasePrice}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Sale Price</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="number" class="form-control" 
                                        name="salePrice" onChange={this.onValueChange} value={this.state.salePrice}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.salePrice}</span>
                                </div>

                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Stock</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="number" class="form-control" 
                                        name="stock" onChange={this.onValueChange} value={this.state.stock}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.stock}</span>
                                </div>
                                 
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Unit</label>
                                    <div class="col-md-7 col-sm-12 required"><input type="text" class="form-control" 
                                        name="unit" onChange={this.onValueChange} value={this.state.unit}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={errStyle}>{this.state.error.unit}</span>
                                </div>

                                
                                <div class="form-group  row"><label class="col-md-3 control-label" style={{textAlign:'right'}}>Description</label>
                                    <div class="col-md-7 col-sm-12"><input type="text" class="form-control" name="description" onChange={this.onValueChange} value={this.state.description}/></div>
                                </div>



                                <br/><br/>

                                <div class="hr-line-dashed"></div>
                            

                                <div class="text-right">
                                        <a class="btn btn-link text-left" href="#" onClick={this.cancelUpdate}>Cancel</a>
                                        <button type="button" onClick={this.updateProduct} class="btn btn-success"><i class="fa fa-check icon-white"></i> Update</button>
                                        &nbsp;&nbsp;&nbsp;
                                        <a data-toggle="modal" data-target="#deleteProduct"><i class="fa fa-trash"></i></a>
                                </div>


                            </form>



                      </div>
                      


                </div>

            
            </div>
            
            
        </div>

        <br/><br/>
        
        <Footer/>

        </div>
        )
    }


}

export default ProductEdit;



