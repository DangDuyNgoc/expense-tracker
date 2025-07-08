import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { getDashboardController } from "../controllers/dashboardController.js";

const dashboardRoute = express.Router();

dashboardRoute.get("/", isAuthenticated, getDashboardController);

export default dashboardRoute;