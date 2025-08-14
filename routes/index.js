const express = require('express');
const router = express.Router();

//import here
const authRoutes = require('./auth');
const pgRoutes = require('./pg');

//use here
router.use('/auth', authRoutes);
router.use('/pg', pgRoutes);


module.exports = router