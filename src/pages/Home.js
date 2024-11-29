import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import PetCard from '../components/PetCard';

const pets = [
  { id: 1, name: 'Biscuit', type: 'Perro', classification: 'Compañía', price: 350, image: 'https://th.bing.com/th/id/R.d680672d9d7a7b4d3da8c02e38dcfdc8?rik=7o1%2bYH1%2famZcLw&pid=ImgRaw&r=0', description: 'Golden Retriever amigable y juguetón.' },
  { id: 2, name: 'Bigotes', type: 'Gato', classification: 'Terapia', price: 150, image: 'https://i.pinimg.com/originals/82/68/bc/8268bc4a86267e93aa062928f6f735b2.jpg', description: 'Gato juguetón y curioso.' },
  { id: 3, name: 'Virus', type: 'gato', classification: 'Compañía', price: 350, image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/egipcio.PNG?raw=true', description: 'Gato egipcio ideal para alergicos.' },
  { id: 4, name: 'Apache', type: 'perro', classification: 'Terapia', price: 300, image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/aleman.PNG?raw=true', description: 'Pastor aleman cachorro amigable e hiperactivo.' },
  { id: 5, name: 'Doggy', type: 'perro', classification: 'Compañía', price: 350, image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/salchicha.PNG?raw=true', description: 'Perro salchicha tranquilo y muy tierno.' },
  { id: 6, name: 'Luna', type: 'perro', classification: 'apoyo', price: 200, image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/poodle.PNG?raw=true', description: 'French poodle cachorro silencioso y fiel.' },
  { id: 7, name: 'Doge', type: 'Perro', classification: 'apoyo', price: 400, image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/shiba.PNG?raw=true', description: 'Shiba inu encantador y muy lindo.' },
  { id: 8, name: 'Carnitas', type: 'Gato', classification: 'apoyo', price: 150, image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Arturo.PNG?raw=true', description: 'afectivo y muy tranquilo.' },
  { id: 9, name: 'Kira', type: 'Gato', classification: 'apoyo', price: 200, image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/siam%C3%A9s.PNG?raw=true', description: 'Siamés suave y afectivo.' },
  { id: 10, name: 'Snowy', type: 'perro', classification: 'Compañía', price: 200, image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/chihuahua.PNG?raw=true', description: 'Chihuahua tranquilo curioso.' },
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
