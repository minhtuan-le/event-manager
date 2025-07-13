
/** 
 * required express module
 * @requires express
 * @const
 */
const express = require("express");

/**
 * @type {import('express').Router}
 * @const
 * @description Creates a new router.
 */
const router = express.Router();

/**
 * @type {object}
 * @const
 * @description Require the event controller that contains methods for handling event-related opeartions.
 */
const eventCont = require("../controllers/event-controller");

/**
 * @type {import('mongoose').Model}
 * @const
 * @description Imports the Event model, represented in MongoDB collection.
 */
const Event = require("../models/event");

/**
 * Add a new event to the database using JSON format data sent through the body of the HTTP request.
 *
 * @name createEventsAPI
 * @function
 * @route POST /sihao/api/v1/add-event
 * @param {string} path - route path.
 * @param {function} callback - callback function.
 * @return {JSON} the result in JSON format containing the event id
 */
router.post("/api/v1/add-event", async (req, res) => {
    const event = await eventCont.addEvent(req.body);
    if (event) {
        res.json({
            eventId: event.id,
        });
    } else {
        res.json({ eventId: "error adding new event" });
    }
});

/**
 * Find and populate all events and their associated categories from the database.
 *
 * @name listEventsAPI
 * @function
 * @route {GET} /sihao/api/v1/events
 * @param {string} path - Route path.
 * @param {function} callback - Callback function.
 * @returns {JSON} The resul in JSON format containing the array of events with populated category lists.
 */
router.get("/api/v1/events", async (req, res) => {
    const events = await Event.find().populate("categories");
    res.json(events);
});


/**
 * Delete an event from the database by event ID passed as JSON object.
 *
 * @name deleteEventAPI
 * @function
 * @route {DELETE} /sihao/api/v1/event-delete
 * @param {string} path - Route path.
 * @param {function} callback - Callback function.
 * @param {Object} request.body - The request's body containing the event ID.
 * @param {string} request.body.eventId - The ID of the event to be deleted.
 * @returns {JSON} The resulting JSON containing the deletion result.
 */
router.delete("/api/v1/delete-event", async (req, res) => {
    const eventId = req.body.eventId;
    const result = await eventCont.deleteEvent(eventId);

    res.json(result);
});


/**
 * Update event name and capacity by ID in the database using the data passed in the request's body.
 *
 * @name updateEventAPI
 * @function
 * @route {PUT} /sihao/api/v1/update-event
 * @param {string} path - Route path.
 * @param {function} callback - Callback function.
 * @param {Object} request.body - The request's body containing the updated event data.
 * @returns {JSON} The resulting JSON containing the update status.
 */
router.put("/api/v1/update-event", async (req, res) => {
    const event = await eventCont.updateEvent(req.body);
    if (event) {
      res.json({ status: "Event updated successfully" });
    } else {
      res.json({ status: "Event update failed" });
    }
  });
  
  /**
   * export the router handler as a module
   * @module router
   */
  module.exports = router;