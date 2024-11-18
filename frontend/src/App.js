// React imports
import React, { useState, useEffect } from 'react';
// Third-party library imports
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Local file imports
import Donor from './pages/Donor';
import Add from './pages/Add';
import Update from './pages/Update';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Style imports
import './index.css';

// Component imports
import LogoutButton from './components/LogoutButton';
import Header from './components/Header';
import Settings from './pages/Settings';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log('User session restored:', JSON.parse(storedUser));
    }
  }, []); // Use an empty dependency array to run the effect only once

  const handleLogout = () => {
    Cookies.remove('user');
    setUser(null);
    console.log('User logged out');
  };

  const isLoggedIn = Cookies.get('user');

  return (
    <div className="App">
      <BrowserRouter>
      {user && <Header handleLogout={handleLogout}/>}
        <Routes>
          <Route path="/" element={(isLoggedIn || user) ? <Donor /> : <Navigate to="/login" />} />
          <Route path="/add" element={user ? <Add /> : <Navigate to="/login" />} />
          <Route path="/update" element={user ? <Update /> : <Navigate to="/login" />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/"/> : <Login setUser={setUser} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/"/> : <Signup setUser={setUser} />} />
          <Route path="/settings" element={isLoggedIn ? <Settings setUser={setUser}/> : <Login setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
      {user && <LogoutButton handleLogout={handleLogout} />}
    </div>
  );
}

export default App;