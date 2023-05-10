import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import GoalContext from '../contexts/GoalContext';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Confetti from 'react-confetti';
import '../css/addGoal.css';

const EditGoal = ({ show, close }) => {
    let { id } = useParams();

    const [updatedGoal, setUpdatedGoal] = useState({
        title: '',
        plan: '',
        startDate: '',
        endDate: '',
        completed: false,
    });

    const [showCongratulations, setShowCongratulations] = useState(false);

    let { getGoal, editGoal } = useContext(GoalContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (id === undefined) return;

        async function fetch() {
            await getGoal(id).then((goal) => setUpdatedGoal(goal));
        }
        fetch();
    }, [id, getGoal]);

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
                    moment(updatedGoal.startDate).isValid() &&
                    moment(updatedGoal.endDate).isValid()
                ) {
                    console.log('Dates Valid');
                }
            })
            .then(() => {
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

                <form onSubmit={handleSubmit} className="modal-form">
                    <div>
                        <input
                            type="checkbox"
                            name="completed"
                            checked={updatedGoal.completed}
                            onChange={() =>
                                setUpdatedGoal((prevValue) => ({
                                    ...prevValue,
                                    completed: !prevValue.completed,
                                }))
                            }
                        />
                        <label
                            for="completed"
                            style={{ color: 'black', fontWeight: 'bold' }}
                        >
                            Completed
                        </label>
                    </div>
                    <br></br>

                    <input
                        type="text"
                        name="title"
                        value={updatedGoal.title}
                        onChange={handleChange}
                    />
                    <br></br>

                    <textarea
                        name="plan"
                        value={updatedGoal.plan}
                        onChange={handleChange}
                    />
                    <br></br>

                    <input
                        type="date"
                        name="startDate"
                        defaultValue={moment
                            .utc(updatedGoal.startDate)
                            .format('YYYY-MM-DD')}
                        onChange={handleChange}
                    />
                    <br></br>

                    <input
                        type="date"
                        name="endDate"
                        defaultValue={moment
                            .utc(updatedGoal.endDate)
                            .format('YYYY-MM-DD')}
                        onChange={handleChange}
                    />
                    <br></br>

                    <button>Update Goal</button>

                    <br></br>

                    <Button onClick={close}>Cancel</Button>
                </form>

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
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <Confetti
                            width={window.innerWidth}
                            height={window.innerHeight}
                        />
                    </div>
                    <p>You have successfully completed your goal!</p>
                </Modal.Body>

                <Modal.Footer className="modal-footer">
                    <Button onClick={() => setShowCongratulations(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditGoal;
