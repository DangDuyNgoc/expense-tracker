import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {
    addExpense,
    deleteExpenseController,
    downloadExcelController,
    getAllExpenseController
} from "../controllers/expenseController.js";

const expenseRoute = express.Router();

expenseRoute.post("/add", isAuthenticated, addExpense);
expenseRoute.get("/get-expenses", isAuthenticated, getAllExpenseController);
expenseRoute.delete("/delete/:id", isAuthenticated, deleteExpenseController);
expenseRoute.get("/downloadExcel", isAuthenticated, downloadExcelController);

export default expenseRoute;