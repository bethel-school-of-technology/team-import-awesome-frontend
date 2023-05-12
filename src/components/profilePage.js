import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import { GoalList } from './GoalList';
import { Button } from 'react-bootstrap';
import EditProfile from './EditProfile';
import '../css/profilePage.css';
import '../css/goalList.css';
import '../css/addGoal.css';
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

    return (
        <div>
            {username !== currentUser ? (
                <div className="row p-0 mb-3">
                    <Link to={`/profile-page/${currentUser}`} >Return to {currentUser}'s Profile Page</Link>
                </div>
                    ) : (
                        ''
                    )  
            }
            <div className="profilePage-main">
                
                <div className="row mt-0 profile-container">
                    <div className="col-md-6 col-sm-12 user-welcome">
                        <h6 className="title">
                            Hello, {user.username}! Get goaling!
                        </h6>
                        <div className="user-profile">
                            <div className="avatar-container">
                                <img src={user.avatar} alt="" className="avatar" />
                            </div>
                        </div>
                        <br />
                        <h2 className="user-name">
                            {user.firstName} {user.lastName}
                        </h2>

                        <h6 className="user-age"> Age: {user.age}</h6>
                    </div>
                    {/* <br></br> */}
                    <div className="col-md-6 col-sm-12 user-info">
                        {/* <br></br>
                        <br /> */}
                        <div className="user-bio">{user.bio}</div>
                        <br></br>
                        {user.username === currentUser ? (
                            <>
                                <div style={{ display: 'none' }}>
                                    <EditProfile
                                        show={showModal}
                                        close={() => setShowModal(false)}
                                    />
                                </div>
                                <Button
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
                        <div className="followers">
                            <h3>236</h3>
                            <small>followers</small>
                            <br></br>
                            <br></br>
                        </div>
                        <div className="following">
                            <h3>38</h3>
                            <small>following</small>
                        </div>
                        <br />
                        {user.username === currentUser ? (
                            <>
                                <div style={{ display: 'none' }}>
                                    <AddGoal
                                        show={showAddGoalModal}
                                        close={() => setShowAddGoalModal(false)}
                                    />
                                </div>
                                <Button
                                    className="add-goal-button"
                                    variant="outline"
                                    onClick={() => setShowAddGoalModal(true)}
                                >
                                    Add Goal
                                </Button>
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <GoalList goals={user.Goals} />
            </div>
        </div>
    );
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
