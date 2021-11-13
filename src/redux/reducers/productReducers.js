import { PRODUCT_CATEGORIES_LIST_REQUEST, PRODUCT_CATEGORIES_LIST_SUCCESS, PRODUCT_COMMENT_CREATE_FAIL, PRODUCT_COMMENT_CREATE_REQUEST, PRODUCT_COMMENT_CREATE_RESET, PRODUCT_COMMENT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_RESET, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_RESET, PRODUCT_DELETE_SUCCESS, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_SINGLE_REQUEST, PRODUCT_SINGLE_SUCCESS, PRODUCT_TOP_CAROUSEL_REQUEST, PRODUCT_TOP_CAROUSEL_SUCCESS, PRODUCT_TOP_LIST_REQUEST, PRODUCT_TOP_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_RESET, PRODUCT_UPDATE_SUCCESS } from "../constants/productConstants";

export const productListReducer = (state = {loading: true, products: []}, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload.productResults, productNum: action.payload.productNum}
        default:
            return state;
    }
}

export const productCategoryListReducer = (state = {loading: true, categories: []}, action) => {
    switch(action.type) {
        case PRODUCT_CATEGORIES_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_CATEGORIES_LIST_SUCCESS:
            return {loading: false, categories: action.payload}
        default:
            return state;
    }
}

export const productTopListReducer = (state = {loading: true, topProducts: []}, action) => {
    switch(action.type) {
        case PRODUCT_TOP_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_TOP_LIST_SUCCESS:
            return {loading: false, topProducts: action.payload}
        default:
            return state;
    }
}

export const productTopCarouselReducer = (state = {loading: true, topProductsCarousel: []}, action) => {
    switch(action.type) {
        case PRODUCT_TOP_CAROUSEL_REQUEST:
            return {loading: true};
        case PRODUCT_TOP_CAROUSEL_SUCCESS:
            return {loading: false, topProductsCarousel: action.payload}
        default:
            return state;
    }
}

export const productSingleReducer = (state = {loading: true}, action) => {
    switch(action.type) {
        case PRODUCT_SINGLE_REQUEST:
            return {loading: true};
        case PRODUCT_SINGLE_SUCCESS:
            return {loading: false, product: action.payload}
        default:
            return state;
    }
}

export const productCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {loading: true};
        case PRODUCT_CREATE_SUCCESS:
            return {loading: false, success: true, product: action.payload}
        case PRODUCT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const productUpdateReducer = (state = {}, action) => {
    switch(action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return {loading: true}
        case PRODUCT_UPDATE_SUCCESS:
            return {loading: false, success: true}
        case PRODUCT_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {loading: true}
        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, success: true}
        case PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const productCommentCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case PRODUCT_COMMENT_CREATE_REQUEST:
            return {loading: true};
        case PRODUCT_COMMENT_CREATE_SUCCESS:
            return {loading: false, success: true, review: action.payload}
        case PRODUCT_COMMENT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_COMMENT_CREATE_RESET:
            return {}
        default:
            return state;
    }
}
