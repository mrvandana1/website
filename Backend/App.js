// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(express.json());
app.use(cors());
// Basic test route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Server is running successfully',
        endpoints: {
            root: 'GET /',
            signup: 'POST /api/signup',
            test: 'GET /api/test'
        }
    });
});

// Test route to check API
app.get('/api/test', (req, res) => {
    res.json({ 
        status: 'success',
        message: 'API is working correctly',
        timestamp: new Date()
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.error('MongoDB Connection Error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

// Signup Route
app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ 
                status: 'error',
                message: 'All fields are required' 
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ 
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }
            ]
        });

        if (existingUser) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Username or email already exists' 
            });
        }

        // Create new user
        const user = new User({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: password // Note: In production, hash the password
        });

        await user.save();

        // Return success
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Server error occurred' 
        });
    }
});
// // Import necessary modules at the top of your server file
// const bcrypt = require('bcrypt'); // Ensure you have bcrypt installed for password hashing
// const jwt = require('jsonwebtoken'); // Optional: for generating JWT tokens
// const User = require('./models/User'); // Adjust the path according to your project structure

// Sign In Route
app.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Email and password are required' 
            });
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Invalid email or password' 
            });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password); // Assuming passwords are hashed
        if (!isMatch) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Invalid email or password' 
            });
        }

        // Generate a JWT token (optional, but recommended for securing routes)
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' }); // Use an environment variable for the secret

        // Return success response with user data and token
        res.status(200).json({
            status: 'success',
            message: 'Sign in successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token // Send token back if you're using it for authentication
        });

    } catch (error) {
        console.error('Sign In error:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Server error occurred' 
        });
    }
});

// Transaction route
app.post('/api/transaction', async (req, res) => {
    const { recipient, amount } = req.body;
    
    // Logic to find user accounts and perform transaction
    // Ensure user authentication to access this route
    // Deduct amount from sender and add to recipient's balance

    try {
        // Example logic
        const sender = await User.findById(req.user.id); // Assuming user is authenticated
        const receiver = await User.findOne({ username: recipient });

        if (!receiver) return res.status(400).json({ message: 'Recipient not found' });

        if (sender.balance < amount) return res.status(400).json({ message: 'Insufficient funds' });

        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save();
        await receiver.save();

        res.status(200).json({ message: 'Transaction successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Transaction failed. Please try again.' });
    }
});

// Error handling middleware
app.use((req, res) => {
    res.status(404).json({ 
        status: 'error',
        message: 'Route not found' 
    });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test the server at: http://localhost:${PORT}`);
});