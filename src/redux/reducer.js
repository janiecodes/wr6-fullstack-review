import axios from 'axios'; //for the getUser function


const initialState= {
    user: {},
    isLoggedIn: false
}

//we will write a function that will change this portion of state to check if a user is logged in
//Action Type
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const GET_USER = "GET_USER";

export function loginUser(user){
    return {
        type: LOGIN_USER,
        payload: user //payload is the same thing we pass in
    }
}
//a dispatch is creating an action 
//loginUser is being invoked in Auth with (user.data)
//payload is the user session


export function logoutUser(){
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

//this is looking for our user session
export function getUser(){
    const user = axios.get('/api/user')
    .then(res => res.data) //then user will equal the data
    return {
        type: GET_USER,
        payload: user //this user comes from the axios call itself not as a parameter
    }
}



//OUR MIDDLEWARE ALL THESE THINGS BELOW
//actions are objects with a type and a payload
//switch is like an if else statement
export default function(state = initialState, action){
    switch(action.type){ 
        case LOGIN_USER:
            return {...state, user: action.payload, isLoggedIn: true} 
            //redux state is immutable so when you do this it creates a whole NEW OBJECT
            //that's why ...state just says copy the info from before but change just user and isLoggedIn
        
            case LOGOUT_USER:
            return {...state, ...action.payload} 
            //payload is initialState so it will set isLoggedIn back to false

        case GET_USER + '_PENDING':
            return state
        case GET_USER + '_FULFILLED': //similar to the login function
            return {...state, user: action.payload, isLoggedIn: true}
        case GET_USER + '_REJECTED':
            return initialState //if the user gets rejected just go back to initialState
        
            default: //if we receive an action and it doesnt match an action.type in our switch case then leave state as is
            return state
    }
}

//it compares initialState and an action as an argument
//if action.type matches one of those cases, then it returns what it matched
//usually a copy of state {...state} and then overriding