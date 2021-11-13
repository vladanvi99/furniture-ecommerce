import React from 'react';
import './css/checkoutSeps.scss';

const CheckoutSeps = (props) => {
    return (
        <div className="row container-holder checkout-steps">
            <div className={props.step1 ? 'active' : ''}>
                Sign-In
            </div>
            <div className={props.step2 ? 'active' : ''}>
                Shipping
            </div>
            <div className={props.step3 ? 'active' : ''}>
                Payment
            </div>
            <div className={props.step4 ? 'active' : ''}>
                Place Order
            </div>
        </div>
    )
}

export default CheckoutSeps;