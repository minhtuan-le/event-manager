/**
 * The Event model from Mongoose, used to interact with the events collection in the database.
 * @const {mongoose.Model}
 */
const Event = require("../models/event");

/**
 * The Category model from Mongoose, used to interact with the categories collection in the database.
 * @const {mongoose.Model}
 */
const Category = require("../models/category");

/**
 * The operationController module, providing functions to interact with the operations collection in the database.
 * @const {object}
 */
const operationController = require("./operation-controller");

module.exports = {
    /**
     * Adds a new category to the database.
     *
     * @async
     * @function
     * @param {object} body - The request body containing category data.
     * @returns {Promise<object|null>} A promise that resolves to the created event or null if an error occurs.
     * @throws {Error} If an error occurs while creating the category.
     */
	addCategory: async function (body) {
        try {
            let aCategory = new Category({ 
                name: body.name,
                description: body.description,
                image: body.image || undefined,
                eventList: body.eventList,
             });
            await aCategory.save();
            await operationController.incrementCount('insertCount');
            return aCategory;
        } catch (err) {
            console.log(err);
            return null;
        }
	},

    /**
     * List all the categories existing in the database, and populated the eventList atrribute with event object 
     * from events collection
     *
     * @async
     * @function
     * @returns {Promise<object|null>} A promise that resolves to the list of all categories or null if an error occurs.
     * @throws {Error} If an error occurs while querying the database.
     */
	getAll: async function () {
        try {
		    let categories = await Category.find().populate("eventList");
            return categories;
		} catch (err) {
            console.log(err);
            return null;
        }
	},

    /**
     * Deletes a category by its ID from the database.
     * @async
     * @function
     * @param {string} eventId - The ID of the category to delete.
     * @returns {Promise<object>} A promise that resolves to the result of the delete operation.
     * @throws {Error} If the category with the specified ID is not found.
     */
	deleteCategory: async function (categoryId) {
        try {
            let theCategory = await Category.findOne({ category_id: categoryId });

            if (!theCategory) {
                throw new Error(`No category with ID: ${categoryId} was found.`);
            }

            let result = await Event.deleteMany({ _id: { $in: theCategory.eventList } });
            await Category.deleteOne({ category_id: categoryId });
            
            result.deletedCount +=1;
            await operationController.incrementCount('deleteCount');

            return result;
        } catch (err) {
            return { acknowledged: false, deletedCount: 0 };
        }
    },

    /**
     * Updates a category's name and description by its ID in the database.
     *
     * @async
     * @function
     * @param {object} body - The request body containing the category id, new name, and new description.
     * @returns {Promise<object|null>} A promise that resolves to the updated event or null if an error occurs.
     * @throws {Error} If an error occurs while updating the category.
     */
    updateCategory: async (body) => {
        try {
            const { categoryId, name, description } = body;
            const category = await Category.findOneAndUpdate(
                { category_id: categoryId },
                { name: name, description: description },
                { new: true, runValidators: true }
            );
            
            await operationController.incrementCount('updateCount');
            return category;
        } catch (err) {
            return null;
        }
    },
};