//  rough framework - might have to edit after testing - Brad

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoalContext from './GoalContext.js';

export const GoalProvider = (props) => {
    const [goal, setGoal] = useState([]); // set state variable of goal
    const baseUrl = 'http://localhost:3000/goals/'; // the baseURL used for the axios calls

    useEffect(() => {
        // once the component is mounted - executes getAllGoals only when necessary
        async function fetchData() {
            // fetches goal data
            await getAllGoals();
        }
        fetchData();
    }, []);

    function getAllGoals() {
        // retrieve all goals
        return axios.get(baseUrl).then((response) => setGoal(response.data));
    }

    function getGoal(id) {
        // retrieve goal by id
        return axios.get(baseUrl + id).then((response) => {
            return new Promise((resolve) => resolve(response.data));
        });
    }

    function addGoal(goal) {
        // authenticate user to create a goal
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myUsername')}`,
        };

        return axios
            .post(baseUrl, goal, { headers: myHeaders }) // creates new goal using token - maybe add a check if username matches goal?
            .then((response) => {
                getAllGoals();
                return new Promise((resolve) => resolve(response.data));
            });
    }

    function editGoal(goal) {
        // authenticate user to edit a goal
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myUsername')}`,
        };

        return axios
            .put(baseUrl + goal.goalId, goal, { headers: myHeaders })
            .then((response) => {
                // updates goal - maybe add a check if username matches goal?
                getAllGoals();
                return new Promise((resolve) => resolve(response.data));
            });
    }

    function deleteGoal(id) {
        // authenticate user to delete a goal
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`,
        };

        return axios
            .delete(baseUrl + id, { headers: myHeaders })
            .then((response) => {
                // deletes goal using token - maybe add a check if username matches goal?
                getAllGoals();
                return new Promise((resolve) => resolve(response.data));
            });
    }

    return (
        <GoalContext.Provider
            value={{
                goal,
                getAllGoals,
                getGoal,
                addGoal,
                editGoal,
                deleteGoal,
            }}
        >
            {props.children}
        </GoalContext.Provider>
    );
};
