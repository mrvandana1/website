// Account.js
import React from 'react';
import Transaction from './Transaction';

const Account = () => {
    return (
        <div>
            <h2>Your Account</h2>
            <p>Account details will be displayed here.</p>
            <Transaction /> {/* Include the Transaction component */}
        </div>
    );
};

export default Account;
