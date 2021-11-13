import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { API } from '../../config';
import { createOrder } from '../../redux/actions/orderActions';
import { ORDER_CREATE_RESET } from '../../redux/constants/orderConstants';
import CheckoutSeps from '../CheckoutSeps/CheckoutSeps';
import Loading from '../Loading/Loading';
import './css/placeOrderScreen.scss';

const PlaceOrderScreen = (props) => {
    const dispatch = useDispatch();
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading, error, success, order} = orderCreate;
    const cart = useSelector(state => state.cart);
    const {shippingAddress, paymentMethod} = cart;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, b) => a + b.qty * b.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice)
    cart.totalPrice = cart.itemsPrice + cart.taxPrice + cart.shippingPrice;
    if(!cart.paymentMethod) {
        props.history.push('/payment')
    }
    const onPlaceOrder = () => {
        dispatch(createOrder({...cart, orderItems: cart.cartItems}))
    }
    useEffect(() => {
        if(success){
            props.history.push(`/order/${order.order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [success, order, dispatch, props.history])
    return (
        <div>
            <CheckoutSeps step1 step2 step3 step4 />
            <div className="row top container-holder place-order-screen-holder">
                <div className="col-2 shipping-details-col">
                    <ul>
                        <li>
                            <div className="shipping-details">
                                <h2>Shipping</h2>
                                <div>
                                    <p>Name: <span> {shippingAddress.fullName} </span></p>
                                    <p>Address: <span> {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country} </span></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="shipping-details">
                                <h2>Payment</h2>
                                <div>
                                    <p>Method: <span>{paymentMethod}</span></p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="shipping-details order-items-holder">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        cart.cartItems.map((item) => {
                                            return (
                                                <li key={item.product}>
                                                    <div className="row">
                                                        <div>
                                                            <img src={`${API}${item.image}`} alt={item.name} />
                                                        </div>
                                                        <div className="min-30">
                                                            <Link className='name' to={`/product/${item.product}`}>{item.name}</Link>
                                                        </div>
                                                        <p className="price">
                                                            {item.qty} x {item.price} = ${item.price * item.qty}
                                                        </p>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1 place-order-card-col">
                    <div className="place-order-card">
                        <ul>
                            <li>
                                <h2 className="place-order-card-head">Order Summary</h2>
                            </li>
                            <li className="row">
                                <p className="info-head">Items:</p>
                                <p className="info-para">${cart.itemsPrice.toFixed(2)}</p>
                            </li>
                            <li className="row">
                                <p className="info-head">Shipping:</p>
                                <p className="info-para">${cart.shippingPrice.toFixed(2)}</p>
                            </li>
                            <li className="row">
                                <p className="info-head">Tax:</p>
                                <p className="info-para">${cart.taxPrice.toFixed(2)}</p>
                            </li>
                            <li className="row">
                                <p className="info-head">Total:</p>
                                <p className="info-para">${cart.totalPrice.toFixed(2)}</p>
                            </li>
                            <li>
                                <button type="button" className="primary block" onClick={onPlaceOrder} disabled={cart.cartItems.length === 0}>Place Order</button>
                            </li>
                            {
                                loading && <Loading />
                            }
                            {
                                error && <div>{error}</div>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen;
