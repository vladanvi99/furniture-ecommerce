import {
    CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_EMPTY,
    CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";
import { USER_SIGNOUT } from "../constants/userConstants";

export const cartReducer = (state = {cartItems: []}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const newItem = action.payload;
            const existItem = state.cartItems.find(item => item.product === newItem.product);
            if(existItem) {
                return (
                    {...state, error: '', cartItems: state.cartItems.map(item => item.product === existItem.product ? newItem : item)}
                )
            } else {
                return {...state, error: '', cartItems: [...state.cartItems, newItem]}
            }
        case CART_REMOVE_ITEM:
            return {...state, error: '', cartItems: state.cartItems.filter((item) => item.product !== action.payload)}
        case USER_SIGNOUT:
            return {...state, cartItems: []}
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress: action.payload}
        case CART_SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod: action.payload}
        case CART_EMPTY:
            return {...state, error: '', cartItems: []}
        case CART_ADD_ITEM_FAIL:
            return {...state, error: action.payload}
        default:
            return state;
    }
}