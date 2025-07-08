import { Navigate, Outlet } from "react-router-dom";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
