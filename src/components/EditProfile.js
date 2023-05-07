import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import UserContext from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import '../css/edit-profile.css';

const EditProfile = ({ show, close }) => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        avatar: '',
        bio: '',
    });

    const [currentUser, setCurrentUser] = useState('');

    function isLoggedIn() {
        let user = localStorage.getItem('myUsername');
        setCurrentUser(user);
    }

    let { getUser, updateUser } = useContext(UserContext);
    let navigate = useNavigate();

    useEffect(() => {
        async function fetch() {
            await getUser(currentUser).then((user) => setUser(user));
        }
        isLoggedIn();
        fetch();
    }, [getUser, currentUser]);

    function handleChange(event) {
        setUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value };
        });
    }

    const handleSubmit = () => {
        close();
        updateUser(user)
            .then(() => {
                navigate(`/profile-page/${currentUser}`);
            })
            .catch((error) => {
                console.log(error);
                window.alert('Error updating profile');
            });
    };

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title className="modal-title">
                        Edit Profile
                    </Modal.Title>
                </Modal.Header>

                <form onSubmit={handleSubmit} className="modal-form">
                    <label>First Name</label>
                    <input
                        placeholder="First Name"
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                    />
                    <br />
                    <label>Last Name</label>
                    <input
                        placeholder="Last Name"
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                    />
                    <br />

                    <label>Age</label>
                    <input
                        placeholder="Age"
                        type="text"
                        name="age"
                        value={user.age}
                        onChange={handleChange}
                    />
                    <br />

                    <label>Email</label>
                    <input
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                    <br />

                    <label>Bio</label>
                    <textarea
                        placeholder="Bio"
                        rows="6"
                        cols="50"
                        name="bio"
                        value={user.bio}
                        onChange={handleChange}
                    />
                    <br />

                    <label>Profile Pic URL</label>
                    <textarea
                        placeholder="Profile Pic URL"
                        rows="6"
                        cols="50"
                        name="avatar"
                        value={user.avatar}
                        onChange={handleChange}
                    />
                    <br />

                    <button>Update Profile</button>

                    <br></br>

                    <Button onClick={close}>Cancel</Button>
                </form>

                <Modal.Footer className="modal-footer"></Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditProfile;
