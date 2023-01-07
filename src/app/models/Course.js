const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, maxLength: 255 },
        price: { type: Number },
        description: { type: String, maxLength: 600 },
    },
    { timestamps: true },
);

// Override all methods and Soft delete
Course.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true });
module.exports = mongoose.model('Course', Course);
