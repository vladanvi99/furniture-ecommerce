import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, Route} from 'react-router-dom';
import { signout } from '../../redux/actions/userActions';
import Loading from '../Loading/Loading';
import SearchBox from '../SearchBox/SearchBox';
import './css/header.scss';

const Header = (props) => {
    const [openDropDownProduct, setOpenDropDownProduct] = useState(false);
    const [openDropDownSeller, setOpenDropDownSeller] = useState(false);
    const [openDropDownAdmin, setOpenDropDownAdmin] = useState(false);
    const [openDropDownProfile, setOpenDropDownProfile] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const productCategoryList = useSelector(state => state.productCategoryList);
    const page = 1;
    const {loading: categoryLoading, categories} = productCategoryList;
    const cart = useSelector(state => state.cart);
    const userSignIn = useSelector(state => state.userSignIn);
    const {cartItems} = cart;
    const {userInfo} = userSignIn;
    const dispatch = useDispatch();
    const onSignout = () => {
        dispatch(signout());
    }
    return (
        <header className="row">
            <div>
                <Link className="brand" to="/">Funiro.</Link>
            </div>
            <nav className={`header-nav ${openMenu ? 'open-header-nav' : ''}`}>
                <div className="search-item">
                    <Route render={({history}) => <SearchBox history={history} />} />
                </div>
                <div onMouseLeave={() => setOpenDropDownProduct(false)} onClick={() => {
                        setOpenDropDownProduct(!openDropDownProduct)
                        console.log(openDropDownProduct)
                    }} className={`dropdown ${openDropDownProduct ? 'open-dropdown' : ''}`}>
                    <Link to="#">Products <i className="fa fa-caret-down"></i></Link>
                    {categoryLoading ? <div><Loading /></div> : (
                        <ul className="dropdown-content">
                            <li>
                                <Link onClick={() => setOpenMenu(false)} to={`/search/category/all/page/${page}`}>All</Link>
                            </li>
                            {
                                categories.map((c) => (
                                    <li key={c}>
                                        <Link onClick={() => setOpenMenu(false)} to={`/search/category/${c}/page/${page}`}>{c}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    )}
                </div>
                <Link onClick={() => setOpenMenu(false)} to="/cart">
                    Cart
                    {
                        cartItems.length > 0 && (
                            <div className="cart-badget">
                                {cartItems.length}
                            </div>
                        )
                    }
                </Link>
                {
                    userInfo && userInfo.isSeller &&
                    (
                        <div onMouseLeave={() => setOpenDropDownSeller(false)} onClick={() => setOpenDropDownSeller(!openDropDownSeller)} className={`dropdown ${openDropDownSeller ? 'open-dropdown' : ''}`}>
                            <Link to="#">Seller <i className="fa fa-caret-down"></i></Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link onClick={() => setOpenMenu(false)} to="/productslist/seller">Products</Link>
                                </li>
                                <li>
                                    <Link onClick={() => setOpenMenu(false)} to="/orderslist/seller">Orders</Link>
                                </li>
                            </ul>
                        </div>
                    )
                }
                {
                    userInfo && userInfo.isAdmin &&
                    (
                        <div onMouseLeave={() => setOpenDropDownAdmin(false)}  onClick={() => setOpenDropDownAdmin(!openDropDownAdmin)} className={`dropdown ${openDropDownAdmin ? 'open-dropdown' : ''}`}>
                            <Link to="#">Admin <i className="fa fa-caret-down"></i></Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link onClick={() => setOpenMenu(false)} to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link onClick={() => setOpenMenu(false)} to="/productslist">Products</Link>
                                </li>
                                <li>
                                    <Link onClick={() => setOpenMenu(false)} to="/orderslist">Orders</Link>
                                </li>
                                <li>
                                    <Link onClick={() => setOpenMenu(false)} to="/userslist">Users</Link>
                                </li>
                            </ul>
                        </div>
                    )
                }
                {
                    userInfo 
                    ? (
                        <div onMouseLeave={() => setOpenDropDownProfile(false)} onClick={() => setOpenDropDownProfile(!openDropDownProfile)} className={`dropdown ${openDropDownProfile ? 'open-dropdown' : ''}`}>
                            <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link onClick={() => setOpenMenu(false)} to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link onClick={() => setOpenMenu(false)} to="/orderhistory">Order History</Link>
                                </li>
                                <li>
                                    <Link onClick={() => setOpenMenu(false)} to="/signin" onClick={onSignout}>Sign Out</Link>
                                </li>
                            </ul>
                        </div>
                    )
                    : (
                        <Link  onClick={() => setOpenMenu(false)} to="/signin">Sign In</Link>
                    )
                }
            </nav>
            {
                openMenu ? (
                    <button onClick={() => setOpenMenu(false)} type="button" className="open-menu">
                        <i class="far fa-times-circle"></i>
                    </button>
                ) : (
                    <button onClick={() => setOpenMenu(true)} type="button" className="open-menu">
                        <i className="fas fa-bars"></i>
                    </button>
                )
            }
        </header>
    )
}

export default Header;