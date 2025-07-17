/* eslint-disable react/prop-types */
import { prepareIncomeBarChart } from "@/utils/helper";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import CustomBarChart from "../Charts/CustomBarChart";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChart(transactions);
    setChartData(result);
  }, [transactions]);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs">
            Track your earnings over time and analyze your income
          </p>
        </div>

        <button className="add-btn" onClick={onAddIncome}>
          <Plus /> <span className="">Add Income</span>
        </button>
      </div>
      <div className="mt-10">
        <CustomBarChart data={chartData} xKey="month"/>
      </div>
    </div>
  );
};

export default IncomeOverview;
