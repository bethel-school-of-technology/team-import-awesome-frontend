import React, { useContext, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import GoalContext from '../contexts/GoalContext';

const AddGoal = ({show, close}) => {
    const [title, setTitle] = useState("");
    const [plan, setPlan] = useState("");
    const [timeframe, setTimeframe] = useState("");

    let { addGoal} = useContext(GoalContext);


    function handleSubmit() {

        close();
        addGoal(title, plan, timeframe).catch(error => {
            console.log(error);
            window.alert('Error creating goal');
        });

    }

    return (
        <div className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Set a New Goal</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit} className="text-center">
                    <br></br>
                    <h6>Title:</h6>
                    <input  type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                    <br></br>
                    <h6>Plan:</h6>
                    <input type="text" name="plan" value={plan} onChange={e => setPlan(e.target.value)} />
                    <br></br>
                    <h6>Timeframe:</h6>
                    <input type="text" name="timeframe" value={timeframe} onChange={e => setTimeframe(e.target.value)} />
                    <br /><br></br>
                </form>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Add Goal
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default AddGoal;