import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../redux/actions/cartActions';
import CheckoutSeps from '../CheckoutSeps/CheckoutSeps';
import './css/shippingScreen.scss';

const ShippingScreen = (props) => {
    const dispatch = useDispatch();
    const userSignIn = useSelector(state => state.userSignIn);
    const cart = useSelector(state => state.cart);
    const {userInfo} = userSignIn;
    const {shippingAddress} = cart;
    const [fullName, setFullName] = useState(shippingAddress ? shippingAddress.fullName : '');
    const [address, setAddress] = useState(shippingAddress ? shippingAddress.address : '');
    const [city, setCity] = useState(shippingAddress ? shippingAddress.city : '');
    const [postalCode, setPostalCode] = useState(shippingAddress ? shippingAddress.postalCode : '');
    const [country, setCountry] = useState(shippingAddress ? shippingAddress.country : '');
    const onShipping = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
            props.history.push('/payment');
    }
    useEffect(() => {
        if(!userInfo) {
            props.history.push('/signin');
        }
    }, [props.history, userInfo]);
    return (
        <div>
            <CheckoutSeps step1 step2 />
            <form className="form" onSubmit={onShipping}>
                <h1 className="form-head">Shipping Address</h1>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" placeholder="Enter Full Name" required onChange={(e) => setFullName(e.target.value)} value={fullName} />
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Enter Address" required onChange={(e) => setAddress(e.target.value)} value={address} />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" placeholder="Enter City" required onChange={(e) => setCity(e.target.value)} value={city} />
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" id="postalCode" placeholder="Enter Postal Code" required onChange={(e) => setPostalCode(e.target.value)} value={postalCode} />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" placeholder="Enter Country" required onChange={(e) => setCountry(e.target.value)} value={country} />
                </div>
                <div>
                    <button className="primary block" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default ShippingScreen;