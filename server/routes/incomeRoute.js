import express from "express";
import { addIncome, deleteIncomeController, downloadExcelController, getAllIncomeController } from "../controllers/incomeController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const incomeRoute = express.Router();

incomeRoute.post("/add", isAuthenticated, addIncome);
incomeRoute.get("/get-incomes", isAuthenticated, getAllIncomeController);
incomeRoute.delete("/delete/:id", isAuthenticated, deleteIncomeController);
incomeRoute.get("/downloadExcel", isAuthenticated, downloadExcelController);

export default incomeRoute;