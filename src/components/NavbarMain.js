import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import Footer from './Footer';
import '../css/Navbar.css';
import { HashLink } from 'react-router-hash-link';
import SearchBar from './SearchBar';
import { Nav, Navbar, Form, NavDropdown } from 'react-bootstrap';

const NavbarMain = () => {
    let { logOutUser } = useContext(UserContext);

    const [user, setUser] = useState();

    function isSignedIn() {
        let user = localStorage.getItem('myUsername');
        setUser(user);
    }

    useEffect(() => {
        function autoSignOut() {
            setTimeout(() => {
                logOutUser();

                return () => clearTimeout(autoSignOut);
            }, 3600000);
        }
        isSignedIn();
        autoSignOut();
    }, [logOutUser]);

    return (
        <>
            <Navbar sticky="top" className="nav-main" expand="lg">
                <Navbar.Brand>
                    <HashLink smooth to="/">
                        <img
                            className="logo"
                            src="../assets/GoalGetterLogo2.png"
                            alt="GoalGetter Logo"
                            style={{ width: '200px' }}
                        ></img>
                    </HashLink>
                </Navbar.Brand>
                <div className="ml-auto">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div className="mr-3">
                            <SearchBar />
                        </div>
                        <div className="ml-3">
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
                                    <HashLink smooth to="/#ABOUT">
                                        ABOUT
                                    </HashLink>
                                </Nav.Link>
                            </Nav>
                        </div>

                        <Nav>
                            {user ? (
                                <NavDropdown
                                    title={`Welcome, ${user}`}
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item>
                                        <Link
                                            to={`/profile-page/${user}`}
                                            style={{ color: 'black' }}
                                        >
                                            To Profile
                                        </Link>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item
                                        onClick={() => {
                                            logOutUser();
                                        }}
                                    >
                                        Sign Out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    <Nav.Link style={{ marginLeft: '5px' }}>
                                        <Link
                                            to="/signIn"
                                            style={{ color: 'black' }}
                                        >
                                            Please Sign In
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link>
                                        <Link
                                            to="/signUp"
                                            style={{ color: 'black' }}
                                        >
                                            Register
                                        </Link>
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            <div className="outlet">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default NavbarMain;
