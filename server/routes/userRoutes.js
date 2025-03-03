const express = require('express');
const { userSignUp, userLogin, getProfile, userLogout } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');
const userRouter = express.Router();

userRouter.post('/sign-up', userSignUp);
userRouter.post('/login', userLogin);
userRouter.post('/logout', userLogout);
userRouter.get('/profile',authMiddleware, getProfile);

module.exports = userRouter;