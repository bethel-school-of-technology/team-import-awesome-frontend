import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import GoalContext from '../contexts/GoalContext';
import { useNavigate } from 'react-router-dom';

const AddGoal = ({show, close}) => {
    const [title, setTitle] = useState("");
    const [plan, setPlan] = useState("");
    const [timeframe, setTimeframe] = useState("");

    let { addGoal } = useContext(GoalContext);

    let navigate = useNavigate();

    const handleSubmit = () => {
        let user = localStorage.getItem('myUsername')
        close();
        addGoal(title, plan, timeframe)
        .then( navigate(`/profile-page/${user}`) )
        .catch(error => {
            console.log(error);
            window.alert('Error creating goal');
        });
    }

    return (
        <div className="modal show"
        style={{ display: 'block', position: 'initial' }}>
        <Modal show={show} onHide={close}>

                <Modal.Header closeButton className='modal-header'>
                    <Modal.Title className='modal-title'>Set a New Goal</Modal.Title>
                </Modal.Header>

                <form onSubmit={handleSubmit} className="modal-form">
                    <br></br>
                
                    <input  placeholder='title' type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                    <br></br>
            
                    <input placeholder='plan' type="text" name="plan" value={plan} onChange={e => setPlan(e.target.value)} />
                    <br></br>
        
                    <input placeholder='timeframe'  type="text" name="timeframe" value={timeframe} onChange={e => setTimeframe(e.target.value)} />
                    <br /><br></br>

                    <button>
                        Add Goal
                    </button>

                    <br /><br></br>

                    <button onClick={close}>
                        Cancel
                    </button>
                </form>

                <Modal.Footer className='modal-footer'>

                    <p>This shit Brokey</p>

                </Modal.Footer>
            </Modal>

        </div>
    )
};

export default AddGoal;