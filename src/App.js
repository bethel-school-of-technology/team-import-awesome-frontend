import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { UserProvider } from './contexts/userProvider';
import { GoalProvider } from './contexts/GoalProvider';
import { CommentProvider } from './contexts/CommentProvider';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ProfilePage from './components/profilePage';
import Copyright from './components/Copyright';
import GoalDetail from './components/GoalDetail';

function App() {
    return (
        <UserProvider>
            <GoalProvider>
                <CommentProvider>
                    <div>
                        <BrowserRouter>
                            <Routes>
                                <Route exact path="/" element={<Navbar />}>
                                    <Route path="/" element={<Home />} />
                                    <Route
                                        path="/signUp"
                                        element={<SignUp />}
                                    />
                                    <Route
                                        path="/signIn"
                                        element={<SignIn />}
                                    />
                                    <Route
                                        path="/profile-page/:username"
                                        element={<ProfilePage />}
                                    />
                                    <Route
                                        path="/goals/:id"
                                        element={<GoalDetail />}
                                    />
                                    <Route
                                        path="/copyright"
                                        element={<Copyright />}
                                    />
                                </Route>
                                <Route
                                    path="*"
                                    element={
                                        <h1>
                                            This Is Not The Page You're Looking
                                            For
                                        </h1>
                                    }
                                />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </CommentProvider>
            </GoalProvider>
        </UserProvider>
    );
}

export default App;
