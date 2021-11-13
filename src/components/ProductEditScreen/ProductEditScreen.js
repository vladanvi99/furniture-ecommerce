import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../../config';
import { singleProduct, updateProduct } from '../../redux/actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../redux/constants/productConstants';
import Loading from '../Loading/Loading';
import './css/productEditScreen.scss';

const ProductEditScreen = (props) => {
    const userSignIn = useSelector(state => state.userSignIn);
    const {userInfo} = userSignIn;
    const productId = props.match.params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStack, setCountInStack] = useState('');
    const [brand, setBrand] = useState('');
    const dispatch = useDispatch();
    const productSingle = useSelector(state => state.productSingle);
    const productUpdate = useSelector(state => state.productUpdate);
    const {success: updateSuccess} = productUpdate;
    const {loading, product} = productSingle;
    useEffect(() => {
        if(updateSuccess) {
            props.history.push('/productslist')
        }
        if(!product || productId !== product._id || updateSuccess) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            dispatch(singleProduct(productId))
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setImage(product.image);
            setCategory(product.category);
            setCountInStack(product.countInStack);
            setBrand(product.brand);
        }
    }, [dispatch, product, productId, updateSuccess, props.history])
    const onUpdateProduct = (e) => {
        e.preventDefault();
        dispatch(updateProduct({_id: productId, name, price, image, category, brand, countInStack, description}))
    }
    const [loadingUpload, setLoadingUpload] = useState(false);
    const onUploadFile = async (e) => {
        const file = await e.target.files[0];
        const bodyData = new FormData();
        bodyData.append('image', file);
        setLoadingUpload(true);
        fetch(`${API}/api/uploads`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
            body: bodyData
        })
        .then(response => response.text())
        .then(data => {
            setImage(data);
            setLoadingUpload(false);
        })
    }
    return (
        <div className="container-holder product-edit-screen">
            {loading ? <Loading /> : (
                <form className="form" onSubmit={onUpdateProduct}>
                    <h1 className="form-head">Edit Product: {product._id}</h1>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter Name" required onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="text" id="price" placeholder="Enter Price" required onChange={(e) => setPrice(e.target.value)} value={price} />
                    </div>
                    <div>
                        <label htmlFor="imageFile">Image File</label>
                        <input type="file" id="imageFile" label="Choose Image" onChange={onUploadFile} />
                    </div>
                    <div style={{position: 'relative'}}>
                        {loadingUpload && <Loading />}
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <input type="text" id="category" placeholder="Enter Category" required onChange={(e) => setCategory(e.target.value)} value={category} />
                    </div>
                    <div>
                        <label htmlFor="countInStack">Count In Stack</label>
                        <input type="text" id="countInStack" placeholder="Enter Count In Stack" required onChange={(e) => setCountInStack(e.target.value)} value={countInStack} />
                    </div>
                    <div>
                        <label htmlFor="brand">Brand</label>
                        <input type="text" id="brand" placeholder="Enter Brand" required onChange={(e) => setBrand(e.target.value)} value={brand} />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" placeholder="Enter Description" required onChange={(e) => setDescription(e.target.value)} value={description} />
                    </div>
                    <div>
                        <button className="primary block" type="submit">Update</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ProductEditScreen;
