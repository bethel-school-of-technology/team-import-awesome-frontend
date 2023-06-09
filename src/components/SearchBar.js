import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import '../css/add-goal.css';
import '../css/search-bar.css';

const SearchBar = () => {
    const { getUser } = useContext(UserContext);
    const [userSearched, setUserSearched] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            // gets user - sets it to state variable
            const result = await getUser(userSearched);

            if (userSearched === result.username) {
                // checks that the user that searched matches up to an existing username
                navigate(`/profile-page/${userSearched}`);
            } else {
                // if the username does not match an existing user
                window.alert(`That User Does Not Exist :(

Make sure the spelling is correct :)`);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.alert(`That User Does Not Exist :(

Make sure the spelling is correct :)`);
            } else {
                window.alert(
                    `That User Does Not Exist :(

Make sure the spelling is correct :)`
                );
            }
            console.log(error);
        }

        setUserSearched('');
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="search-bar-group">
                    <Button
                        variant="outline"
                        type="submit"
                        className="search-btn add-goal-buttons"
                    >
                        Search
                    </Button>
                    <Form.Control
                        className="search-bar-input"
                        type="search"
                        placeholder="Search Users"
                        value={userSearched}
                        onChange={(e) => setUserSearched(e.target.value)}
                    />
                </Form.Group>
            </Form>
        </>
    );
};

export default SearchBar;
