import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import '../css/search-bar.css';

const SearchBar = () => {
    const { getUser } = useContext(UserContext);
    const [userSearched, setUserSearched] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const result = await getUser(userSearched);

            if (result) {
                navigate(`/profile-page/${userSearched}`);
            }
        } catch (error) {
            window.alert(`That User Does Not Exist :(

Make sure the spelling is correct :)`);
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
