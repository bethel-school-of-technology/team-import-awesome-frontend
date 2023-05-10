import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [userSearched, setUserSearched] = useState('');
    let navigate = useNavigate();

    function handleSubmit() {
        navigate(`/profile-page/${userSearched}`);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <button>Search</button>
                <input
                    type={'search'}
                    placeholder="Search Users"
                    value={userSearched}
                    onChange={(e) => setUserSearched(e.target.value)}
                />
            </form>
        </>
    );
};

export default SearchBar;
