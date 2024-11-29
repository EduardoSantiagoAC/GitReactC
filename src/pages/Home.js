import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import PetCard from '../components/PetCard';

const pets = [
  { id: 1, name: 'Buddy', type: 'Perro', classification: 'Compañía', price: 15, image: 'https://th.bing.com/th/id/R.d680672d9d7a7b4d3da8c02e38dcfdc8?rik=7o1%2bYH1%2famZcLw&pid=ImgRaw&r=0', description: 'Golden Retriever amigable y juguetón.' },
  { id: 2, name: 'Whiskers', type: 'Gato', classification: 'Terapia', price: 10, image: 'https://i.pinimg.com/originals/82/68/bc/8268bc4a86267e93aa062928f6f735b2.jpg', description: 'Gato juguetón y curioso.' },
];

const Home = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('Todos');
  const [classificationFilter, setClassificationFilter] = useState('Todos');

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleTypeChange = (e) => setTypeFilter(e.target.value);
  const handleClassificationChange = (e) => setClassificationFilter(e.target.value);

  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'Todos' || pet.type === typeFilter;
    const matchesClassification =
      classificationFilter === 'Todos' || pet.classification === classificationFilter;

    return matchesSearch && matchesType && matchesClassification;
  });

  return (
    <div className="container mx-auto mt-20 px-6">
      <SearchBar
        search={search}
        onSearchChange={handleSearchChange}
        typeFilter={typeFilter}
        onTypeChange={handleTypeChange}
        classificationFilter={classificationFilter}
        onClassificationChange={handleClassificationChange}
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </div>
  );
};

export default Home