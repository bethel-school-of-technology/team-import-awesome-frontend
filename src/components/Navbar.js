import { NavLink, Outlet } from 'react-router-dom';



const Navbar = () => {

    let currentUser = localStorage.getItem('myUsername');
    console.log(currentUser);

    function changeLoggedIn(value){
        if( value === false ){
            localStorage.setItem('myToken', '');
            localStorage.setItem('myUsername', '');
            window.location.reload(true);
        };
    };

    return (
        <>
            <nav style={{display: 'inline-flex'}} className="nav-main">
                <NavLink to={'/'} style={{fontSize: '40px',marginTop: '20px'}}>GoalGetter</NavLink>
                <div style={{marginTop: '25px', marginRight: '20px',  position: 'absolute', right: '0'}}>

                    { localStorage.getItem('myToken') ?
                        <p style={{display: 'inline-flex', marginRight: '140px'}} className='welcome'>Hello, {currentUser}!</p> 
                        :
                        <p style={{display: 'inline-flex', marginRight: '100px'}} className='welcome'>Hello, please sign in!</p>
                    }

                    <NavLink style={{marginRight: '10px'}}>WHY GoalGetters</NavLink>

                    <NavLink style={{marginRight: '10px'}}>HOW It Works</NavLink>

                    <NavLink style={{marginRight: '10px'}}>About Us</NavLink>

                    { localStorage.getItem('myToken') ?
                        <NavLink style={{marginRight: '10px'}} onClick={ () => { changeLoggedIn(false); }} to={'/signIn'}>Logout</NavLink>
                        :
                        <div style={{display: 'inline-flex'}}>
                            <NavLink style={{marginRight: '10px'}} to={'/signIn'}>Login</NavLink>
                            <NavLink to={'/signUp'}>Register</NavLink>
                        </div>
                    }
                </div>
            </nav>
            <div className="outlet">
                <Outlet />
            </div>
        </>
    );
};

export default Navbar;
