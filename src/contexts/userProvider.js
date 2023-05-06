import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { debounce } from 'debounce';
import UserContext from './userContext.js';

export const UserProvider = (props) => {
    const baseUrl = 'http://localhost:3000/users/';
    const [user, setUser] = useState(null); // store user data here after logging in

    useEffect(() => {
        if (user === null) {
            setUser(JSON.parse(localStorage.getItem('userData')));
        }
    }, [user]);

    function createUser(username, password, firstName, lastName, age, email) {
        let user = { username, password, firstName, lastName, age, email };

        return axios.post(baseUrl, user).then((response) => {
            return new Promise((resolve) => resolve(response.data));
        });
    }

    function loginUser(username, password) {
        let user = { username, password };

        return axios.post(`${baseUrl}/login`, user).then((response) => {
            localStorage.setItem('myToken', response.data.token);
            localStorage.setItem('myUsername', user.username);
            localStorage.setItem(
                'userData',
                JSON.stringify(response.data.user)
            );
            setUser(response.data.user);
            // Store response.data in local storage and retrieve it if no user is found on page load
            return new Promise((resolve) => resolve(response.data));
        });
    }

    function logOutUser() {
        localStorage.setItem('myToken', '');
        localStorage.setItem('myUsername', '');
        // window.location.reload(true);
    }

    function getUser(id) {
        return axios.get(baseUrl + id).then((response) => {
            return new Promise((resolve) => resolve(response.data));
        });
    }

    function updateUserImmediate(user) {
        console.log('saving', user);

        // TODO: Fix authentication
        axios
            .put(baseUrl + 'edit/' + user.username, user, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('myToken')}`,
                },
            })
            .then((response) => {
                localStorage.setItem('userData', JSON.stringify(user));
                setUser(user);
            });
    }

    const updateUser = debounce(updateUserImmediate, 2500);

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
