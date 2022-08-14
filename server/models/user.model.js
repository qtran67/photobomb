const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'first name is required'],
        minlength: [3, 'first name length should be more than 2 characters']
    },
    last_name: {
        type: String,
        required: [true, 'last name is required'],
        minlength: [3, 'last name length should be more than 2 characters']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [8, 'description length should be more than 7 characters']
    },
    thumbnail: {
        type: String,
        minlength: [3, 'thumbnail length should be more than 2 characters']
    }
    }, 
    {timestamps: true}
);

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;