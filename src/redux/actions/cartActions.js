import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";
import { API } from "../../config";

export const addToCart = (productId, productQty) => (dispatch, getState) => {
    const {cart:{cartItems}} = getState();

    fetch(`${API}/api/products/${productId}`)
        .then(response => response.json())
        .then(data => {
            if(cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
                dispatch({type: CART_ADD_ITEM_FAIL, payload: "Can't add to cart. Buy from one seller at a time."})
            } else {
                dispatch({
                    type: CART_ADD_ITEM,
                    payload:
                        {
                            name: data.name,
                            image: data.image,
                            price: data.price,
                            countInStack: data.countInStack,
                            product: data._id,
                            seller: data.seller,
                            qty: productQty,
                        }
                    }
                );
                localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
            }
        }
    );
}

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productId
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload: data})
    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload: data})
}
