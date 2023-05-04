import React, { useContext, useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import GoalContext from '../contexts/GoalContext';
import CommentContext from '../contexts/CommentContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/GoalDetail.css'

function GoalDetail() {
    const { goals, editGoal, deleteGoal, getGoal } = useContext(GoalContext); // retrieve goal data and editGoal & deleteGoal functions from context
    const [isEditing, setIsEditing] = useState(false); // set state variable for edit mode
    const { comment, getAllComments } = useContext(CommentContext); // retrieve comments data and getAllComments function from context
    const [goalComments, setGoalComments] = useState([]); // set state variable for comments that belong to the user's goal

    const [userGoal, setUserGoal] = useState({
        completed: false,
        title: '',
        plan: '',
        timeframe: '',
    });

    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // if (goalId === undefined) return;

        async function fetchData() {
            await getGoal(id).then((goal) => setUserGoal(goal));

            // setGoalComments(comment.filter((c) => c.goalId === userGoal.id));
            // getAllComments();
        }

        fetchData();
        console.log('User Goal:', id);
    }, [id]);

    // display loading spinner while fetching data
    if (!userGoal) {
        return <div>Loading...</div>;
    }

    // handle form submission in edit mode
    const handleSubmit = (event) => {
        event.preventDefault();
        editGoal(userGoal);
        setIsEditing(false);
    };

    // toggle edit mode
    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    // delete goal
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this goal?')) {
            // user confirmation to prevent accidental deleting
            deleteGoal(userGoal.goalId)
                .then(() => {
                    navigate(`/profile-page/${userGoal.username}`);
                })
                .catch((error) => {
                    console.log(error);
                    navigate('/signIn');
                });
        }
    };

    return (
        <div>
            {isEditing ? ( // conditional render for when the EDIT button is clicked
                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input
                            type="text"
                            value={userGoal.title}
                            onChange={(event) =>
                                setUserGoal({
                                    ...userGoal,
                                    title: event.target.value,
                                })
                            }
                        />
                    </label>
                    <br />
                    <label>
                        Plan:
                        <textarea
                            value={userGoal.plan}
                            onChange={(event) =>
                                setUserGoal({
                                    ...userGoal,
                                    plan: event.target.value,
                                })
                            }
                        />
                    </label>
                    <br />
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleToggleEdit}>
                        Cancel
                    </button>
                </form>
            ) : (
                <div class="container">
                    <p>Completed: {userGoal.completed}</p>
                    <h2>Title: {userGoal.title}</h2>
                    <p>Plan: {userGoal.plan}</p>
                    <p>Timeframe: {userGoal.timeframe}</p>
                    <div className="buttons">
                        <Button className="editBtn" variant="primary" onClick={handleToggleEdit}>
                            Edit
                        </Button>
                        <Button className="deleteBtn" variant="primary" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                    <hr />
                    {/* <h3>Comments:</h3>
                    {goalComments.length > 0 ? (
                        <ul>
                            {goalComments.map((comment) => (
                                <li key={comment.id}>
                                    <p>{comment.body}</p>
                                    <p>Author: {comment.author}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No comments yet.</p>
                    )} */}
                </div>
            )}
        </div>
    );
}

export default GoalDetail;
