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
<<<<<<< Updated upstream

        <body className='sign-in-body'>
            <div class="row align-items-center">

            <div class="col-sm">
            <div className="sign-in-main">
               
                <div class="form-container-sign-in">

                    <div class="center">
                        <div class="header">
                            Login
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div class="form-grouping">
                            <input
                                class="form-control-sign-in"
                                placeholder="Username"
                                type="text"
                                name="userName"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div class="form-grouping">
                            <input

                                class="form-control-sign-in"
                                placeholder="Password"
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <br />
                        <div class="form-grouping"><button class="btn btn-success btn-block" type="submit">Sign In</button></div>
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
            <h1 class="text-center dropshadow" ><strong>Welcome Back!</strong></h1>
            <br />
            <img class="text-center" width="40%" src="../assets/GoalGetterLogo.png" />
            </div>
            </div>
            </div>
            </div>

=======
        <body className='sign-in-body'>
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
>>>>>>> Stashed changes
        </body>
    );
};
export default SignIn;
