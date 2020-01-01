
import React, {Component} from 'react';


class Employee extends Component
{
    constructor(props) {
        super(props);
    }



    render() {

        const photo = 'api/Resources/' + this.props.photo; 
        
        return(
            <div class="col-lg-4" key={this.props.id}>


                 <div class="contact-box">

                                
                    <a class="row" href="#" onClick={this.props.editEmployee}>

                   
                    <div class="col-4">
                        <div class="text-center">
                            <img alt="image" class="rounded-circle m-t-xs img-fluid" src={photo}/>
                            <div class="m-t-xs font-bold">{this.props.role}</div>
                        </div>
                    </div>
                    <div class="col-8">
                        <h3><strong>{this.props.employeeName}</strong></h3>
                        <p>Join Date : {this.props.joinDate}</p>
                        <address>
                            <strong>Address</strong><br/>
                            {this.props.address} <br/>
                            {this.props.city} <br/><br/>
                            {this.props.phone} <br/>
                            {this.props.email}
                        </address>
                    </div>
                    </a>

                </div>
               

            </div>
        )
    }



}

export default Employee;
