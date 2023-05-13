import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { debounce } from 'debounce';
import UserContext from './UserContext.js';

export const UserProvider = (props) => {
    const baseUrl = 'http://localhost:3000/users/';
    const [user, setUser] = useState(null); // store user data here after logging in

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(localStorage.getItem('userData')));
        }
    }, [user]);

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

    function logOutUser() {
        localStorage.setItem('myToken', '');
        localStorage.setItem('myUsername', '');
        // window.location.reload(true);
    }

    async function getUser(username) {
        const response = await axios.get(baseUrl + username);
        return await new Promise((resolve) => resolve(response.data));
    }

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
