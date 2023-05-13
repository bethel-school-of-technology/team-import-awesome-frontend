import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './components/Home';
import { UserProvider } from './contexts/UserProvider';
import { GoalProvider } from './contexts/GoalProvider';
import { CommentProvider } from './contexts/CommentProvider';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ProfilePage from './components/ProfilePage';
import Copyright from './components/Copyright';
import GoalDetail from './components/GoalDetail';
import NavbarMain from './components/NavbarMain';
import NotFound from './components/NotFound';

function App() {
    return (
        <UserProvider>
            <GoalProvider>
                <CommentProvider>
                    <div>
                        <BrowserRouter>
                            <Routes>
                                <Route exact path="/" element={<NavbarMain />}>
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
                                        path="/goals/detail/:id"
                                        element={<GoalDetail />}
                                    />
                                    <Route
                                        path="/copyright"
                                        element={<Copyright />}
                                    />
                                </Route>
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </CommentProvider>
            </GoalProvider>
        </UserProvider>
    );
}

export default App;
