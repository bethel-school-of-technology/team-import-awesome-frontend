import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import '../css/register.css';

const SignUp = () => {
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

    function handleChange(event) {
        setNewUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value };
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!agreedToTerms) {
            window.alert('Please agree to the terms and conditions');
            return;
        }

        createUser(newUser)
            .then(() => {
                navigate('/signIn');
            })
            .catch((error) => {
                console.log(error);
                window.alert('Failed registration: error creating user');
            });
    }

    return (
        <div class="register-photo">
            <div class="form-container">
                <div class="image-holder">
                    <div>
                        <img
                            src="../assets/GoalGetterLogo.png"
                            width="80%"
                            alt="logo"
                            className="registration-logo"
                        />
                    </div>
                </div>
                <form class="register-form" onSubmit={handleSubmit}>
                    <h1 class="text-create" color="#4A707A">
                        <strong>Create</strong> an account.
                    </h1>
                    <div class="form-group">
                        <input
                            class="form-control"
                            placeholder="Username"
                            type="text"
                            name="username"
                            value={newUser.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div class="form-group">
                        <input
                            class="form-control"
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div class="form-group">
                        <input
                            class="form-control"
                            placeholder="First Name"
                            type="text"
                            name="firstName"
                            value={newUser.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div class="form-group">
                        <input
                            class="form-control"
                            placeholder="Last Name"
                            type="text"
                            name="lastName"
                            value={newUser.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div class="form-group">
                        <input
                            class="form-control"
                            placeholder="Age"
                            type="text"
                            name="age"
                            value={newUser.age}
                            onChange={handleChange}
                        />
                    </div>
                    <div class="form-group">
                        <input
                            class="form-control"
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div class="form-2">
                        <div class="form-check">
                            <label class="form-check-label">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    checked={agreedToTerms}
                                    onChange={() => setAgreedToTerms(!agreedToTerms)}
                                    required // checkbox has to be checked in order to proceed
                                />
                                I agree to the license terms.
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <button
                            class="btn btn-success btn-block"
                            type="submit"
                            disabled={!agreedToTerms}
                        >
                            Sign Up
                        </button>
                    </div>

                    <Link class="already" to={'/signIn'}>
                        <strong>
                            Already have an account? <br />
                            Sign In here.
                        </strong>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
