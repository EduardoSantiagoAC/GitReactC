import React, { useState } from 'react';
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
  const [pets, setPets] = useState([
    {
      id: '1',
      name: 'Buddy',
      breed: 'Golden Retriever',
      age: 3,
      owner: 'Juan Pérez',
      image: 'https://via.placeholder.com/150', // Imagen de prueba
      description: 'Perro amigable y juguetón, ideal para compañía.',
      price: 20,
    },
    {
      id: '2',
      name: 'Mimi',
      breed: 'Gato Siamés',
      age: 2,
      owner: 'Laura Martínez',
      image: 'https://via.placeholder.com/150', // Imagen de prueba
      description: 'Gato curioso y relajado, perfecto para terapias.',
      price: 15,
    },
  ]);

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

  return (
    <BrowserRouter>
      {/* Barra de navegación */}
      <Navbar isLoggedIn={!!currentUser} currentUser={currentUser} onLogout={handleLogout} />

      {/* Rutas */}
      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Home pets={pets} />} />

        {/* Detalles de mascota */}
        <Route
          path="/pets/:id"
          element={
            <PetDetails
              pets={pets}
              currentUser={currentUser}
            />
          }
        />

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
    </BrowserRouter>
  );
}

export default App;

