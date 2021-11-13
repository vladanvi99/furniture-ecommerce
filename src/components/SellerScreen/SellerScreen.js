import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { API } from '../../config';
import { listProducts } from '../../redux/actions/productActions';
import { userDetails } from '../../redux/actions/userActions';
import Loading from '../Loading/Loading';
import Product from '../Product/Product';
import './css/sellerScreen.scss';

const SellerScreen = (props) => {
    const {page = 1} = useParams();
    const sellerId = props.match.params.id;
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userDetails);
    const {loading, error, user} = userInfo;
    const productList = useSelector(state => state.productList);
    const {loading: productLoading, error: productError, products, productNum} = productList;
    useEffect(() => {
        dispatch(userDetails(sellerId));
        dispatch(listProducts({seller: sellerId, page}))
    }, [dispatch, sellerId, page])
    const definePagination = () => {
        let numOfButtons = 1;
        if(productNum % 10 === 0) {
            numOfButtons = productNum / 10
        } else {
            numOfButtons = Math.ceil(productNum / 10);
        }
        if(numOfButtons > 1) {
            return [...Array(numOfButtons).keys()].map((num) => (
                <Link className={`pagination-button ${page == num + 1 ? 'active' : ''}`} key={num + 1} to={`/seller/${sellerId}/page/${num + 1}`}>
                    {num + 1}
                </Link>
            ))
        }
    }
    return (
        <div className="row top container-holder seller-screen-holder">
            <div className="col-1">
                {loading ? <Loading /> : (
                    <ul>
                        <li>
                            <div className="row profile-img-name">
                                <div>
                                    <img className="small" src={`${API}${user.seller.logo}`} alt={user.seller.name} />
                                </div>
                                <div>
                                    <h1>{user.seller.name}</h1>
                                </div>
                            </div>
                        </li>
                        <li className="description">
                            {user.seller.description}
                        </li>
                    </ul>
                )}
            </div>
            <div className="col-3">
                {productLoading ? <Loading /> : (
                    <>
                        <div className="row seller-product-wrap">
                            {products.length === 0 ? 'Products Not Found' : (
                                products.map((product) => {
                                    return <Product key={product._id} product={product} />;
                                })
                            )}
                        </div>
                    </>
                )}
                <div className="pagination">
                    {
                        definePagination()
                    }
                </div>
            </div>
        </div>
    )
}

export default SellerScreen;
