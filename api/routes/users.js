const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/users');

//TODO: Use passaport as authentication middleware https://github.com/jaredhanson/passport

router.get('/', (req, res, next) => {
    User.find()
        .select('username email password _id')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                users: docs
            };
            res.status(200).json(docs.length > 0 ? response : 'Users not found' );
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                message: err.message
            });
        });
});

router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(doc => {
            console.log('From MongoDb: ' + doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err,
                message: err.message
            });
        });
});

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    user.save()
    .then(result => {
        console.log(result);
        res
            .status(201)
            .json({
                message: 'Handling POST req to /users',
                createdUser: user
            });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
            message: err.message
        });
    });
});

module.exports = router;