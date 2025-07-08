import xlsx from "xlsx";
import expenseModel from "../models/expenseModel.js";

export const addExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).send({
                success: false,
                message: "All fields are required",
            })
        };

        const newExpense = new expenseModel({
            userId,
            icon,
            category,
            amount,
            date
        });

        await newExpense.save();

        res.status(200).send({
            success: true,
            message: "Add Expense Successfully",
            expense: newExpense
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getAllExpenseController = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized access"
            });
        }
        const expense = await expenseModel.find({ userId }).sort({ date: -1 });

        res.status(200).send({
            success: true,
            message: "Get All Expense Successfully",
            expenses: expense
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const deleteExpenseController = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized access"
            });
        }

        const { id } = req.params;

        const expense = await expenseModel.findByIdAndDelete(id);

        if (!expense) {
            return res.status(404).send({
                success: false,
                message: "Expense not found or already deleted"
            });
        }

        res.status(200).send({
            success: true,
            message: "Deleted Expense Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const downloadExcelController = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized access"
            });
        }

        const expense = await expenseModel.find({ userId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "expense");
        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download("expense_details.xlsx");
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}