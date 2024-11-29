import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PetDetails from './pages/PetDetails';
import AddPet from './pages/AddPet';
import UserProfile from './pages/UserProfile';
import UserHistory from './pages/UserHistory';
import UserRequests from './pages/UserRequests';
import RegisterUser from './pages/RegisterUser';
import Login from './pages/Login';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    console.log('Usuario autenticado:', user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    console.log('Sesión cerrada');
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={!!currentUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets/:id" element={<PetDetails />} />
        <Route path="/add-pet" element={<AddPet />} />
        <Route path="/profile" element={<UserProfile user={currentUser} />} />
        <Route path="/profile/history" element={<UserHistory />} />
        <Route path="/profile/requests" element={<UserRequests />} />
        <Route path="/register" element={<RegisterUser onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
