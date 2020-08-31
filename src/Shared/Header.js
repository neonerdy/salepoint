

import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Header extends Component
{

 
 
    render() {

        const topStyle = {
            marginBottom: 0
          }

        return(
            <div class="row border-bottom">
            <nav class="navbar navbar-fixed-top" role="navigation" style={topStyle}>
            <div class="navbar-header">
                <a class="navbar-minimalize minimalize-styl-2 btn btn-primary" href="#"><i class="fa fa-bars"></i></a>
            </div>
        
                <ul class="nav navbar-top-links navbar-right">

                    '<li>
                        <span class="m-r-sm text-muted welcome-message">
                            Erika Kartawidjaja</span>
                    </li>

                    <li class="dropdown">
                            <Link to="/setting"><i class="fa fa-gear"></i></Link>
                  </li>

                  
                   <li>
                      <i class="fa fa-user-o"></i> 
                   </li>
                   <li>
                        <a href="login.html">
                            Log out
                        </a>

                    </li>
                   

                </ul>

            </nav>

        </div>
        )
    }


}

export default Header;