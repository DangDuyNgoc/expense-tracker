/* eslint-disable react/prop-types */
import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>
      </div>

      <button className="card-btn" onClick={onSeeMore}>
        See All <ArrowRight />
      </button>

      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item, index) => (
          <TransactionInfoCard
            key={index}
            title={item.source}
            icon={item.icon}
            amount={item.amount}
            date={moment(item.date).format("Do MMM YYYY")}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;
