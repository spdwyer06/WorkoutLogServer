const router = require('express').Router();
const User = require('../db').import('../Models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// POST /user/register
router.post('/register', (req, res) => {
    let userModel = {
        username: req.body.user.username,
        passwordHash: bcrypt.hashSync(req.body.user.passwordHash, 13)
    };

    User.create(userModel)
        .then(user => {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.status(200).json({
                user: user,
                message: 'User successfully created',
                sessionToken: token
            });
        })
        .catch(err => res.status(500).json(err));
});

// POST /user/login
router.post('/login', (req, res) => {
    User.findOne({where: {username: req.body.user.username}})
        .then(user => {
            if(user){
                bcrypt.compare(req.body.user.passwordHash, user.passwordHash, (err, match) => {
                    if(match){
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                        res.status(200).json({
                            user: user,
                            message: 'User successfully logged in',
                            sessionToken: token
                        });
                    }
                    else{
                        res.status(502).send({error: 'Login Failed'});
                    }
                });
            }
            else{
                res.status(500).json({error: 'User does not exist'});
            }
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;