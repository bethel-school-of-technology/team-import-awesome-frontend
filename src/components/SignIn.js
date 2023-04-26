import React, { useContext, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import UserContext from '../contexts/userContext.js';


const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let { loginUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        loginUser(username, password).then(() => {
            navigate('/');
        }).catch(error => {
            console.log(error);
            window.alert('Failed login');
        });
    }

    return (
        <form onSubmit={handleSubmit} className="text-center">
            <br></br>
                <div className="mt-20">
                    Welcome Back!
                </div>

            <br></br>
            <input className="p-2 border-[1px] ml-2 rounded-md border-gray-600" placeholder="Username" type="text" name="userName" onChange={e => setUsername(e.target.value)} />
            <br></br><br></br>
            <input className="p-2 border-[1px] ml-2 rounded-md border-gray-600"  placeholder="Password" type="password" name="password" onChange={e => setPassword(e.target.value)} />
            <br/>
            <br/>
            <button className="bg-[#FD358E] hover:bg-pink-400 text-white font-bold py-2 px-4 border border-bg-[#FD358E] rounded">
                Sign In
            </button>
        </form>
    );
};
export default SignIn;