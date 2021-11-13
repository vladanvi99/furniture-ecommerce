import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../redux/actions/cartActions';
import CheckoutSteps from '../CheckoutSeps/CheckoutSeps';
import './css/paymentScreen.scss';

const PaymentScreen = (props) => {
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    const onPayment = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    useEffect(() => {
        if(!shippingAddress) {
            props.history.push('/shipping');
        }
    }, [props.history, shippingAddress]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <form className="form" onSubmit={onPayment}>
                <h1 className="form-head">Payment Method</h1>
                <div className="radio-input-holder">
                    <label htmlFor="paypal">PayPal</label>
                    <input type="radio" id="payPal" name="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)} value="PayPal" defaultChecked />
                </div>
                <div>
                    <button className="primary block" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default PaymentScreen;
