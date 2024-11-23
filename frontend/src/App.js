import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import Donor from "./pages/Donor";
import Add from "./pages/Add";
import Update from "./pages/Update";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./index.css";
import LogoutButton from "./components/LogoutButton";
import Header from "./components/Header";
import PSettings from "./pages/PSettings";
import Settings from "./pages/Settings";
import Patient from "./pages/Patient";

function App() {
  const [user, setUser] = useState(null);
  const [isPatient, setIsPatient] = useState(false);

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsPatient(parsedUser.user.userType === "patient");
      console.log("User session restored:", parsedUser);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("data");
    setUser(null);
    console.log("User logged out");
  };

  const isLoggedIn = Cookies.get("user");

  const getSettingsComponent = () => {
    if (!isLoggedIn) {
      return <Login setUser={setUser} />;
    }
    return isPatient ? (
      <PSettings setUser={setUser} />
    ) : (
      <Settings setUser={setUser} />
    );
  };

  const getHomeComponent = () => {
    if (!isLoggedIn) {
      return <Login setUser={setUser} />;
    }
    return isPatient ? (
      <Patient setUser={setUser} />
    ) : (
      <Donor setUser={setUser} />
    );
  };

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Header handleLogout={handleLogout} />}
        <Routes>
          <Route
            path="/"
            element={getHomeComponent()}
          />
          <Route
            path="/add"
            element={user ? <Add /> : <Navigate to="/login" />}
          />
          <Route
            path="/update"
            element={user ? <Update /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Login setUser={setUser} />
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Signup setUser={setUser} />
            }
          />
          <Route path="/settings" element={getSettingsComponent()} />
        </Routes>
      </BrowserRouter>
      {user && <LogoutButton handleLogout={handleLogout} />}
    </div>
  );
}

export default App;