const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

const users = [
    { name: 'John Doe', studentId: '12345', password: 'password123' },
    { name: 'Jane Smith', studentId: '67890', password: 'password456' },
];

app.post('/api/recover-password', (req, res) => {
    const { name, studentId } = req.body;
    const user = users.find(u => u.name === name && u.studentId === studentId);
    if (user) {
        res.json({ password: user.password });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
