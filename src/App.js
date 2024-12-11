import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PetDetails from './pages/PetDetails';
import AddPet from './pages/AddPet';
import RegisterUser from './pages/RegisterUser';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [apiMessage, setApiMessage] = useState('');

  // Obtener mascotas desde el backend
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('/api/pets/getAll');
        if (!response.ok) throw new Error('Error al cargar las mascotas.');
        const data = await response.json();
        setPets(data.pets);
      } catch (error) {
        console.error('Error al cargar las mascotas:', error);
      }
    };

    fetchPets();
  }, []);

  // Manejar inicio de sesión
  const handleLogin = (user) => {
    setCurrentUser(user);
    console.log('Usuario autenticado:', user);
  };

  // Manejar cierre de sesión
  const handleLogout = () => {
    setCurrentUser(null);
    console.log('Sesión cerrada');
  };

  // Manejar agregar mascota
  const handleAddPet = (newPet) => {
    setPets((prevPets) => [...prevPets, newPet]);
  };

  // Llamar a la API cuando el componente se monte
  useEffect(() => {
    fetch('/api/hello') // Llamada a la API serverless
      .then((response) => response.json())
      .then((data) => {
        setApiMessage(data.message); // Guardar el mensaje de la API en el estado
      })
      .catch((error) => {
        console.error('Error al llamar a la API:', error);
      });
  }, []);

  return (
    <BrowserRouter>
      <div>
        {/* Mostrar mensaje de la API */}
        <h1>Mensaje de la API: {apiMessage}</h1>

        {/* Barra de navegación */}
        <Navbar isLoggedIn={!!currentUser} currentUser={currentUser} onLogout={handleLogout} />

        {/* Rutas */}
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Home pets={pets} />} />

          {/* Detalles de mascota */}
          <Route path="/pet/:id" element={<PetDetails />} />


          {/* Agregar mascota */}
          <Route
            path="/add-pet"
            element={
              currentUser ? (
                <AddPet currentUser={currentUser} onAddPet={handleAddPet} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          {/* Registro de usuario */}
          <Route path="/register" element={<RegisterUser onLogin={handleLogin} />} />

          {/* Inicio de sesión */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Perfil de usuario */}
          <Route
            path="/profile"
            element={
              currentUser ? (
                <UserProfile user={currentUser} pets={pets} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
