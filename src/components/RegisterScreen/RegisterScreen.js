import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/userActions';
import Loading from '../Loading/Loading';
import './css/registerScreen.scss';

const RegisterScreen = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const {userInfo, loading, error} = userRegister;

    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const onSignIn = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            alert("Password and confirm password are not match")
        } else {
            dispatch(register(name, email, password));
        }
    }
    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo])
    return (
        <div className="container-holder register-screen-holder">
            <form className="form" onSubmit={onSignIn}>
                <h1 className="form-head">Create Account</h1>
                {loading ? <div style={{position:'relative'}}><Loading /></div> : error && <div className="error-box">{error}</div>}
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
                <div>
                    <button className="primary block" type="submit">Register</button>
                </div>
                <div>
                    <p className="go-signin">
                        Already have an account? <Link to={`/signin?redirect=${redirect}`}>Go to sign in page.</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default RegisterScreen;
