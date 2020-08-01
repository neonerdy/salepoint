

import React, {Component} from 'react';

class Account extends Component
{

    constructor(props) {
        super(props);
    }

    render() {

        return(
            <div class="col-lg-2">
                <div class="widget style1">
                    <div class="row">
                    <div>
                        <span>{this.props.name}</span>
                        <h2 class="font-bold">{this.props.balance}</h2>
                        <span>Balance</span>
                    </div>
                
                    </div>
                </div>
            </div>
        )
    }


}


export default Account;