import React, { useEffect } from 'react';
import ScrollToTop from './ScrollToTop';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import CartScreen from './components/CartScreen/CartScreen';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomeScreen from './components/HomeScreen/HomeScreen';
import OrderHistoryScreen from './components/OrderHistoryScreen/OrderHistoryScreen';
import OrderScreen from './components/OrderScreen/OrderScreen';
import PaymentScreen from './components/PaymentScreen/PaymentScreen';
import PlaceOrderScreen from './components/PlaceOrderScreen/PlaceOrderScreen';
import PrivateRoute from './PrivateRoute';
import ProductScreen from './components/ProductScreen/ProductScreen';
import ProfileScreen from './components/ProfileScreen/ProfileScreen';
import RegisterScreen from './components/RegisterScreen/RegisterScreen';
import ShippingScreen from './components/ShippingScreen/ShippingScreen';
import SigninScreen from './components/SigninScreen/SigninScreen';
import ProductListScreen from './components/ProductListScreen/ProductListScreen';
import AdminRoute from './AdminRoute';
import ProductEditScreen from './components/ProductEditScreen/ProductEditScreen';
import OrderListScreen from './components/OrderListScreen/OrderListScreen';
import UserListScreen from './components/UserListScreen/UserListScreen';
import UserEditScreen from './components/UserEditScreen/UserEditScreen';
import SellerRoute from './SellerRoute';
import SellerScreen from './components/SellerScreen/SellerScreen';
import SearchScreen from './components/SearchScreen/SearchScreen';
import DashboardScreen from './components/DashboardScreen/DashboardScreen';
import { listProductsCategories } from './redux/actions/productActions';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductsCategories());
  }, [dispatch])
  return (
    <Router>
      <div className="grid-container">
        <Header />
        <ScrollToTop />
        <main>
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/product/:id' component={ProductScreen} />
            <Route exact path='/cart/:id?' component={CartScreen} />
            <Route exact path='/signin' component={SigninScreen} />
            <Route exact path='/register' component={RegisterScreen} />
            <Route exact path='/shipping' component={ShippingScreen} />
            <Route exact path='/payment' component={PaymentScreen} />
            <Route exact path='/placeorder' component={PlaceOrderScreen} />
            <Route exact path='/order/:id' component={OrderScreen} />
            <Route exact path='/orderhistory' component={OrderHistoryScreen} />
            <Route exact path='/seller/:id/page/:page' component={SellerScreen} />
            <Route exact path='/search/name/:name?/page/:page' component={SearchScreen} />
            <Route exact path='/search/category/:category?/page/:page' component={SearchScreen} />
            <Route exact path='/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/page/:page' component={SearchScreen} />
            <PrivateRoute exact path='/profile' component={ProfileScreen} />
            <AdminRoute exact path='/productslist' component={ProductListScreen} />
            <SellerRoute exact path='/product/:id/edit' component={ProductEditScreen} />
            <AdminRoute exact path='/orderslist' component={OrderListScreen} />
            <AdminRoute exact path='/userslist' component={UserListScreen} />
            <AdminRoute exact path='/user/:id' component={UserEditScreen} />
            <AdminRoute exact path='/dashboard' component={DashboardScreen} />
            <SellerRoute exact path='/productslist/seller' component={ProductListScreen} />
            <SellerRoute exact path='/orderslist/seller' component={OrderListScreen} />
            <Route exact path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
