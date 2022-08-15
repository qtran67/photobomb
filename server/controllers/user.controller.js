const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    getUsers: (req, res) => {
        User.find({})
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log('ERROR IN Get all', err);
            res.status(400).json({ message: 'something went wrong in find all users', error: err });
        });
    },
    getUserById: (req, res) => {
        User.findOne({ _id: req.params.id })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log('ERROR IN Get User', err);
            res.status(400).json({ message: 'something went wrong in find user', error: err });
        });
    },
    createUser: (req, res) => {
        User.create(req.body)
        .then((user) => {
            const userToken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);

            res.cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true
            })
            .json(user);
        })
        .catch((err) => {
            console.log('ERROR IN create User', err);
            res.status(400).json({ message: 'something went wrong in create user', error: err });
        });
    },
    updateUser: (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log('ERROR IN update User', err);
            res.status(400).json({ message: 'something went wrong in update user', error: err });
        });
    },
    deleteUser: (req, res) => {
        User.deleteOne({ _id: req.params.id })
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log('ERROR IN delete User', err);
            res.status(400).json({ message: 'something went wrong in delete user', error: err });
        });
    },
    login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if(user === null) { // email not found in users collection
            return res.status(400).json({ message: 'email required', error: err });;
        }

        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
    
        if(!correctPassword) {  // password wasn't a match!
            return res.status(400).json({ message: 'wrong password', error: err });;
        }
    
        // the password was correct
        const userToken = jwt.sign({
        id: user._id
        }, process.env.SECRET_KEY);
    
        res.cookie("usertoken", userToken, process.env.SECRET_KEY, {
            httpOnly: true
        })
        .json(user);
    },      
    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
};