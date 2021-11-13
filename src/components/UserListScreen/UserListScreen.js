import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUser } from '../../redux/actions/userActions';
import { USER_DELETE_RESET, USER_DETAILS_RESET } from '../../redux/constants/userConstants';
import Loading from '../Loading/Loading';
import './css/userListScreen.scss';

const UserListScreen = (props) => {
    const userDelete = useSelector(state => state.userDelete);
    const {loading: deleteLoading, error: deleteError, success: deleteSuccess} = userDelete;
    const userList = useSelector(state => state.userList);
    const {loading, error, users} = userList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: USER_DELETE_RESET})
        dispatch(listUser());
        dispatch({type: USER_DETAILS_RESET})
    }, [dispatch, deleteSuccess])
    const onDeleteUser = (user) => {
        if(window.confirm('Are you sure to delete?')) {
            dispatch(deleteUser(user._id))
        }
    }
    return (
        <div className="container-holder user-list-screen-holder">
            <h1>Users</h1>
            {deleteError && <div>{deleteError}</div>}
            {deleteLoading && <div><Loading /></div>}
            {
                loading ? <Loading /> : error ? (
                    <div>
                        {error}
                    </div>
                ) : users.length === 0 ? (
                    <div>You dont't have users yet.</div>
                ) : (
                    <div className="table-holder">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>IS SELLER</th>
                                    <th>IS ADMIN</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.isSeller ? 'Yes' : 'No'}</td>
                                            <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                            <td className="row no-wrap">
                                                <button type="button" className="small" onClick={() => props.history.push(`/user/${user._id}`)}>
                                                    Edit
                                                </button>
                                                <button type="button" className="small" onClick={() => onDeleteUser(user)}>
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

export default UserListScreen;
