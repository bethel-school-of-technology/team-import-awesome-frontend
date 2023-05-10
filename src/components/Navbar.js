import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import Footer from './Footer';
import '../css/Navbar.css';
import { HashLink } from 'react-router-hash-link';
import SearchBar from './SearchBar';

const Navbar = () => {
    let { logOutUser } = useContext(UserContext);

    const [user, setUser] = useState();

    function isSignedIn() {
        let user = localStorage.getItem('myUsername');
        setUser(user);
    }

    useEffect(() => {
        async function fetchData() {
            isSignedIn();
        }
        fetchData();
    }, [logOutUser]);

    return (
        <>
            <nav className="nav-main">
                <div>
                    <h2 style={{ width: '300px' }}>
                        <Link to={'/'}>
                            <img
                                className="logo"
                                src="../assets/GoalGetterLogo2.png"
                                alt="GoalGetter Logo"
                            ></img>
                        </Link>
                    </h2>
                </div>
                <div className="searchBar">
                    <SearchBar />
                </div>

                <label id="hamburger" for="toggle">
                    &#9776;
                </label>
                <input type="checkbox" id="toggle" />
                <div className="menu nav-links">
                    <HashLink smooth to="http://localhost:3001/#HOW">
                        HOW
                    </HashLink>
                    <HashLink smooth to="http://localhost:3001/#WHY">
                        WHY
                    </HashLink>
                    <HashLink smooth to="http://localhost:3001/#ABOUT">
                        ABOUT
                    </HashLink>

                    {user ? (
                        <>
                            <h5>
                                Welcome,{' '}
                                <Link to={`/profile-page/${user}`}>{user}</Link>
                            </h5>
                            <Link
                                to="/"
                                onClick={() => {
                                    logOutUser().then(() => {
                                        window.location.reload(true);
                                    });
                                }}
                            >
                                Sign Out
                            </Link>
                        </>
                    ) : (
                        <>
                            <p>
                                Please{' '}
                                <Link
                                    style={{ marginLeft: '5px' }}
                                    to="/signIn"
                                >
                                    Sign In
                                </Link>
                            </p>
                            <Link to="/signUp">Register</Link>
                        </>
                    )}
                </div>
            </nav>
            <div className="outlet">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default Navbar;
