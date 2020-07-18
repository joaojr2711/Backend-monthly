const express = require('express');

const UsersController = require('./app/controllers/authController');
const TaskController = require('./app/controllers/taskController');


const routes = express.Router();

routes.get('/status', (request, response) => {
  response.send();
});

//registration and login route
routes.post('/register', UsersController.create);
routes.post('/authenticate', UsersController.auth);

//get tasks
routes.post('/task', TaskController.create);
routes.get('/task', TaskController.index);


module.exports = routes;