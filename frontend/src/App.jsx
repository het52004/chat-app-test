import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

function App() {
  const { userData, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth && !userData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border"
          style={{ width: "5rem", height: "5rem" }}
          role="status"
        >
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={!userData ? <Login /> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={userData ? <Home /> : <Navigate to="/" />}
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
