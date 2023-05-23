import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoalContext from './GoalContext.js';

export const GoalProvider = (props) => {
    const [goals, setGoals] = useState([]);
    const baseUrl = 'http://localhost:3000/goals/';

    // once the component is mounted - executes getAllGoals only when necessary
    // fetches goal data
    useEffect(() => {
        async function fetchData() {
            await getUserGoals();
        }
        fetchData();
    }, []);

    async function getUserGoals(username) {
        const response = await axios.get(`${baseUrl}${username}`);
        return setGoals(response.data);
    }

    // retrieve goal by id
    async function getGoal(id) {
        const response = await axios.get(`${baseUrl}detail/${id}`);
        return await new Promise((resolve) => resolve(response.data));
    }

    // creates new goal using token
    async function addGoal(newGoal) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`,
        };

        const response = await axios.post(baseUrl, newGoal, {
            headers: myHeaders,
        });
        getUserGoals();
        return await new Promise((resolve) => resolve(response.data));
    }

    // updates goal
    async function editGoal(goal) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`,
        };

        const response = await axios.put(
            `${baseUrl}detail/${goal.goalId}`,
            goal,
            {
                headers: myHeaders,
            }
        );

        getUserGoals();
        return await new Promise((resolve) => resolve(response.data));
    }

    // deletes goal using token
    async function deleteGoal(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`,
        };

        const response = await axios.delete(`${baseUrl}detail/${id}`, {
            headers: myHeaders,
        });

        getUserGoals();
        return await new Promise((resolve) => resolve(response.data));
    }

    return (
        <GoalContext.Provider
            value={{
                goals,
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
