import {createStore} from 'redux';
import reducer from './reducer';
import promiseMiddleware from 'redux-promise-middleware';


export default createStore(reducer, applyMiddleware(promiseMiddleware));
//for async functions it will add pending, fulfilled and rejected
//restaurant analogy: either youre waiting on your food, you got your food or they dont have your food