import React, { useContext, useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import GoalContext from '../contexts/GoalContext';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Confetti from 'react-confetti';
import '../css/add-goal.css';

const EditGoal = ({ show, close }) => {
    let { id } = useParams();

    const [updatedGoal, setUpdatedGoal] = useState({ // state varaible for the goal to be edited
        title: '',
        plan: '',
        startDate: '',
        endDate: '',
        completed: false,
    });

    const [showCongratulations, setShowCongratulations] = useState(false); // congratulations window for completed goals

    let { getGoal, editGoal } = useContext(GoalContext); // functions to use from the context
    let navigate = useNavigate();

    useEffect(() => {
        if (id === undefined) return;

        async function fetch() {
            await getGoal(id).then((goal) => setUpdatedGoal(goal)); // fetches goal by its idea, then sets it to the state variable
        }
        fetch();
    }, [id, getGoal]); // goalId and getGoal function as arguments

    function handleChange(event) { // triggers when input is changed
        setUpdatedGoal((prevValue) => { // creates a new object by spreading the properties of the previous goal state value (prevValue) and adding a new property.
            return { ...prevValue, [event.target.name]: event.target.value };
        });
    }

    const handleSubmit = (event) => { // form submission
        event.preventDefault();

        editGoal(updatedGoal) // editGoal is called for the goal that's going to be updated
            .then(() => {
                if ( // checks that dates exist
                    moment(updatedGoal.startDate).isValid() &&
                    moment(updatedGoal.endDate).isValid()
                ) {
                    console.log('Dates Valid');
                }
            })
            .then(() => {
                if (updatedGoal.completed) {
                    close();
                    setShowCongratulations(true); // will show congratulations window if goal is completed
                } else {
                    close();
                }
            })
            .then(() => navigate(`/goals/detail/${updatedGoal.goalId}`)) // navigates to the page of the goal that is being updated based on its id
            .catch((error) => {
                console.log(error);
                window.alert('Error updating goal');
            });
    };

    // let startDate = moment(updatedGoal.startDate).utcOffset(24).toDate();
    // let endDate = moment(updatedGoal.endDate).utcOffset(24).toDate();

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
                        <Form.Check // toggle switch
                            type="switch"
                            id="custom-switch"
                            name="completed"
                            checked={updatedGoal.completed}
                            onChange={() =>
                                setUpdatedGoal((prevGoal) => ({ //updates state of updated goal
                                    ...prevGoal, // receives old data
                                    completed: !prevGoal.completed, // returns new goal state that is set as 'completed'
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
