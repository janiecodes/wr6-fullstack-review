const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');

        //what info do I need from the front end from the user to register
        const { email, username, password} = req.body

        //first thing to do in a register is to check to see if the user already exists
        //create the SQL file - check_user.sql
        const foundUser = await db.check_user(email);
        if(foundUser[0]){ //async await informs our program that we are expecting to receive a promise - like a server promising they will come back with the food
            return res.status(400).send("Email already registered")
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        //create another SQL file - add_user.sql
        const [newUser] = await db.add_user([email, username, hash]) //when you add multiple parameters from SQL, then you need to do it in an array
        req.session.user = {
            userId: newUser.user_id,
            email: newUser.email,
            username: newUser.username
        }
        res.status(200).send(req.session.user);
        //after this handler, we create the endpoint in index.js then test in postman
    },

    login: async (req, res) => {
        const db = req.app.get('db');
        const {email, password} = req.body;
        const [foundUser] = await db.check_user(email);

        //this will be the opposite to make sure the user DOES exist
        if(!foundUser){ //if foundUser is undefined or falsy
            return res.status(401).send("Incorrect login information")
        }

        //if the foundUser is defined, let's compare passwords 
        const authenticated = bcrypt.compareSync(password, foundUser.password)
        if(authenticated){ //if the passwords match - password and foundUser.password
            req.session.user = { //foundUser is the user we have on the database
                userId: foundUser.user_id,
                email: foundUser.email,
                username: foundUser.username
            }
            res.status(200).send(req.session.user) //end goal is to always send the session back to the frontend 
        }else{ //if authenticated is false aka the passwords don't match
            res.status(401).send("Incorrect login information")
        }
        //now create an endpoint for logging in
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
        //now build endpoint in index.js
    },

    getUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        }else{
            res.status(404).send("Please login")
        }
        //now build endpoint in index.js
    }
}

//after building the endpoints, you can start with frontend
//install the frontend dependencies listed in the plan
//axios, react-router-dom, redux, react-redux, redux-promise-middleware
//create a routes file in the src folder
//then add a components folder now with your components