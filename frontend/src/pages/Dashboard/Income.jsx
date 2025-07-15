import AddIncomeForm from "@/components/Income/AddIncomeForm";
import IncomeList from "@/components/Income/IncomeList";
import IncomeOverview from "@/components/Income/IncomeOverview";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import DeleteAlert from "@/components/Layouts/DeleteAlert";
import Modal from "@/components/Layouts/Modal";
import api from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // get all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setIsLoading(true);

    try {
      const response = await api.get("/income/get-incomes");

      if (response.data?.incomes) {
        setIncomeData(response.data.incomes);
      } else {
        setIncomeData([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // handle add income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error("Source is required");
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
      await api.post("/income/add", {
        source,
        amount,
        date,
        icon,
      });
      setOpenModal(false);
      toast.success("Add Income Successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log(error?.response?.data?.message || error.message);
      toast.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // delete income
  const deleteIncome = async (id) => {
    try {
      setIsLoading(true);
      await api.delete(`/income/delete/${id}`);
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Deleted Income Successfully!");
      fetchIncomeDetails();
    } catch (error) {
      console.log("Error", error?.response?.data?.message || error?.message);
      toast.error("Error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // handle download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await api.get("/income/downloadExcel", {
        responseType: "blob",
      });

      // create url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
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
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid gird-cols-1 gap-6">
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>

        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure want to delete this income detail?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
