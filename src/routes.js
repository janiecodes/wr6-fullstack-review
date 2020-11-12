import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './components/Auth';
import Feed from './components/Feed';
import Form from './components/Form';
//You need a route for each view, so no need for Post bc it just displays the posts
//Auth is our landing page

export default (
    <Switch>
        <Route exact path='/' component={Auth}/> 
        <Route path='/create_post' component={Form}/>
        <Route path='/feed' component={Feed}/>
    </Switch>
)