import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Footer from './Footer';
import '../css/navbar-main.css';
import { HashLink } from 'react-router-hash-link';
import SearchBar from './SearchBar';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const NavbarMain = () => {
    let { logOutUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [user, setUser] = useState();

    // verifies if user is signed in
    function isSignedIn() {
        let user = localStorage.getItem('myUsername');
        setUser(user);
    }

    // auto signs out when session expires
    useEffect(() => {
        function autoSignOut() {
            setTimeout(() => {
                navigate('/signIn');
                window.alert('Session Expired: Please Sign In');
                logOutUser();

                return () => clearTimeout(autoSignOut);
            }, 3600000); // 1hr
        }
        isSignedIn();
        autoSignOut();
    }, [logOutUser, navigate]);

    return (
        <>
            <Navbar sticky="top" className="nav-main" expand="lg">
                <Navbar.Brand>
                    <HashLink smooth to="/">
                        <img
                            className="logo"
                            src="/assets/GoalGetterLogo2.png"
                            alt="GoalGetter Logo"
                            style={{ width: '200px' }}
                        ></img>
                    </HashLink>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                    id="basic-navbar-nav"
                    className="justify-content-end"
                >
                    <Nav>
                        <Nav.Link>
                            <HashLink smooth to="/#HOW">
                                HOW
                            </HashLink>
                        </Nav.Link>
                        <Nav.Link>
                            <HashLink smooth to="/#WHY">
                                WHY
                            </HashLink>
                        </Nav.Link>
                        <Nav.Link>
                            <HashLink className="about" smooth to="/#ABOUT">
                                ABOUT
                            </HashLink>
                        </Nav.Link>
                    </Nav>
                    <SearchBar />
                    <Nav>
                        {user ? (
                            <NavDropdown
                                title={`Welcome, ${user}`}
                                id="basic-nav-dropdown"
                                className="nav-dropdown"
                            >
                                <NavDropdown.Item className="nav-dropdown">
                                    <Link
                                        to={`/profile-page/${user}`}
                                        style={{ color: 'black' }}
                                    >
                                        To Profile
                                    </Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    className="nav-dropdown"
                                    onClick={() => {
                                        navigate('/signIn');
                                        logOutUser();
                                    }}
                                >
                                    Sign Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <div className="signIn-register">
                                <Nav.Link style={{ marginLeft: '5px' }}>
                                    <Link
                                        className="sign-in-nav-link"
                                        to="/signIn"
                                        style={{ color: 'black' }}
                                    >
                                        Sign In
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link
                                        className="register-nav-link"
                                        to="/signUp"
                                        style={{ color: 'black' }}
                                    >
                                        Register
                                    </Link>
                                </Nav.Link>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="outlet">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default NavbarMain;
