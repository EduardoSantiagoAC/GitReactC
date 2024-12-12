import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const categories = [
  { id: 1, name: 'Todos', icon: '🐾' },
  { id: 2, name: 'Perro', icon: '🐶' },
  { id: 3, name: 'Gato', icon: '🐱' },
  { id: 4, name: 'Terapia', icon: '❤️‍🩹' },
  { id: 5, name: 'Compañía', icon: '🤝' },
  { id: 6, name: 'caballo', icon: '🐴' },
  { id: 7, name: 'conejo', icon: '🐰' },
  { id: 8, name: 'pato', icon: '🦆' },
  { id: 9, name: 'oveja', icon: '🐑' },
  { id: 10, name: 'tortuga', icon: '🐢' },
  { id: 11, name: 'roedor', icon: '🐭' },
  { id: 12, name: 'serpiente', icon: '🐍' },
];



const pets = [
  {
    id: '1',
    name: 'Biscuit',
    breed: 'Golden Retriever',
    age: 3,
    owner: 'Juan Pérez',
    image: '', 
    description: 'Golden Retriever amigable y juguetón, ideal para compañía.',
    price: 350,
    ubicacion: { latitud: 23.652694, longitud: -100.643054 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/kiki.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/kiki2.PNG?raw=true',
      '',
    ],
  },
  {
    id: 2,
    name: 'Bigotes', 
    type: 'Gato',
    classification: 'Terapia',
    price: 150,
    image: 'https://i.pinimg.com/originals/82/68/bc/8268bc4a86267e93aa062928f6f735b2.jpg',
    description: 'Gato juguetón y curioso.',
  },
  {
    id: 3,
    name: 'Virus', 
    type: 'Gato',
    classification: 'Compañía',
    price: 350,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/egipcio.PNG?raw=true',
    description: 'Gato egipcio ideal para alérgicos.',
  },
  {
    id: 4,
    name: 'Apache',  
    type: 'Perro',
    classification: 'Terapia',
    price: 300,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/aleman.PNG?raw=true',
    description: 'Pastor alemán cachorro amigable e hiperactivo.',
  },
  {
    id: 5,
    name: 'Doggy',  
    type: 'Perro',
    classification: 'Compañía',
    price: 350,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/salchicha.PNG?raw=true',
    description: 'Perro salchicha tranquilo y muy tierno.',
  },
  {
    id: 6,
    name: 'Luna',  
    type: 'Perro',
    classification: 'Apoyo',
    price: 200,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/poodle.PNG?raw=true',
    description: 'French poodle cachorro silencioso y fiel.',
  },
  {
    id: 7,
    name: 'Doge', 
    type: 'Perro',
    classification: 'Apoyo',
    price: 400,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/shiba.PNG?raw=true',
    description: 'Shiba inu encantador y muy lindo.',
  },
  {
    id: 8,
    name: 'Carnitas',  
    type: 'Gato',
    classification: 'Apoyo',
    price: 150,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Arturo.PNG?raw=true',
    description: 'Afectivo y muy tranquilo.',
  },
  {
    id: 9,
    name: 'Kira',
    type: 'Gato',
    classification: 'Apoyo',
    price: 200,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/siam%C3%A9s.PNG?raw=true',
    description: 'Siamés suave y afectivo.',
  },
  {
    id: 10,
    name: 'Snowy',  
    type: 'Perro',
    classification: 'Compañía',
    price: 200,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/chihuahua.PNG?raw=true',
    description: 'Chihuahua tranquilo curioso.',
  },
  {
    id: 11,
    name: 'Pegazo',
    type: 'Caballo',
    classification: 'Compañía',
    price: 1000,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegazo.PNG?raw=true',
    description: 'Caballo fuerte y dócil, ideal para paseos.',
    rating: 4.7,
    owner: 'Juan Pérez',
    ubicacion: { latitud: 23.646700, longitud: -100.650000 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegazo2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegaazo3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegazo4.PNG?raw=true'
    ],
  },
  {
    id: 12,
    name: 'Spirit',
    type: 'Caballo',
    classification: 'Terapia',
    price: 1200,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit.PNG?raw=true',
    description: 'Caballo terapéutico con gran sensibilidad emocional.',
    rating: 4.9,
    owner: 'Carlos Méndez',
    ubicacion: { latitud: 23.648500, longitud: -100.655000 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit4.PNG?raw=true'
    ],
  },
  {
    id: 13,
    name: 'Gridi',
    type: 'Conejo',
    classification: 'Compañía',
    price: 80,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/gridi.PNG?raw=true',
    description: 'Conejo esponjoso y juguetón.',
    rating: 4.6,
    owner: 'Ana Pérez',
    ubicacion: { latitud: 23.650200, longitud: -100.642000 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/gridi2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/gridi3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/gridi4.PNG?raw=true'
    ],
  },
  {
    id: 14,
    name: 'Pelusa',
    type: 'Conejo',
    classification: 'Compañía',
    price: 90,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/pelusa.PNG?raw=true',
    description: 'Conejo suave y cariñoso.',
    rating: 4.8,
    owner: 'Laura Gómez',
    ubicacion: { latitud: 23.645100, longitud: -100.640000 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/pelusa2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/pelusa3.PNG?raw=true'
    ],
  },
  {
    id: 15,
    name: 'Frederick',
    type: 'Iguana',
    classification: 'Compañía',
    price: 150,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/iguana/frederick.PNG?raw=true',
    description: 'Iguana tranquila y fácil de cuidar.',
    rating: 4.9,
    owner: 'Roberto Fernández',
    ubicacion: { latitud: 23.653800, longitud: -100.646000 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/iguana/frederick2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/iguana/frederick3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/iguana/frederick4.PNG?raw=true'
    ],
  },
  {
    id: 16,
    name: 'Billy',
    type: 'Serpiente',
    classification: 'Terapia',
    price: 200,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/serpiente/billy.PNG?raw=true',
    description: 'Serpiente no venenosa de fácil manejo.',
    rating: 4.4,
    owner: 'Isabel Ramírez',
    ubicacion: { latitud: 23.650500, longitud: -100.649000 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/serpiente/billy2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/serpiente/billy3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/serpiente/billy4.PNG?raw=true'
    ],
  },
  {
    id: 18,
    name: 'Lefty',
    type: 'Tortuga',
    classification: 'Compañía',
    price: 250,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty.PNG?raw=true',
    description: 'Tortuga marina dócil y tranquila.',
    rating: 4.7,
    owner: 'Ana Pérez',
    ubicacion: { latitud: 23.648742, longitud: -100.642368 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty4.PNG?raw=true'
    ]
  },
  {
    id: 19,
    name: 'Rafael',
    type: 'Tortuga',
    classification: 'Compañía',
    price: 280,
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael.PNG?raw=true',
    description: 'Tortuga de tierra activa y curiosa.',
    rating: 4.9,
    owner: 'Laura Gómez',
    ubicacion: { latitud: 23.650124, longitud: -100.648904 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael4.PNG?raw=true'
    ]
  }
];



