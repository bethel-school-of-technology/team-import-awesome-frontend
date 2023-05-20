import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentContext from './CommentContext.js';

export const CommentProvider = (props) => {
    const [comment, setComment] = useState([]); // set state variable of comment
    const baseUrl = 'http://localhost:3000/comments/'; // the baseURL used for the axios calls

    useEffect(() => {
        // once the component is mounted - executes getAllComments only when necessary
        async function fetchData() {
            // fetches comment data
            await getAllComments();
        }
        fetchData();
    }, []);

    async function getAllComments() {
        // retrieve all comments
        const response = await axios.get(baseUrl);
        return setComment(response.data);
    }

    async function getComment(id) {
        // retrieve comment by id
        const response = await axios.get(baseUrl + id);
        return await new Promise((resolve) => resolve(response.data));
    }

    async function addComment(newComment) {
        // authenticate user to create a comment
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`,
        };

        const response = await axios.post(baseUrl, newComment, {
            headers: myHeaders,
        }); // creates new comment using token

        return await new Promise((resolve) => resolve(response.data));
    }

    async function editComment(comment) {
        // authenticate user to edit a comment
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`,
        };

        const response = await axios.put(baseUrl + comment.commentId, comment, {
            headers: myHeaders,
        });
        // updates comment
        getAllComments();
        return await new Promise((resolve) => resolve(response.data));
    }

    async function deleteComment(id) {
        // authenticate user to delete a comment
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`,
        };

        const response = await axios.delete(baseUrl + id, {
            headers: myHeaders,
        });
        // deletes comment using token
        getAllComments();
        return await new Promise((resolve) => resolve(response.data));
    }

    return (
        <CommentContext.Provider
            value={{
                comment,
                getAllComments,
                getComment,
                addComment,
                editComment,
                deleteComment,
            }}
        >
            {props.children}
        </CommentContext.Provider>
    );
};
