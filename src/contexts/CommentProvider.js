//  rough framework - might have to edit after testing - Brad

import React from 'react';
import axios from "axios";
import CommentContext from "./CommentContext.js";

export const CommentProvider = (props) => {

    const [comment, setComment] = useState([]); // set state variable of comment
    const baseUrl = "http://localhost:3000/comments/"; // the baseURL used for the axios calls

    useEffect(() => { // once the component is mounted - executes getAllComments only when necessary
        async function fetchData() { // fetches comment data
            await getAllComments();
        }
        fetchData();
    }, []);

    function getAllComments() { // retrieve all comments
        return axios.get(baseUrl).then(response => setComment(response.data));
    }

    function getComment(id) { // retrieve comment by id
        return axios.get(baseUrl + id).then(response => {
            return new Promise((resolve) => resolve(response.data));
        })
    }

    function addComment(comment) { // authenticate user to create a comment
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myUsername')}`
        };

        return axios.post(baseUrl, comment, { headers: myHeaders }) // creates new comment using token
            .then(response => {
                getAllComments();
                return new Promise((resolve) => resolve(response.data));
            }
            );

    }

    function editComment(comment) { // authenticate user to edit a comment
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myUsername')}`
        }

        return axios.put(baseUrl + comment.commentId, comment, { headers: myHeaders }).then(response => { // updates comment
            getAllComments();
            return new Promise((resolve) => resolve(response.data));
        })
    }

    function deleteComment(id) { // authenticate user to delete a comment
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('myUsername')}`
        };

        return axios.delete(baseUrl + id, { headers: myHeaders }).then(response => { // deletes comment using token
            getAllComments();
            return new Promise((resolve) => resolve(response.data));
        });

    }

    return (
        <CommentContext.Provider value={{
            comment,
            getAllComments,
            getComment,
            addComment,
            editComment,
            deleteComment
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}