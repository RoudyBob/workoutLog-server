const log = require('../models/log');

const router = require('express').Router();
const Log = require('../db').import('../models/log');
const validateSession = require('../middleware/validate-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



module.exports = router;