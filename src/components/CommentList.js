import { Button, Card } from "react-bootstrap";
import '../css/commentList.css'
import { AddComment } from "./AddComment";
import { useState } from "react";



export function CommentList({comments}) {

    const [showModal, setShowModal] = useState(false);

    return(
        <div className="comment-list-main">
            {/* <h1 key={comments.commentId} >{comments.comment}</h1> */}
            <h3>Comments:</h3>
            <AddComment 
                show={showModal}
                close={() => setShowModal(false)}
            />
            <Button
                variant="primary"
                onClick={() => setShowModal(true)}
            >
                Add Comment
            </Button>
                {comments.length > 0 ? (
                    <div>
                        {comments.map((c) => (
                            <Card className="comment-card" key={c.commentId}>
                                <p>{c.comment}</p>
                                <p>User: {c.username}</p>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p>No comments yet.</p>
                )}
        </div>

    )
}