const caregivers = [
  {
    id: 1,
    name: 'María López',
    experience: 5,
    rating: 4.8,
    gender: 'Femenino',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Mar%C3%ADa%20Lopez.PNG?raw=true',
    description: 'Especialista en cuidado de gatos y perros grandes.',
  },
  {
    id: 2,
    name: 'Carlos Méndez',
    experience: 3,
    rating: 4.5,
    gender: 'Masculino',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Carlos%20M%C3%A9ndez.PNG?raw=true',
    description: 'Amante de los animales con experiencia en terapias emocionales.',
  },
  {
    id: 3,
    name: 'Ana Pérez',
    experience: 7,
    rating: 5.0,
    gender: 'Femenino',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Ana%20P%C3%A9rez.PNG?raw=true',
    description: 'Cuidadora certificada con experiencia en apoyo.',
  },

  {
    id: 4,
    name: 'Laura Gómez',
    experience: 4,
    rating: 4.7,
    gender: 'Femenino',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Laura%20G%C3%B3mez.PNG?raw=true',
    description: 'Cuidadora de perros pequeños y medianos, especializada en terapia emocional.',
  },
  {
    id: 5,
    name: 'Roberto Fernández',
    experience: 6,
    rating: 4.9,
    gender: 'Masculino',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Roberto%20Fern%C3%A1ndez.PNG?raw=true',
    description: 'Cuidador con años de experiencia en perros de compañía y terapia.',
  },
  {
    id: 6,
    name: 'Isabel Ramírez',
    experience: 5,
    rating: 4.6,
    gender: 'Femenino',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Isabel%20Ram%C3%ADrez.PNG?raw=true',
    description: 'Experta en cuidado de gatos y animales pequeños, especialmente para la adopción.',
  },
  {
    id: 7,
    name: 'Javier Torres',
    experience: 3,
    rating: 4.4,
    gender: 'Masculino',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Javier%20Torres.PNG?raw=true',
    description: 'Cuidador especializado en perros activos y gatos jóvenes.',
  },
  {
    id: 8,
    name: 'Sofía Martínez',
    experience: 4,
    rating: 4.8,
    gender: 'Femenino',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Sof%C3%ADa%20Mart%C3%ADnez.PNG?raw=true',
    description: 'Especialista en cuidado de gatos y perros pequeños, con enfoque en la terapia emocional.',
  },
  {
    id: 9,
    name: 'Luis Pérez',
    experience: 6,
    rating: 5.0,
    gender: 'Masculino',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Luis%20P%C3%A9rez.PNG?raw=true',
    description: 'Experto en perros pequeños y gatos, con experiencia en apoyo emocional.',
  },
  {
    id: 10,
    name: 'Verónica Sánchez',
    experience: 4,
    rating: 4.6,
    gender: 'Femenino',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Ver%C3%B3nica%20S%C3%A1nchez.PNG?raw=true',
    description: 'Cuidadora de perros y gatos, con enfoque en animales con necesidades especiales.',
 

    
  },
];



