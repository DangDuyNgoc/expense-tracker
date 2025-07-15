/* eslint-disable no-unused-vars */
import InfoCard from "@/components/Cards/InfoCard";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import ExpenseTransactions from "@/components/Transactions/ExpenseTransactions";
import FinanceOverview from "@/components/Transactions/FinanceOverview";
import Last30DaysExpenses from "@/components/Transactions/Last30DaysExpenses";
import RecentIncome from "@/components/Transactions/RecentIncome";
import RecentIncomeWithChart from "@/components/Transactions/RecentIncomeWithChart";
import RecentTransactions from "@/components/Transactions/RecentTransactions";
import { useAuth } from "@/hooks/useAuth";
import api from "@/utils/axiosInstance";
import { addThousandsSeparator } from "@/utils/helper";
import { CreditCard } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  useAuth();

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    if (loading) true;

    setLoading(true);

    try {
      const response = await api.get("/dashboard");

      if (response.data) {
        setDashboard(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<CreditCard />}
            value={addThousandsSeparator(dashboard?.totalBalance)}
            color="bg-primary"
            label={"Total Balance"}
          />

          <InfoCard
            icon={<CreditCard />}
            value={addThousandsSeparator(dashboard?.totalIncome)}
            color="bg-orange-500"
            label={"Total Income"}
          />

          <InfoCard
            icon={<CreditCard />}
            value={addThousandsSeparator(dashboard?.totalExpense)}
            color="bg-red-500"
            label={"Total Expense"}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboard?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={dashboard?.totalBalance || 0}
            totalIncome={dashboard?.totalIncome || 0}
            totalExpense={dashboard?.totalExpense || 0}
          />

          <ExpenseTransactions
            transactions={dashboard?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={dashboard?.last30DaysExpenses?.transactions || []}
          />

          <RecentIncomeWithChart
            data={dashboard?.last60DaysIncome?.transactions?.slice(0, 4) || []}
            totalIncome={dashboard?.totalIncome || 0}
          />

          <RecentIncome
            transactions={dashboard?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
