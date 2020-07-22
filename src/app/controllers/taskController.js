const Task = require("../models/task");

module.exports = {
  async index(request, response) {
    try {
      const task = await Task.find().populate(["user", "tasks"]);
      content = [];
      task.forEach((item) => {
        content.push({
          title: item.title,
          description: item.description,
          date: item.dueDate,
          value: item.value,
        });
      });
      // console.log(content);
      return response.send({ content });
    } catch (err) {
      return response.status(400).send({ error: "Error loading tasks" });
    }
  },

  async create(request, response) {
    console.log("request ===>", request.body);
    const { title, description, value, dueDate } = request.body.params;

    try {
      const task = await Task.create(request.body.params);

      return response.send({
        task,
      });
    } catch (err) {
      return response.status(400).send({ error: "Registration task failed" });
    }
  },
};
