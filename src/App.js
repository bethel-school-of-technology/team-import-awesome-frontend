import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Test from './components/Test';
import { UserProvider } from './contexts/userProvider';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

function App() {
    return (
        <UserProvider>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Navbar />}>
                            <Route path="/signUp" element={<SignUp />} />
                            <Route path="/signIn" element={<SignIn />} />
                            <Route path="/" element={<Home />} />
                            <Route path="/test" element={<Test />} />
                        </Route>
                        <Route
                            path="*"
                            element={
                                <h1>This Is Not The Page You're Looking For</h1>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        </UserProvider>
    );
}

export default App;
