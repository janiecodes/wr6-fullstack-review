import React, {Component} from 'react';
import {connect} from 'react-redux'

class Feed extends Component {
    render (){
        return(
            <div> 
                {
                !this.props.isLoggedIn 
                ? 
                <div>This is the Feed Component</div> //false
                : 
                <div>Welcome, {this.props.user.username} to the Bird Feeder</div> //true - message for the user that is logged in
                }
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Feed)

//check to see if this.props.isLoggedIn is true or false, if it's false then show them the Feed Component, if it's true show second