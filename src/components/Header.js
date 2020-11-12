import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//we wont use state but we will use lifecycle methods, and that's why it's a Class Component
class Header extends Component {
    render(){
        return(
            <header>
                <ul>
                    <li><Link to='/'>Login</Link></li>
                    <li><Link to='/feed'>Bird Feeder</Link></li> 
                    <li><Link to='/create_post'>Create Post</Link></li>
                </ul>
            </header>
        )
    }
}

export default Header;