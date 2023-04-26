import { useContext, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import UserContext from '../contexts/userContext';

const Navbar = () => {
    let { logOutUser } = useContext(UserContext);

    const [currentUser, setUser] = useState();

    function signedIn() {
        let currentUser = localStorage.getItem('myUsername');
        setUser(currentUser);
    }

    useEffect(() => {
        async function fetchData() {
            signedIn();
        }
        fetchData();
    }, [logOutUser]);

    return (
        <>
            <nav style={{ display: 'inline-flex' }} className="nav-main">
                <div>
                    <NavLink
                        to={'/'}
                        style={{ fontSize: '40px', marginTop: '20px' }}
                    >
                        GoalGetter
                    </NavLink>
                </div>
                <div
                    style={{
                        marginTop: '25px',
                        marginRight: '20px',
                        position: 'absolute',
                        right: '0',
                    }}
                >
                    {currentUser ? (
                        <p
                            style={{
                                display: 'inline-flex',
                                marginRight: '140px',
                            }}
                            className="welcome"
                        >
                            Hello, {currentUser}!
                        </p>
                    ) : (
                        <p
                            style={{
                                display: 'inline-flex',
                                marginRight: '100px',
                            }}
                            className="welcome"
                        >
                            Hello, please sign in!
                        </p>
                    )}

                    <NavLink style={{ marginRight: '10px' }}>
                        WHY GoalGetters
                    </NavLink>

                    <NavLink style={{ marginRight: '10px' }}>
                        HOW It Works
                    </NavLink>

                    <NavLink style={{ marginRight: '10px' }}>About Us</NavLink>

                    {currentUser ? (
                        <NavLink
                            style={{ marginRight: '10px' }}
                            onClick={() => {
                                logOutUser();
                            }}
                        >
                            Logout
                        </NavLink>
                    ) : (
                        <div style={{ display: 'inline-flex' }}>
                            <NavLink
                                style={{ marginRight: '10px' }}
                                to={'/signIn'}
                            >
                                Login
                            </NavLink>
                            <NavLink to={'/signUp'}>Register</NavLink>
                        </div>
                    )}
                </div>
            </nav>
            <div className="outlet">
                <Outlet />
            </div>
        </>
    );
};

export default Navbar;
