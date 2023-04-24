import { Outlet } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <nav className="nav-main">
                <h1>GoalGetter</h1>
            </nav>
            <div className="outlet">
                <Outlet />
            </div>
        </>
    );
};

export default Navbar;
