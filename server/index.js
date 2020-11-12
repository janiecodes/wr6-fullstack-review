require('dotenv').config();

const express = require('express');
const massive = require('massive');
const session = require('express-session');
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env;
const app = express();
const auth = require('./controllers/authController')

app.use(express.json());
app.use(session({
    ressave: false,
    saveUnitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log('Hey! Get out of my swamp!')
}).catch(error => console.log(error));

//AUTH ENDPOINTS
app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);
app.post('/auth/logout', auth.logout);
app.get('/api/user', auth.getUser);

app.listen(SERVER_PORT, () => console.log(`Welcome to port ${SERVER_PORT} such a perfect town!`))