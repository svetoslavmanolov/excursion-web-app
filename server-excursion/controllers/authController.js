const router = require('express').Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorHelpers');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const SECRET = process.env.SECRET;

router.post('/register', isGuest, async (req, res) => {
    const { email, username, password } = req.body;
    // if (password !== rePassword) {
    //     throw new Error('Passwords mismatch')
    // }
    try {
        const user = await authService.create({ email, username, password });
        const token = await authService.createToken(user);
        res.cookie('token', token, { httpOnly: true })
        res.status(200).json({ user: { _id: user._id, email: user.email, username: user.username } })
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }
});

router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.login(email, password);
        const token = await authService.createToken(user);
        res.cookie('token', token, { httpOnly: true })
        res.status(200).json({ user: { _id: user._id, email: user.email, username: user.username } })
    } catch (error) {
        res.status(400).json({ error: getErrorMessage(error) });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('token');
    res.status(200).json({});
});

module.exports = router;