// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div style={styles.container}>
            <h1>Welcome to the Banking App</h1>
            <p>
                Our Banking App provides you with a seamless and secure way to manage your finances. 
                Sign up to open an account and start enjoying a range of banking features.
            </p>
            <p>
                Whether you want to check your balance, make transactions, or view your account history,
                our app makes banking easier than ever!
            </p>
            <div style={styles.buttonContainer}>
                <Link to="/signup" style={styles.button}>Sign Up</Link>
                <Link to="/signin" style={styles.button}>Sign In</Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '50px',
    },
    buttonContainer: {
        marginTop: '20px',
    },
    button: {
        margin: '10px',
        padding: '10px 20px',
        textDecoration: 'none',
        color: 'white',
        backgroundColor: '#007bff',
        borderRadius: '5px',
        transition: 'background-color 0.3s',
    },
};

export default LandingPage;
