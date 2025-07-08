import incomeModel from "../models/incomeModel.js";
import xlsx from "xlsx";

export const addIncome = async (req, res) => {
    try {
        const userId = req?.user?.id;
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).send({
                success: false,
                message: "All fields are required"
            })
        };

        const newIncome = new incomeModel({
            userId,
            icon,
            source,
            amount,
            date,
        })

        await newIncome.save();
        res.status(200).send({
            success: true,
            message: "Income create successfully",
            income: newIncome,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getAllIncomeController = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized access"
            });
        }

        const incomes = await incomeModel.find({ userId }).sort({ date: -1 });
        res.status(200).send({
            success: true,
            message: "Get All Incomes Successfully",
            incomes: incomes
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const deleteIncomeController = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized access"
            });
        }

        const { id } = req.params;

        const income = await incomeModel.findByIdAndDelete(id);

        if (!income) {
            return res.status(404).send({
                success: false,
                message: "Income not found or already deleted"
            });
        }

        res.status(200).send({
            success: true,
            message: "Deleted Income Successfully",
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

        const income = await incomeModel.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        res.download("income_details.xlsx");
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal in Server"
        })
    }
}