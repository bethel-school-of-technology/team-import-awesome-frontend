import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/userContext';

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
            <form onSubmit={handleSubmit}>
                <button type="submit">Search</button>
                <input
                    type="search"
                    placeholder="Search Users"
                    value={userSearched}
                    onChange={(e) => setUserSearched(e.target.value)}
                />
            </form>
        </>
    );
};

export default SearchBar;
