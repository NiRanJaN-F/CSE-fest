const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint for Fest Registration / Event Booking
app.post('/api/register', (req, expressRes) => {
    const { name, email, college, event, phone } = req.body;
    
    // Basic validation
    if (!name || !email || !event) {
        return expressRes.status(400).json({ 
            success: false, 
            message: 'Please provide all required fields (Name, Email, Event).' 
        });
    }

    // Simulate successful registration and generate a unique pass ID
    const passId = 'VIB-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    console.log(`[VibranCSE Registration] ${name} (${email}) registered for ${event}. Pass ID: ${passId}`);

    return expressRes.status(200).json({
        success: true,
        message: `Registration successful for ${event}!`,
        passId: passId,
        data: { name, email, college, event, phone }
    });
});

// Fallback to index.html for Single Page Application routing or direct URL navigation
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  VibranCSE Fest Server is running!                 `);
    console.log(`  Local URL: http://localhost:${PORT}             `);
    console.log(`====================================================`);
});