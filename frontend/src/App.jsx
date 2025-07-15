import { Toaster } from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;
