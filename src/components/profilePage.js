import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/profilePage.css';
import '../css/goalList.css';
import '../css/addGoal.css';
import { GoalList } from './GoalList';
import { Button } from 'react-bootstrap';
import EditProfile from './EditProfile';

const ProfilePage = () => {
    let { getUser } = useContext(UserContext);
    let { username } = useParams();

    const [currentUser, setCurrentUser] = useState();
    const [showModal, setShowModal] = useState(false);

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
        <div className="profilePage-main">
            <div className="container">
                <h5 className="title">Hello, {username}! Get goaling!</h5>
                <div className="user-profile">
                    <div className="avatar-container">
                        <img src={user.avatar} alt="" className="avatar" />
                    </div>
                </div>
                <h2 className="user-name">
                    {user.firstName} {user.lastName}
                </h2>
                <br></br>
                <div className="user-info">
                    <h6 className="user-age"> Age: {user.age}</h6>
                    <br></br>
                    <br />
                    <div className="user-bio">{user.bio}</div>
                    <br></br>

                    <EditProfile
                        show={showModal}
                        close={() => setShowModal(false)}
                    />
                    <Button
                        variant="primary"
                        onClick={() => setShowModal(true)}
                    >
                        EditProfile
                    </Button>
                    <br />
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
                </div>
            </div>
            <GoalList goals={user.Goals} />
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
