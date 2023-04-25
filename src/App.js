import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Test from './components/Test';

function App() {
    return (
        //Providers

        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Navbar />}>
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
    );
}

export default App;
