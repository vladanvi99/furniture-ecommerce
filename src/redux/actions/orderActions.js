import { API } from "../../config"
import { CART_EMPTY } from "../constants/cartConstants";
import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_HISTORY_REQUEST,
    ORDER_HISTORY_SUCCESS,
    ORDER_HISTORY_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_FAIL,
    ORDER_LIST_SUCCESS,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_FAIL,
    ORDER_DELETE_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_SUCCESS,
    ORDER_SUMMARY_REQUEST,
    ORDER_SUMMARY_FAIL,
    ORDER_SUMMARY_SUCCESS
} from "../constants/orderConstants"

export const createOrder = (order) => (dispatch, getState) => {
    const { userSignIn: { userInfo } } = getState();
    dispatch({type: ORDER_CREATE_REQUEST, payload: order})
    fetch(`${API}/api/orders`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(order)
    })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                dispatch({type: ORDER_CREATE_FAIL, payload: data.error})
            } else {
                dispatch({type: ORDER_CREATE_SUCCESS, payload: data});
                dispatch({type: CART_EMPTY})
                localStorage.removeItem('cartItems');
            }
        })
}

export const detailsOrder = (orderId) => (dispatch, getState) => {
    const { userSignIn: { userInfo } } = getState();
    dispatch({type: ORDER_DETAILS_REQUEST, payload: orderId})
    fetch(`${API}/api/orders/${orderId}`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            dispatch({type: ORDER_DETAILS_SUCCESS, payload: data});
        })
}

export const payOrder = (order, paymentResult) => (dispatch, getState) => {
    dispatch({type: ORDER_PAY_REQUEST, payload: {order, paymentResult}});
    const { userSignIn: { userInfo } } = getState();
    fetch(`${API}/api/orders/${order._id}/pay`, {
        method: 'PUT',
        headers: {
            accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(paymentResult)
    })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                dispatch({type: ORDER_PAY_FAIL, payload: data.error})
            } else {
                dispatch({type: ORDER_PAY_SUCCESS, payload: data});
            }
        })
}

export const orderHistoryList = () => (dispatch, getState) => {
    const { userSignIn: { userInfo } } = getState();
    dispatch({type: ORDER_HISTORY_REQUEST})
    fetch(`${API}/api/orders/history`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                dispatch({type: ORDER_HISTORY_FAIL, payload: data.error})
            } else {
                dispatch({type: ORDER_HISTORY_SUCCESS, payload: data});
            }
        })
}

export const listOrder = ({seller = ''}) => (dispatch, getState) => {
    dispatch({type: ORDER_LIST_REQUEST});
    const { userSignIn: { userInfo } } = getState();
    fetch(`${API}/api/orders?seller=${seller}`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if(data.message) {
                dispatch({type: ORDER_LIST_FAIL, payload: data.message})
            } else {
                dispatch({type: ORDER_LIST_SUCCESS, payload: data});
            }
        })
}

export const deleteOrder = (orderId) => (dispatch, getState) => {
    dispatch({type: ORDER_DELETE_REQUEST, payload: orderId})
    const { userSignIn: { userInfo } } = getState();
    fetch(`${API}/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        },
    })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                dispatch({type: ORDER_DELETE_FAIL, payload: data.error})
            } else {
                dispatch({type: ORDER_DELETE_SUCCESS});
            }
        })
}

export const deliverOrder = (orderId) => (dispatch, getState) => {
    dispatch({type: ORDER_DELETE_REQUEST, payload: orderId});
    const { userSignIn: { userInfo } } = getState();
    fetch(`${API}/api/orders/${orderId}/deliver`, {
        method: 'PUT',
        headers: {
            accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                dispatch({type: ORDER_DELIVER_FAIL, payload: data.error})
            } else {
                dispatch({type: ORDER_DELIVER_SUCCESS, payload: data});
            }
        })
}

export const summaryOrder = () => (dispatch, getState) => {
    dispatch({type: ORDER_SUMMARY_REQUEST})
    const { userSignIn: { userInfo } } = getState();
    fetch(`${API}/api/orders/summary`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if(data.message) {
                dispatch({type: ORDER_SUMMARY_FAIL, payload: data.message})
            } else {
                dispatch({type: ORDER_SUMMARY_SUCCESS, payload: data});
            }
        })
}
