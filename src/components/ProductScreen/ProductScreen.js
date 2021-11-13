import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import Rating from '../Rating/Rating';
import Loading from '../Loading/Loading';
import './css/productScreen.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, singleProduct } from '../../redux/actions/productActions';
import { PRODUCT_COMMENT_CREATE_RESET } from '../../redux/constants/productConstants';

const ProductScreen = (props) => {
    const page = 1;
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const productSingle = useSelector(state => state.productSingle);
    const productId = props.match.params.id;
    const {loading, product} = productSingle;
    const userSignIn = useSelector(state => state.userSignIn);
    const {userInfo} = userSignIn;
    const productCommentCreate = useSelector(state => state.productCommentCreate);
    const {loading: commentLoading, error: commentError, review, success: commentSuccess} = productCommentCreate;
    const dispatch = useDispatch();

    useEffect(() => {
        if(commentSuccess) {
            window.alert("Review submited successfully");
            setRating('');
            setComment('');
            dispatch({type: PRODUCT_COMMENT_CREATE_RESET});
        }
        dispatch(singleProduct(productId))
    }, [dispatch, productId, commentSuccess])

    const addToCardHandlerer = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }
    const onComment = (e) => {
        e.preventDefault();
        if(comment && rating) {
            dispatch(createComment(productId, {rating, comment, name: userInfo.name}))
        } else {
            alert('Please enter comment and rating.')
        }
    }
    return (
        <>  
            {loading ? <Loading /> : !product ? <div>Product Not Found</div> : (
                <>
                <div className="row top container-holder product-screen-holder">
                    <div className="product-screen-start">
                        <img className="large" src={`${process.env.REACT_APP_APP_API}${product.image}`} alt={product.name} />
                    </div>
                    <div className="product-screen-end">
                        <div className="products-screen-end-holder">
                            <div className="product-info">
                                <ul>
                                    <li className="row name-rating">
                                        <h1>{product.name}</h1>
                                        <Rating rating={product.rating} numReviews={product.numReviews} />
                                    </li>
                                    <li className="row">
                                        <p className="info-head">Description:</p>
                                        <p className="info-para">{product.description}</p>
                                    </li>
                                    <li className="row">
                                        <p className="info-head">Seller:</p>
                                        <p className="info-para">
                                            <Link to={`/seller/${product.seller._id}/page/${page}`}>{product.seller.seller.name}</Link>
                                        </p>
                                    </li>
                                    <li className="row">
                                        <p className="info-head">Price</p>
                                        <p className="info-para">${product.price}</p>
                                    </li>
                                    <li className="row">
                                        <p className="info-head">Status</p>
                                        <p className="info-para">
                                            {product.countInStack > 0 ? <span className="success">In Stock</span> : <span className="error">Unavailable</span>}
                                        </p>
                                    </li>
                                    {
                                        product.countInStack > 0 && (
                                            <>
                                                <li className="row">
                                                    <p className="info-head">Qty</p>
                                                    <div>
                                                        <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                            {
                                                                [...Array(product.countInStack).keys()].map((item) => {
                                                                    return <option key={item + 1} value={item + 1}>{item + 1}</option>
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button onClick={addToCardHandlerer} type="button">Add to Cart</button>
                                                </li>
                                            </>
                                        ) 
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-holder product-screen-reviews">
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <div>There is no reviews.</div>}
                    <ul>
                        {product.reviews.map((review) => (
                            <li key={review._id}>
                                <div className="name-rating row">
                                    <h3>{review.name}</h3>
                                    <p className="create-date">
                                        {review.createdAt.substring(0, 10)}
                                    </p>
                                </div>
                                <Rating rating={review.rating} caption=" " />
                                <p className="comment">
                                    {review.comment}
                                </p>
                            </li>
                        ))}
                        
                    </ul>
                    <div className="form-holder">
                            {userInfo ? (
                                <form className="form" onSubmit={onComment}>
                                    <h2 className="form-head">Write a review</h2>
                                    <div>
                                        <label htmlFor="rating">Rating</label>
                                        <select value={rating} onChange={(e) => setRating(e.target.value)}>
                                            <option value="">Select...</option>
                                            <option value="1">1- Poor</option>
                                            <option value="2">2- Fair</option>
                                            <option value="3">3- Good</option>
                                            <option value="4">4- Very Good</option>
                                            <option value="5">5- Excelent</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="comment">Comment</label>
                                        <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                    </div>
                                    <div>
                                        <button className="primary block" type="submit">Submit</button>
                                    </div>
                                </form>
                            ) : (
                                <div>
                                    Please <Link to={'/signin'}>Sign In</Link> to write a review.
                                </div>
                            )}
                        </div>                    
                </div>
                </>
            )}
        </>
    )
}

export default ProductScreen;
