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

        <body className='sign-in-body'>
            <div class="row align-items-center">

            <div class="col-sm">
            <div className="sign-in-main">
                <div class="form-container">

                    <div class="center">
                        <div class="header">
                            Login
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div class="form-group">
                        <i class="fa fa-user icon"></i>
                            <input
                                class="form-control"
                                placeholder="Username"
                                type="text"
                                name="userName"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div class="form-group">
                            <input
                                class="form-control"
                                placeholder="Password"
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <br />
                        <div class="form-group"><button class="btn btn-success btn-block" type="submit">Sign Up</button></div>
                        <br />
                        <footer class="footer">
                        <a class="footer" href="/signUp">Don't have an account? register here.</a>
                  </footer>
                    </form>

                </div>
            </div>
            </div>
            <div class="col-sm">
                <div class="welcome-container">
                <div class="container">
            <h1 class="text-center" ><strong>Welcome Back!</strong></h1>
            <br />
            <img class="text-center" width="40%" src="../assets/GoalGetterLogo.png" />
            </div>
            </div>
            </div>
            </div>

        </body>
    );
};
export default SignIn;
