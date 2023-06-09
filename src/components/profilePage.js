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
    let { getUser } = useContext(UserContext);
    let { username } = useParams();
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showAddGoalModal, setShowAddGoalModal] = useState(false);

    // verifies user logged in with token
    function isLoggedIn() {
        let loggedUser = localStorage.getItem('myUsername');
        setCurrentUser(loggedUser);
    }

    const [user, setUser] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        age: '',
        avatar: '',
        bio: '',
        Goals: [],
    });

    // fetches user by username param
    // user found is set to the state variable
    useEffect(() => {
        async function fetchData() {
            await getUser(username)
                .then((user) => {
                    setUser(user);
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

    let userJoined = moment.utc(user.createdAt).format('MM/DD/YYYY');

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
                                                        className="add-goal-buttons"
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
                                                    <AddGoal
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
                                <Col xxlg={3} className="bio-profile">
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
                    <GoalList goals={user.Goals} />
                </center>
            </div>
        );
    }

    // check if the user data is undefined - return a loading state if the user data is not available
    if (user === undefined) return loading();

    // Check if the username associated with the user does not match the provided username
    // Return a loading state if the usernames don't match
    // Return the user's profile if the usernames match
    return user.username !== username ? loading() : profile();
};

export default ProfilePage;
