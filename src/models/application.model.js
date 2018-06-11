const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    status: {type: String, default: 'active'},
    trackingId: {type: String, required: true},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ]
});

applicationSchema.pre('save', () => {

});

module.exports = mongoose.model('Application', applicationSchema);