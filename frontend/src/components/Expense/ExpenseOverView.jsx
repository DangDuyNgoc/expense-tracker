/* eslint-disable react/prop-types */
import { prepareExpenseLineChartData } from "@/utils/helper";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import CustomLineChart from "../Charts/CustomLineChart";

const ExpenseOverView = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-200 mt-0.5">
            Track your spending trends over time and gain insights into where
            your money goes
          </p>
        </div>

        <button className="add-btn" onClick={onExpenseIncome}>
          <Plus /> Add Expense
        </button>
      </div>
      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverView;
