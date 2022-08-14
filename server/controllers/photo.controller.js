const Photo = require('../models/photo.model');

module.exports = {
    getPhotos: (req, res) => {
        Photo.find({})
        .then((photos) => {
            res.json(photos);
        })
        .catch((err) => {
            console.log('ERROR IN Get all', err);
            res.status(400).json({ message: 'something went wrong in find all photos', error: err });
        });
    },
    getPhotoById: (req, res) => {
        Photo.findOne({ _id: req.params.id })
        .then((photo) => {
            res.json(photo);
        })
        .catch((err) => {
            console.log('ERROR IN Get Photo', err);
            res.status(400).json({ message: 'something went wrong in find photo', error: err });
        });
    },
    getPhotoByUser: (req, res) => {
        Photo.find({ user_id: req.params.user_id })
        .then((photo) => {
            res.json(photo);
        })
        .catch((err) => {
            console.log('ERROR IN Get Photo', err);
            res.status(400).json({ message: 'something went wrong in find photo', error: err });
        });
    },
    getPhotoByKeyword: (req, res) => {
        Photo.find({ keyword: req.params.keyword })
        .then((photo) => {
            res.json(photo);
        })
        .catch((err) => {
            console.log('ERROR IN Get Photo by type', err);
            res.status(400).json({ message: 'something went wrong in find photo by keyword', error: err });
        });
    },
    createPhoto: (req, res) => {
        Photo.create(req.body)
        .then((photo) => {
            res.status(201).json(photo);
        })
        .catch((err) => {
            console.log('ERROR IN create Photo', err);
            res.status(400).json({ message: 'something went wrong in create photo', error: err });
        });
    },
    updatePhoto: (req, res) => {
        Photo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then((photo) => {
            res.json(photo);
        })
        .catch((err) => {
            console.log('ERROR IN update Photo', err);
            res.status(400).json({ message: 'something went wrong in update photo', error: err });
        });
    },
    deletePhoto: (req, res) => {
        Photo.deleteOne({ _id: req.params.id })
        .then((photo) => {
            res.json(photo);
        })
        .catch((err) => {
            console.log('ERROR IN delete Photo', err);
            res.status(400).json({ message: 'something went wrong in delete photo', error: err });
        });
    },
    uploadPhoto: (req, res) => {
        console.log(req.files.file);
        const file = req.files.file;
        const path = "../client/public/images/" + file.name;

        file.mv(path, (err) => {
            if (err) {
            return res.status(500).send(err);
            }
            return res.send({ status: "success", path: path });
        });
    }
};