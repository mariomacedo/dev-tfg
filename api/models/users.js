const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    username: { type: String, required: true },
    //TODO: bcrypt na senha: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1
    password: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', userSchema);