import React, { useContext, useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext.js';
import '../css/sign-in.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { getUser } = useContext(UserContext);
    let { loginUser } = useContext(UserContext);
    let navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const result = await getUser(username);

            if (result.username === username && result.password) {
                await loginUser(username, password).then(() => {
                    navigate(`/profile-page/${username}`);
                });
            } else {
                window.alert(
                    `Failed Login: Check Username and Password are correct.`
                );
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.alert(`Failed Login: Invalid username or password.`);
            } else {
                window.alert(
                    `Failed Login: Check Username and Password are correct.`
                );
            }
            console.log(error);
        }
    }

    return (
        <div className="sign-in">
            <Row className="main-row">
                <Col className="form-column">

                    <Container className="form-sign-in">
                        <div className="login-header">
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
                    </Container>

                </Col>
                <Col className="Welcome-col">
                    <Container className="welcome-container">

                        <h1 className="welcome-message">
                            <strong>Welcome Back!</strong>
                        </h1>
                        <br />
                        <Image
                            className="welcome-logo"
                            width="40%"
                            src={'/assets/GoalGetterLogo.png'}
                            alt="img"
                        />

                    </Container>
                </Col>
            </Row>
        </div>
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
