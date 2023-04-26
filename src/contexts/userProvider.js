import React from 'react';
import axios from "axios";
import UserContext from "./userContext.js";

export const UserProvider = (props) => {

    const baseUrl = "http://localhost:3000/users/";

    function createUser(username, password, firstName, lastName, age, email) {
        let user = { username, password, firstName, lastName, age, email};

        return axios.post(baseUrl, user)
            .then(response => {
                    return new Promise(resolve => resolve(response.data));

                }
            );
    }

    function loginUser(username, password) {
        let user = { username, password };

        return axios.post(`${baseUrl}/login`, user)
            .then(response => {
                    localStorage.setItem('myToken', response.data.token)
                    localStorage.setItem('myUsername', user.username)
                    return new Promise(resolve => resolve(response.data));
                }
            );
    }

    function getUser(id) {
        return axios.get(baseUrl + id).then(response => {
            return new Promise(resolve => resolve(response.data));
        });
    }

    return (
        <UserContext.Provider value={{
            createUser,
            loginUser,
            getUser
        }}>
            { props.children }
        </UserContext.Provider>
    )
}