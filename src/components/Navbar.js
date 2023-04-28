import { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import Footer from './Footer';
import '../css/Navbar.css';

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

                    {user ? (
                        <h4>
                            Welcome, <Link to={`/users/${user}`}>{user}</Link>
                        </h4>
                    ) : (
                        <p style={{paddingRight: "60px"}}>Please Sign In</p>
                    )}


                    <a rel="noopener" target="" href="http://localhost:3001/#HOW">
                        HOW It Works
                    </a>
                    <a rel="noopener" target="" href="http://localhost:3001/#WHY">
                        WHY GoalGetters
                    </a>
                    <a rel="noopener" target="" href="http://localhost:3001/#ABOUT">
                        About Us
                    </a>

                    

                    {user ? (
                        <Link
                            onClick={() => {
                                logOutUser();
                            }}
                        >
                            Sign Out
                        </Link>
                    ) : (
                        <>
                            <p>
                                <Link to="/signIn">Sign In</Link>
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
