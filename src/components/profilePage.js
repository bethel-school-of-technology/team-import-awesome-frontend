import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { GoalList } from './GoalList';
import { Button, Spinner } from 'react-bootstrap';
import EditProfile from './EditProfile';
import '../css/profile-page.css';
import '../css/goal-list.css';
import '../css/add-goal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddGoal from './AddGoal';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import moment from 'moment';

const ProfilePage = () => {
    let { getUser } = useContext(UserContext); // function from context
    let { username } = useParams();
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(); // current User state
    const [showModal, setShowModal] = useState(false); // displays modal when editing
    const [showAddGoalModal, setShowAddGoalModal] = useState(false); // displays Modal when adding a goal

    function isLoggedIn() { // verifies user logged in with token
        let loggedUser = localStorage.getItem('myUsername');
        setCurrentUser(loggedUser); // sets that logged user to the currentUser state
    }

    const [user, setUser] = useState({ // state variable for user that the profile page belongs to
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        age: '',
        avatar: '',
        bio: '',
        Goals: [],
    });

    useEffect(() => {
        async function fetchData() {
            await getUser(username) // fetches user by username param
                .then((user) => {
                    setUser(user); // user found is set to the state variable
                })
                .catch((error) => {
                    console.log(error);
                    navigate('/page-not-found');
                });
        }
        isLoggedIn();
        fetchData();
    }, [getUser, username, navigate]);

    function loading() {
        return (
            <center>
                <Spinner animation="border" />
            </center>
        );
    }

    let userJoined = moment.utc(user.createdAt).format('MM/DD/YYYY'); // date that the user joined

    function profile() {
        return (
            <div className="return mw-100">
                <div className="mw-100">
                    {!currentUser ? (
                        <div>
                            <br />
                        </div>
                    ) : username !== currentUser ? (
                        <Row className="justify-content-md-center">
                            <Link
                                to={`/profile-page/${currentUser}`}
                                style={{
                                    zIndex: 999,
                                    marginLeft: '27px',
                                    marginBottom: '26px',
                                    color: 'white',
                                }}
                            >
                                Return to {currentUser}'s Profile Page
                            </Link>
                        </Row>
                    ) : (
                        <div>
                            <br />
                        </div>
                    )}
                    <Container className="container-fluid mw-100">
                        <div className="fluid">
                            <div className="cardImg-fluid mw-100">
                                <img
                                    className="profileCover-image w-100"
                                    src="../assets/shoe.png"
                                    alt="Responsive"
                                />
                                <div className="card-img-overlay">
                                    <h1 className="profile-title">
                                        Hello, {user.username}! Get goaling!
                                    </h1>
                                </div>
                            </div>

                            <div className="pro-img avatar-container">
                                <img
                                    src={user.avatar}
                                    alt=""
                                    className="avatar"
                                    variant="bottom"
                                />
                            </div>
                            <Row className="profile-row">
                                <Col className="button-col">
                                    <div>
                                        {user.username === currentUser ? (
                                            <>
                                                <div
                                                    style={{ display: 'none' }}
                                                >
                                                    <EditProfile
                                                        show={showModal}
                                                        close={() =>
                                                            setShowModal(false)
                                                        }
                                                    />
                                                </div>
                                                <Col xxlg={1}>
                                                    <Button
                                                        className="edit-goal-buttons"
                                                        variant="outline"
                                                        onClick={() =>
                                                            setShowModal(true)
                                                        }
                                                    >
                                                        Edit Profile
                                                    </Button>
                                                </Col>
                                                <br />
                                            </>
                                        ) : (
                                            ''
                                        )}
                                        {user.username === currentUser ? (
                                            <></>
                                        ) : (
                                            ''
                                        )}
                                        {user.username === currentUser ? (
                                            <>
                                                <div
                                                    style={{ display: 'none' }}
                                                >
                                                    <AddGoal // renders AddGoal component for the modal
                                                        show={showAddGoalModal}
                                                        close={() =>
                                                            setShowAddGoalModal(
                                                                false
                                                            )
                                                        }
                                                    />
                                                </div>

                                                <Col>
                                                    <Button
                                                        className="add-goal-buttons"
                                                        variant="outline"
                                                        onClick={() =>
                                                            setShowAddGoalModal(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        Add Goal
                                                    </Button>
                                                </Col>
                                            </>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </Col>
                                <Col xxlg={2} className="m-15">
                                    <h3 className="first-last">
                                        {user.firstName} {user.lastName}
                                    </h3>
                                    <h6 className="profile-age">
                                        Age: {user.age}
                                    </h6>
                                    <h8 className="profile-joined">
                                        Joined On: {userJoined}
                                    </h8>
                                </Col>
                                <Col xxlg={3} className="">
                                    <h6 className="profile-bio">{user.bio}</h6>
                                </Col>
                                <Col className="follow">
                                    <h6>
                                        <strong>434K</strong>
                                    </h6>
                                    <small>Followers</small>
                                    <br />
                                    <h6>
                                        <strong>5454</strong>
                                    </h6>
                                    <small>Following</small>
                                </Col>
                                <br />
                            </Row>
                        </div>
                    </Container>
                </div>
                <br />
                <center className="row profile-container">
                    <GoalList // renders GoalList to display goals - passes goals as parameter for user.Goal object to this nested component
                        goals={user.Goals} />
                </center>
            </div>
        );
    }

    if (user === undefined) return loading(); // check if the user data is undefined - return a loading state if the user data is not available
    return user.username !== username ? loading() : profile();
    // Check if the username associated with the user does not match the provided username
    // Return a loading state if the usernames don't match
    // Return the user's profile if the usernames match
};

export default ProfilePage;
