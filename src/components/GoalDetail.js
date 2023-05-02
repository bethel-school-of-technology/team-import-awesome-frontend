import { useContext, useState, useEffect } from 'react';
import GoalContext from '../contexts/GoalContext';
import CommentContext from '../contexts/CommentContext';
import { useParams } from 'react-router-dom';

function GoalDetail() {
    const { goals, editGoal, deleteGoal } = useContext(GoalContext); // retrieve goal data and editGoal & deleteGoal functions from context
    const [userGoal, setUserGoal] = useState(null); // set state variable for the user's goal
    const [isEditing, setIsEditing] = useState(false); // set state variable for edit mode
    const { comment, getAllComments } = useContext(CommentContext); // retrieve comments data and getAllComments function from context
    const [goalComments, setGoalComments] = useState([]); // set state variable for comments that belong to the user's goal
    let { id } = useParams();

    useEffect(() => {
        // find the goal with the same username as the logged in user
        console.log(goals)
        async function fetchData() {
            console.log(goals)
            setUserGoal(goals.find(g => g.goalId == id));
            setGoalComments(comment.filter(c => c.goalId === userGoal.id)); // filter comments that belong to the user's goal
            getAllComments(); // fetch all comments to ensure the latest data is shown
        }
        if (userGoal === null && goals.length > 0) {
            fetchData();
        };
        console.log("User Goal:", userGoal);
    }, [comment, goals, getAllComments]);


    // display loading spinner while fetching data
    if (!userGoal) {
        return <div>Loading... {JSON.stringify(goals)}</div>;
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
        if (window.confirm('Are you sure you want to delete this goal?')) { // user confirmation to prevent accidental deleting
            deleteGoal(userGoal.id);
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
                            onChange={(event) => setUserGoal({ ...userGoal, title: event.target.value })}
                        />
                    </label>
                    <br />
                    <label>
                        Plan:
                        <textarea
                            value={userGoal.plan}
                            onChange={(event) => setUserGoal({ ...userGoal, plan: event.target.value })}
                        />
                    </label>
                    <br />
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleToggleEdit}>Cancel</button>
                </form>
            ) : (
                <div>
                    <h2>{userGoal.title}</h2>
                    <p>{userGoal.plan}</p>
                    <p>Completed: {userGoal.completed ? 'Yes' : 'No'}</p>
                    <p>Plan: {userGoal.plan}</p>
                    <p>Timeframe: {userGoal.timeframe}</p>
                    <button type="button" onClick={handleToggleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                    <hr />
                    <h3>Comments:</h3>
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
                    )}
                </div>
            )}
        </div>
    );
}

export default GoalDetail;