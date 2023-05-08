import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import AddGoal from './AddGoal';
import '../css/goalList.css';

export function GoalList({ goals }) {
    const [showModal, setShowModal] = useState(false);

    // Filter goals based on whether they are completed or not - Brad
    const completedGoals = goals.filter((goal) => goal.completed);
    const incompleteGoals = goals.filter((goal) => !goal.completed);

    return (
        <div>
            <div>
                <AddGoal show={showModal} close={() => setShowModal(false)} />
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Add Goal
                </Button>
                <div className="goalList">
                    <h2>Goal List</h2>
                    {incompleteGoals.length > 0 ? (
                        <div>
                            <h3 className="category">In Progress:</h3>
                            {incompleteGoals.map((goal) => (
                                <div key={goal.goalId}>
                                    <Card className="goalItem">
                                        <Link to={`/goals/detail/${goal.goalId}`}>{goal.title}</Link>
                                        <p>{goal.startDate}</p>
                                        <p>{goal.endDate}</p>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <h3 className="category">In Progress:</h3>
                            <p>No Goals In Progress</p>
                        </div>
                    )}
                    {completedGoals.length > 0 ? (
                        <div>
                            <h3 className="category">Completed:</h3>
                            {completedGoals.map((goal) => (
                                <div key={goal.goalId}>
                                    <Card className="goalItem">
                                        <Link to={`/goals/detail/${goal.goalId}`}>{goal.title}</Link>
                                        <p>{goal.startDate}</p>
                                        <p>{goal.endDate}</p>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <h3 className="category">Completed:</h3>
                            <p>No Goals Completed</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GoalList;

// <AddGoal show={showModal} close={() => setShowModal(false)} />

// const { goals, editGoal } = useContext(GoalContext);
// const [ isChecked, setIsChecked ] = useState(false);

// function handleCheckboxChange() {
//     setIsChecked(!isChecked);
//   }

// const goalComplete = (goal) => {
//     const editedGoal = { ...goal, completed: true}
//     editGoal(editedGoal)
//     .then(()=>{
//         console.log('success')
//     })
//     .catch((error) =>{
//         console.log(error)
//     })
// }

// const goalIncomplete = (goal) => {
//     const editedGoal = { ...goal, completed: false}
//     editGoal(editedGoal)
//     .then(()=>{
//         console.log('success')
//     })
//     .catch((error) => {
//         console.log(error)
//     })
// }

// {({goals}) => {
//     return (
//         <div className="goal-container">

//             <ul class="list-group">

//                         {goals.map(goal =>
//                             <li key={goal.goalId} className="list-group-item">
//                                 <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
//                                 <a className="goalItem" href={`/goals/${goal.goalId}`} >{goal.title}</a>
//                             </li>
//                         )}

//             </ul>
//             <br></br>
// <Button variant="primary" onClick={() => setShowModal(true)}>
//     Add Goal
// </Button>

//             <AddGoal show={showModal} close={() => setShowModal(false)} />
//         </div>
//     )
// }}
