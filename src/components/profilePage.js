import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const ProfilePage = () => {
    let { getUser } = useContext(UserContext);
    let { username } = useParams();

    const [currentUser, setCurrentUser] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showAddGoalModal, setShowAddGoalModal] = useState(false);

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

    useEffect(() => {
        async function fetchData() {
            await getUser(username).then((username) => setUser(username));
        }
        isLoggedIn();
        fetchData();
    }, [getUser, username]);

    function loading() {
        return (
            <center>
                <Spinner animation="border" />
            </center>
        );
    }

    function profile() {
        return (
            <div>
                {username !== currentUser ? (
                    <div className="row p-0 mb-4">
                        <Link
                            to={`/profile-page/${currentUser}`}
                            style={{ zIndex: 999, marginLeft: '5px' }}
                        >
                            Return to {currentUser}'s Profile Page
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <br />
                    </div>
                )}
                <div className="profilePage-main">
                    <div class="profile-card">
                        <div class="card-header">
                            <div class="cardImg">
                                <img
                                    class="img-fluid"
                                    className="profileCover-image"
                                    src="../assets/shoe.png"
                                    alt="Responsive"
                                />
                                <div class="card-img-overlay">
                                    <h1 className="profile-title">
                                        Hello, {user.username}! Get goaling!
                                    </h1>
                                </div>
                            </div>

                            <div class="pro-img" className="avatar-container">
                                <img
                                    src={user.avatar}
                                    alt=""
                                    className="avatar"
                                    variant="bottom"
                                />
                            </div>
                            <div class="card-body text-center">
                                <h3 class="first-last">
                                    {user.firstName} {user.lastName}
                                </h3>
                                <h6 className="profile-age">
                                    {' '}
                                    Age: {user.age}
                                </h6>

                                <h6 className="profile-bio">{user.bio}</h6>
                            </div>
                            <div class="row text-center profile-followers">
                                <div class="col-lg-2 col-md-2 col-sm-2">
                                    <h6>
                                        <strong>434K</strong>
                                    </h6>
                                    <small>Followers</small>
                                </div>
                                <div class="col-lg-2 col-md-2 col-sm-2">
                                    <h6>
                                        <strong>5454</strong>
                                    </h6>
                                    <small>Following</small>
                                </div>
                            </div>
                            <br />
                            <div>
                                {user.username === currentUser ? (
                                    <>
                                        <div style={{ display: 'none' }}>
                                            <EditProfile
                                                show={showModal}
                                                close={() =>
                                                    setShowModal(false)
                                                }
                                            />
                                        </div>
                                        <Button
                                            className="add-goal-buttons"
                                            variant="outline"
                                            onClick={() => setShowModal(true)}
                                        >
                                            Edit Profile
                                        </Button>
                                        <br />
                                    </>
                                ) : (
                                    ''
                                )}
                                {user.username === currentUser ? <></> : ''}
                                {user.username === currentUser ? (
                                    <>
                                        <div style={{ display: 'none' }}>
                                            <AddGoal
                                                show={showAddGoalModal}
                                                close={() =>
                                                    setShowAddGoalModal(false)
                                                }
                                            />
                                        </div>
                                        <Button
                                            className="add-goal-buttons"
                                            variant="outline"
                                            onClick={() =>
                                                setShowAddGoalModal(true)
                                            }
                                        >
                                            Add Goal
                                        </Button>
                                    </>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <center className="row profile-container">
                    <GoalList goals={user.Goals} />
                </center>
            </div>
        );
    }

    if (user === undefined) return loading();
    return user.username !== username ? loading() : profile();
};

export default ProfilePage;

// contentEditable="true" onInput={}

// const [user, setUser] = useState(null);
// let { getUser, updateUser } = useContext(UserContext);
// let { id } = useParams();
// useEffect(() => {
//     if (id) {
//         getUser(id).then((userData) => {
//             console.log(userData)
//             setUser(userData);
//         });
//     }
// }, [id, getUser]);

// const onBioChange = (e) => {
//     updateUser({ ...user, bio: e.target.value })
// };

// return (

//     <UserContext.Consumer>

//         {
//             ({ profile }) => {
//                 return <div>
//                     <br></br>
//                     <div style={{
//                         display: "flex",
//                     }}>
//                         <div class="container">
//                             <h5 class="title">Hello {user?.username}. Get goaling!</h5>
//                             <div class="user-profile">
//                                 <div class="avatar-container">
//                                     <img src="https://plus.unsplash.com/premium_photo-1673296129756-e45408e25250?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80" alt="" class="avatar" />
//                                 </div>
//                                 <h2 class="user-name">{user?.firstName} {user?.lastName}</h2>
//                             </div>
//                             <br></br>
//                             <div class="user-info">
//                                 <h6 className="user-age">Age: {user?.age}</h6>
//                                 <br></br>
//                                 <br />
//                                 <div className="user-bio" contentEditable="true" onInput={onBioChange}>
//                                 <p> {user?.bio || "Add a bio!"}</p>
//                                 </div>
//                                 <br></br>
//                                 <br />
//                                 <div class='followers'>
//                                     <h3>236</h3>
//                                     <small>followers</small>
//                                     <br></br>
//                                     <br></br>
//                                 </div>
//                                 <div class="following">
//                                     <h3>38</h3>
//                                     <small>following</small>
//                                 </div>
//                             </div>
//                         </div>

//                         <GoalList />
//                     </div>
//                     <div>
//                         {profile && profile.map((p) => {
//                             if (p.username === id) {
//                                 return (
//                                     <div
//                                         key={p.goalId}
//                                         date={dayjs(p.createdAt).fromNow()}
//                                         username={p.username}
//                                         id={p.Id}
//                                     >
//                                         {p.profile}
//                                     </div>
//                                 )
//                             }
//                             return null
//                         })}

//                     </div>
//                 </div>
//             }
//         }
//     </UserContext.Consumer>

// );
