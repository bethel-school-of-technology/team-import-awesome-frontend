import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext.js';
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
        <body className="sign-in-body">
            <div className="row align-items-center">
                <div className="col-sm">
                    <div className="sign-in-main">
                        <div className="form-container-sign-in">
                            <div className="center">
                                <div className="header">Login</div>
                            </div>

                            <Form onSubmit={handleSubmit}>
                                <div className="form-grouping">
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        name="username"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="form-grouping">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-grouping">
                                    <Button
                                        className="sign-in-button"
                                        variant="outline"
                                        type="submit"
                                        block
                                    >
                                        Sign In
                                    </Button>
                                </div>

                                <footer className="signIn-footer">
                                    <Link className="footer" to="/signUp">
                                        <strong>
                                            Don't have an account? Register
                                            here.
                                        </strong>
                                    </Link>
                                </footer>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="welcome-container">
                        <div className="container">
                            <h1 className="text-center dropshadow">
                                <strong>Welcome Back!</strong>
                            </h1>
                            <br />
                            <img
                                className="text-center"
                                width="40%"
                                src={'/assets/GoalGetterLogo.png'}
                                alt="img"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
};
export default SignIn;

// <body className='sign-in-body'>

//         <div class="row align-items-center">
//             <div class="col-sm">
//                 <div className="sign-in-main">
//                     <div class="form-container-sign-in">
//                         <div class="center">
//                             <div class="header">Login</div>
//                         </div>

//                         <form onSubmit={handleSubmit}>
//                             <div class="form-grouping">
//                                 <input
//                                     class="form-control-sign-in"
//                                     placeholder="Username"
//                                     type="text"
//                                     name="userName"
//                                     onChange={(e) =>
//                                         setUsername(e.target.value)
//                                     }
//                                 />
//                             </div>
//                             <div class="form-grouping">
//                                 <input
//                                     class="form-control-sign-in"
//                                     placeholder="Password"
//                                     type="password"
//                                     name="password"
//                                     onChange={(e) =>
//                                         setPassword(e.target.value)
//                                     }
//                                 />
//                             </div>

//                             <br />
//                             <div class="form-grouping">
//                                 <button
//                                     class="btn btn-success btn-block"
//                                     type="submit"
//                                 >
//                                     Sign In
//                                 </button>
//                             </div>
//                             <br />
//                             <footer class="footer">
//                                 <a class="footer" href="/signUp">
//                                     Don't have an account? register here.
//                                 </a>
//                             </footer>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             <div class="col-sm">
//                 <div class="welcome-container">
//                     <div class="container">
//                         <h1 class="text-center dropshadow">
//                             <strong>Welcome Back!</strong>
//                         </h1>
//                         <br />
//                         <img
//                             class="text-center"
//                             width="40%"
//                             src="../assets/GoalGetterLogo.png"
//                         />
//                     </div>

//                     <br />
//                     <div class="form-grouping"><button class="btn btn-success btn-block" type="submit">Sign In</button></div>
//                     <br />
//                     <footer class="footer">
//                     <a class="footer" href="/signUp">Don't have an account? register here.</a>
//               </footer>

//                 </form>

//             </div>
//         </div>
//         </div>
//         <div class="col-sm">
//             <div class="welcome-container">
//             <div class="container">
//         <h1 class="text-center dropshadow"><strong>Welcome Back!</strong></h1>
//         <br />
//         <img class="text-center" width="40%" src="../assets/GoalGetterLogo.png" />
//         </div>
//         </div>
//         </div>
//         </div>

//                 </div>
//             </div>
//         </div>

//     </body>
