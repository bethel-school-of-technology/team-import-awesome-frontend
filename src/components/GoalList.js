import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import AddGoal from './AddGoal';
import GoalContext from '../contexts/GoalContext';
import '../css/goalList.css';
import { useParams } from 'react-router-dom';

export function GoalList() {
    const [goals, setGoals] = useState([]);
    let { username } = useParams();
    let { getUserGoals } = useContext(GoalContext);

    const [user, setUser] = useState('');
    const [showModal, setShowModal] = useState(false);

    function isLoggedIn() {
        let user = localStorage.getItem('myUsername');
        setUser(user);
    }

    useEffect(() => {
        async function fetchData() {
            await isLoggedIn();
            await getUserGoals(username).then((goals) => setGoals(goals));
        }
        fetchData();
    }, [username]);

    return (
        <div>
            <GoalContext.Consumer>
                {({ goals }) => {
                    return (
                        <div>
                            <AddGoal
                                show={showModal}
                                close={() => setShowModal(false)}
                            />
                            <Button
                                variant="primary"
                                onClick={() => setShowModal(true)}
                            >
                                Add Goal
                            </Button>
                            <div className="goalList">
                                <h2>Goal List</h2>
                                <div>
                                    {goals.map((g) => {
                                        return (
                                            <div key={g.goalId}>
                                                <Card className="goalItem">
                                                    <Link
                                                        to={`/goals/detail/${g.goalId}`}
                                                    >
                                                        {g.title}
                                                    </Link>
                                                </Card>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                }}
            </GoalContext.Consumer>
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
