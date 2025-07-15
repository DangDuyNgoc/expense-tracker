import { isValidObjectId, Types } from "mongoose";
import incomeModel from "../models/incomeModel.js";
import expenseModel from "../models/expenseModel.js";

export const getDashboardController = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized access"
            });
        }

        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await incomeModel.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        const totalExpense = await expenseModel.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ])

        // get income transactions in the 60 days
        const last60DaysIncomeTransactions = await incomeModel.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

        // get expense transactions in the 30 days
        const last30DaysExpenseTransactions = await expenseModel.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // get total expense for last 30 days
        const expenseLast30Days = last30DaysExpenseTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)

        // fetch last 5 transactions (income + expense)
        const lastTransactions = [
            ...(await incomeModel.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txs) => ({
                    ...txs.toObject(),
                    type: "income",
                })
            )
        ].sort((a, b) => b.date - a.date) // Sort latest first

        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expenseLast30Days,
                transactions: last30DaysExpenseTransactions,
            },

            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,

        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}