import { useState } from "react";
import { Button } from "react-bootstrap";
import AddGoal from "./AddGoal";

export function GoalList() {
    const [goals, setGoals] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const toggle = (id) => setGoals(goals.map(goal => goal.id === id ? { ...goal, complete: !goal.complete } : goal));
    
    
    return <><ul>
        {goals.map(goal => <li key={goal.id} style={{
            display: "flex",
            gap: "5px"
        }}>
            {goal.name}
            <button onClick={() => toggle(goal.id)}>{goal.complete ? "uncheck" : "check"}</button>
            <button onClick={() => setGoals(goals.filter(g => g.id !== goal.id))}>X</button>
        </li>)}
    </ul>
        <div>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Goal
            </Button>
        </div>
        <AddGoal show={showModal} close={() => setShowModal(false)}/>
    </>
    
}

export default GoalList;