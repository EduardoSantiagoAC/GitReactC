import React, { useState } from 'react';
import Reviews from '../components/Reviews';

const PetDetails = ({ PetDetails }) => {
  const {
    name,
    type,
    breed,
    size,
    age,
    classification,
    description,
    price,
    image,
    ownerName,
    ownerContact,
  } = PetDetails;

  const [reviews, setReviews] = useState([
    { rating: 5, comment: '¡Increíble mascota! Muy bien entrenada.' },
    { rating: 4, comment: 'Una experiencia maravillosa. ¡Repetiría sin dudas!' },
  ]);

  const handleAddReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-100 p-6 flex justify-center items-center">
      <div
        className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden animate-fadeIn"
        style={{ animationDuration: '0.8s' }}
      >
        {/* Imagen Principal */}
        <div className="relative group">
          <img
            src={image || 'https://via.placeholder.com/600x400'}
            alt={name}
            className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-0 left-0 bg-purple-600 text-white px-4 py-2 text-lg rounded-br-md shadow-md">
            {classification}
          </div>
        </div>

        {/* Información Principal */}
        <div className="p-6 space-y-4">
          <h1 className="text-4xl font-bold text-purple-700">{name}</h1>
          <div className="grid grid-cols-2 gap-4 text-gray-600">
            <p>
              <span className="font-bold">Tipo:</span> {type}
            </p>
            <p>
              <span className="font-bold">Raza:</span> {breed}
            </p>
            <p>
              <span className="font-bold">Tamaño:</span> {size}
            </p>
            <p>
              <span className="font-bold">Edad:</span> {age} años
            </p>
          </div>
          <p className="text-gray-700">{description}</p>
          <p className="text-purple-600 font-bold text-xl">Precio por día: ${price}</p>
        </div>

        {/* Información del Propietario */}
        <div className="bg-gray-100 p-6 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Información del Propietario</h2>
          <p className="text-gray-700">
            <span className="font-bold">Nombre:</span> {ownerName}
          </p>
          <p className="text-gray-700">
            <span className="font-bold">Contacto:</span> {ownerContact}
          </p>
        </div>

        {/* Reseñas */}
        <div className="p-6 border-t">
          <Reviews reviews={reviews} onAddReview={handleAddReview} />
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
