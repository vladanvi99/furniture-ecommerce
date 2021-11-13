import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../../redux/actions/userActions';
import Loading from '../Loading/Loading';
import './css/signinScreen.scss';

const SigninScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignIn = useSelector(state => state.userSignIn);
    const {userInfo, loading, error} = userSignIn;

    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const onSignIn = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }
    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo])
    return (
        <div className="container-holder signin-screen-holder">
            <form className="form" onSubmit={onSignIn}>
                <h1 className="form-head">Sign In</h1>
                {loading ? <div style={{position:'relative'}}><Loading /></div> : error && <div className="error-box">{error}</div>}
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter Email" required onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Password" required onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <div>
                    <button className="primary block" type="submit">Sign In</button>
                </div>
                <div>
                    <p className="go-register">
                        Dont't have account? <Link to={`/register?redirect=${redirect}`}>Go to register page.</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default SigninScreen;
