import { useContext, useState, useEffect } from 'react';
import GoalContext from '../contexts/GoalContext';

function GoalDetail() {
    const { goal, editGoal, deleteGoal } = useContext(GoalContext); // retrieve goal data and editGoal & deleteGoal functions from context
    const [userGoal, setUserGoal] = useState(null); // set state variable for the user's goal
    const [isEditing, setIsEditing] = useState(false); // set state variable for edit mode

    useEffect(() => {
        // find the goal with the same username as the logged in user
        const currentUser = localStorage.getItem('myUsername'); // retrieve username from local storage
        const userGoal = goal.find(g => g.username === currentUser);
        setUserGoal(userGoal);
    }, [goal]);

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

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this goal?')) {
            deleteGoal(userGoal.id);
        }
    };

    return (
        <div>
            {isEditing ? (
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
                    <p>Timeframe: {userGoal.timeframe.toDateString()}</p>
                    <button type="button" onClick={handleToggleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default GoalDetail;