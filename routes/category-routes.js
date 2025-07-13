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
 * @description Imports the category controller which contains methods for handling categories routes.
 */
const categoryController = require("../controllers/category-controller");

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
 * Add an event category. Render the add category form.
 * @name get/category/31239552/add
 * @function 
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/category/31239552/add', function (req, res) {
  res.render('add-category');
});

/**
 * Add an event category. Add new category info from the form to database.
 * @name post/category/31239552/add-post
 * @function 
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.post('/category/31239552/add-post', async function (req, res) {
  await categoryController.addCategory(req.body);
  res.redirect('/category/31239552/list');
});

/**
   * List all event categories. Render the table of all categories.
   * @name get/category/31239552/list
   * @function 
   * @param {string} path - Express path
   * @param {function} callback - Express callback
   */
router.get('/category/31239552/list', async function (req, res) {
  let eventCategories = await Category.find();
  res.render("list-categories", {eventCategories});
});

/**
 * Filter all event categories with a keyword. 
 * Render a form to input the keyword.
 * @name get/category/31239552/search
 * @function 
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/category/31239552/search', function (req, res) {
  res.render("search-categories");
});

/**
 * filter all event categories with a keyword.
 * Return the table of all categories with keyword match in description.
 * @name post/category/31239552/search-result
 * @function 
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.post('/category/31239552/search-result', async function (req, res) {
  let keyword = req.body.keyword;
  let filteredList = await Category.find({description: {$regex : keyword} });
  res.render("search-categories-result", {keyword, filteredList});
});

/**
 * show details of an event selected by its ID.
 * Render the info page about the event with the ID included in URL params.
 * @name get/event/31239552/:id
 * @function 
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/event/31239552/:id', async function (req, res) {
  const EVENT_ID = req.params.id;
  let findEvent= await Event.findOne({id: EVENT_ID }).populate("categories");;

  res.render("event-detail", {findEvent, formatDate, formatDuration});
});

/**
 * Delete a category chosen by ID. Render the form to input the 
 * ID of the category to be deleted.
 * @name get/category/31239552/delete
 * @function 
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.get('/category/31239552/delete', function (req, res) {
  res.render('delete-category');
});

/**
 * Delete a category chosen by ID. Delete the category with the posted ID
 * and redirect the endpoint to list all the categories.
 * @name post/category/31239552/delete-post
 * @function 
 * @param {string} path - Express path
 * @param {function} callback - Express callback
 */
router.post('/category/31239552/delete-post', async function (req, res) {
  await categoryController.deleteCategory(req.body.id)
  res.redirect('/category/31239552/list');
});

/**
 * export the router handler as a module
 * @module router
 */
module.exports = router;
