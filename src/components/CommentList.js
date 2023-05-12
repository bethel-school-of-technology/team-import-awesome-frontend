import { Button, Card } from 'react-bootstrap';
import { AddComment } from './AddComment';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/commentList.css';
import moment from 'moment';

export function CommentList({ comments }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="comment-list-main">
            <h3>Comments:</h3>
            <AddComment show={showModal} close={() => setShowModal(false)} />
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Comment
            </Button>
            {comments.length > 0 ? (
                <div>
                    {comments.map((c) => {
                        let createdAt = moment(c.createdAt).format(
                            'MMMM Do YYYY, h:mm a'
                        );
                        return (
                            <Card className="comment-card" key={c.commentId}>
                                <Link style={{ fontWeight: "bold", textDecoration: "underline", textAlign: "left" }} to={`/profile-page/${c.username}`}>{c.username}</Link>
                                <div className="date">
                                    <p>{createdAt}</p>
                                </div>
                                <div className="comment">
                                    <p>{c.comment}</p>
                                </div>
                                {/* <h6>{createdAt}</h6>
                                <span>
                                    {c.username}: {c.comment}
                                </span> */}
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
