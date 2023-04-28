import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import * as dayjs from "dayjs";
import UserContext from '../contexts/userContext';



const ProfilePage = () => {
    const [user, setUser] = useState(null);
    let { getUser, user: activeUser } = useContext(UserContext);
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
    return (
        <UserContext.Consumer>

            {
                ({ goal }) => {
                    return <div>
                        <br />
                        <div>
                            Hello {user?.username} get goaling!
                        </div>
                        <span>
                            Name: {user?.firstName} {user?.lastName} <br></br>
                            Age: {user?.age}<br></br>
                            Bio: {user?.bio}
                        </span>
                        <br></br>

                        <div>

                            {goal && goal.map((p) => {
                                if (p.username === id) {
                                    return (
                                        <div
                                            key={p.goalId}
                                            date={dayjs(p.createdAt).fromNow()}
                                            username={p.username}
                                            id={p.Id}
                                        >
                                            {p.goal}
                                        </div>
                                    )
                                }
                            })}

                        </div>
                    </div>
                }
            }
        </UserContext.Consumer>
    );
}

export default ProfilePage;