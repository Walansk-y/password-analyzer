const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000; // Use Render's PORT or fallback to 3000

// Middleware to parse JSON
app.use(express.json());

// Have I Been Pwned API endpoint
app.post('/check-password', async (req, res) => {
    const { password } = req.body;
    const hash = require('crypto').createHash('sha1').update(password).digest('hex').toUpperCase();
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    try {
        const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`, {
            headers: { 'Add-Padding': true }
        });
        const hashes = response.data.split('\r\n').map(line => line.split(':')[0]);
        const isCompromised = hashes.includes(suffix);
        res.json({ isCompromised });
    } catch (error) {
        res.status(500).json({ error: 'Failed to check password' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
