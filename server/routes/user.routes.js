const userController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/users', userController.getUsers);
    app.get('/api/users/:id', userController.getUserById);
    app.post('/api/users', userController.createUser);
    app.put('/api/users/:id', authenticate, userController.updateUser);
    app.delete('/api/users/:id', userController.deleteUser);
    app.post('/api/login', userController.login);
    app.post('/api/logout', userController.logout);
};