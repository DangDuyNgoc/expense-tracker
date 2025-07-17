/* eslint-disable react/prop-types */
import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5>Expenses</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All
          <ArrowRight />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 4)?.map((expense, index) => (
          <TransactionInfoCard
            key={index}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
