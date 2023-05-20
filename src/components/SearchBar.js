import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import '../css/search-bar.css';

const SearchBar = () => {
    const { getUser } = useContext(UserContext); // function from provider
    const [userSearched, setUserSearched] = useState(''); // state for the user that was searched for
    const navigate = useNavigate();

    async function handleSubmit(e) { // search box submission
        e.preventDefault();

        try {
            const result = await getUser(userSearched); // gets user - sets it to state variable

            if (userSearched === result.username) { // checks that the user that searched matches up to an existing username
                navigate(`/profile-page/${userSearched}`); // navigates to that user's page if so
            } else { // if teh username does not match an existing user
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
                        className="search-btn"
                    >
                        Search
                    </Button>
                    <Form.Control
                        className='search-bar-input'
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
