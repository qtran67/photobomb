const photoController = require('../controllers/photo.controller');

module.exports = (app) => {
    app.get('/api/photos', photoController.getPhotos);
    app.get('/api/photos/:id', photoController.getPhotoById);
    app.get('/api/photos/user/:user_id', photoController.getPhotoByUser);
    app.get('/api/photos/keyword/:keyword', photoController.getPhotoByKeyword);
    app.post('/api/photos', photoController.createPhoto);
    app.put('/api/photos/:id', photoController.updatePhoto);
    app.delete('/api/photos/:id', photoController.deletePhoto);
    app.post('/api/photos/uploadFile', photoController.uploadPhoto);
};