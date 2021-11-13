import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrder } from '../../redux/actions/orderActions';
import { ORDER_DELETE_RESET } from '../../redux/constants/orderConstants';
import Loading from '../Loading/Loading';
import './css/orderListScreen.scss';

const OrderListScreen = (props) => {
    const sellerMode = props.match.path.indexOf('/seller') >= 0;
    const userSignIn = useSelector(state => state.userSignIn);
    const {userInfo} = userSignIn;
    const orderDelete = useSelector(state => state.orderDelete);
    const {loading: deleteLoading, success: deleteSuccess} = orderDelete;
    const orderList = useSelector(state => state.orderList);
    const {loading, error, orders} = orderList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: ORDER_DELETE_RESET})
        dispatch(listOrder({seller: sellerMode ? userInfo._id : '' }))
    }, [dispatch, deleteSuccess, sellerMode, userInfo])
    const onDeleteOrder = (order) => {
        if(window.confirm('Are you sure to delete?')) {
            dispatch(deleteOrder(order._id))
        }
    }
    return (
        <div className="container-holder order-list-screen-holder">
            <h1>Orders</h1>
            {deleteLoading && <div><Loading /></div>}
            {
                loading ? <Loading /> : error ? (
                    <div>
                        {error}
                    </div>
                ) : orders.length === 0 ? (
                    <div>You dont't have orders yet.</div>
                ) : (
                    <div className="table-holder">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user ? order.user.name : 'Anonimus'}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>${order.totalPrice.toFixed(2)}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                            <td className="row no-wrap">
                                                <button type="button" className="small" onClick={() => props.history.push(`/order/${order._id}`)}>
                                                    Details
                                                </button>
                                                <button type="button" className="small" onClick={() => onDeleteOrder(order)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        </div>
    )
}

export default OrderListScreen;
