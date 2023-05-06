import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import '../css/register.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    let { createUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        createUser(username, password, firstName, lastName, age, email, avatar)
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
                <img src='../assets/GoalGetterLogo.png' width='80%' alt='logo' className='registration-logo' />
            </div>
            </div>
            <form class="register-form" onSubmit={handleSubmit}>
                <h1 class="text-create" color='#4A707A'><strong>Create</strong> an account.</h1>
                <div class="form-group"> 
                <input
                            class="form-control"
                            placeholder="Username"
                            type="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        </div>
                        <div class="form-group">
                        <input
                        class="form-control"
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <input
                        class="form-control"
                            placeholder="First Name"
                            type="text"
                            name="name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <input
                        class="form-control"
                            placeholder="Last Name"
                            type="text"
                            name="name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <input
                        class="form-control"
                            placeholder="Age"
                            type="text"
                            name="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <input
                        class="form-control"
                            placeholder="Email"
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <input
                        class="form-control"
                            placeholder="Profile Picture URL"
                            type="text"
                            name="profile avatar"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                    </div>
                <div class="form-2">
                    <div class="form-check"><label class="form-check-label"><input class="form-check-input" type="checkbox"/>I agree to the license terms.</label></div>
                </div>
                <div class="form-group"><button class="btn btn-success btn-block" type="submit">Sign Up</button></div>

                <a class="already" href="/signIn"><strong>Already have an account? <br />Login here.</strong></a></form>
        </div>
     
        </div>

    );
};

export default SignUp;
