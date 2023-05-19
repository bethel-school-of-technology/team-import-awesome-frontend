import React, { useContext, useState, useEffect } from 'react';
import { Button, ProgressBar, Spinner } from 'react-bootstrap';
import EditGoal from './EditGoal';
import GoalContext from '../contexts/GoalContext';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/goal-detail.css';
import { CommentList } from './CommentList';
import moment from 'moment';
import { Link } from 'react-router-dom';

function GoalDetail() {
    let { id } = useParams();

    const { deleteGoal, getGoal } = useContext(GoalContext);
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
            await getGoal(id)
                .then((goal) => {
                    console.log(goal);
                    console.log(id);
                    setUserGoal(goal);
                })
                .catch((error) => {
                    console.log(error);
                    navigate('/page-not-found');
                });
        }
        fetchData();
        isLoggedIn();
    }, [id, getGoal, navigate]);

    // display loading spinner while fetching data
    function loading() {
        return (
            <center>
                <Spinner animation="border" />
            </center>
        );
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

    let newCurrentDate = new Date();
    let currentDate = moment.utc(newCurrentDate).format('MM/DD/YYYY');

    let moment1 = moment(startDate);
    let moment2 = moment(endDate);
    let remainingTime = moment2.diff(currentDate, 'hours', true);
    let totalTime = moment2.diff(moment1, 'hours', true);
    let percent = (parseInt(remainingTime) / parseInt(totalTime)) * 100 - 100;

    function goalInfo() {
        return (
            <div>
                <div className="back-button">
                    <Link to={`/profile-page/${userGoal.username}`}>
                        Return to Profile Page
                    </Link>
                </div>

                <div className="goal-detail-body">
                    <div className="goal-container">
                        <h2>
                            <b>Goal: </b>
                            {userGoal.title}
                        </h2>
                        <h5>
                            <b>Plan:</b> {userGoal.plan}
                        </h5>
                        <hr />
                        {userGoal.completed === true ? (
                            <div className="rainbow">
                                {/* <h3>Congratulations</h3> */}
                                <h3>
                                    <b>
                                        Congratulations! <br></br> This Goal is
                                        Complete!
                                    </b>
                                </h3>
                            </div>
                        ) : (
                            <div>
                                <h4>
                                    <b>Goal Currently In Progress</b>
                                </h4>
                                <div>
                                    <b>Start Date: </b>
                                    {startDate}
                                </div>
                                <div>
                                    <b>End Date: </b>
                                    {endDate}
                                </div>
                                {currentDate > endDate ? (
                                    <h5>
                                        <b>Time Remaining:</b> 0 Days
                                    </h5>
                                ) : (
                                    <h5>
                                        <b>Time Remaining:</b> {timeRemaining}
                                    </h5>
                                )}

                                <ProgressBar animated now={percent * -1} />
                                <br />
                            </div>
                        )}
                        {/* Conditionally render the following if goal not complete */}

                        {currentUser === userGoal.username ? (
                            <div>
                                <EditGoal
                                    show={showModal}
                                    close={() => setShowModal(false)}
                                />
                                <div className="button-container">
                                    <Button
                                        className="editBtn"
                                        variant="outline"
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
                        <CommentList
                            comments={userGoal.Comments}
                            currentUser={currentUser}
                            userGoal={userGoal}
                        />
                    </div>
                </div>
            </div>
        );
    }

    if (userGoal === undefined) return loading();
    return userGoal.goalId !== parseInt(id) ? loading() : goalInfo();
}

export default GoalDetail;
