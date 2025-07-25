/* eslint-disable react/prop-types */
import CustomPieChart from "../Charts/CustomPieChart";

const Color = ["#875CF5", "#FA2C37", "#FF6900"];
const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expense", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>
      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        color={Color}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
