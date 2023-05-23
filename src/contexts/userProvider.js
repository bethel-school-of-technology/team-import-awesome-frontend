import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserContext from './UserContext.js';

export const UserProvider = (props) => {
    const baseUrl = 'http://localhost:3000/users/';
    const [user, setUser] = useState(null);

    // this effect is used to initialize the user state with the stored user data from the local storage when the component mounts or when the user state changes.
    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(localStorage.getItem('userData')));
        }
    }, [user]);

    //  POST request to the baseUrl endpoint, passing the newUser object as the request body
    async function createUser(newUser) {
        const response = await axios.post(baseUrl, newUser);
        return await new Promise((resolve) => resolve(response.data));
    }

    async function loginUser(username, password) {
        let user = { username, password };

        const response = await axios.post(`${baseUrl}/login`, user);
        localStorage.setItem('myToken', response.data.token);
        localStorage.setItem('myUsername', user.username);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        setUser(response.data.user);
        return await new Promise((resolve) => resolve(response.data));
    }

    // sets token to empty string
    // sets username token to empty string
    function logOutUser() {
        localStorage.setItem('myToken', '');
        localStorage.setItem('myUsername', '');
    }

    // retrieve user by username
    async function getUser(username) {
        const response = await axios.get(baseUrl + username);
        return await new Promise((resolve) => resolve(response.data));
    }

    // Update User
    async function updateUser(user) {
        const myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`,
        };

        const response = await axios.put(
            `${baseUrl}/edit/${user.username}`,
            user,
            {
                headers: myHeaders,
            }
        );
        return await new Promise((resolve) => resolve(response.data));
    }

    return (
        <UserContext.Provider
            value={{
                createUser,
                loginUser,
                getUser,
                logOutUser,
                updateUser,
                user,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
