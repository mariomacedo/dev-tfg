const mongoose = require('mongoose');

const treeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Arvore', userSchema);