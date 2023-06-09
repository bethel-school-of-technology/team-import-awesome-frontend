import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import '../css/sign-up.css';

const SignUp = () => {
    const { getUser } = useContext(UserContext);

    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        bio: '',
        avatar: '',
    });

    const [agreedToTerms, setAgreedToTerms] = useState(false);

    let { createUser } = useContext(UserContext);
    let navigate = useNavigate();

    // updates newUser state
    function handleChange(event) {
        setNewUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value };
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const result = await getUser(newUser.username);

            if (
                // checks whether or not username already exists
                result.username.toLowerCase() === newUser.username.toLowerCase()
            ) {
                window.alert('Username already exists. Please try another.');
                return;
            }
        } catch (error) {
            if (error.response.status === 404) {
                await createUser(newUser)
                    .then(() => {
                        navigate('/signIn');
                    })
                    .catch((error) => {
                        console.log(error);
                        window.alert(
                            'Failed Registration: Error creating user'
                        );
                    });
            } else {
                window.alert(`Failed Registration: Error creating user`);
            }
            console.log(error);
        }
    }

    return (
        <div className="register-photo">
            <div className="form-container">
                <div className="image-holder">
                    <div>
                        <img
                            src={'/assets/GoalGetterLogo.png'}
                            width="80%"
                            alt="logo"
                            className="registration-logo"
                        />
                    </div>
                </div>
                <Form className="register-form" onSubmit={handleSubmit}>
                    <h1 className="text-create" color="#4A707A">
                        <strong>Create</strong> an account.
                    </h1>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="username"
                            value={newUser.username}
                            onChange={handleChange}
                            placeholder="Username"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={newUser.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={newUser.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            name="age"
                            value={newUser.age}
                            onChange={handleChange}
                            placeholder="Age"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                    </Form.Group>
                    <Form.Group className="sign-up-checkbox">
                        <Form.Check
                            label="I agree to the terms and conditions."
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={() => setAgreedToTerms(!agreedToTerms)}
                            required // checkbox has to be checked in order to proceed
                        />
                    </Form.Group>
                    <Button
                        className="sign-up-button"
                        variant="dark"
                        type="submit"
                        disabled={!agreedToTerms}
                        block
                    >
                        Sign Up
                    </Button>
                    <Link className="already" to={'/signIn'}>
                        <strong>
                            Already have an account? <br />
                            Sign In here.
                        </strong>
                    </Link>
                </Form>
            </div>
        </div>
    );
};

export default SignUp;
