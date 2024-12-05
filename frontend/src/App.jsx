import toast, { Toaster } from "react-hot-toast";
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
import Profile from "./pages/Profile";
import AddNewFriends from "./pages/AddNewFriends";
import EditAccount from "./pages/EditAccount";
import ViewUserProfile from "./pages/ViewUserProfile";
import Friends from "./pages/Friends";
import { useFriendRequest } from "./store/useFriendRequest";
import IncomingRequests from "./pages/IncomingRequests";

function App() {
  const { userData, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  const { checkStatus, removeStatus } = useFriendRequest();
  const location = useLocation();
  useEffect(() => {
    if (privateRoutes.includes(location.pathname)) {
      checkAuth();
    }
  }, [checkAuth, location]);
  useEffect(() => {
    if (userData) {
      checkStatus();
      return () => {
        removeStatus();
      };
    }
  }, [userData]);
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
    <div data-theme={theme} className="h-screen">
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
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/addnewfriends"
          element={userData ? <AddNewFriends /> : <Navigate to="/" />}
        />
        <Route
          path="/editaccount"
          element={userData ? <EditAccount /> : <Navigate to="/" />}
        />
        <Route
          path="/viewuserprofile"
          element={userData ? <ViewUserProfile /> : <Navigate to="/" />}
        />
        <Route
          path="/friends"
          element={userData ? <Friends /> : <Navigate to="/" />}
        />
        <Route
          path="/incoming"
          element={userData ? <IncomingRequests /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
