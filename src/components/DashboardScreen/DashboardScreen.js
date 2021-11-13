import React, { useEffect } from 'react';
import Chart from "react-google-charts";
import { useDispatch, useSelector } from 'react-redux';
import { summaryOrder } from '../../redux/actions/orderActions';
import Loading from '../Loading/Loading';
import './css/dashboardScreen.scss';

const DashboardScreen = () => {
    const orderSummary = useSelector(state => state.orderSummary);
    const {loading, summary} = orderSummary;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(summaryOrder());
    }, [dispatch])
    return (
        <div className="container-holder dashboard-screen-holder">
            <div className="row dashboard-holder-top">
                <h1>Dashboard</h1>
            </div>
            {loading ? <Loading /> : (
                <>
                    <ul className="row summary">
                        <li>
                            <div className="summary-card">
                                <div className="summary-title color1">
                                    <span>
                                        <i className="fa fa-users"></i>
                                        Users
                                    </span>
                                </div>
                                <div className="summary-body">
                                    {summary.users[0].numUsers}
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="summary-card">
                                <div className="summary-title color1">
                                    <span>
                                        <i className="fa fa-shopping-cart"></i>
                                        Orders
                                    </span>
                                </div>
                                <div className="summary-body">
                                    {summary.orders[0] ? summary.orders[0].numOrders : '0'}
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="summary-card">
                                <div className="summary-title color1">
                                    <span>
                                        <i className="fas fa-dollar-sign"></i>
                                        Sales
                                    </span>
                                </div>
                                <div className="summary-body">
                                    {summary.orders[0] ? summary.orders[0].totalSales.toFixed(2) : '0'}
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div style={{marginTop:"4rem"}}>
                        <div>
                            <h2 className="pod-head">Sales</h2>
                        </div>
                        {
                            summary.dailyOrders.length === 0 ? (
                                <div>No Orders</div>
                            ) : (
                                <Chart width="100%" height="400px" chartType="AreaChart" loader={<div>Loading Chart...</div>} data={[["Date", "Sales"], ...summary.dailyOrders.map((order) => [order._id, order.sales])]}>

                                </Chart>
                            )
                        }
                    </div>
                    <div>
                        <div>
                            <h2 className="pod-head">Categories</h2>
                        </div>
                        {
                            summary.productCategories.length === 0 ? (
                                <div>No Categories</div>
                            ) : (
                                <Chart width="100%" height="400px" chartType="PieChart" loader={<div>Loading Chart...</div>} data={[["Category", "Products"], ...summary.productCategories.map((category) => [category._id, category.count])]}>

                                </Chart>
                            )
                        }
                    </div>
                </>
            )}
        </div>
    )
}

export default DashboardScreen;
