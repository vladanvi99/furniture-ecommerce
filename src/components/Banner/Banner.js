import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { listTopProductsCarousel } from '../../redux/actions/productActions';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './css/banner.scss';

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
        >
            Next
        </div>
    );
}

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
        >
            Prev
        </div>
    );
}

const Banner = ({props}) => {
    const productTopCarousel = useSelector(state => state.productTopCarousel);
    const {loading: carouselLoading, topProductsCarousel} = productTopCarousel;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listTopProductsCarousel());
    }, [dispatch])

    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1800,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 730,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const onShop = () => {
        props.history.push('/search/name')
    }
    return (
        <div className="banner">
            <div className="banner-text-holder">
                <div className="banner-text-card">
                    <h1>High-Quality Furniture Just For You</h1>
                    <p>Our furniture is made from selected and best quality materials that are suitable for your dream home</p>
                    <button onClick={onShop} type="button">Shop Now</button>
                </div>
            </div>
            <div className="banner-carousel">
            {topProductsCarousel &&
            <>
                <Slider {...settings}>
                    {
                        topProductsCarousel.map((product) => (
                            <div className="banner-carousel-card" key={product._id}>
                                <Link to={`/product/${product._id}`}>
                                    <img src={`${process.env.REACT_APP_APP_API}${product.image}`} alt={product.name} />
                                </Link>
                                <div className="banner-carousel-card-bottom">
                                    <Link className="product-name" to={`/product/${product._id}`}>{product.name}</Link>
                                    <p className="description">{product.description}</p>
                                    <div className="card-bottom-bottom">
                                    <p className="price">${product.price}</p>
                                    <Link to={`/product/${product._id}`}><i className="fa fa-arrow-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
                </>
            }
            </div>
        </div>
    )
}

export default Banner;
