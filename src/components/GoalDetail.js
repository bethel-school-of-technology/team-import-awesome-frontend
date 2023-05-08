import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import EditGoal from './EditGoal';
import GoalContext from '../contexts/GoalContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/GoalDetail.css';
import { CommentList } from './CommentList';

function GoalDetail() {
    const { deleteGoal, getGoal } = useContext(GoalContext);
    let { id } = useParams();
    const navigate = useNavigate();

    // // retrieve comments data and getAllComments function from context
    // const { comment, getAllComments } = useContext(CommentContext);

    // // set state variable for comments that belong to the user's goal
    // const [goalComments, setGoalComments] = useState([]);

    const [userGoal, setUserGoal] = useState({
        completed: false,
        title: '',
        plan: '',
        startDate: '',
        endDate: '',
        Comments: [],
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await getGoal(id).then((goal) => setUserGoal(goal));
        }
        fetchData();
    }, [id, getGoal]);

    // display loading spinner while fetching data
    if (!userGoal) {
        return <div>Loading...</div>;
    }

    // delete goal
    const handleDelete = () => {
        // user confirmation to prevent accidental deleting
        if (window.confirm('Are you sure you want to delete this goal?')) {
            deleteGoal(userGoal.goalId)
                .then(() => {
                    navigate(`/profile-page/${userGoal.username}`);
                })
                .catch((error) => {
                    console.log(error);
                    navigate('/signIn');
                });
        }
    };

    let startDate = userGoal.startDate;
    let endDate = userGoal.endDate;
    let newStartDate = new Date(startDate).toLocaleDateString();
    let newEndDate = new Date(endDate).toLocaleDateString();

    return (
        <div className="goal-detail-body">
            <div className="container">
                <h2>Title: {userGoal.title}</h2>
                <h5>Plan: {userGoal.plan}</h5>
                <br />
                <label>Goal Complete: </label>{' '}
                <input
                    type={'checkbox'}
                    value={userGoal.completed}
                    checked={userGoal.completed}
                />
                <div>Start Date: {newStartDate}</div>
                <div>End Date: {newEndDate}</div>
                <div>
                    <EditGoal
                        show={showModal}
                        close={() => setShowModal(false)}
                    />
                    <div className="button-container">
                        <Button
                            className="editBtn"
                            variant="primary"
                            onClick={() => setShowModal(true)}
                        >
                            Edit
                        </Button>
                        <Button
                            className="deleteBtn"
                            variant="primary"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
                <hr />
                <CommentList comments={userGoal.Comments} />
            </div>
        </div>
    );
}

export default GoalDetail;
