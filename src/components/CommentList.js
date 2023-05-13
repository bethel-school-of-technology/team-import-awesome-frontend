import { Button, Card } from 'react-bootstrap';
import { AddComment } from './AddComment';
import { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import GoalContext from '../contexts/GoalContext';
import CommentContext from '../contexts/CommentContext';
import '../css/comment-list.css';
import moment from 'moment';

export function CommentList({ comments }) {
    let { id } = useParams();

    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(""); // current user state
    const [goal, setGoal] = useState({}); // goal state

    const [comment, setComment] = useState({
        username: '',
        comment: '',
    });

    let { getComment, editComment, deleteComment } = useContext(CommentContext);
    let { getUser } = useContext(UserContext);
    let { getGoal } = useContext(GoalContext);

    function isLoggedIn() {
        let user = localStorage.getItem('myUsername');
        setCurrentUser(user);
    }

    useEffect(() => {
        async function fetch() {
            await getUser(currentUser).then((user) => setCurrentUser(user));
        }
        isLoggedIn();
        fetch();
    }, [getUser, currentUser]);

    useEffect(() => {
        if (id === undefined) return;

        async function fetch() {
            await getGoal(id).then((goal) => setGoal(goal));
        }
        fetch();
    }, [id, getGoal]);

    useEffect(() => {
        if (id === undefined) return;

        async function fetch() {
            await getComment(id).then((comment) => setComment(comment));
        }
        fetch();
    }, [id, getComment]);

    return (
        <div className="comment-list-main">
            <h3>Comments:</h3>
            <AddComment show={showModal} close={() => setShowModal(false)} />
            <Button variant="outline" onClick={() => setShowModal(true)}>
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
                                            <p
                                                style={{
                                                    display: 'inline-block',
                                                    textAlign: 'right',
                                                }}
                                            >
                                                {createdAt}
                                            </p>
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
                                        {(c.username === currentUser && !goal.username) || (goal.username && currentUser === goal.username) ? (
                                            <div className="edit-delete-buttons">
                                                <Button variant="link" className="edit-button">Edit</Button>
                                                <Button variant="link" className="delete-button">Delete</Button>
                                            </div>
                                        ) : null}
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
