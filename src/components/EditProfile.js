import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import UserContext from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import '../css/addGoal.css';

const EditProfile = ({ show, close }) => {

    const [updatedUser, setUpdatedUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        avatar: '',
        bio: ''
    });

    const [currentUser, setCurrentUser] = useState();

    let { getUser, updateUser } = useContext(UserContext);
    let navigate = useNavigate();

    function isLoggedIn() {
        let loggedUser = localStorage.getItem('myUsername');
        setCurrentUser(loggedUser);
    }

    useEffect(() => {
        async function fetch() {
            await getUser(currentUser).then((user) => setUpdatedUser(user));
        }
        isLoggedIn();
        fetch();
    }, [getUser, currentUser]);

    function handleChange(event) {
        setUpdatedUser((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value };
        });
    }

    const handleSubmit = () => {
        close();
        updateUser(updatedUser)
            .then(navigate(`/profile-page/${updatedUser.userId}`))
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
                    <input
                        type="text"
                        name="username"
                        value={updatedUser.username}
                        onChange={handleChange}
                    />
                    <br></br>

                    <input
                        type="text"
                        name="firstName"
                        value={updatedUser.firstName}
                        onChange={handleChange}
                    />
                    <br></br>

                    <input
                        type="text"
                        name="lastName"
                        value={updatedUser.lastName}
                        onChange={handleChange}
                    />
                    <br></br>

                    <input
                        type="text"
                        name="age"
                        value={updatedUser.age}
                        onChange={handleChange}
                    />
                    <br></br>

                    <input
                        type="text"
                        name="email"
                        value={updatedUser.email}
                        onChange={handleChange}
                    />
                    <br></br>

                    <input
                        type="text"
                        name="bio"
                        value={updatedUser.bio}
                        onChange={handleChange}
                    />
                    <br></br>

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