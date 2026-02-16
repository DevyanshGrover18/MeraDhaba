const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const routes = express.Router();
const User = require('../user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtSecret= "//MerebhaikajwtsecretTokenH@iiii"


// Use body-parser middleware
routes.use(bodyParser.json());



// Define the POST /newuser route
routes.post('/newuser', [
    // Validate request body
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a valid Password').isLength({ min: 5 }),
    body('name', 'Enter a valid Name').isLength({ min: 3 })
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10)
    const secPassword= await bcrypt.hash(req.body.password, salt)

    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            location: req.body.location || '', 
            password: secPassword
        });

        if (!newUser) {
            return res.status(500).json({ success: false, error: 'Failed to create user' });
        }

        res.json({ success: true, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

routes.post('/ouruser', [
    // Validate request body
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a valid Password').isLength({ min: 5 }),
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body; // Destructure email and password from request body
    
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(500).json({ success: false, error: 'Try again with correct email id and password' });
        }

        const passwordCompare = await bcrypt.compare(password, userData.password)
        
        // Check if the password matches
        if (!passwordCompare) {
            return res.status(500).json({ success: false, error: 'Try again with correct password' });
        }

        const data={    
            user:{
                id:userData.id
            }
        }

        let authToken= jwt.sign(data, jwtSecret)

        res.json({ success: true, authToken: authToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false});
    }
});

// Export routes
module.exports = routes;
