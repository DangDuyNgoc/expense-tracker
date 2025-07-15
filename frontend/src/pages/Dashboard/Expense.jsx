import AddExpenseForm from "@/components/Expense/AddExpenseForm";
import ExpenseList from "@/components/Expense/ExpenseList";
import ExpenseOverView from "@/components/Expense/ExpenseOverView";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import DeleteAlert from "@/components/Layouts/DeleteAlert";
import Modal from "@/components/Layouts/Modal";
import { useAuth } from "@/hooks/useAuth";
import api from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  useAuth();

  // get all expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setIsLoading(true);

    try {
      const response = await api.get("/expense/get-expenses");

      if (response.data?.expenses) {
        setExpenseData(response.data?.expenses);
      } else {
        setExpenseData([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // handle add income
  const handleAddExpense = async (income) => {
    const { category, amount, date, icon } = income;

    if (!category.trim()) {
      toast.error("Category is required");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await api.post("/expense/add", {
        category,
        amount,
        date,
        icon,
      });
      setOpenModal(false);
      toast.success("Added Expense Successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      toast.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // delete expense
  const deleteExpense = async (id) => {
    try {
      setIsLoading(true);
      await api.delete(`/expense/delete/${id}`);
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Deleted Expense Successfully!");
      fetchExpenseDetails();
    } catch (error) {
      console.log("Error", error?.response?.data?.message || error?.message);
      toast.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // handle download income details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await api.get("/expense/downloadExcel", {
        responseType: "blob",
      });

      // create url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error", error?.response?.data?.message || error?.message);
      toast.error("Error: ", error);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <ExpenseOverView
              transactions={expenseData}
              onExpenseIncome={() => setOpenModal(true)}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>
      </div>

      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Add Expense"
      >
        <AddExpenseForm openAddExpense={handleAddExpense} />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Expense"
      >
        <DeleteAlert
          content="Are you sure want to delete this expense detail?"
          onDelete={() => deleteExpense(openDeleteAlert.data)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default Expense;
