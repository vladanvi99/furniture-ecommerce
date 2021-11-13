import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { API } from '../../config';
import { deliverOrder, detailsOrder, payOrder } from '../../redux/actions/orderActions';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../../redux/constants/orderConstants';
import Loading from '../Loading/Loading';
import './css/orderScreen.scss';

const OrderScreen = (props) => {
    const [sdkReady, setSdkReady] = useState(false);
    const orderId = props.match.params.id;
    const orderDetails = useSelector(state => state.orderDetails);
    const userSignIn = useSelector(state => state.userSignIn);
    const {userInfo} = userSignIn;
    const orderPay = useSelector(state => state.orderPay);
    const {loading: loadingPay, error: errorPay, success: successPay} = orderPay;
    const orderDeliver = useSelector(state => state.orderDeliver);
    const {loading: loadingDeliver, error: errorDeliver, success: successDeliver} = orderDeliver;
    const {loading, order} = orderDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        const addPayPalScript = () => {
            fetch(`${API}/api/config/paypal`)
            .then(response => response.json())
            .then(data => {
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = `https://www.paypal.com/sdk/js?client-id=${data.sdk}`;
                script.async = true;
                script.onload = () => {
                    setSdkReady(true);
                }
                document.body.appendChild(script);
            })
        }
        if(!order || successPay || successDeliver || (order && order._id !== orderId)){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(detailsOrder(orderId))
        } else {
            if(!order.isPaid) {
                if(!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, orderId, order, sdkReady, successPay, successDeliver])
    const onPayPal = (paymentResult) => {
        dispatch(payOrder(order, paymentResult))
    }
    const onDeliver = () => {
        console.log(order)
        dispatch(deliverOrder(order._id))
    }
    return loading ? <Loading /> : (
        <div className="container-holder order-screen-holder">
            <h1>Order: {order._id}</h1>
            <div className="row top">
                <div className="col-2  shipping-details-col">
                    <ul>
                        <li>
                            <div className="shipping-details">
                                <h2>Shipping</h2>
                                <div>
                                    <p>Name: <span> {order.shippingAddress.fullName} </span></p>
                                    <p>Address: <span> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country} </span> </p>
                                </div>
                                <p className={order.isDelivered ? 'success-box' : 'error-box'}>
                                    {order.isDelivered ? `Delivered at ${order.deliveredAt}` : 'Not Delivered'}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="shipping-details">
                                <h2>Payment</h2>
                                <div>
                                    <p>Method: <span>{order.paymentMethod}</span></p>
                                </div>
                                <p className={order.isPaid ? 'success-box' : 'error-box'}>
                                    {order.isPaid? `Paid at ${order.paidAt}` : 'Not Paid'}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="shipping-details order-items-holder">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        order.orderItems.map((item) => {
                                            return (
                                                <li key={item.product}>
                                                    <div className="row">
                                                        <div>
                                                            <img src={`${API}${item.image}`} alt={item.name} />
                                                        </div>
                                                        <div className="min-30">
                                                            <Link className="name" to={`/product/${item.product}`}>{item.name}</Link>
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
                                <p className="info-para">${order.itemsPrice.toFixed(2)}</p>
                            </li>
                            <li className="row">
                                <p className="info-head">Shipping:</p>
                                <p className="info-para">${order.shippingPrice.toFixed(2)}</p>
                            </li>
                            <li className="row">
                                    <p className="info-head">Tax:</p>
                                    <p className="info-para">${order.taxPrice.toFixed(2)}</p>
                            </li>
                            <li className="row">
                                    <p className="info-head">Total:</p>
                                    <p className="info-para">${order.totalPrice.toFixed(2)}</p>
                            </li>
                            {
                                !order.isPaid && (
                                    <li style={{position: 'relative'}}>
                                        {!sdkReady ? <Loading /> : (
                                            <>
                                                {errorPay && <div>{errorPay}</div>}
                                                {loadingPay && <Loading />}
                                                <PayPalButton amount={order.totalPrice} onSuccess={onPayPal} />
                                            </>
                                        )}
                                    </li>
                                )
                            }
                            {
                                userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <li>
                                        <button type="button" className="primary block" onClick={onDeliver}>
                                            Deliver Order
                                        </button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderScreen;
