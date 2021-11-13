import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser, userDetails } from '../../redux/actions/userActions';
import { USER_EDIT_RESET } from '../../redux/constants/userConstants';
import Loading from '../Loading/Loading';
import './css/userEditScreen.scss';

const UserEditScreen = (props) => {
    const userId = props.match.params.id;
    const userInfo = useSelector(state => state.userDetails);
    const {user, error, loading} = userInfo;
    const userEdit = useSelector(state => state.userEdit);
    const {error: errorEdit, loading: loadingEdit, success: successEdit} = userEdit;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSeller, setIsSeller] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if(successEdit) {
            dispatch({type: USER_EDIT_RESET})
            props.history.push('/userslist');
        }
        if(!user || userId !== user._id || successEdit) {
            dispatch(userDetails(userId));
            console.log(user)
        } else {
            console.log(user)
            setName(user.name);
            setEmail(user.email);
            setIsSeller(user.isSeller);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, user, successEdit, props.history, userId]);
    const onEdit = (e) => {
        console.log(isAdmin, isSeller)
        e.preventDefault();
        dispatch(editUser({_id: userId, name, email, isSeller, isAdmin}));
    }
    return (
        <div className="container-holder user-edit-screen">
            <form className="form" onSubmit={onEdit}>
                <h1 className="form-head">User Edit {name}</h1>
                {loadingEdit ? <div style={{position:'relative'}}><Loading /></div> : errorEdit && <div>{errorEdit}</div>}
                {loading ? <div style={{position:'relative'}}><Loading /></div> : error && <div>{error}</div>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter Name" required onChange={(e) => setName(e.target.value)} value={name} />
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter Email" required onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="radio-input-holder">
                    <label htmlFor="isSeller">Is Seller</label>
                    <input type="checkbox" id="isSeller" checked={isSeller} onChange={(e) => setIsSeller(!isSeller)} />
                </div>
                <div className="radio-input-holder">
                    <label htmlFor="isAdmin">Is Admin</label>
                    <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(!isAdmin)} />
                </div>
                <div>
                    <button className="primary block" type="submit">Update</button>
                </div>
            </form>
        </div>
    )
}

export default UserEditScreen;
