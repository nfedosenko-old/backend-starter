const mongoose = require('mongoose');

exports.categorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    keywords: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Keyword'
    }]
});

module.exports = mongoose.model('Category', exports.categorySchema);