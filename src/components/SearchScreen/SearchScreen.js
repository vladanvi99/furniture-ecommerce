import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { prices, ratings } from '../../config';
import { listProducts, listProductsCategories } from '../../redux/actions/productActions';
import Loading from '../Loading/Loading';
import Product from '../Product/Product';
import Rating from '../Rating/Rating';
import './css/searchScreen.scss';

const SearchScreen = (props) => {
    const [paginationNumber, setPaginationNumber] = useState(1);
    const {name = 'all', category = 'all', min = 0, max = 0, rating = 0, order = 'newest', page = 1} = useParams();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {loading, error, products, productNum} = productList;
    const productCategoryList = useSelector(state => state.productCategoryList);
    const {loading: categoryLoading, categories} = productCategoryList;
    useEffect(() => {
        dispatch(listProducts({name: name !== 'all' ? name : '', category: category !== 'all' ? category : '', min, max, rating, order, page}))
    }, [dispatch, name, category, min, max, rating, order, page])
    const getFilterUrl = (filter) => {
        const filterCategory = filter.category || category;
        const filterName = filter.name || name;
        const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
        const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        const filterPage = filter.page || page
        return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/page/${filterPage}`
    }
    const definePagination = () => {
        let numOfButtons = 1;
        if(productNum % 10 === 0) {
            numOfButtons = productNum / 10
        } else {
            numOfButtons = Math.ceil(productNum / 10);
        }
        if(numOfButtons > 1) {
            return [...Array(numOfButtons).keys()].map((num) => (
                <Link className={`pagination-button ${page == num + 1 ? 'active' : ''}`} key={num + 1} to={getFilterUrl({page: num + 1})}>
                    {num + 1}
                </Link>
            ))
        }
    }
    return (
        <div className="container-holder search-screen-holder">
            <div className="row search-screen-top">
                <div>
                    {loading ? <Loading /> : error ? <div>{error}</div> : (
                        <p className="results-num">{productNum} Results</p>
                    )}
                </div>
                <div className="row">
                    <span className="sort-by">Sort By</span> {' '}
                    <select value={order} onChange={(e) => (
                        props.history.push(getFilterUrl({order: e.target.value, page: 1}))
                    )}>
                        <option value='newest'>Newest Arrivals</option>
                        <option value='lowest'>Price: Low to High</option>
                        <option value='highest'>Price: High to Low</option>
                        <option value='toprated'>Top Rated</option>
                    </select>
                </div>
            </div>
            <div className="row top filter-holder">
                <div className="col-1 filter-holder-start">
                    <div>
                        <h3>Category</h3>
                        {categoryLoading ? <div><Loading /></div> : (
                            <ul>
                                <li>
                                    <Link className={'all' === category ? 'active' : ''} to={getFilterUrl({category: 'all', page: 1})}>All</Link>
                                </li>
                                {
                                    categories.map((c) => (
                                        <li key={c}>
                                            <Link className={c === category ? 'active' : ''} to={getFilterUrl({category: c, page: 1})}>{c}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        )}
                    </div>
                    <div>
                        <h3>Price</h3>
                        <ul>
                            {
                                prices.map((p) => (
                                    <li key={p.name}>
                                        <Link className={`${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''} to={getFilterUrl({min: p.min, max: p.max, page: 1})}>{p.name}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div>
                        <h3>Rating</h3>
                        <ul>
                            <li>
                                <Link className={'0' ===  `${rating}` ? 'active' : ''} to={getFilterUrl({rating: '0', page: 1})}>
                                    All
                                </Link>
                            </li>
                            {
                                ratings.map((r) => (
                                    <li key={r.name}>
                                        <Link className={`${r.rating}` ===  `${rating}` ? 'active' : ''} to={getFilterUrl({rating: r.rating, page: 1})}>
                                            <Rating caption=" & up" rating={r.rating} />
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
                <div className="col-3">
                    <div className="row search-product-wrap">
                        {loading ? <Loading /> : products.length === 0 ? <div>Products Not Found</div> : (
                            products.map((product) => {
                                return <Product key={product._id} product={product} />;
                            })
                        )}
                    </div>
                    <div className="pagination">
                        {
                            definePagination()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchScreen;
