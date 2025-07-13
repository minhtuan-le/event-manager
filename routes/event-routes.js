/** 
 * required express module
 * @requires express
 * @const
 */
const express = require("express");

/**
 * @type {import('express').Router}
 * @const
 * @description Creates a new router object, a complete middleware and routing system.
 */
const router = express.Router();

/**
 * @type {object}
 * @const
 * @description Imports the event controller which contains methods for handling event-related routes.
 */
const eventCont = require("../controllers/event-controller");

/**
 * @type {import('mongoose').Model}
 * @const
 * @description Imports the Event model, representing a MongoDB collection of events.
 */
const Event = require("../models/event");

/**
 * @type {import('mongoose').Model}
 * @const
 * @description Imports the Category model, representing a MongoDB collection of categories.
 */
const Category = require("../models/category");

/**
 * @type {function}
 * @const
 * @description Imports utility functions for formatting dates and durations.
 */
const { formatDate, formatDuration} = require("../utils");



/**
 * Add an event. Render the add event form.
 * @name get/sihao/add-event
 * @function 
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/add-event', function (req, res) {
    res.render('add-event');
});

/**
 * Handle adding a new event.
 * @name post/sihao/add-event
 * @function 
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.post('/add-event', async function (req, res) {
    await eventCont.addEvent(req.body);
    res.redirect('list-all-events');

});

/**
 * List all events. Render the list of all events.
 * @name get/sihao/list-all-events
 * @function 
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/list-all-events', async function (req, res) {
    const eventDB = await Event.find().populate("categories");
    res.render('list-all-events', {eventDB, formatDate, formatDuration});
});

/**
<<<<<<< HEAD
 *  List all sold out events. Render the list of all sold out events.
=======
 * List all sold out events. Render the list of all sold out events.
>>>>>>> 1b27cb32de6a88ae40f41748d264dc9f93f0f61f
 * @name get/sihao/list-sold-out-events
 * @function 
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/list-sold-out-events', async function (req, res) {
    const eventDB = await Event.find({ ticketsAvailable: { $eq: 0 }}).populate("categories");

    res.render('list-sold-out-events', { eventDB, formatDate, formatDuration});
});

/**
<<<<<<< HEAD
 *  Display category detail. Display category detail including events.
=======
 * Display category detail. Display category detail including events.
>>>>>>> 1b27cb32de6a88ae40f41748d264dc9f93f0f61f
 * @name get/sihao/category-detail
 * @function 
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/category-detail/:id', async function (req, res) {
    const CATEGORY_ID = req.params.id;

    const category = await Category.findOne({category_id: CATEGORY_ID})

    if(!category){
        res.render('category-detail', {category})
        return
    }
    
    const eventDB = await Event.find({ categories: category._id }).populate(
        "categories"
      );

      const modifiedEvents = eventDB.map((event) => {
        const modifiedCategoryList = event.categories.map(
          (category) => category.id
        );
        return { ...event._doc, categoryList: modifiedCategoryList };
      });
    res.render('category-detail', { eventDB: modifiedEvents, category, formatDate, formatDuration});
});

/**
 * Delete event by ID. Render the event deletion page.
 * @name get/sihao/delete-event
 * @function 
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/delete-event', function (req, res) {
    res.render('event-delete');
});

/**
 * Handle deleting an event by its ID.
 * @name get/sihao/event-delete
 * @function 
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/event-delete', async function (req, res) {
    const event = await eventCont.deleteEvent(req.query.eventId);

    if (event) {
        res.redirect('/sihao/list-all-events');
    } else {
        res.send(`There is no event with the id: ${req.query.eventId}`);
    }
});


/**
 * export the router handler as a module
 * @module router
 */
module.exports = router;