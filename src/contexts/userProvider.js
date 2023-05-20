import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { debounce } from 'debounce';
import UserContext from './UserContext.js';

export const UserProvider = (props) => {
    const baseUrl = 'http://localhost:3000/users/'; // base URL for axios calls
    const [user, setUser] = useState(null); // store user data here after logging in

    useEffect(() => { // this effect is used to initialize the user state with the stored user data from the local storage when the component mounts or when the user state changes.
        if (user === null) {
            setUser(JSON.parse(localStorage.getItem('userData')));
        }
    }, [user]);

    async function createUser(newUser) {
        const response = await axios.post(baseUrl, newUser); //  POST request to the baseUrl endpoint, passing the newUser object as the request body
        return await new Promise((resolve) => resolve(response.data)); // returns a promise that resolves with the data from the response
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

    function logOutUser() {
        localStorage.setItem('myToken', ''); // sets token to empty string
        localStorage.setItem('myUsername', ''); // sets username token to empty string
        // window.location.reload(true);
    }

    async function getUser(username) {
        // retrieve user by username
        const response = await axios.get(baseUrl + username);
        return await new Promise((resolve) => resolve(response.data));
        // return axios.get(baseUrl + username);
    }

    async function updateUser(user) {
        // authenticate user to edit their profile
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

    // function updateUserImmediate(user) {
    //     console.log('saving', user);

    //     // TODO: Fix authentication
    //     axios
    //         .put(baseUrl + 'edit/' + user.username, user, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('myToken')}`,
    //             },
    //         })
    //         .then((response) => {
    //             localStorage.setItem('userData', JSON.stringify(user));
    //             setUser(user);
    //         });
    // }

    // const updateUser = debounce(updateUserImmediate, 2500);

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
