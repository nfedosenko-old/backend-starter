const mongoose = require('mongoose');

exports.keywordSchema = new mongoose.Schema({
    text: {type: String, required: true}
});

module.exports = mongoose.model('Keyword', exports.keywordSchema);