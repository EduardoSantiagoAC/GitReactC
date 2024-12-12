import React, { useState } from 'react';

const pets = [
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
  },

  {
    id: '1',
    name: 'Kiki',
    type: 'Gato',
    age: 2,
    owner: 'Juan Pérez',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/kiki.PNG?raw=true',
    description: 'Gato amistoso y enérgico.',
    price: 300,
    classification: 'Compañía',
    size: 'Mediano',
    rating: 4.8,
    ubicacion: { latitud: 23.652694, longitud: -100.643054 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/kiki2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/kiki3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/kiki4.PNG?raw=true'
    ]
  },
  {
    id: '2',
    name: 'Snowy',
    type: 'Gato',
    age: 3,
    owner: 'Ana López',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/snowy.PNG?raw=true',
    description: 'Gato cariñoso y elegante.',
    price: 350,
    classification: 'Compañía',
    size: 'Mediano',
    rating: 4.7,
    ubicacion: { latitud: 23.653812, longitud: -100.645120 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/snowy2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/snowy3.PNG?raw=true'
    ]
  },
  {
    id: '3',
    name: 'Lefty',
    type: 'Tortuga',
    age: 10,
    owner: 'Carlos Díaz',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty.PNG?raw=true',
    description: 'Tortuga marina dócil y tranquila.',
    price: 200,
    classification: 'Compañía',
    size: 'Pequeño',
    rating: 4.8,
    ubicacion: { latitud: 23.651479, longitud: -100.647812 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty4.PNG?raw=true'
    ]
  },

  
  {
    id: '4',
    name: 'Rafael',
    type: 'Tortuga',
    age: 8,
    owner: 'María González',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael.PNG?raw=true',
    description: 'Tortuga curiosa y tranquila.',
    price: 180,
    classification: 'Compañía',
    size: 'Mediano',
    rating: 4.6,
    ubicacion: { latitud: 23.645978, longitud: -100.647234 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael4.PNG?raw=true'
    ]
  },
  {
    id: '5',
    name: 'Dali',
    type: 'Rata',
    age: 1,
    owner: 'Luis Pérez',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/dali.PNG?raw=true',
    description: 'Rata amistosa y juguetona.',
    price: 50,
    classification: 'Compañía',
    size: 'Pequeño',
    rating: 4.7,
    ubicacion: { latitud: 23.644782, longitud: -100.646531 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/dali2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/dali3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/dali4.PNG?raw=true'
    ]
  },
  {
    id: '6',
    name: 'Tom',
    type: 'Rata',
    age: 2,
    owner: 'Ana Ruiz',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/tom.PNG?raw=true',
    description: 'Rata divertida y curiosa.',
    price: 60,
    classification: 'Compañía',
    size: 'Pequeño',
    rating: 4.8,
    ubicacion: { latitud: 23.648742, longitud: -100.642368 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/tom2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/tom3.PNG?raw=true'
    ]
  },
  {
    id: '7',
    name: 'Pegazo',
    type: 'Caballo',
    age: 5,
    owner: 'Juan Pérez',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegazo.PNG?raw=true',
    description: 'Caballo fuerte y dócil, ideal para paseos.',
    price: 1000,
    classification: 'Compañía',
    size: 'Grande',
    rating: 4.9,
    ubicacion: { latitud: 23.646700, longitud: -100.650000 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegazo2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegaazo3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegazo4.PNG?raw=true'
    ]
  },
  {
    id: '8',
    name: 'Spirit',
    type: 'Caballo',
    age: 6,
    owner: 'Carlos Méndez',
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit.PNG?raw=true',
    description: 'Caballo sensible, ideal para terapia emocional.',
    price: 1200,
    classification: 'Terapia',
    size: 'Grande',
    rating: 4.9,
    ubicacion: { latitud: 23.648500, longitud: -100.655000 },
    gallery: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit4.PNG?raw=true'
    ]
 
  }
];


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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

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
    <div className="bg-gradient-to-br from-[#E7D3BF] via-[#D5ACC5] to-[#B4789D] min-h-screen py-12">
      <div className="container mx-auto">
        <div className="bg-white shadow-lg py-6 mb-8 rounded-lg">
          <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center gap-4 px-6">
            <input
              type="text"
              placeholder="Buscar por nombre o descripción..."
              value={search}
              onChange={handleSearchChange}
              className="w-full lg:w-1/3 p-3 border border-[#C6A89C] rounded shadow-sm text-black"
            />
            <div className="flex gap-4">
              <select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
                className="p-3 border border-[#C6A89C] rounded shadow-sm text-black"
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
                className="p-3 border border-[#C6A89C] rounded shadow-sm text-black"
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
                className="p-3 border border-[#C6A89C] rounded shadow-sm text-black"
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
                  <h2 className="text-lg font-bold text-black">{pet.name}</h2>
                  <p className="text-sm text-black">{pet.type}</p>
                  <p className="text-sm text-black">Clasificación: {pet.classification}</p>
                  <p className="text-sm text-black mt-2">{pet.description}</p>
                  <p className="text-[#B4789D] font-bold mt-4">Precio: ${pet.price}/día</p>
                  <button className="bg-[#B4789D] text-white px-4 py-2 rounded-full mt-4 w-full hover:bg-[#C6A89C] transition-all">
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-black col-span-full">
              No se encontraron mascotas con los filtros seleccionados.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetList;
