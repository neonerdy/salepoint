
import React, {Component} from 'react';


class Product extends Component
{
    constructor(props) {
        super(props);
    }


    render() {

        const picture = 'api/Resources/' + this.props.picture;

        return(
            <div class="col-lg-3" key={this.props.id}>

             
                <div class="contact-box center-version">

                    <a onClick={this.props.editProduct}>
                        <img alt="image" src={picture}/>
                        <h3 class="m-b-xs"><strong>{this.props.productName}</strong></h3>

                        <div class="row  m-t-sm">
                            <div class="col-sm-4">
                                <div class="font-bold">PRICE</div>{this.props.price}
                            </div>
                            <div class="col-sm-4"><div class="font-bold">STOCK</div>{this.props.stock}</div>
                            <div class="col-sm-4"><div class="font-bold">CATEGORY</div>{this.props.categoryName}</div></div>
                    </a>

            </div>
      

        </div>
        )
    }



}

export default Product;
