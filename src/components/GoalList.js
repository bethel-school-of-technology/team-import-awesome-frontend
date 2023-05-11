import React, { useEffect, useState } from 'react';
import BgGradient from './BgGradient';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import '../css/goalList.css';
import moment from 'moment';



export function GoalList({ goals }) {
    // const [showModal, setShowModal] = useState(false);
    const [position, setPosition] = useState(744);

    // Filter goals based on whether they are completed or not - Brad
    const completedGoals = goals.filter((goal) => goal.completed);
    const incompleteGoals = goals.filter((goal) => !goal.completed);

    // Currently causes a memory leak
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setPosition(position + 0.02);
    //     }, 16);
    //     return () => clearInterval(interval);
    // });


    return (
        <div>
            <div>
                {/* <AddGoal show={showModal} close={() => setShowModal(false)} />
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Add Goal
                </Button> */}
                <div className="goalList">
                    <h2>Goal List</h2>
                    {incompleteGoals.length > 0 ? (
                        <div>
                            <h3 className="category">In Progress:</h3>
                            {incompleteGoals.map((goal) => {
                                let startDate = moment
                                    .utc(goal.startDate)
                                    .format('MM/DD/YYYY');
                                let endDate = moment
                                    .utc(goal.endDate)
                                    .format('MM/DD/YYYY');

                                const timeRemaining = moment(endDate).fromNow(true);
                                return (
                                    <div key={goal.goalId}>
                                        <Card className="goalItem incomplete">
                                            <div>
                                                <faTrophy />
                                                <Link
                                                    to={`/goals/detail/${goal.goalId}`}
                                                >
                                                    {goal.title}
                                                </Link>
                                                <faTrophy />

                                            </div>
                                            <div>
                                                <span>
                                                    Start Date: {startDate}
                                                </span>{' '}
                                                -{' '}
                                                <span>End Date: {endDate}</span>
                                                <br />
                                                <span>
                                                    Time Remaining:{' '}
                                                    {timeRemaining}{' '}
                                                </span>
                                            </div>
                                        </Card>
                                    </div>
                                );
                            })}
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
                            {completedGoals.map((goal) => {
                                let startDate = moment
                                    .utc(goal.startDate)
                                    .format('MM/DD/YYYY');
                                let endDate = moment
                                    .utc(goal.endDate)
                                    .format('MM/DD/YYYY');
                                return (
                                    <div key={goal.goalId} className='goalItem'>
                                        <Card >
                                            <div className='goalContent'>
                                                <div>
                                                    <Link
                                                        to={`/goals/detail/${goal.goalId}`}
                                                    >
                                                        {goal.title}
                                                    </Link>
                                                </div>
                                                <div>
                                                    <span>
                                                        Start Date: {startDate}
                                                    </span>{' '}
                                                    -{' '}
                                                    <span>End Date: {endDate}</span>
                                                </div>
                                            </div>
                                            <BgGradient position={position} gradientId={goal.goalId}/>
                                        </Card>
                                    </div>
                                );
                            })}
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
