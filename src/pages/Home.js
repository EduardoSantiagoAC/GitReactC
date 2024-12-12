import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar'; // Asumiendo que esta barra de búsqueda es parte del diseño

const categories = [
  { id: 1, name: 'Todos', icon: '🐾' },
  { id: 2, name: 'Perro', icon: '🐶' },
  { id: 3, name: 'Gato', icon: '🐱' },
  { id: 4, name: 'Terapia', icon: '❤️‍🩹' },
  { id: 5, name: 'Compañía', icon: '🤝' },
];

const Home = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('mascotas');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');

  const fetchPets = async () => {
    try {
      const response = await fetch('/api/pets/getAll');
      if (!response.ok) throw new Error('No se pudieron cargar las mascotas');
      const data = await response.json();
      setPets(data.pets);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7D3BF] via-[#D5ACC5] to-[#B4789D] pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

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
        </div>

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

        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {filteredPets.map((pet) => (
              <motion.div
                key={pet._id}
                onClick={() => handlePetClick(pet._id)}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer border border-[#C6A89C]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={pet.image} alt={pet.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-black">{pet.name}</h2>
                  <p className="text-black text-sm">{pet.description}</p>
                  <p className="text-[#C6A89C] mt-2">Precio: ${pet.price}/día</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
