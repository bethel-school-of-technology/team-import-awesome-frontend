import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import EditGoal from './EditGoal';
import GoalContext from '../contexts/GoalContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/GoalDetail.css';
import { CommentList } from './CommentList';
import moment from 'moment';
import { Link } from 'react-router-dom';

function GoalDetail() {
    const { deleteGoal, getGoal } = useContext(GoalContext);
    let { id } = useParams();
    const navigate = useNavigate();

    const [userGoal, setUserGoal] = useState({
        completed: false,
        title: '',
        plan: '',
        startDate: '',
        endDate: '',
        Comments: [],
    });

    const [showModal, setShowModal] = useState(false);
    const [currentUser, setCurrentUser] = useState();

    function isLoggedIn() {
        let loggedUser = localStorage.getItem('myUsername');
        setCurrentUser(loggedUser);
    }

    useEffect(() => {
        async function fetchData() {
            await getGoal(id).then((goal) => setUserGoal(goal));
        }
        fetchData();
        isLoggedIn();
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
                    navigate(`/profile-page/${userGoal.username}`);
                });
        }
    };

    let startDate = moment.utc(userGoal.startDate).format('MM/DD/YYYY');
    let endDate = moment.utc(userGoal.endDate).format('MM/DD/YYYY');
    const timeRemaining = moment(endDate).fromNow(true);

    return (
        <div className="goal-detail-body">
            <div className="back-button">
                <Link to={`/profile-page/${userGoal.username}`}>Return to Profile Page</Link>
            </div>

            <div className="container">
                <h2>Title: {userGoal.title}</h2>
                <h5>Plan: {userGoal.plan}</h5>
                <br />
                {userGoal.completed === true ? (
                    <h4>Goal Complete!</h4>
                ) : (
                    <h4>Goal Not Complete</h4>
                )}
                <div>Start Date: {startDate}</div>
                <div>End Date: {endDate}</div>
                <h5>Time Remaining: {timeRemaining}</h5>
                {currentUser === userGoal.username ? (
                    <div>
                        <EditGoal
                            show={showModal}
                            close={() => setShowModal(false)}
                        />
                        <div className="button-container">
                            <Button
                                className="editBtn"
                                variant='outline'
                                onClick={() => setShowModal(true)}
                            >
                                Edit
                            </Button>
                            <Button
                                className="deleteBtn"
                                variant="outline"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ) : (
                    ''
                )}

                <hr />
                <CommentList comments={userGoal.Comments} />
            </div>
        </div>
    );
}

export default GoalDetail;
