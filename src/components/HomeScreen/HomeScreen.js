import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTopProducts, listTopProductsCarousel } from '../../redux/actions/productActions';
import Banner from '../Banner/Banner';
import Loading from '../Loading/Loading';
import Product from '../Product/Product';
import './css/homeScreen.scss';

const HomeScreen = (props) => {
    const productTopList = useSelector(state => state.productTopList);
    const {loading, topProducts} = productTopList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch])
    return (
        <div>
            <Banner props={props}/>
            <h2 className="top-rated-head">Top Rated Products</h2>
            {loading ? <Loading /> : (
                <div className="row container-holder home-product-wrap">
                    {
                        topProducts.map((product) => {
                            return <Product key={product._id} product={product} />;
                        })
                    }
                </div>
            )}
        </div>
    )
}

export default HomeScreen;
