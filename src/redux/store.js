import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productCategoryListReducer, productCommentCreateReducer, productCreateReducer, productDeleteReducer, productListReducer, productSingleReducer, productTopCarouselReducer, productTopListReducer, productUpdateReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { profileUpdateReducer, userDeleteReducer, userDetailsReducer, userEditReducer, userListReducer, userRegisterReducer, userSignInReducer } from './reducers/userReducer';
import { orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderHistoryReducer, orderListReducer, orderPayReducer, orderSummaryReducer } from './reducers/orderReducers';

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null,
        paymentMethod: 'PayPal'
    },
    userSignIn: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productSingle: productSingleReducer,
    cart: cartReducer,
    userSignIn: userSignInReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderHistory: orderHistoryReducer,
    userDetails: userDetailsReducer,
    profileUpdate: profileUpdateReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userEdit: userEditReducer,
    productCategoryList: productCategoryListReducer,
    productCommentCreate: productCommentCreateReducer,
    orderSummary: orderSummaryReducer,
    productTopList: productTopListReducer,
    productTopCarousel: productTopCarouselReducer
})
const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));

export default store;
