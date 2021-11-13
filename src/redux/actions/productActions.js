import { PRODUCT_CATEGORIES_LIST_REQUEST, PRODUCT_CATEGORIES_LIST_SUCCESS, PRODUCT_COMMENT_CREATE_FAIL, PRODUCT_COMMENT_CREATE_REQUEST, PRODUCT_COMMENT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_SINGLE_REQUEST, PRODUCT_SINGLE_SUCCESS, PRODUCT_TOP_CAROUSEL_REQUEST, PRODUCT_TOP_CAROUSEL_SUCCESS, PRODUCT_TOP_LIST_REQUEST, PRODUCT_TOP_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants"
import {API} from '../../config';

export const listProducts = ({seller = '', name = '', category = '', min = 0, max = 0, rating = 0, order = '', page = 1}) => (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })
    fetch(`${API}/api/products?seller=${seller}&name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}&page=${page}`)
        .then(response => response.json())
        .then(data => {
            dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
        })
}

export const listProductsCategories = () => (dispatch) => {
    dispatch({
        type: PRODUCT_CATEGORIES_LIST_REQUEST
    })
    fetch(`${API}/api/products/categories`)
        .then(response => response.json())
        .then(data => {
            dispatch({type: PRODUCT_CATEGORIES_LIST_SUCCESS, payload: data});
        })
}

export const listTopProducts = () => (dispatch) => {
    dispatch({
        type: PRODUCT_TOP_LIST_REQUEST
    })
    fetch(`${API}/api/products/top-rating/20`)
        .then(response => response.json())
        .then(data => {
            dispatch({type: PRODUCT_TOP_LIST_SUCCESS, payload: data});
        })
}

export const listTopProductsCarousel = () => (dispatch) => {
    dispatch({
        type: PRODUCT_TOP_CAROUSEL_REQUEST
    })
    fetch(`${API}/api/products/top-rating/5`)
        .then(response => response.json())
        .then(data => {
            dispatch({type: PRODUCT_TOP_CAROUSEL_SUCCESS, payload: data});
        })
}

export const singleProduct = (id) => (dispatch) => {
    dispatch({
        type: PRODUCT_SINGLE_REQUEST
    })
    fetch(`${API}/api/products/${id}`)
        .then(response => response.json())
        .then(data => {
            dispatch({type: PRODUCT_SINGLE_SUCCESS, payload: data});
        })
}

export const createProduct = () => (dispatch, getState) => {
    dispatch({type: PRODUCT_CREATE_REQUEST})
    const { userSignIn: { userInfo } } = getState();
    fetch(`${API}/api/products`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        },
        body: {}
    })
        .then(response => response.json())
        .then(data => {
            if(data.message) {
                dispatch({type: PRODUCT_CREATE_FAIL, payload: data.message})
            } else {
                dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data.product});
            }
        })
}

export const updateProduct = (product) => (dispatch, getState) => {
    dispatch({type: PRODUCT_UPDATE_REQUEST})
    const { userSignIn: { userInfo } } = getState();
    fetch(`${API}/api/products/${product._id}`, {
        method: 'PUT',
        headers: {
            accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(product)
    })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                dispatch({type: PRODUCT_UPDATE_FAIL, payload: data.error})
            } else {
                dispatch({type: PRODUCT_UPDATE_SUCCESS, payload: data});
            }
        })

}

export const deleteProduct = (productId) => (dispatch, getState) => {
    dispatch({type: PRODUCT_DELETE_REQUEST, payload: productId})
    const { userSignIn: { userInfo } } = getState();
    fetch(`${API}/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        },
    })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                dispatch({type: PRODUCT_DELETE_FAIL, payload: data.error})
            } else {
                dispatch({type: PRODUCT_DELETE_SUCCESS});
            }
        })
}

export const createComment = (productId, review) => (dispatch, getState) => {
    dispatch({type: PRODUCT_COMMENT_CREATE_REQUEST})
    const { userSignIn: { userInfo } } = getState();
    fetch(`${API}/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-type' :  'application/json',
            Authorization: `Bearer ${userInfo.token}`
        },
        body: JSON.stringify(review)
    })
        .then(response => response.json())
        .then(data => {
            if(data.error) {
                dispatch({type: PRODUCT_COMMENT_CREATE_FAIL, payload: data.error})
            } else {
                dispatch({type: PRODUCT_COMMENT_CREATE_SUCCESS, payload: data.review});
            }
        })
}
