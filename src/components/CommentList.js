import { Button, Card } from 'react-bootstrap';
import { AddComment } from './AddComment';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CommentContext from '../contexts/CommentContext';
import EditComment from './EditComment';
import '../css/comment-list.css';
import moment from 'moment';

export function CommentList({ comments, currentUser, userGoal }) {

    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [ toUpdate, setToUpdate ] = useState(null)

    let { getComment, deleteComment } = useContext(CommentContext);
    const navigate = useNavigate();

    // delete comment
    const handleDelete = (commentId) => {
        // user confirmation to prevent accidental deleting
        if (window.confirm('Are you sure you want to delete this comment?')) {
            deleteComment(commentId)
                .then(() => {
                   navigate(`/goals/detail/${userGoal.goalId}`);
                   window.location.reload(true)
                })
                .catch((error) => {
                    console.log(error);
                    navigate(`/goals/detail/${userGoal.goalId}`);
                });
        }
    };

    return (
        <div className="comment-list-main">
            <h3>Comments:</h3>
            <AddComment show={showAddModal} close={() => setShowAddModal(false)} />
            <Button variant="outline" onClick={() => setShowAddModal(true)}>
                Add Comment
            </Button>
            {comments.length > 0 ? (
                <div>
                    {comments
                        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                        .map((c) => {

                            let createdAt = moment(c.createdAt).format(
                                'MMMM Do YYYY, h:mm a'
                            );

                            let handleClick = async () => {
                                let fetchedComment = await getComment(c.commentId);
                                setShowEditModal(true);
                                setToUpdate(fetchedComment);
                            }

                            return (
                                <Card
                                    className="comment-card"
                                    key={c.commentId}
                                >
                                    <Card.Header className="comment-header custom-header">
                                        <div className="header-left">
                                            <Link
                                                style={{
                                                    fontWeight: 'bold',
                                                    textDecoration: 'underline',
                                                    textAlign: 'left',
                                                    display: 'inline-block',
                                                }}
                                                to={`/profile-page/${c.username}`}
                                            >
                                                {c.username}
                                            </Link>
                                        </div>
                                        <div className="header-right">
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                {c.username === currentUser ? (
                                                    <div>
                                                        <EditComment
                                                            show={showEditModal}
                                                            close={() => setShowEditModal(false)}
                                                            comment={toUpdate}
                                                        />
                                                        <Link to="#"
                                                            className="crud-comment"
                                                            style={{ marginLeft: '10px' }}
                                                            onClick={handleClick}
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            className="crud-comment"
                                                            style={{ marginLeft: '10px' }}
                                                            onClick={() => handleDelete(c.commentId)}
                                                        >
                                                            Delete
                                                        </Link>
                                                    </div>
                                                ) : userGoal.username === currentUser ? (
                                                    <div>
                                                        <Link
                                                            variant="link"
                                                            className="delete-button"
                                                            onClick={() => handleDelete(c.commentId)}
                                                        >
                                                            Delete
                                                        </Link>
                                                    </div>
                                                ) : null}
                                                <p className='mb-0 mx-1' >|</p>
                                                <p className='mb-0' >{createdAt}</p>
                                            </div>
                                        </div>
                                    </Card.Header>
                                    <div className="comment">
                                        <p
                                            style={{
                                                marginTop: '10px',
                                                marginBottom: '10px',
                                            }}
                                        >
                                            {c.comment}
                                        </p>
                                        {/* {c.username === currentUser ? (
                                            <div>
                                                <EditComment
                                                    show={showModal}
                                                    close={() => setShowModal(false)}
                                                />
                                                <div className="edit-delete-buttons">
                                                    <Link to="#"
                                                        className="crud-comment"
                                                        onClick={() => setShowModal(true)}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        className="crud-comment"
                                                        onClick={handleDelete}
                                                    >
                                                        Delete
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : userGoal.username === currentUser ? (
                                            <div className="edit-delete-buttons">
                                                <Button
                                                    variant="link"
                                                    className="delete-button"
                                                    onClick={handleDelete}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        ) : null} */}
                                    </div>
                                </Card>
                            );
                        })}
                </div>
            ) : (
                <p>No comments yet.</p>
            )}
        </div>
    );
}
