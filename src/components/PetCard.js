import React from 'react';
import { Link } from 'react-router-dom';

const PetCard = ({ pet }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-xl transition">
      <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{pet.name}</h3>
        <p className="text-sm text-gray-600">{pet.description}</p>
        <p className="text-primary-color font-bold mt-2">${pet.price} / día</p>
        <Link
          to={`/pets/${pet.id}`}
          className="mt-4 bg-primary-color text-white px-4 py-2 rounded-full w-full block text-center hover:bg-red-500"
        >
          Ver Más
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
