import React, { useContext, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
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

                <Form onSubmit={handleSubmit} className="modal-form">
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={newGoal.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />

                    <Form.Group>
                        <Form.Label>Plan</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Plan"
                            name="plan"
                            value={newGoal.plan}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />

                    <Form.Group>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="MM/DD/YYYY"
                            name="startDate"
                            value={newGoal.startDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />

                    <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            placeholder="MM/DD/YYYY"
                            name="endDate"
                            value={newGoal.endDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />

                    <Button type="submit">Add Goal</Button>
                    <br />
                    <Button onClick={close}>Cancel</Button>
                </Form>

                <Modal.Footer className="modal-footer"></Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddGoal;
