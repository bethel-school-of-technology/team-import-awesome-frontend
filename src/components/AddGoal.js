import React, { useContext, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import GoalContext from '../contexts/GoalContext';
import { useNavigate } from 'react-router-dom';

const AddGoal = ({ show, close }) => {
    const [newGoal, setNewGoal] = useState({
        title: '',
        plan: '',
        startDate: '',
        endDate: '',
    });

    let { addGoal } = useContext(GoalContext);

    let navigate = useNavigate();

    function handleChange(event) {
        setNewGoal((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value };
        });
    }

    const handleSubmit = () => {
        let user = localStorage.getItem('myUsername');
        close();
        addGoal(newGoal)
            .then(navigate(`/profile-page/${user}`))
            .catch((error) => {
                console.log(error);
                window.alert('Error creating goal');
            });
    };

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title className="modal-title">
                        Set a New Goal
                    </Modal.Title>
                </Modal.Header>

                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        placeholder="title"
                        type="text"
                        name="title"
                        value={newGoal.title}
                        onChange={handleChange}
                    />
                    <br></br>

                    <input
                        placeholder="plan"
                        type="text"
                        name="plan"
                        value={newGoal.plan}
                        onChange={handleChange}
                    />
                    <br></br>

                    <input
                        placeholder="Start Date"
                        type="text"
                        name="startDate"
                        value={newGoal.startDate}
                        onChange={handleChange}
                    />
                    <br></br>

                    <input
                        placeholder="End Date"
                        type="text"
                        name="endDate"
                        value={newGoal.endDate}
                        onChange={handleChange}
                    />
                    <br></br>

                    <button>Add Goal</button>

                    <br></br>

                    <Button onClick={close}>Cancel</Button>
                </form>

                <Modal.Footer className="modal-footer"></Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddGoal;
