import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import GoalContext from '../contexts/GoalContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/addGoal.css';

const EditGoal = ({ show, close }) => {
    let { id } = useParams()

    const [updatedGoal, setUpdatedGoal] = useState({
        title: '',
        plan: '',
        completed: false,
    });

    let { getGoal, editGoal } = useContext(GoalContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (id === undefined) return

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

    const handleSubmit = () => {
        close();
        editGoal(updatedGoal)
            .then(navigate(`/goals/detail/${updatedGoal.goalId}`))
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
                    <Modal.Title className="modal-title">
                        Edit Goal
                    </Modal.Title>
                </Modal.Header>

                <form onSubmit={handleSubmit} className="modal-form">
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
                        <label for="completed" style={{ color: 'black', fontWeight: 'bold' }}>Completed</label>
                    </div>

                    <br></br>

                    <button>Update Goal</button>

                    <br></br>

                    <Button onClick={close}>Cancel</Button>
                </form>

                <Modal.Footer className="modal-footer"></Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditGoal;