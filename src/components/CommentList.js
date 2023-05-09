import { Button, Card } from 'react-bootstrap';
import { AddComment } from './AddComment';
import { useState } from 'react';
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
                                <h6>{createdAt}</h6>
                                <span>
                                    {c.username}: {c.comment}
                                </span>
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
