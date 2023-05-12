import React, { useContext, useState, useEffect } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
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

                <Form onSubmit={handleSubmit} className="modal-form">
                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={user.firstName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Age"
                            name="age"
                            value={user.age}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Bio"
                            rows={6}
                            maxLength={255}
                            name="bio"
                            value={user.bio}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Profile Pic URL</Form.Label>
                        <Form.Control
                            as="textarea"
                            type="url"
                            placeholder="Profile Pic URL"
                            rows={6}
                            maxLength={255}
                            name="avatar"
                            value={user.avatar}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <br />
                    <Button className='edit-profile-buttons' type="submit">Update Profile</Button>
                    <br />
                    <Button className='edit-profile-buttons' onClick={close}>Cancel</Button>
                </Form>

                <Modal.Footer className="modal-footer"></Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditProfile;
