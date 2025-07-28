import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { createTour, getOwnerTours, getTours, toggleTourAvailability } from "../controllers/tourController.js";

const tourRouter = express.Router();

tourRouter.post('/', upload.array("images", 4), protect, createTour)
tourRouter.get('/', getTours)
tourRouter.get('/owner', protect, getOwnerTours)
tourRouter.post('/toggle-availability', protect, toggleTourAvailability)

export default tourRouter;