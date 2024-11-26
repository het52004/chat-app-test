import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import { privateRoutes } from "./lib/privateRoutes";
import Navbar from "./pages/Navbar";
import Settings from "./pages/Settings";

function App() {
  const { userData, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const location = useLocation();
  useEffect(() => {
    if (privateRoutes.includes(location.pathname)) {
      checkAuth();
    }
  }, [checkAuth, location]);
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
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={!userData ? <Login /> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={userData ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!userData ? <Signup /> : <Navigate to="/home" />}
        />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
