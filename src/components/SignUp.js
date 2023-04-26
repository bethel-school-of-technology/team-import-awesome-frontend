import React, { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import UserContext from '../contexts/userContext';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");


    let { createUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        createUser(username, password, firstName, lastName, age, email).then(() => {
            navigate('/signIn');
        }).catch(error => {
            console.log(error);
            window.alert('Failed registration: error creating user');
        });
    }

    return (
        <form onSubmit={handleSubmit} className="text-center">

            <br></br><br></br>
            <input  placeholder="Username" type="text" name="userName" value={username} onChange={e => setUsername(e.target.value)} />
            <br></br><br></br>
            <input  placeholder="Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            <br /><br></br>
            <input  placeholder="First Name" type="text" name="name" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <br /><br></br>
            <input placeholder="Last Name" type="text" name="name" value={lastName} onChange={e => setLastName(e.target.value)} />
            <br /><br></br>
            <input placeholder="Age" type="text" name="age" value={age} onChange={e => setAge(e.target.value)} />
            <br /><br></br>
            <input placeholder="Email" type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            <br /><br></br>
            <button >Sign Up</button>
        </form>
    )
};

export default SignUp;