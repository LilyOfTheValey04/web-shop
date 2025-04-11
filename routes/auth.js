const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/login', async (req, res) => {
    // Търси потребителя в базата по username
    const user = await User.findOne({ username: req.body.username });
    // Проверява дали потребителят съществува и паролата е вярна
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({ message: 'Грешно потребителско име или парола' });
    }
     // Създава JWT токен
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    // Връща токена към клиента
    res.json({ token });
});
module.exports= router;