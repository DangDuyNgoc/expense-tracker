/* eslint-disable react/prop-types */
import { Download } from "lucide-react";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Source</h5>
        <button className="card-btn" onClick={onDownload}>
          <Download /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((income, index) => (
          <TransactionInfoCard
            key={index}
            title={income.source}
            icon={income.icon}
            date={moment(income.date).format("dd mmm yyyy")}
            amount={income.amount}
            type="income"
            onDelete={() => onDelete(income._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
