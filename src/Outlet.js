
import React, {Component} from 'react';


class Outlet extends Component
{
    constructor(props) {
        super(props);
    }





    render() {

        const photo = 'api/Resources/' + this.props.photo; 
             
        return(
           
            <div class="col-lg-4" style={{cursor:'pointer'}} onClick={this.props.editOutlet}>

                           
                <div class="ibox">
                    <div class="ibox-title">
                        <h5>{this.props.outletName.toUpperCase()}</h5>
                        <div class="ibox-tools">
                        </div>

                    </div>
                    <div class="ibox-content">
                                                
                        <div class="team-members">
                            {this.props.outletEmployees.map(oe=> 
                                <img alt="member" class="rounded-circle" src={`api/Resources/${oe.photo}`} />
                            )}
                            
                        </div>

                        <p>
                            {this.props.address} <br/>
                            {this.props.city}, {this.props.province}<br/><br/>
                        </p>

                        <div class="row  m-t-sm">
                                <div class="col-sm-4">
                                    <div class="font-bold">DAILY</div>
                                    {this.props.daily}
                                </div>
                                <div class="col-sm-4">
                                    <div class="font-bold">MONTHLY</div>
                                    {this.props.monthly}
                                </div>
                                <div class="col-sm-4 text-right">
                                    <div class="font-bold">YEARLY</div>
                                    {this.props.yearly}
                                </div>
                            </div>


                    </div>
                </div>
             
            </div>

        )
    }



}

export default Outlet;
