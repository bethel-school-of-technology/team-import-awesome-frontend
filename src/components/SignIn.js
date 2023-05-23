import React, { useContext, useState } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
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
            // gets user based on the "username" entered in the text field
            const result = await getUser(username);

            if (result.username === username && result.password) {
                // checks if username and password are correct
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
                                        Don't have an account? Register here.
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
