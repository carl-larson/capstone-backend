import React, { useState } from 'react'
import '../App.css'
// import { Redirect } from 'react-router'

function Login(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    // const [ error, setError ] = useState(null);
    // const [ loading, setLoading ] = useState(null);
    const loading = null;

    // const login = (e) => {
    // e.preventDefault();
    // props.history.push('/');
    // document.cookie = `loggedIn=true;max-age=60*1000`;
    // document.cookie += 'username='+this.state.username+';max-age=60*1000';
    // }

    return (
        <div className="signupForm forms">
            <form className="login-form" action="/auth/signup" method="post">
            <label for="username">Create Username</label>
            <input
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter Username"
                name="username"
                value={username}
                type="text"
                required />
            <label for="password">Create Password</label>
            <input
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Password"
                name="password"
                value={password}
                type="password"
                required />
            <button
                type="submit"
                className="button login-button"
                value={loading ? 'Loading...' : 'Login'}
                disabled={loading}
                >Sign Up</button>
            </form>
        </div>
    );
}

export default Login;