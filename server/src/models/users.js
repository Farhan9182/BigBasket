const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
