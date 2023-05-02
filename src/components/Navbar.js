import { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import Footer from './Footer';
import '../css/navbar.css';

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
                <div className="logo">
                    <h2>
                        <Link to={'/'}>GoalGetter</Link>
                    </h2>
                </div>
                <div className="nav-links">
                    <a
                        rel="noopener"
                        target=""
                        href="http://localhost:3001/#HOW"
                    >
                        HOW It Works
                    </a>
                    <a
                        rel="noopener"
                        target=""
                        href="http://localhost:3001/#WHY"
                    >
                        WHY GoalGetters
                    </a>
                    <a
                        rel="noopener"
                        target=""
                        href="http://localhost:3001/#ABOUT"
                    >
                        About Us
                    </a>

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
                                Please <Link to="/signIn">Sign In</Link>
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
