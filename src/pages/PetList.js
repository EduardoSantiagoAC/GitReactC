import React, { useState } from 'react';


const pets = [
  {
    id: 1,
    name: 'Buddy',
    type: 'Perro',
    classification: 'Compañía',
    size: 'Grande',
    price: 20,
    description: 'Golden Retriever amigable y juguetón.',
    image: 'https://placekitten.com/300/200',
  },
  {
    id: 2,
    name: 'Whiskers',
    type: 'Gato',
    classification: 'Terapia',
    size: 'Mediano',
    price: 10,
    description: 'Gato juguetón y curioso.',
    image: 'https://placekitten.com/301/201',
  },
  {
    id: 3,
    name: 'Rocky',
    type: 'Perro',
    classification: 'Apoyo',
    size: 'Mediano',
    price: 12,
    description: 'Bulldog francés muy sociable.',
    image: 'https://placekitten.com/302/202',
  },
  {
    id: 4,
    name: 'Coco',
    type: 'Gato',
    classification: 'Compañía',
    size: 'Grande',
    price: 20,
    description: 'Gato persa con mucho estilo.',
    image: 'https://placekitten.com/303/203',
  },
  {
    id: 5,
    name: 'Max',
    type: 'Perro',
    classification: 'Terapia',
    size: 'Grande',
    price: 18,
    description: 'Labrador entrenado para terapia emocional.',
    image: 'https://placekitten.com/304/204',
  },
];

// Opciones para los filtros
const filterOptions = {
  type: ['Todos', 'Perro', 'Gato'],
  size: ['Todos', 'Pequeño', 'Mediano', 'Grande'],
  classification: ['Todos', 'Compañía', 'Terapia', 'Apoyo'],
};

const PetList = () => {
  const [filters, setFilters] = useState({
    type: 'Todos',
    size: 'Todos',
    classification: 'Todos',
  });
  const [search, setSearch] = useState('');

  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Manejar búsqueda
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Filtrar mascotas según los filtros seleccionados
  const filteredPets = pets.filter((pet) => {
    const matchesType = filters.type === 'Todos' || pet.type === filters.type;
    const matchesSize = filters.size === 'Todos' || pet.size === filters.size;
    const matchesClassification =
      filters.classification === 'Todos' || pet.classification === filters.classification;
    const matchesSearch =
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.description.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesSize && matchesClassification && matchesSearch;
  });

  return (
    <div className="bg-secondary-color min-h-screen py-12">
      <div className="container mx-auto">
        {/* Encabezado con barra de búsqueda */}
        <div className="bg-white shadow-lg py-6 mb-8">
          <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-4 px-6">
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={search}
              onChange={handleSearchChange}
              className="w-full lg:w-1/3 p-3 border border-gray-300 rounded shadow-sm"
            />
            <div className="flex gap-4">
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="p-3 border border-gray-300 rounded shadow-sm"
              >
                {filterOptions.type.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                name="size"
                value={filters.size}
                onChange={handleFilterChange}
                className="p-3 border border-gray-300 rounded shadow-sm"
              >
                {filterOptions.size.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                name="classification"
                value={filters.classification}
                onChange={handleFilterChange}
                className="p-3 border border-gray-300 rounded shadow-sm"
              >
                {filterOptions.classification.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Listado de Mascotas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <div
                key={pet.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-lg font-bold text-gray-800">{pet.name}</h2>
                  <p className="text-sm text-gray-600">{pet.type}</p>
                  <p className="text-sm text-gray-600">Clasificación: {pet.classification}</p>
                  <p className="text-sm text-gray-600 mt-2">{pet.description}</p>
                  <p className="text-primary-color font-bold mt-4">Precio: ${pet.price}/día</p>
                  <button className="bg-primary-color text-white px-4 py-2 rounded-full mt-4 w-full hover:bg-red-500">
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No se encontraron mascotas con los filtros seleccionados.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetList;
