import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import { createProduct, listProducts, deleteProduct } from '../../redux/actions/productActions';
import './css/productListScreen.scss';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../../redux/constants/productConstants';

const ProductListScreen = (props) => {
    const sellerMode = props.match.path.indexOf('/seller') >= 0;
    const productList = useSelector(state => state.productList);
    const userSignIn = useSelector(state => state.userSignIn);
    const {userInfo} = userSignIn;
    const {loading, error, products} = productList;
    const productCreate = useSelector(state => state.productCreate);
    const {loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct} = productCreate;
    const dispatch = useDispatch();
    const productDelete = useSelector(state => state.productDelete);
    const {loading: deleteLoading, success: deleteSuccess} = productDelete;
    useEffect(() => {
        if(successCreate) {
            dispatch({type: PRODUCT_CREATE_RESET})
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        if(deleteSuccess) {
            dispatch({type: PRODUCT_DELETE_RESET})
        }
        dispatch(listProducts({seller: sellerMode ? userInfo._id : '' }))
    }, [dispatch, createdProduct, props.history, successCreate, deleteSuccess, sellerMode, userInfo])
    const onDeleteProduct = (product) => {
        if(window.confirm('Are you sure  to delete product?')) {
            dispatch(deleteProduct(product._id))
        }
    }
    const onCreateProduct = () => {
        dispatch(createProduct());
    }
    return (
        <div className="container-holder product-list-screen-holder">
            <div className="row product-list-top-holder">
                <h1>Products</h1>
                <button type="button" className="primary" onClick={onCreateProduct}>
                    Create Product
                </button>
            </div>
            {deleteLoading && <div><Loading /></div>}
            {deleteSuccess && <div>Deleted Product</div>}
            {loadingCreate && <div style={{position: 'relative'}}><Loading /></div>}
            {errorCreate && <div>{errorCreate}</div>}
            {
                loading ? <Loading /> : error ? (
                    <div>
                        {error}
                    </div>
                ) : products.length === 0 ? (
                    <div>You dont't have any product yet.</div>
                ) : (
                    <div className="table-holder">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price.toFixed(2)}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>
                                            <td className="row no-wrap">
                                                <button type="button" className="small" onClick={() => props.history.push(`/product/${product._id}/edit`)}>
                                                    Edit
                                                </button>
                                                <button type="button" className="small" onClick={() => onDeleteProduct(product)}>
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

export default ProductListScreen;
