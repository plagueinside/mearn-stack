const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const StepSchema = new Schema({
    step: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    answer: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Step = mongoose.model('step', StepSchema);