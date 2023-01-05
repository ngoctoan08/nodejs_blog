const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, maxLength: 255},
    price: {type: Number},
    description: { type: String, maxLength: 600 },
}, {timestamps: true});

module.exports = mongoose.model('Course', Course);
