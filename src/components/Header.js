import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logoutUser, getUser} from '../redux/reducer';
import axios from 'axios';

//we wont use state but we will use lifecycle methods, and that's why it's a Class Component
//no matter which view, you always want the header to show (can be in App.js or Header Component)
class Header extends Component {

    componentDidMount = () => {
        this.props.getUser();
    }

    logout = () => {
        axios.post('/auth/logout') //invoke axios to destroy the session
        this.props.logoutUser(); //when the user pushes the Logout Button it will log them out
        // this.props.history.push('/') //and then send them back to the homepage
    }
    render(){
        return(
            <header>
                <ul>
                    <li><Link to='/'>Login</Link></li>
                    <li><Link to='/feed'>Bird Feeder</Link></li> 
                    <li><Link to='/create_post'>Create Post</Link></li>
                </ul>

                {this.props.isLoggedIn //if isLoggedIn is true then give the user the option for the logout button
                ?
                <button onClick={this.logout}>Logout</button>
                : null //otherwise no logout button
                }

            </header>
        )
    }
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {logoutUser}, {getUser})(Header);
//add the functions are it wont have access to it on props