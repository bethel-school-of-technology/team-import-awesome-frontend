import React, { useContext, useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import CommentContext from '../contexts/CommentContext';
import { useNavigate } from 'react-router-dom';
import '../css/add-goal.css';

const EditComment = ({comment, show, close }) => {

    const [updatedComment, setUpdatedComment] = useState({
        comment: '',
    });

    let { getComment, editComment } = useContext(CommentContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (comment === undefined) return;

        async function fetch() {
            await getComment(comment.commentId).then((comment) => setUpdatedComment(comment));
            console.log(comment)
        }
        fetch();
    }, [comment, getComment]);

    function handleChange(event) {
        setUpdatedComment((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value };
        });
    }

    const handleSubmit = () => {
        close();

        editComment(updatedComment)
            .then(() => navigate(`/goals/detail/${updatedComment.goalId}`))
            .catch((error) => {
                console.log(error);
                window.alert('Error updating comment');
            });
    };

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title className="modal-title">
                        Edit Comment
                    </Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit} className="modal-form">
                    <Form.Group>
                        <Form.Control
                            type="textarea"
                            placeholder="Comment"
                            name="comment"
                            value={comment}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />

                    <Button type="submit" variant='outline'>Update Comment</Button>
                    <br />
                    <Button variant='outline' onClick={close}>Cancel</Button>
                </Form>

                <Modal.Footer className="modal-footer"></Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditComment;
