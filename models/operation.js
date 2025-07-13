/** 
 * required mongoose module
 * @requires mongoose
 * @const
 */
const mongoose = require('mongoose');

/**
 * Mongoose schema represents the counter of each database operations.
 * 
 * @type {mongoose.Schema}
 */

/**
 * @typedef {Object} eventSchema
 * @property {Number} insertCount - The number of successful inserting operations performed, default 0
 * @property {Number} updateCount - The number of successful updating operations performed, default 0
 * @property {Number} deleteCount - The number of successful deleting operations performed, default 0
 */
const operationSchema = new mongoose.Schema({
    insertCount: {
        type: Number,
        default: 0,
    },
    updateCount: {
        type: Number,
        default: 0,
    },
    deleteCount: {
        type: Number,
        default: 0,
    },
});

/**
 * Mongoose model for database operations collection.
 * 
 * @type {mongoose.Model}
 */
module.exports = mongoose.model("Operation", operationSchema);
