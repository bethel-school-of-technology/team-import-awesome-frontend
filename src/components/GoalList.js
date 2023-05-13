import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form } from 'react-bootstrap';
import '../css/goalList.css';
import moment from 'moment';
import { FaTrophy } from "react-icons/fa";
import GoalContext from '../contexts/GoalContext'

export function GoalList({ goals }) {
    // const [showModal, setShowModal] = useState(false);

    // Filter goals based on whether they are completed or not - Brad
    const completedGoals = goals.filter((goal) => goal.completed);
    const incompleteGoals = goals.filter((goal) => !goal.completed);

    const { editGoal } = useContext(GoalContext)


    const goalComplete = (goal) => {
        const updatedGoal = { ...goal, completed: true}
        editGoal(updatedGoal)
        .then(()=>{
            console.log('success')
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    const goalIncomplete = (goal) => {
        const updatedGoal = { ...goal, completed: false}
        editGoal(updatedGoal)
        .then(()=>{
            console.log('success')
        })
        .catch((error) => {
            console.log(error)
        })
    }

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
                            {incompleteGoals.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((goal) => {
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
                                                <Form>
                                                    <Form.Group>
                                                        <Form.Label>Goal Complete?</Form.Label>
                                                        <Form.Check
                                                            type="switch"
                                                            id="custom-switch"
                                                            name="completed"
                                                            onChange={() => goalComplete(goal)}
                                                        />
                                                    </Form.Group>
                                                </Form>
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
                            {completedGoals.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((goal) => {
                                let startDate = moment
                                    .utc(goal.startDate)
                                    .format('MM/DD/YYYY');
                                let endDate = moment
                                    .utc(goal.endDate)
                                    .format('MM/DD/YYYY');
                                return (
                                    <div key={goal.goalId}>
                                        <Card className="goalItem complete">
                                            <div className='goal-title'>
                                                <Form>
                                                    <Form.Group>
                                                        <Form.Label>Goal Complete?</Form.Label>
                                                        <Form.Check
                                                            type="switch"
                                                            id="custom-switch"
                                                            name="completed"
                                                            onChange={() => goalIncomplete(goal)}
                                                        />
                                                    </Form.Group>
                                                </Form>
                                                <Link
                                                    to={`/goals/detail/${goal.goalId}`}
                                                >
                                                    {goal.title}
                                                </Link>
                                                <FaTrophy />
                                            </div>
                                            <div>
                                                <span>
                                                    Start Date: {startDate}
                                                </span>{' '}
                                                -{' '}
                                                <span>End Date: {endDate}</span>
                                            </div>
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
