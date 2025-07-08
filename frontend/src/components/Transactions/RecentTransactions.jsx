import { ArrowRight } from "lucide-react";
import React from "react";

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
    </div>
  );
};

export default RecentTransactions;
