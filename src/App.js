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
      name: 'Biscuit',
      breed: 'Golden Retriever',
      age: 3,  
      owner: 'Juan Pérez',  
      image: 'https://th.bing.com/th/id/R.d680672d9d7a7b4d3da8c02e38dcfdc8?rik=7o1%2bYH1%2famZcLw&pid=ImgRaw&r=0', 
      description: 'Golden Retriever amigable y juguetón, ideal para compañía.',
      price: 350,  
    },
    {
      id: '2',
      name: 'Bigotes',
      breed: 'Gato',
      age: 2, 
      owner: 'Laura Martínez',  
      image: 'https://i.pinimg.com/originals/82/68/bc/8268bc4a86267e93aa062928f6f735b2.jpg', 
      description: 'Gato juguetón y curioso, ideal para terapias.',
      price: 150,  
    },
    {
      id: '3',
      name: 'Virus',
      breed: 'Gato egipcio',
      age: 4,  
      owner: 'Carlos Díaz',  
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/egipcio.PNG?raw=true',
      description: 'Gato egipcio ideal para alérgicos.',
      price: 350,  
    },
    {
      id: '4',
      name: 'Apache',
      breed: 'Pastor Alemán',
      age: 1,  
      owner: 'María González',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/aleman.PNG?raw=true', 
      description: 'Pastor alemán cachorro amigable e hiperactivo.',
      price: 300,  
    },
    {
      id: '5',
      name: 'Doggy',
      breed: 'Perro salchicha',
      age: 3,  
      owner: 'Luis Pérez',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/salchicha.PNG?raw=true', 
      description: 'Perro salchicha tranquilo y muy tierno.',
      price: 350,  
    },
    {
      id: '6',
      name: 'Luna',
      breed: 'French Poodle',
      age: 2,  
      owner: 'Ana Ruiz',  
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/poodle.PNG?raw=true', 
      description: 'French poodle cachorro silencioso y fiel.',
      price: 200,  
    },
    {
      id: '7',
      name: 'Doge',
      breed: 'Shiba Inu',
      age: 2,  
      owner: 'Pedro Sánchez',  
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/shiba.PNG?raw=true', 
      description: 'Shiba inu encantador y muy lindo.',
      price: 400,  
    },
    {
      id: '8',
      name: 'Carnitas',
      breed: 'Gato',
      age: 1,  
      owner: 'Patricia López',  
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Arturo.PNG?raw=true', 
      description: 'Afectivo y muy tranquilo.',
      price: 150,  
    },
    {
      id: '9',
      name: 'Kira',
      breed: 'Siamés',
      age: 3,  
      owner: 'Juliana Martínez',  
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/siam%C3%A9s.PNG?raw=true', 
      description: 'Siamés suave y afectivo.',
      price: 200,  
    },
    {
      id: '10',
      name: 'Snowy',
      breed: 'Chihuahua',
      age: 2,  
      owner: 'Roberto García',  
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/chihuahua.PNG?raw=true', 
      description: 'Chihuahua tranquilo y curioso.',
      price: 200,  
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
