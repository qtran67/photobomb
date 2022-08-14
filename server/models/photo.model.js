const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    file_name: {
        type: String,
        required: [true, 'file name is required'],
        minlength: [5, 'file name length should be more than 4 characters']
    },
    user_id: {
        type: String,
        required: [true, 'type is required']
    },
    description: {
        type: String,
        minlength: [3, 'description length should be more than 2 characters']
    },
    upload_date: {
        type: String,
        required: [true, 'type is required'],
        minlength: [3, 'type length should be more than 2 characters']
    },
    keywords: {
        type: String
    },
    date_taken: {
        type: String,
        minlength: [3, 'description length should be more than 2 characters']
    },
    camera_model: {
        type: String,
        minlength: [3, 'description length should be more than 2 characters']
    },
    location: {
        type: String,
        minlength: [3, 'description length should be more than 2 characters']
    }
    }, 
    {timestamps: true}
);

const Photo = mongoose.model('Photo', PhotoSchema);
module.exports = Photo;