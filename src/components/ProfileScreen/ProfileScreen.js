import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../../config';
import { updateProfile, userDetails } from '../../redux/actions/userActions';
import { USER_DETAILS_RESET, USER_UPDATE_RESET } from '../../redux/constants/userConstants';
import Loading from '../Loading/Loading';
import './css/profileScreen.scss';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [sellerLogo, setSellerLogo] = useState('');
    const [sellerDescription, setSellerDescription] = useState('');
    const dispatch = useDispatch();
    const userSignIn = useSelector(state => state.userSignIn);
    const {userInfo} = userSignIn;
    const userProfileDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userProfileDetails;
    const profileUpdate = useSelector(state => state.profileUpdate);
    const {success: updateSuccess, error: updateError, loading: updateLoading} = profileUpdate;
    useEffect(() => {
        if(!user || updateSuccess) {
            dispatch({type: USER_UPDATE_RESET})
            dispatch({type: USER_DETAILS_RESET})
            dispatch(userDetails(userInfo._id))
        } else {
            if(userInfo.isSeller) {
                setSellerName(user.seller.name);
                setSellerLogo(user.seller.logo);
                setSellerDescription(user.seller.description);
            }
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo, user, updateSuccess]);

    const onUpdate = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("Password and confirm password are not match")
        } else {
            dispatch(updateProfile({userId: user._id, name, email, password, sellerName, sellerLogo, sellerDescription}));
            setTimeout(() => {
                dispatch({type: USER_UPDATE_RESET})
            }, 3000)
        }
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
            setSellerLogo(data);
            setLoadingUpload(false);
        })
    }
    return (
        <div className="container-holder profile-screen-holder">
            <form className="form" onSubmit={onUpdate}>
                <h1 className="form-head">My Profile</h1>
                {
                    loading ? <Loading /> : error ? <div>{error}</div> : (
                        <>
                            {updateLoading && <div style={{position: 'relative'}}><Loading /></div>}
                            {updateError && <div>{updateError}</div>}
                            {updateSuccess && <div>Profile Updated Successfully</div>}
                            <div>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" placeholder="Enter Name" required onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                            <div>
                                <label htmlFor="email">Email address</label>
                                <input type="email" id="email" placeholder="Enter Email" required onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" placeholder="Enter Password" required onChange={(e) => setPassword(e.target.value)} value={password} />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" id="confirmPassword" placeholder="Confirm Password" required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                            </div>
                            {
                                userInfo.isSeller && (
                                    <>
                                        <h1 style={{marginTop: "5rem"}} className="form-head">Seller</h1>
                                        <div>
                                            <label htmlFor="sellerName">Seller Name</label>
                                            <input type="text" id="sellerName" placeholder="Enter Seller Name" required onChange={(e) => setSellerName(e.target.value)} value={sellerName} />
                                        </div>
                                        <div>
                                            <label htmlFor="imageFile">Logo File</label>
                                            <input type="file" id="imageFile" label="Choose Image" onChange={onUploadFile} />
                                        </div>
                                        <div>
                                            <label htmlFor="sellerDescription">Seller Description</label>
                                            <input type="text" id="sellerDescription" placeholder="Enter Seller Description" required onChange={(e) => setSellerDescription(e.target.value)} value={sellerDescription} />
                                        </div>
                                    </>
                                )
                            }
                            <div>
                                <button className="primary block" type="submit">Update</button>
                            </div>
                        </>
                    )
                }
                
            </form>
        </div>
    )
}

export default ProfileScreen;
