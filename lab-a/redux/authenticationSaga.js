import { call, put, select } from 'redux-saga/effects'
import es6promise from 'es6-promise'
import 'isomorphic-unfetch'

import { actionTypes, successLogin, successLogout } from './module/login'
import { exceptionRequest } from './module/exception'

import { loginApi } from '../services/authenticationService'
import redirect from '../util/redirect'
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

export function* logout () {
    // dispatches the CLIENT_UNSET action
    try {
        yield put(successLogout())
        const state = yield select();
        console.log('successLogout after', state)
        // remove our token
        // localStorage.removeItem('token')
        cookies.set('token', false);
    
        // redirect to the /login screen
        // browserHistory.push('/login')
        redirect(false, '/login');
    } catch(error) {

    }
    
}

        
export function * loginSaga(payload) {
    let response;
    try {        
        response = yield call(loginApi, payload); 
        yield put(successLogin(response))
        cookies.set('token', response.token);

        const state = yield select();
        console.log('state after', state)
        // go main page
        let res = response.res;
        redirect(res, '/');
    } catch(error) {
        console.log('loginSaga error');
        yield put({ type: actionTypes.FAILURELOGIN, error });
        // yield put(exceptionRequest(error));
    }
}