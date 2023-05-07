import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import AddGoal from './AddGoal';
import '../css/goalList.css';

export function GoalList({ goals }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <div>
                <AddGoal show={showModal} close={() => setShowModal(false)} />
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Add Goal
                </Button>
                <div className="goalList">
                    <h2>Goal List</h2>
                    <div>
                        {goals.map((g) => {
                            let startDate = g.startDate;
                            let endDate = g.endDate;
                            let newStartDate = new Date(
                                startDate
                            ).toLocaleDateString();
                            let newEndDate = new Date(
                                endDate
                            ).toLocaleDateString();
                            return (
                                <div key={g.goalId}>
                                    <Card className="goalItem">
                                        <Link to={`/goals/detail/${g.goalId}`}>
                                            {g.title}
                                        </Link>
                                        <p>{newStartDate}</p>
                                        <p>{newEndDate}</p>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GoalList;

{
    /* <AddGoal show={showModal} close={() => setShowModal(false)} />  */
}
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
