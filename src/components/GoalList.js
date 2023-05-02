import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import AddGoal from "./AddGoal";
import GoalContext from "../contexts/GoalContext";

export function GoalList() {
    const { goals } = useContext(GoalContext);
    const [showModal, setShowModal] = useState(false);
    return <div>
        <ul class="list-group">
            <li class="list-group-item">
    

                    {goals.map(goal => <li key={goal.id} style={{
                        display: "flex",
                        gap: "10px"
                    }}><a href={`/goals/${goal.goalId}`} >{goal.title}</a>
                    </li>)}

            </li>
        </ul>
        <div>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Add Goal
            </Button>
        </div>
        <AddGoal show={showModal} close={() => setShowModal(false)} />
    </div>

}

export default GoalList;