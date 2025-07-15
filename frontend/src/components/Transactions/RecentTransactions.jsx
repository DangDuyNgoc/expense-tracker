/* eslint-disable react/prop-types */
import { ArrowRight } from "lucide-react";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All
          <ArrowRight />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item, index) => (
          <TransactionInfoCard
            key={index}
            title={item.type === "expense" ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format("dd mmm yyyy")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
