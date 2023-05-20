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

    const { deleteGoal, getGoal } = useContext(GoalContext); // provider functions from context
    const navigate = useNavigate();

    const [userGoal, setUserGoal] = useState({ // state variable for the user's goal
        completed: false,
        title: '',
        plan: '',
        startDate: '',
        endDate: '',
        Comments: [],
    });

    const [showModal, setShowModal] = useState(false); // edit window display state
    const [currentUser, setCurrentUser] = useState(); // current user logged in state

    function isLoggedIn() { // verifies user is logged in
        let loggedUser = localStorage.getItem('myUsername'); // verifies with token
        setCurrentUser(loggedUser);
    }

    useEffect(() => {
        async function fetchData() {
            await getGoal(id) // gets goal by id
                .then((goal) => {
                    console.log(goal);
                    console.log(id);
                    setUserGoal(goal); // sets state of user's goal to the goal that is fetched
                })
                .catch((error) => {
                    console.log(error);
                    navigate('/page-not-found');
                });
        }
        fetchData();
        isLoggedIn(); // calls the functon to verify user is logged in
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
                    navigate(`/profile-page/${userGoal.username}`); // naviagates to the profile page that the goal belonged to
                })
                .catch((error) => {
                    console.log(error);
                    navigate(`/profile-page/${userGoal.username}`); // naviagates to the profile page that the goal belongs to
                });
        }
    };

    let startDate = moment.utc(userGoal.startDate).format('MM/DD/YYYY'); // goal start date formatted to a readable date format (string)
    let endDate = moment.utc(userGoal.endDate).format('MM/DD/YYYY'); // goal end date formatted to a readable date format (string)
    const timeRemaining = moment(endDate).fromNow(true); // amount of time that the user has left until the end date is reached

    let newCurrentDate = new Date(); // creates a Date object
    let currentDate = moment.utc(newCurrentDate).format('MM/DD/YYYY'); // sets the currentDate to the current date on the user's device - formats as string

    let moment1 = moment(startDate); // date object for startDate
    let moment2 = moment(endDate);// date object for endDate
    let remainingTime = moment2.diff(currentDate, 'seconds', true); // calculates the difference in seconds between moment2 (the endDate) and currentDate
    let totalTime = moment2.diff(moment1, 'seconds', true); //  calculates the difference in seconds between moment2 (the endDate) and moment1 (the startDate
    let percent = (parseInt(remainingTime) / parseInt(totalTime)) * 100 - 100; // calculates the percentage completion based on the remainingTime and totalTime.
    // It divides remainingTime by totalTime, converts them to integers using parseInt, multiplies the result by 100, and subtracts 100 to calculate the percentage. 

    function progressBar() {
        if (currentDate < startDate) { // checks if the start date is before the current date
            return <ProgressBar animated now={0} />; // if so - renders an empty progress bar - not started yet
        } else if (currentDate > endDate) { // checks if currentDate is after the endDate
            return <ProgressBar animated now={100} />; // renders a completed progress bar
        } else {
            return <ProgressBar animated now={percent * -1} />; // progress is ongoing - The percent value represents the completion percentage calculated earlier, and multiplying it by -1 is done to reverse the direction of the progress bar
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
                                    {startDate}
                                </div>
                                <div>
                                    <b>End Date: </b>
                                    {endDate}
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

    if (userGoal === undefined) return loading(); // if userGoal is undefined, return loading spinner.
    return userGoal.goalId !== parseInt(id) ? loading() : goalInfo();
    // If userGoal is defined:
    // - Compare the goalId property of userGoal with the parsed integer value of goalId
    // - If the goalId does not match the parsed id value, return loading spinner.
    // - If the goalId matches the parsed id value, return goalInfo()
}

export default GoalDetail;
