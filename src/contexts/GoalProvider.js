//  rough framework - might have to edit after testing - Brad

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoalContext from './GoalContext.js';

export const GoalProvider = (props) => {
    const [goals, setGoals] = useState([]); // set state variable of goal
    const baseUrl = 'http://localhost:3000/goals/'; // the baseURL used for the axios calls
    // const [user, setUser] = useState('');

    useEffect(() => {
        // once the component is mounted - executes getAllGoals only when necessary
        async function fetchData() {
            // fetches goal data
            await getUserGoals();
        }
        fetchData();
    }, []);

    // function getAllGoals() {
    //     // retrieve all goals
    //     return axios.get(baseUrl).then((response) => setGoals(response.data));
    // }

    async function getUserGoals(username) {
        const response = await axios.get(`${baseUrl}${username}`);
        return setGoals(response.data);
    }

    async function getGoal(id) {
        // retrieve goal by id
        const response = await axios.get(`${baseUrl}detail/${id}`);
        return await new Promise((resolve) => resolve(response.data));
    }

    function addGoal(newGoal) {
        // authenticate user to create a goal
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`,
        };

        return axios
            .post(baseUrl, newGoal, { headers: myHeaders }) // creates new goal using token - maybe add a check if username matches goal?
            .then((response) => {
                getUserGoals();
                return new Promise((resolve) => resolve(response.data));
            });
    }

    function editGoal(goal) {
        // authenticate user to edit a goal
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`,
        };

        return axios
            .put(`${baseUrl}detail/${goal.goalId}`, goal, {
                headers: myHeaders,
            })
            .then((response) => {
                // updates goal - maybe add a check if username matches goal?
                getUserGoals();
                return new Promise((resolve) => resolve(response.data));
            });
    }

    function deleteGoal(id) {
        // authenticate user to delete a goal
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`,
        };

        return axios
            .delete(`${baseUrl}detail/${id}`, { headers: myHeaders })
            .then((response) => {
                // deletes goal using token - maybe add a check if username matches goal?
                getUserGoals();
                return new Promise((resolve) => resolve(response.data));
            });
    }

    return (
        <GoalContext.Provider
            value={{
                goals,
                // getAllGoals,
                getGoal,
                addGoal,
                editGoal,
                deleteGoal,
                getUserGoals,
            }}
        >
            {props.children}
        </GoalContext.Provider>
    );
};
