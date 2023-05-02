import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import AddGoal from "./AddGoal";
import GoalContext from "../contexts/GoalContext";
import '../css/goalList.css'

export function GoalList() {
    const { goals, editGoal } = useContext(GoalContext);
    const [showModal, setShowModal] = useState(false);
    const [ isChecked, setIsChecked ] = useState(false);

    function handleCheckboxChange() {
        setIsChecked(!isChecked);
      }

    const goalComplete = (goal) => {
        const editedGoal = { ...goal, completed: true}
        editGoal(editedGoal)
        .then(()=>{
            console.log('success')
        })
        .catch((error) =>{
            console.log(error)
        })
    }

    const goalIncomplete = (goal) => {
        const editedGoal = { ...goal, completed: false}
        editGoal(editedGoal)
        .then(()=>{
            console.log('success')
        })
        .catch((error) => {
            console.log(error)
        })
    }



    return (
        <div>
            <GoalContext.Consumer>
                {({goals}) => {
                    return (
                        <div>
                            <Button variant="primary" onClick={() => setShowModal(true)}>
                                Add Goal
                            </Button>
                            <ul class="list-group">
                        
                                        {goals.map(goal => 
                                            <li key={goal.goalId} className="list-group-item">
                                                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
                                                <a className="goalItem" href={`/goals/${goal.goalId}`} >{goal.title}</a>
                                            </li>
                                        
                                        )}

                            </ul>
                            
                            <AddGoal show={showModal} close={() => setShowModal(false)} />
                        </div>
                    )
                }}
            
            </GoalContext.Consumer>
        </div>
    )
}

export default GoalList;