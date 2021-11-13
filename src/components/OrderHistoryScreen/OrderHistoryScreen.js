import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderHistoryList } from '../../redux/actions/orderActions';
import Loading from '../Loading/Loading';
import './css/orderHistoryScreen.scss';

const OrderHistoryScreen = (props) => {
    const orderHistory = useSelector(state => state.orderHistory);
    const {loading, error, orders} = orderHistory;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(orderHistoryList())
    }, [dispatch])
    return (
        <div className="container-holder order-history-screen-holder">
            <h1>Order History</h1>
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
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>${order.totalPrice.toFixed(2)}</td>
                                            <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                            <td>
                                                <button type="button" className="small" onClick={() => props.history.push(`/order/${order._id}`)}>
                                                    Details
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

export default OrderHistoryScreen;
