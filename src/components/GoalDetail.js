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

    // verifies user is logged in
    function isLoggedIn() {
        let loggedUser = localStorage.getItem('myUsername');
        setCurrentUser(loggedUser);
    }

    // sets state of user's goal to the goal that is fetched
    useEffect(() => {
        async function fetchData() {
            await getGoal(id)
                .then((goal) => {
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

    // goal start date formatted to a readable date format
    let userStartDate = moment.utc(userGoal.startDate).format('MM/DD/YYYY');
    // goal end date formatted to a readable date format
    let userEndDate = moment.utc(userGoal.endDate).format('MM/DD/YYYY');

    let startDate = moment(userStartDate).format('YYYY/MM/DD');
    let endDate = moment(userEndDate).format('YYYY/MM/DD');

    // amount of time that the user has left until the end date is reached
    const timeRemaining = moment(endDate).fromNow(true);

    // sets the currentDate to the current date on the user's device
    let newCurrentDate = new Date();
    let currentDate = moment.utc(newCurrentDate).format('YYYY/MM/DD');

    let moment1 = moment(startDate);
    let moment2 = moment(endDate);
    let moment3 = moment(currentDate);

    // calculates the difference in seconds between endDate and currentDate
    let remainingTime = moment2.diff(moment3, 'seconds', true);

    //  calculates the difference in seconds between endDate and startDate
    let totalTime = moment2.diff(moment1, 'seconds', true);

    // calculates the percentage completion based on the remainingTime and totalTime.
    let percent = (parseInt(remainingTime) / parseInt(totalTime)) * 100 - 100;

    // Displays a React Progress bar based on time remaining
    function progressBar() {
        if (currentDate < startDate) {
            return <ProgressBar animated now={0} />;
        } else if (currentDate > endDate) {
            return <ProgressBar animated now={100} />;
        } else {
            return <ProgressBar animated now={percent * -1} />;
        }
    }

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
                            <div className="congrats-gradient">
                                <h3>
                                    <b>
                                        Congratulations! <br></br> This Goal is
                                        Complete!
                                    </b>
                                </h3>
                            </div>
                        ) : (
                            <div>
                                {currentDate > endDate ? (
                                    <h4>
                                        <b>Goal Out Of Time</b>
                                    </h4>
                                ) : (
                                    <h4>
                                        <b>Goal Currently In Progress</b>
                                    </h4>
                                )}

                                <div>
                                    <b>Start Date: </b>
                                    {userStartDate}
                                </div>
                                <div>
                                    <b>End Date: </b>
                                    {userEndDate}
                                </div>
                                {currentDate > endDate ? (
                                    <div>
                                        <h5>
                                            <b>Time Remaining:</b> 0 Days
                                        </h5>
                                        {progressBar()}
                                        <br />
                                    </div>
                                ) : (
                                    <div>
                                        <h5>
                                            <b>Time Remaining:</b>{' '}
                                            {timeRemaining}
                                        </h5>
                                        {progressBar()}
                                        <br />
                                    </div>
                                )}
                            </div>
                        )}

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

    // if userGoal is undefined, return loading spinner.
    if (userGoal === undefined) return loading();

    // If userGoal is defined:
    // - Compare the goalId property of userGoal with the parsed integer value of goalId
    // - If the goalId does not match the parsed id value, return loading spinner.
    // - If the goalId matches the parsed id value, return goalInfo()
    return userGoal.goalId !== parseInt(id) ? loading() : goalInfo();
}

export default GoalDetail;
