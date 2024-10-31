// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import SignIn from './components/SignIn';
import Account from './components/Account';
import LandingPage from './components/LandingPage'; // Import the LandingPage component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} /> {/* Use LandingPage as the landing page */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/account" element={<Account />} />
            </Routes>
        </Router>
    );
}

export default App;
