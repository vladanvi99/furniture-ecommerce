import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import './css/cartScreen.scss';

const CartScreen = (props) => {
    const page = 1;
    const cart = useSelector(state => state.cart);
    const {cartItems, error} = cart;
    const productId = props.match.params.id;
    const productQty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, productQty));
        }
    }, [dispatch, productQty, productId]);
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }
    const checkoutProcess = () => {
        props.history.push('/signin?redirect=shipping')
    }
    return (
        <div className="row top container-holder cart-screen-holder">
            <div className="col-2 screen-head-holder">
                <h1 className="cart-screen-head">Shopping Cart</h1>
                {error && <div>{error}</div>}
                {!cartItems.length > 0 ? (
                    <p className="empty-cart">
                        Cart is Empty, <Link to={`/search/name/page/${page}`}>Go Shopping</Link>
                    </p>
                ) : (
                    <ul className="cart-screen-products-holder">
                        {
                            cartItems.map((item) => {
                                return (
                                    <li key={item.product}>
                                        <div className="row">
                                            <div>
                                                <img src={`${process.env.REACT_APP_APP_API}${item.image}`} alt={item.name} />
                                            </div>
                                            <div className="min-30">
                                                <Link className="name" to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {
                                                        [...Array(item.countInStack).keys()].map((optionItem) => {
                                                            return <option key={optionItem + 1} value={optionItem + 1}>{optionItem + 1}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div>
                                                <p className="price">${item.price}</p>
                                            </div>
                                            <div>
                                                <button type="button" onClick={() => removeFromCartHandler(item.product)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </li>)
                            })
                        }
                    </ul>
                )}
            </div>
            <div className="col-1 proceed-cart-col">
                <div className="proceed-cart-holder">
                    <ul>
                        <li>
                            <h2>Subtotal: <span>({cartItems.reduce((a, c) => a + c.qty, 0)} items)</span>: <span>${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</span></h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkoutProcess} className="primary block" disabled={!cartItems.length > 0}>
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CartScreen;