const getPetLocation = (id) => {
  const pet = pets.find((pet) => pet.id === id);
  return pet ? pet.ubicacion : null;
};

const Home = ({ pets }) => {
  const navigate = useNavigate();
  
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedPet, setSelectedPet] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [search, setSearch] = useState('');
  const [caregiverFilters, setCaregiverFilters] = useState({


    
    gender: 'Todos',
    rating: 'Todos',
    experience: 'Todos',
  });

  

  
  const getPetLocation = (id) => {
    const pet = pets.find((pet) => pet.id === id);
    return pet ? pet.ubicacion : null;
  };

  const [currentSection, setCurrentSection] = useState('mascotas'); // 'mascotas' o 'cuidadores'

  const handleCategoryChange = (category) => {  setActiveCategory(category);
  


    

  const handleCategoryChange = (category) => setActiveCategory(category);




  const filteredPets = pets.filter((pet) => {
    const matchesCategory = activeCategory === 'Todos' || pet.type === activeCategory;
    const matchesSearch =
      search === '' ||
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7D3BF] via-[#D5ACC5] to-[#B4789D] pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="categories">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.name)}
              className={activeCategory === category.name ? 'active' : ''}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>



        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {filteredPets.map((pet) => (
            <motion.div
              key={pet.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer border border-[#C6A89C]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-black">{pet.name}</h2>
                <p className="text-black text-sm">{pet.description}</p>
                <p className="text-[#C6A89C]">Precio: ${pet.price}/día</p>

                {/* Nuevo botón para mostrar el mapa */}
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => setSelectedPet(selectedPet && selectedPet.id === pet.id ? null : pet)}
                >
                  {selectedPet && selectedPet.id === pet.id ? 'Ocultar mapa' : 'Ver ubicación'}
                </button>
                {/* Fin del botón */}

                {selectedPet && selectedPet.id === pet.id && (
                  
                  <div className="mt-4">
                    <MapContainer
                      center={[selectedPet.ubicacion.latitud, selectedPet.ubicacion.longitud]}
                      zoom={15}
                      style={{ height: '400px', width: '100%' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[selectedPet.ubicacion.latitud, selectedPet.ubicacion.longitud]}>
                        <Popup>
                          {selectedPet.name}: {selectedPet.description}
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>

                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

  



  


  const handleCaregiverFilterChange = (e) => {
    setCaregiverFilters({
      ...caregiverFilters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredPets = pets.filter((pet) => {
    const matchesCategory =
      activeCategory === 'Todos' ||
      pet.type === activeCategory ||
      pet.classification === activeCategory;
    const matchesSearch =
      search === '' ||
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handlePetClick = (id) => {
    navigate(`/pets/${id}`);
  };

  const filteredCaregivers = caregivers.filter((caregiver) => {
    const matchesGender =
      caregiverFilters.gender === 'Todos' || caregiver.gender === caregiverFilters.gender;
    const matchesRating =
      caregiverFilters.rating === 'Todos' ||
      caregiver.rating >= parseFloat(caregiverFilters.rating);
    const matchesExperience =
      caregiverFilters.experience === 'Todos' ||
      caregiver.experience >= parseInt(caregiverFilters.experience, 10);

    return matchesGender && matchesRating && matchesExperience;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7D3BF] via-[#D5ACC5] to-[#B4789D] pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center mb-6">
          <motion.button
            className={`px-6 py-2 text-xl font-semibold rounded-full transition-all ${
              currentSection === 'mascotas' ? 'bg-[#B4789D] text-white' : 'bg-[#E7D3BF] text-black'
            } hover:bg-[#C6A89C] hover:text-white`}
            onClick={() => setCurrentSection('mascotas')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Mascotas
          </motion.button>
          <motion.button
            className={`px-6 py-2 text-xl font-semibold rounded-full transition-all ${
              currentSection === 'cuidadores' ? 'bg-[#B4789D] text-white' : 'bg-[#E7D3BF] text-black'
            } hover:bg-[#C6A89C] hover:text-white`}
            onClick={() => setCurrentSection('cuidadores')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Cuidadores
          </motion.button>
        </div>

        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative w-full max-w-3xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre o descripción..."
              className="w-full p-4 pr-12 border border-[#C6A89C] rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#B4789D] text-lg"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#B4789D] text-white p-2 rounded-full shadow-md hover:bg-[#C6A89C] transition-all">
              🔍
            </button>
          </div>
        </motion.div>

        {currentSection === 'mascotas' && (
          <>
            <motion.div
              className="flex justify-center space-x-4 overflow-x-auto scrollbar-hide mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
                    activeCategory === category.name
                      ? 'bg-[#B4789D] text-white border-[#B4789D]'
                      : 'bg-[#E7D3BF] text-black border-[#C6A89C]'
                  } hover:bg-[#C6A89C] hover:border-[#B4789D] transition-all`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {filteredPets.map((pet) => (
                <motion.div
                  key={pet.id}
                  onClick={() => handlePetClick(pet.id)}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer border border-[#C6A89C]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-full h-40 bg-[#D5ACC5] relative">
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h2 className="text-xl font-semibold text-black">{pet.name}</h2>
                    <p className="text-black text-sm">{pet.description}</p>
                    <div className="mt-2">
                      <p className="text-[#C6A89C]">Precio: ${pet.price}/día</p>

                    {/* NUEVO BOTÓN PARA VER UBICACIÓN */}
                    <button 
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => {
                        const ubicacion = getPetLocation(pet.id);
                        if (ubicacion) {
                          alert(`Ubicación de ${pet.name}: Latitud ${ubicacion.latitud}, Longitud ${ubicacion.longitud}`);
                        } else {
                          alert('No se encontró la ubicación de esta mascota.');
                        }
                      }}
                    >
                      Ver ubicación
                    </button>
                    {/* FIN DEL BOTÓN DE UBICACIÓN */}                    



                    
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        

        {currentSection === 'cuidadores' && (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <select
                name="gender"
                onChange={handleCaregiverFilterChange}
                className="p-3 rounded-full shadow-md border focus:ring-[#B4789D] bg-[#E7D3BF] text-black"
              >
                <option value="Todos">Género: Todos</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
              </select>
              <select
                name="rating"
                onChange={handleCaregiverFilterChange}
                className="p-3 rounded-full shadow-md border focus:ring-[#B4789D] bg-[#E7D3BF] text-black"
              >
                <option value="Todos">Calificación: Todas</option>
                <option value="4.5">4.5+ ⭐</option>
                <option value="5">5 ⭐</option>
              </select>
              <select
                name="experience"
                onChange={handleCaregiverFilterChange}
                className="p-3 rounded-full shadow-md border focus:ring-[#B4789D] bg-[#E7D3BF] text-black"
              >
                <option value="Todos">Experiencia: Toda</option>
                <option value="3">3+ años</option>
                <option value="5">5+ años</option>
              </select>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {filteredCaregivers.map((caregiver) => (
                <motion.div
                  key={caregiver.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all border border-[#C6A89C]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-full h-40 bg-[#D5ACC5] relative">
                    <img
                      src={caregiver.image}
                      alt={caregiver.name}
                      className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h2 className="text-xl font-semibold text-black">{caregiver.name}</h2>
                    <p className="text-black text-sm">{caregiver.description}</p>
                    <div className="mt-2">
                      <p className="text-[#C6A89C]">Experiencia: {caregiver.experience} años</p>
                      <p className="text-[#B4789D]">⭐ {caregiver.rating}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};



export default Home;
