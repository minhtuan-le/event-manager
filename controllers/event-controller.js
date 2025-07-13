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
     * Adds a new event to the database.
     *
     * @async
     * @function
     * @param {object} body - The request body containing event data.
     * @returns {Promise<object|null>} A promise that resolves to the created event or null if an error occurs.
     * @throws {Error} If an error occurs while creating the event.
     */
    addEvent: async function (body) {
        try {
            let categoryIDs = body.categories ? body.categories.split(",") : [];

            let CategoryOIDs = [];

            for (let id of categoryIDs) {
                let category = await Category.findOne({ category_id: id });
                if (category) {
                    CategoryOIDs.push(category._id);
                }
            }

            let newEvent = {
                name: body.name,
                startDateTime: body.startDateTime,
                isActive: body.isActive ? true : false,
                ticketsAvailable: body.ticketsAvailable !== "" && body.ticketsAvailable !== undefined
                    ? parseInt(body.ticketsAvailable)
                    : undefined,
                description: body.description !== "" ? body.description : undefined,
                capacity: body.capacity !== "" && body.capacity !== undefined
                    ? parseInt(body.capacity)
                    : undefined,
                durationInMinutes: parseInt(body.durationInMinutes),
                image: body.image || undefined,
                categories: CategoryOIDs,
            }

            let event = await new Event(newEvent).save();

            await Category.updateMany(
                { _id: { $in: newEvent.categories } },
                { $push: { eventList: event._id } }
            );

            await operationController.incrementCount('insertCount');
            return event;

        } catch (err) {
            console.log(err);
            return null;
        }
    },

    /**
     * Deletes an event by its ID from the database.
     * @async
     * @function
     * @param {string} eventId - The ID of the event to delete.
     * @returns {Promise<object>} A promise that resolves to the result of the delete operation.
     * @throws {Error} If the event with the specified ID is not found.
     */
    deleteEvent: async function (eventId) {
        try {
            let event = await Event.findOne({ id: eventId });

            if (!event) {
                throw new Error(`Event with ID ${eventId} not found.`);
            }

            let result = await Event.deleteMany({ id: eventId });
            await operationController.incrementCount('deleteCount');
            const categoryIds = event.categories;
            await Category.updateMany(
                { _id: { $in: categoryIds } },
                { $pull: { eventList: event._id } }
            );

            return result;
        } catch (err) {
            return { acknowledged: false, deletedCount: 0 };
        }
    },

    /**
     * Updates an event's name and capacity by its ID in the database.
     *
     * @async
     * @function
     * @param {object} body - The request body containing the event ID, new name, and new capacity.
     * @returns {Promise<object|null>} A promise that resolves to the updated event or null if an error occurs.
     * @throws {Error} If an error occurs while updating the event.
     */
    updateEvent: async (body) => {
        try {
            // get the attributes and update the event
            const { eventId, name, capacity } = body;
            const event = await Event.findOneAndUpdate(
                { id: eventId },
                { name: name, capacity: parseInt(capacity) },
                { new: true, runValidators: true }
            );

            await operationController.incrementCount('updateCount');
            return event;
        } catch (err) {
            console.error(err);
            return null;
        }
    },

}