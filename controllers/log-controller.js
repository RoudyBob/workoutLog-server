const log = require('../models/log');

const router = require('express').Router();
const Log = require('../db').import('../models/log');
const validateSession = require('../middleware/validate-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.get('/', validateSession, function (req, res) {
    Log.findAll({
        where: {owner_id: req.user.id }
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err }));
});

router.post('/', validateSession, function (req, res) {
    const logEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner_id: req.user.id
    }

    Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }));
});

router.get('/:id', validateSession, function (req, res) {
    Log.findOne({
        where: { owner_id: req.user.id, id: req.params.id }
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }));
});

router.put('/:id', validateSession, function (req, res) {
    const updatedLogEntry = {
        id: req.params.id,
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner_id: req.user.id
    }

    const query = { where: { id: req.params.id, owner_id: req.user.id }};

    Log.update(updatedLogEntry, query)
    .then(log => res.status(200).json({ message: `Updated log id ${req.params.id} successfully.` }))
    .catch(err => res.status(500).json({ error: err }));
});

router.delete('/:id', validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner_id: req.user.id }};

    Log.destroy(query)
    .then(() => res.status(200).json({ message: `Journal entry id ${req.params.id} removed.` }))
    .catch((err) => res.status(500).json({ error: err}));
});

module.exports = router;