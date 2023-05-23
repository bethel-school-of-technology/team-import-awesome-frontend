import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentContext from './CommentContext.js';

export const CommentProvider = (props) => {
    const [comment, setComment] = useState([]);
    const baseUrl = 'http://localhost:3000/comments/';

    // once the component is mounted - executes getAllComments only when necessary
    // fetches comment data
    useEffect(() => {
        async function fetchData() {
            await getAllComments();
        }
        fetchData();
    }, []);

    // retrieve all comments
    async function getAllComments() {
        const response = await axios.get(baseUrl);
        return setComment(response.data);
    }

    // retrieve comment by id
    async function getComment(id) {
        const response = await axios.get(baseUrl + id);
        return await new Promise((resolve) => resolve(response.data));
    }

    // authenticate user to create a comment
    async function addComment(newComment) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`,
        };

        const response = await axios.post(baseUrl, newComment, {
            headers: myHeaders,
        }); // creates new comment using token

        return await new Promise((resolve) => resolve(response.data));
    }

    // updates comment
    async function editComment(comment) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`,
        };

        const response = await axios.put(baseUrl + comment.commentId, comment, {
            headers: myHeaders,
        });

        getAllComments();
        return await new Promise((resolve) => resolve(response.data));
    }

    // deletes comment using token
    async function deleteComment(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myToken')}`,
        };

        const response = await axios.delete(baseUrl + id, {
            headers: myHeaders,
        });

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
