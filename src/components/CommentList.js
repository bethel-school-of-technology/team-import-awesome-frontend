import { Button, Card } from 'react-bootstrap';
import { AddComment } from './AddComment';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/comment-list.css';
import moment from 'moment';

export function CommentList({ comments }) {
    const [showModal, setShowModal] = useState(false);

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
