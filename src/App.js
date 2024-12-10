import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PetDetails from './pages/PetDetails';
import CaregiversDetails from './pages/CaregiversDetails';
import AddPet from './pages/AddPet';
import RegisterUser from './pages/RegisterUser';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import PaymentPage from './pages/PaymentPage';
import ConfirmationPage from './pages/ConfirmationPage';

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
      breed: 'Gato doméstico',
      age: 2,
      owner: 'Ana López',
      image: 'https://i.pinimg.com/originals/82/68/bc/8268bc4a86267e93aa062928f6f735b2.jpg',
      description: 'Gato juguetón y curioso, ideal para terapia emocional.',
      price: 150,
    },
    {
      id: '3',
      name: 'Virus',
      breed: 'Gato Egipcio',
      age: 4,
      owner: 'Carlos Díaz',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/egipcio.PNG?raw=true',
      description: 'Gato egipcio ideal para personas alérgicas.',
      price: 300,
    },
    {
      id: '4',
      name: 'Apache',
      breed: 'Pastor Alemán',
      age: 1,
      owner: 'María González',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/aleman.PNG?raw=true',
      description: 'Cachorro amigable, ideal para familias con espacio.',
      price: 250,
    },
    {
      id: '5',
      name: 'Doggy',
      breed: 'Perro Salchicha',
      age: 2,
      owner: 'Luis García',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/salchicha.PNG?raw=true',
      description: 'Perro salchicha tranquilo y muy tierno.',
      price: 350,
    },
    {
      id: '6',
      name: 'Luna',
      breed: 'French Poodle',
      age: 1,
      owner: 'Ana Ruiz',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/poodle.PNG?raw=true',
      description: 'French poodle cachorro silencioso y fiel.',
      price: 200,
    },
    {
      id: '7',
      name: 'Doge',
      breed: 'Shiba Inu',
      age: 3,
      owner: 'Pedro Sánchez',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/shiba.PNG?raw=true',
      description: 'Shiba inu encantador y muy lindo.',
      price: 400,
    },
    {
      id: '8',
      name: 'Carnitas',
      breed: 'Gato Europeo',
      age: 2,
      owner: 'Patricia López',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Arturo.PNG?raw=true',
      description: 'Afectivo y muy tranquilo.',
      price: 150,
    },
    {
      id: '9',
      name: 'Kira',
      breed: 'Gato Siamés',
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
      age: 1,
      owner: 'Roberto García',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/chihuahua.PNG?raw=true',
      description: 'Chihuahua tranquilo y curioso.',
      price: 200,
    },
  ]);

  const [caregivers, setCaregivers] = useState([
    {
      id: '1',
      name: 'María López',
      experience: 5,
      rating: 4.8,
      gender: 'Femenino',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Mar%C3%ADa%20Lopez.PNG?raw=true',
      description: 'Especialista en cuidado de gatos y perros grandes.',
    },
    {
      id: '2',
      name: 'Carlos Méndez',
      experience: 3,
      rating: 4.5,
      gender: 'Masculino',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Carlos%20M%C3%A9ndez.PNG?raw=true',
      description: 'Amante de los animales con experiencia en terapias emocionales.',
    },
    {
      id: '3',
      name: 'Ana Pérez',
      experience: 7,
      rating: 5.0,
      gender: 'Femenino',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Ana%20P%C3%A9rez.PNG?raw=true',
      description: 'Cuidadora certificada con experiencia en apoyo.',
    },
    {
      id: '4',
      name: 'Laura Gómez',
      experience: 4,
      rating: 4.7,
      gender: 'Femenino',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Laura%20G%C3%B3mez.PNG?raw=true',
      description: 'Cuidadora de perros pequeños y medianos, especializada en terapia emocional.',
    },
    {
      id: '5',
      name: 'Roberto Fernández',
      experience: 6,
      rating: 4.9,
      gender: 'Masculino',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Roberto%20Fern%C3%A1ndez.PNG?raw=true',
      description: 'Cuidador con años de experiencia en perros de compañía y terapia.',
    },
    {
      id: '6',
      name: 'Isabel Ramírez',
      experience: 5,
      rating: 4.6,
      gender: 'Femenino',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Isabel%20Ram%C3%ADrez.PNG?raw=true',
      description: 'Experta en cuidado de gatos y animales pequeños, especialmente para la adopción.',
    },
    {
      id: '7',
      name: 'Javier Torres',
      experience: 3,
      rating: 4.4,
      gender: 'Masculino',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Javier%20Torres.PNG?raw=true',
      description: 'Cuidador especializado en perros activos y gatos jóvenes.',
    },
    {
      id: '8',
      name: 'Sofía Martínez',
      experience: 4,
      rating: 4.8,
      gender: 'Femenino',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Sof%C3%ADa%20Mart%C3%ADnez.PNG?raw=true',
      description: 'Especialista en cuidado de gatos y perros pequeños, con enfoque en la terapia emocional.',
    },
    {
      id: '9',
      name: 'Luis Pérez',
      experience: 6,
      rating: 5.0,
      gender: 'Masculino',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Luis%20P%C3%A9rez.PNG?raw=true',
      description: 'Experto en perros pequeños y gatos, con experiencia en apoyo emocional.',
    },
    {
      id: '10',
      name: 'Verónica Sánchez',
      experience: 4,
      rating: 4.6,
      gender: 'Femenino',
      image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Ver%C3%B3nica%20S%C3%A1nchez.PNG?raw=true',
      description: 'Cuidadora de perros y gatos, con enfoque en animales con necesidades especiales.',
    },
  ]);

  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => {
        setApiMessage(data.message);
      })
      .catch((error) => {
        console.error('Error al llamar a la API:', error);
      });
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleAddPet = (newPet) => {
    setPets((prevPets) => [...prevPets, newPet]);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar isLoggedIn={!!currentUser} currentUser={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home pets={pets} caregivers={caregivers} />} />
          <Route path="/pets/:id" element={<PetDetails pets={pets} currentUser={currentUser} />} />
          <Route path="/caregivers/:id" element={<CaregiversDetails caregivers={caregivers} />} />
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
          <Route path="/register" element={<RegisterUser onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
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
          <Route path="/pago" element={<PaymentPage currentUser={currentUser} />} />
          <Route path="/confirmacion" element={<ConfirmationPage currentUser={currentUser} />} />
        </Routes>
        <footer className="text-center py-4">
          <p>Mensaje de la API: {apiMessage}</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
