/**
 * The Operation model from Mongoose, used to track the successful database operations.
 * @const {mongoose.Model}
 */
const Operation = require('../models/operation');


module.exports = {
    /**
    * Function to increment operation counts based on the type.
    * @param {string} type - The type of operation ('insert', 'update', or 'delete').
    */
    incrementCount: async function (type) {
        try {
            // Use the $inc operator to increment the specified count in the database
            await Operation.updateOne({}, { $inc: { [type]: 1 } }, { upsert: true });
        } catch (error) {
            console.error(`Error incrementing ${type}`, error);
        }
    },
    
    /**
    * Function to add operation counts based on the type.
    * @param {string} type - The type of operation ('insert', 'update', or 'delete').
    * @param {int} addedNumber - The number of increments to be added.
    */
    addCount: async function (type, addedNumber) {
        try {
            await Operation.updateOne({}, { $inc: { [type]: addedNumber } }, { upsert: true });
        } catch (error) {
            console.error(`Error adding ${type}`, error);
        }
    },
};
