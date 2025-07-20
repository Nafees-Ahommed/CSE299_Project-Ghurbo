import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerPackage } from "../controllers/packageController.js";

const packageRouter = express.Router();

packageRouter.post('/', protect, registerPackage)

export default packageRouter;