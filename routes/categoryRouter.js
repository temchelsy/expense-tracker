// routes/categoryRouter.js

import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /categories
 * @desc    Get all global categories
 * @access  Public or Private (Choose based on your requirement)
 */
router.get("/", authMiddleware, getCategories);

/**
 * @route   POST /categories
 * @desc    Create a new category
 * @access  Private (Admin Only if implemented)
 */
router.post("/", authMiddleware, createCategory);

/**
 * @route   PUT /categories/:id
 * @desc    Update an existing category
 * @access  Private (Admin Only if implemented)
 */
router.put("/:id", authMiddleware, updateCategory);

/**
 * @route   DELETE /categories/:id
 * @desc    Delete a category
 * @access  Private (Admin Only if implemented)
 */
router.delete("/:id", authMiddleware, deleteCategory);

export default router;
