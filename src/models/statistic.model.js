const mongoose = require('mongoose');

const statisticSchema = new mongoose.Schema({
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    },
    classifier: {
        type: mongoose.Schema.Types.Mixed
    }
});

module.exports = mongoose.model('Statistic', statisticSchema);