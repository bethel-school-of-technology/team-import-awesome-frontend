import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import * as dayjs from "dayjs";
import UserContext from '../contexts/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/profilePage.css'
import { GoalList } from './GoalList';




const ProfilePage = () => {
    const [user, setUser] = useState(null);
    let { getUser, user: activeUser, updateUser } = useContext(UserContext);
    let { id } = useParams();
    useEffect(() => {
        if (id) {
            getUser(id).then((userData) => {
                console.log(userData)
                setUser(userData);
            });
        } else {
            console.log(activeUser)
            setUser(activeUser);
        }
    }, [id, activeUser, getUser]);

    const onBioChange = (e) => {
        updateUser({ ...user, bio: e.target.value })
    };

    return (
 
        <UserContext.Consumer>

            {
                ({ profile }) => {
                    return (
                    <div className='profilePage-main'>
                        <br />
                        <div>
                            <h3>Hello {user?.username}. Get goaling!</h3>
                        </div>
                        <br></br>
                        <div className='profile-goallist'> 
                            <div className="card">
                                <img className="card-img-top" alt="" src="https://plus.unsplash.com/premium_photo-1673296129756-e45408e25250?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80"></img>
                                <div className="card-body">
                                    <h4 className="card-title">{user?.firstName} {user?.lastName}</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">Age: {user?.age}</h6>

                                        {/* TODO: Add outline if editable, only editable on authorized user's page */}
                                        <div contentEditable="true" onInput={onBioChange}>
                                            {user?.bio || "Add a bio!"}
                                        </div>
                                </div>
                            </div>
                        
                            <GoalList/>

                        </div>

                        <div>
                            {profile && profile.map((p) => {
                                if (p.username === id) {
                                    return (
                                        <div
                                            key={p.goalId}
                                            date={dayjs(p.createdAt).fromNow()}
                                            username={p.username}
                                            id={p.Id}
                                        >
                                            {p.profile}
                                        </div>
                                    )
                                }
                                return null
                            })}

                        </div>
                    </div>
                    
                    )
                }
            }
             </UserContext.Consumer>

       
    );
}

export default ProfilePage;