const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const User = require('../models/user');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = {
  async create(request, response) {
    const { username, password } = request.body.params;

    try {
      if (await User.findOne({ username }))
        return response.status(400).send({ error: 'User already exists' });

      const user = await User.create(request.body.params  );

      user.password = undefined;

      return response.send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return response.status(400).send({ error: 'Registration failed' });
    }
  },

  async auth(request, response) {
    const { username, password } = request.body.params;

    const user = await User.findOne({ username }).select('+password');

    if (!user)
      return response.status(400).send({ error: 'User not found' });

    if (!await bcrypt.compare(password, user.password))
      return response.status(400).send({ error: 'Invalid password' });

    user.password = undefined;

    response.send({
      user,
      token: generateToken({ id: user.id }),
    });
  },

}