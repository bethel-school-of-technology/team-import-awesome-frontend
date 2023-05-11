import React, { useContext, useState } from "react";
import CommentContext from "../contexts/CommentContext";
import { useNavigate, useParams } from "react-router";
import { Button, Modal } from "react-bootstrap";

export function AddComment({show, close}){
    let { id } = useParams()


    const [newComment, setNewComment] = useState({
        comment: '',
        goalId: id
    });

    let { addComment } = useContext(CommentContext);


    let navigate = useNavigate();

    function handleChange(event) {
        setNewComment((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value };
        });
    }

    const handleSubmit = () => {
        close();
        addComment(newComment, {goalId: id})
            .then(navigate(`/goals/detail/${id}`))
            .catch((error) => {
                console.log(error);
                window.alert('Error creating comment');
            });
    };



    return(
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title className="modal-title">
                        Add Comment
                    </Modal.Title>
                </Modal.Header>

                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        placeholder="comment"
                        type="text"
                        name="comment"
                        value={newComment.comment}
                        onChange={handleChange}
                    />
                    
                    <br></br>

                    <button>Add Comment</button>

                    <br></br>

                    <Button onClick={close}>Cancel</Button>
                </form>

                <Modal.Footer className="modal-footer"></Modal.Footer>
            </Modal>
        </div>
    )

}