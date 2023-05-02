import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/userContext.js';
import '../css/sign-in.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let { loginUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        loginUser(username, password)
            .then(() => {
                navigate('/');
                window.location.reload(true);
            })
            .catch((error) => {
                console.log(error);
                window.alert('Failed login');
            });
    }

    return (
        <div className="sign-in-main">
            <form onSubmit={handleSubmit} className="text-center">
                <br></br>
                <div className="mt-20">Welcome Back!</div>

                <br></br>
                <input
                    className="p-2 border-[1px] ml-2 rounded-md border-gray-600"
                    placeholder="Username"
                    type="text"
                    name="userName"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <br></br>
                <br></br>
                <input
                    className="p-2 border-[1px] ml-2 rounded-md border-gray-600"
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <br />
                <button>Sign In</button>
            </form>
        </div>
    );
};
export default SignIn;
