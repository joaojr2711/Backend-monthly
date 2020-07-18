const Task = require('../models/task');

module.exports = {
  async index(request, response) {
    try {
      const task = await Task.find().populate(['user', 'tasks']);
  
      return response.send({ task });
    } catch (err) {
      return response.status(400).send({ error: 'Error loading tasks' });
    }
  },

  async create(request, response) {
    const { title, description, dueDate } = request.body;

    try {
      const task = await Task.create(request.body);

      return response.send({
        task
      });
    } catch (err) {
      return response.status(400).send({ error: 'Registration task failed' });
    }
  },

}