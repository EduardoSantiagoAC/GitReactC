import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const categories = [
  { id: 1, name: 'Todos', icon: '🐾' },
  { id: 2, name: 'Perro', icon: '🐶' },
  { id: 3, name: 'Gato', icon: '🐱' },
  { id: 4, name: 'Terapia', icon: '❤️‍🩹' },
  { id: 5, name: 'Compañía', icon: '🤝' },
];

const pets = [
  {
    id: 1,
    name: 'Biscuit',  
    type: 'Perro',
    classification: 'Compañía',
    price: 350,
    image: 'https://th.bing.com/th/id/R.d680672d9d7a7b4d3da8c02e38dcfdc8?rik=7o1%2bYH1%2famZcLw&pid=ImgRaw&r=0',
    description: 'Golden Retriever amigable y juguetón.',
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


const foods = [
  {
    id: 1,
    name: "Royal Canin Medium Puppy",
    type: "Perro",
    classification: "Alimento premium",
    description: "Alimento seco para cachorros de raza mediana hasta los 12 meses.",
    price: 1200,
    image: "https://www.petco.com.mx/medias/1200ftw-117287.jpg?context=bWFzdGVyfHJvb3R8NTI4NDg0fGltYWdlL2pwZWd8aGIzL2g5Ni8xMDg3MDU1MjAzNTM1OC8xMjAwZnR3XzExNzI4Ny5qcGd8ZjI0NTllZTNjYzVkZjI0NmNkMjM4Y2I5ZmI5NWIwOGE1NmQzZjQ0MjdjNTY5MGY5MjY3NGM4MzAyMDY5NmI5Mw",
  },
  {
    id: 2,
    name: "Hill's Science Diet Adult",
    type: "Perro",
    classification: "Alimento premium",
    description: "Alimento para perros adultos con sabor a pollo y cebada.",
    price: 1350,
    image: "https://cdn.hills-cdn.com/dam/product-images/hills/pdp/adult-dog-large-chicken-dry-productShot_500.jpg",
  },
  {
    id: 3,
    name: "Whiskas Carne y Pollo",
    type: "Gato",
    classification: "Alimento regular",
    description: "Alimento seco para gatos adultos con mezcla de sabores de carne y pollo.",
    price: 500,
    image: "https://whiskas.com.mx/wp-content/uploads/2021/05/Whiskas-SaborCarneyPollo-1.png",
  },
  {
    id: 4,
    name: "Purina Pro Plan Veterinary Diets",
    type: "Perro",
    classification: "Dietético",
    description: "Dieta veterinaria para perros con problemas digestivos.",
    price: 1700,
    image: "https://images.purina.com/pro-plan/en/proplan-vet/us-vet-med/en/files/proplan_veterinary_diets_gastroenteric_formulas_dog_dry_original.jpg",
  },
  {
    id: 5,
    name: "Fancy Feast Gourmet Filetes",
    type: "Gato",
    classification: "Snacks",
    description: "Comida húmeda para gatos, hecha de filetes de pollo en salsa.",
    price: 350,
    image: "https://cdn.shopify.com/s/files/1/0247/9124/2351/products/fancy-feast-classic-pate.jpg",
  },
  {
    id: 6,
    name: "Pedigree Dentastix",
    type: "Perro",
    classification: "Snacks",
    description: "Snacks para perros que ayudan a mantener dientes limpios y saludables.",
    price: 250,
    image: "https://www.pedigree.com.mx/wp-content/uploads/2021/05/dentastix-fresh-gigante.jpg",
  },
  {
    id: 7,
    name: "Royal Canin Kitten",
    type: "Gato",
    classification: "Alimento premium",
    description: "Alimento seco para gatitos hasta los 12 meses de edad.",
    price: 1150,
    image: "https://cdn.hills-cdn.com/dam/product-images/hills/pdp/kitten-health-dry-original.jpg",
  },
  {
    id: 8,
    name: "Canidae PURE Salmon",
    type: "Perro",
    classification: "Natural",
    description: "Alimento para perros con ingredientes limitados y salmón como proteína principal.",
    price: 1800,
    image: "https://canidae.com/media/2008/canidae-dog-pure-salmon-24lb-front-1.jpg",
  },
  {
    id: 9,
    name: "Sheba Pate Selection",
    type: "Gato",
    classification: "Snacks",
    description: "Pate para gatos con sabores seleccionados de carne y pescado.",
    price: 400,
    image: "https://m.media-amazon.com/images/I/71xd9BtDm+L._SL1500_.jpg",
  },
  {
    id: 10,
    name: "Hill's Prescription Diet Metabolic",
    type: "Perro",
    classification: "Dietético",
    description: "Alimento seco para perros que ayuda a controlar el peso.",
    price: 1900,
    image: "https://images.hillspet.com/dam/hills/caas/product/proplan/dog-mobility-hills-prescription-diet-joint-care-dry-food-canine-bag-sm.jpg",
  },
];

const Home = ({ pets, caregivers }) => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('mascotas');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [foodFilter, setFoodFilter] = useState('Todos');
  const [caregiverFilters, setCaregiverFilters] = useState({
    gender: 'Todos',
    rating: 'Todos',
    experience: 'Todos',
  });

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleFoodFilterChange = (type) => {
    setFoodFilter(type);
  };

  const handleCaregiverFilterChange = (e) => {
    setCaregiverFilters({
      ...caregiverFilters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredPets = pets.filter((pet) => {
    return (
      activeCategory === 'Todos' ||
      pet.type === activeCategory ||
      pet.classification === activeCategory
    );
  });

  const filteredFoods = foods.filter(
    (food) => foodFilter === 'Todos' || food.type === foodFilter
  );

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

  const handlePetClick = (id) => {
    navigate(`/pets/${id}`);
  };

  const handleCaregiverClick = (id) => {
    navigate(`/caregivers/${id}`);
  };

  const handleFoodClick = (id) => {
    alert(`Ver detalles del alimento con ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7D3BF] via-[#D5ACC5] to-[#B4789D] pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <SearchBar />

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
          <motion.button
            className={`px-6 py-2 text-xl font-semibold rounded-full transition-all ${
              currentSection === 'alimentos' ? 'bg-[#B4789D] text-white' : 'bg-[#E7D3BF] text-black'
            } hover:bg-[#C6A89C] hover:text-white`}
            onClick={() => setCurrentSection('alimentos')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Alimentos
          </motion.button>
        </div>

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
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-black">{pet.name}</h2>
                    <p className="text-black text-sm">{pet.description}</p>
                    <p className="text-[#C6A89C] mt-2">Precio: ${pet.price}/día</p>
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
                  onClick={() => handleCaregiverClick(caregiver.id)}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer border border-[#C6A89C]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={caregiver.image}
                    alt={caregiver.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-black">{caregiver.name}</h2>
                    <p className="text-black text-sm">{caregiver.description}</p>
                    <p className="text-[#C6A89C] mt-2">Experiencia: {caregiver.experience} años</p>
                    <p className="text-[#B4789D]">⭐ {caregiver.rating}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

        {currentSection === 'alimentos' && (
          <>
            <div className="flex justify-center gap-4 mb-6">
              <button
                className="rounded-full px-4 py-2 bg-white shadow-md"
                onClick={() => setFoodFilter('Todos')}
              >
                Todos
              </button>
              <button
                className="rounded-full px-4 py-2 bg-white shadow-md"
                onClick={() => setFoodFilter('Perro')}
              >
                Perro
              </button>
              <button
                className="rounded-full px-4 py-2 bg-white shadow-md"
                onClick={() => setFoodFilter('Gato')}
              >
                Gato
              </button>
            </div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {filteredFoods.map((food) => (
                <motion.div
                  key={food.id}
                  onClick={() => handleFoodClick(food.id)}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer border border-[#C6A89C]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-black">{food.name}</h2>
                    <p className="text-black text-sm">{food.description}</p>
                    <p className="text-[#C6A89C] mt-2">Precio: ${food.price}</p>
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
