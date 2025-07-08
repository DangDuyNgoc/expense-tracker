/* eslint-disable no-unused-vars */
import InfoCard from "@/components/Cards/InfoCard";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import RecentTransactions from "@/components/Transactions/RecentTransactions";
import { useAuth } from "@/hooks/useAuth";
import { addThousandsSeparator } from "@/utils/helper";
import axios from "axios";
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
      const response = await axios.get("http://localhost:8080/api/dashboard");

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
            transactions={dashboard.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
