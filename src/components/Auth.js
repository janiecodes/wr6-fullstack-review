import React, {Component} from 'react';
import axios from 'axios';

class Auth extends Component {
    constructor(){
        super()
        this.state = {
            //hold information from our user
            email: '',
            username: '',
            password: '',
            newUser: false
            //assume when people visit the site, they already have an account
        }
    }

    //this will toggle between true and false
    toggleNewUser = () => {
        this.setState({
            newUser: !this.state.newUser
        })
    }

    //[e.target.name] is in square brackets bc we are pulling the same information from the event itself
    //event is what's happening
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //THE BIG PICTURE WITH DATAFLOW
    //check the controller, we have const {email, password} = req.body
    //body always comes on an object so it's not in arrays 
    login = async (e) => {
        e.preventDefault(); //this stops it from refreshing the page 
        const {email, password} = this.state //capture values on state that my user is typing in
        //to catch errors with async functions, you can put things with try and catch blocks
        //it will attempt the try functionality otherwise go to catch
        try {
            const user = await axios.post('/auth/login', {email, password})
            //we will take the response back from '/auth/login' which is the session (req.session.user)
            alert(user);
            this.props.history.push('/feed') //once they login we will send them directly to the feed page
        }
        catch(error){
            alert(error.response.request.response) //you have to write out the whole thing 
        }
    }

    register = async (e) => {
        e.preventDefault();
        const {email, password, username} = this.state 
        try {
            const user = await axios.post('/auth/register', {email, username, password})
            alert(user.data.username);
            this.props.history.push('/feed') //even after you register, you want to go straight to the feed site
            //props is an object with history, location and match properties
            //history is like an array of different paths on the site
            //will add a new url route to that array and acts like a redirect
            //you could have a link tag, but that will instantly change the route
            //if someone logs in, you dont want a link, bc if there is an error in logging in 
            //inside the try block it will fire one at a time, once logging in is successful props.history.push will redirect
        }
        catch(error){
            alert(error.response.request.response) 
        }
    }

    //a button can't have an onSubmit, so it's best to put it in the form tag
    //onSubmit works with enter so it's better user experience 
    render (){
        const {email, password, username} = this.state
        return(
            <div>
              {this.state.newUser  //looks at newUser to see if it's true or false aka a new user or not
              ? //if newUser is truthy (aka false aka not a newUser) then show them the Register view
               <div>
                   <h3>Register</h3>
                   <form onSubmit={e => this.register(e)}> 
                       <input 
                        name='email' 
                        value={email} 
                        placeholder='Email' 
                        onChange={e => this.changeHandler(e)}
                        />
                        <input 
                        name='username' 
                        value={username} 
                        placeholder='Username' 
                        onChange={e => this.changeHandler(e)}
                        />
                        <input 
                        name='password'
                        type='password' 
                        value={password} 
                        placeholder='Password' 
                        onChange={e => this.changeHandler(e)}
                        />
                        <button>Submit</button> 
                   </form>
                   <button onClick={this.toggleNewUser}>Already a user?</button>
               </div>
              : //otherwise if they are not a new user show them the login user 
              <div>
                  <h3>Login View</h3>
                  <form onSubmit={e => this.login(e)}>
                       <input 
                        name='email' 
                        value={email} 
                        placeholder='Email' 
                        onChange={e => this.changeHandler(e)}
                        />
                        <input 
                        name='password'
                        type='password' 
                        value={password} 
                        placeholder='Password' 
                        onChange={e => this.changeHandler(e)}
                        />
                        <button>Submit</button>
                   </form>
                  <button onClick={this.toggleNewUser}>Need an account?</button>
              </div>
              }
            </div>
        )
    }
}

export default Auth;