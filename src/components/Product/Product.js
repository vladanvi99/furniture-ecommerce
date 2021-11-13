import React from 'react';
import Rating from '../Rating/Rating';
import {Link} from 'react-router-dom'
import './css/product.scss';

const Product = ({product}) => {
  const page = 1;
  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={`${process.env.REACT_APP_APP_API}${product.image}`} alt="product" />
      </Link>
      <div className="product-card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="card-body-bottom">
          <p className="price">${product.price}</p>
          <Link to={`/seller/${product.seller._id}/page/${page}`}>
            {product.seller.seller.name}
          </Link>
        </div>
      </div>
    </div>
  )
};

export default Product;
