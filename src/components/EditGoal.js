import React, { useContext, useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import GoalContext from '../contexts/GoalContext';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Confetti from 'react-confetti';
import '../css/add-goal.css';

const EditGoal = ({ show, close }) => {
    let { id } = useParams();

    // state varaible for the goal to be edited
    const [updatedGoal, setUpdatedGoal] = useState({
        title: '',
        plan: '',
        startDate: '',
        endDate: '',
        completed: false,
    });

    // congratulations window for completed goals
    const [showCongratulations, setShowCongratulations] = useState(false);

    // functions to use from the context
    let { getGoal, editGoal } = useContext(GoalContext);
    let navigate = useNavigate();

    // fetches goal by its idea, then sets it to the state variable
    useEffect(() => {
        if (id === undefined) return;

        async function fetch() {
            await getGoal(id).then((goal) => setUpdatedGoal(goal));
        }
        fetch();
    }, [id, getGoal]);

    // creates a new object by spreading the properties of the previous goal state value (prevValue) and adding a new property.
    function handleChange(event) {
        setUpdatedGoal((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value };
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        editGoal(updatedGoal)
            .then(() => {
                if (
                    // checks that dates exist
                    moment(updatedGoal.startDate).isValid() &&
                    moment(updatedGoal.endDate).isValid()
                ) {
                    console.log('Dates Valid');
                }
            })
            .then(() => {
                // will show congratulations window if goal is completed
                if (updatedGoal.completed) {
                    close();
                    setShowCongratulations(true);
                } else {
                    close();
                }
            })
            .then(() => navigate(`/goals/detail/${updatedGoal.goalId}`))
            .catch((error) => {
                console.log(error);
                window.alert('Error updating goal');
            });
    };

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title className="modal-title">Edit Goal</Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit} className="modal-form">
                    <Form.Group>
                        <Form.Label>Goal Complete?</Form.Label>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            name="completed"
                            checked={updatedGoal.completed}
                            onChange={() =>
                                setUpdatedGoal((prevGoal) => ({
                                    ...prevGoal,
                                    completed: !prevGoal.completed,
                                }))
                            }
                        />
                    </Form.Group>
                    <br />

                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={updatedGoal.title}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />

                    <Form.Group>
                        <Form.Label>Plan</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="plan"
                            placeholder="Plan"
                            rows={3}
                            value={updatedGoal.plan}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />

                    <Form.Group>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="startDate"
                            defaultValue={moment
                                .utc(updatedGoal.startDate)
                                .format('YYYY-MM-DD')}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />

                    <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="endDate"
                            defaultValue={moment
                                .utc(updatedGoal.endDate)
                                .format('YYYY-MM-DD')}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />

                    <Button
                        className="add-goal-buttons"
                        variant="outline"
                        type="submit"
                    >
                        Update Goal
                    </Button>
                    <br />
                    <Button
                        className="add-goal-buttons"
                        variant="outline"
                        onClick={close}
                    >
                        Cancel
                    </Button>
                </Form>

                <Modal.Footer className="modal-footer" />
            </Modal>
            {/* Congratulations modal */}
            <Modal
                show={showCongratulations}
                onHide={() => setShowCongratulations(false)}
            >
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title>Congratulations!</Modal.Title>
                </Modal.Header>

                <Modal.Body
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            pointerEvents: 'none',
                        }}
                    >
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                        />
                    </div>
                    <h3 style={{ color: '#4A707A' }}>
                        You have successfully completed your goal!
                    </h3>
                </Modal.Body>

                <Modal.Footer className="modal-footer">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setShowCongratulations(false);
                            navigate(`/profile-page/${updatedGoal.username}`);
                        }}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditGoal;
