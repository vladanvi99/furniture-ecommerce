import {
    USER_DELETE_FAIL,
    USER_DELETE_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_EDIT_FAIL,
    USER_EDIT_REQUEST,
    USER_EDIT_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNOUT,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from "../constants/userConstants"
import { API } from "../../config";

export const signin = (email, password) => (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}})
    fetch(`${API}/api/users/signin`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(response => response.json())
        .then(data => {
            if(data.message) {
                dispatch({type: USER_SIGNIN_FAIL, payload: data.message})
            } else {
                dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
                localStorage.setItem('userInfo', JSON.stringify(data));
            }
        })
}

export const signout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({type: USER_SIGNOUT})
}

export const register = (name, email, password) => (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, email, password}})
    fetch(`${API}/api/users/register`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({name, email, password})
    })
        .then(response => response.json())
        .then(data => {
            if(data.message) {
                dispatch({type: USER_REGISTER_FAIL, payload: data.message})
            } else {
                dispatch({type: USER_REGISTER_SUCCESS, payload: data});
                dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
                localStorage.setItem('userInfo', JSON.stringify(data));
            }
        })
}

export const userDetails = (id) => (dispatch, getState) => {
    dispatch({type: USER_DETAILS_REQUEST, payload: id})
    fetch(`${API}/api/users/${id}`)
        .then(response => response.json())
        .then(data => {
            if(data.message) {
                dispatch({type: USER_DETAILS_FAIL, payload: data.message})
            } else {
                dispatch({type: USER_DETAILS_SUCCESS, payload: data});
            }
        })
}

export const updateProfile = (user) => (dispatch, getState) => {
    const { userSignIn: { userInfo } } = getState();
    dispatch({type: USER_UPDATE_REQUEST, payload: user})
    fetch(`${API}/api/users/profile`, {
        method: 'PUT',
        headers: {
            accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                dispatch({type: USER_UPDATE_FAIL, payload: data.error})
            } else {
                dispatch({type: USER_UPDATE_SUCCESS, payload: data});
                dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
                localStorage.setItem('userInfo', JSON.stringify(data));
            }
        })

}


export const listUser = () => (dispatch, getState) => {
    dispatch({type: USER_LIST_REQUEST});
    const { userSignIn: { userInfo } } = getState();
    fetch(`${API}/api/users`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if(data.message) {
                dispatch({type: USER_LIST_FAIL, payload: data.message})
            } else {
                dispatch({type: USER_LIST_SUCCESS, payload: data});
            }
        })
}

export const deleteUser = (userId) => (dispatch, getState) => {
    dispatch({type: USER_LIST_REQUEST, payload: userId})
    const { userSignIn: { userInfo } } = getState();
    fetch(`${API}/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        },
    })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                dispatch({type: USER_DELETE_FAIL, payload: data.error})
            } else {
                dispatch({type: USER_DELETE_SUCCESS});
            }
        })
}

export const editUser = (user) => (dispatch, getState) => {
    const { userSignIn: { userInfo } } = getState();
    dispatch({type: USER_EDIT_REQUEST, payload: user})
    fetch(`${API}/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
            accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                dispatch({type: USER_EDIT_FAIL, payload: data.error})
            } else {
                dispatch({type: USER_EDIT_SUCCESS, payload: data});
            }
        })

}
