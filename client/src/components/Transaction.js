// Transaction.js
import React, { useState } from 'react';

const Transaction = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipient, amount }),
            });
            const data = await response.json();
            setMessage(data.message);
        } catch (err) {
            console.error(err);
            setMessage('Error sending money.');
        }
    };

    return (
        <div>
            <h3>Send Money</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Recipient Username"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
                <button type="submit">Send</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Transaction;
