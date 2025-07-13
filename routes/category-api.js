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
 * @description Require the category controller that contains methods for handling category-related opeartions.
 */
const categoryController = require("../controllers/category-controller");

/**
 * @type {import('mongoose').Model}
 * @const
 * @description Imports the category model, represented in MongoDB collection.
 */
const Category = require("../models/category");

/**
 * Add a new category to the database using JSON format data sent through the body of the HTTP request.
 *
 * @name createCategorysAPI
 * @function
 * @route {POST} /api/v1/category/31239552/add
 * @param {string} path - route path.
 * @param {function} callback - callback function.
 * @return {JSON} the result in JSON format containing the category id
 */
router.post("/add", async (req, res) => {
    const category = await categoryController.addCategory(req.body);
    if (category) {
        res.json({
            category_id: category.category_id,
        });
    } else {
        res.json({ categoryId: "Error adding new category" });
    }
});

/**
 * Find and populate all categories and their associated categorys from the database.
 *
 * @name listCategoriesAPI
 * @function
 * @route {GET} /api/v1/category/31239552/list
 * @param {string} path - Route path.
 * @param {function} callback - Callback function.
 * @returns {JSON} The resul in JSON format containing the array of categories with populated categoryList.
 */
router.get("/list", async (req, res) => {
    const categories = await categoryController.getAll();
    res.json(categories);
});

/**
 * Delete an category from the database by category ID passed as JSON object and all its associated events.
 *
 * @name deleteCategoryAPI
 * @function
 * @route {DELETE} /api/v1/category/31239552/delete
 * @param {string} path - Route path.
 * @param {function} callback - Callback function.
 * @param {Object} request.body - The request's body containing the category ID.
 * @param {string} request.body.categoryId - The ID of the category to be deleted.
 * @returns {JSON} The resulting JSON containing the deletion result.
 */
router.delete("/delete", async (req, res) => {
    const categoryId = req.body.id;
    const result = await categoryController.deleteCategory(categoryId);

    res.json(result);
});

/**
 * Update category name and description by ID in the database using the data passed in the request's body.
 *
 * @name updateCategoryAPI
 * @function
 * @route {PUT} /api/v1/category/31239552/update
 * @param {string} path - Route path.
 * @param {function} callback - Callback function.
 * @param {Object} request.body - The request's body containing the updated event data.
 * @returns {JSON} The resulting JSON containing the update status.
 */
router.put("/update", async (req, res) => {
    const category = await categoryController.updateCategory(req.body);
    if (category) {
      res.json({ status: "Category updated successfully" });
    } else {
      res.json({ status: "ID not found" });
    }
  });

  
  /**
   * export the router handler as a module
   * @module router
   */
  module.exports = router;