import { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserContext from '../contexts/userContext';
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
                        <p>Please Sign In</p>
                    )}
                    <Link>WHY GoalGetters</Link>
                    <Link>HOW It Works</Link>
                    <Link>About Us</Link>
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
                            <Link to="/signIn">Sign In</Link>
                            <Link to="/signUp">Register</Link>
                        </>
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

// {currentUser ? (
//                         <p>Hello, {currentUser}!</p>
//                     ) : (
//                         <p>Hello, please sign in!</p>
//                     )}

//                     <NavLink>WHY GoalGetters</NavLink>

//                     <NavLink>HOW It Works</NavLink>

//                     <NavLink>About Us</NavLink>

//                     {currentUser ? (
//                         <NavLink
//                             onClick={() => {
//                                 logOutUser();
//                             }}
//                         >
//                             Logout
//                         </NavLink>
//                     ) : (
//                         <div>
//                             <NavLink to={'/signIn'}>Login</NavLink>
//                             <NavLink to={'/signUp'}>Register</NavLink>
//                         </div>
//                     )}
