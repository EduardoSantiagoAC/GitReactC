import React, { useState } from 'react';

const UserProfile = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProfile, setEditingProfile] = useState(false);
  const [pets, setPets] = useState([
    {
      id: 1,
      name: 'Buddy',
      type: 'Perro',
      breed: 'Golden Retriever',
      age: 3,
      reviews: [
        { id: 1, reviewer: 'Juan Pérez', rating: 5, comment: 'Buddy fue increíble, muy amigable.' },
      ],
    },
    {
      id: 2,
      name: 'Mimi',
      type: 'Gato',
      breed: 'Gato Siamés',
      age: 2,
      reviews: [],
    },
  ]);
  const [requests, setRequests] = useState([
    {
      id: 1,
      petName: 'Buddy',
      status: 'Aprobado',
      date: '2023-11-27',
    },
  ]);

  const handleEditProfileToggle = () => {
    setEditingProfile(!editingProfile);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Resumen del Perfil</h2>
            <p className="text-gray-600 mb-4">
              Bienvenido a tu perfil, {user.name}. Aquí puedes administrar tus actividades.
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Tipo de Usuario:</span> {user.userType}
            </p>
          </div>
        );

      case 'pets':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Mascotas Publicadas</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pets.map((pet) => (
                <li key={pet.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-4">
                      <img
                        src={`https://th.bing.com/th/id/R.1d364edae01b67c261b24cdb4faa8904?rik=bfoRBq5K5fmw3Q&pid=ImgRaw&r=0`}//pruebaaaaaaaaaaaaa
                        alt={pet.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl text-gray-700">{pet.name}</h3>
                      <p className="text-gray-500">{`${pet.type} - ${pet.breed} - ${pet.age} años`}</p>
                    </div>
                  </div>
                  {pet.reviews.length > 0 ? (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Reseñas:</h4>
                      {pet.reviews.map((review) => (
                        <p key={review.id} className="text-gray-600">
                          <span className="font-semibold">{review.reviewer}:</span> "{review.comment}" ⭐{review.rating}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 mt-4">No hay reseñas para esta mascota.</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );

      case 'requests':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Solicitudes</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {requests.map((request) => (
                <li key={request.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  <h3 className="font-semibold text-xl text-gray-700">Mascota: {request.petName}</h3>
                  <p className="text-gray-500">
                    <span className="font-semibold">Estado:</span> {request.status}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Fecha:</span> {request.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'reviews':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reseñas de Mis Mascotas</h2>
            {pets.filter((pet) => pet.reviews.length > 0).length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pets
                  .filter((pet) => pet.reviews.length > 0)
                  .map((pet) =>
                    pet.reviews.map((review) => (
                      <li
                        key={review.id}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                      >
                        <h3 className="font-semibold text-gray-700">{pet.name}</h3>
                        <p className="text-gray-600">
                          <span className="font-semibold">{review.reviewer}:</span> "{review.comment}" ⭐{review.rating}
                        </p>
                      </li>
                    ))
                  )}
              </ul>
            ) : (
              <p className="text-gray-400">No hay reseñas para tus mascotas.</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F7F7] to-[#F4E1D2] py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Encabezado del perfil */}
        <div className="bg-[#F4E1D2] text-gray-800 text-center py-8 px-6 rounded-t-xl">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-white overflow-hidden">
            {user.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 text-xl font-semibold">
                {user.name[0]}
              </div>
            )}
          </div>
          <h1 className="text-3xl font-semibold mt-6">{user.name}</h1>
          <p className="text-gray-600 text-lg">{user.email}</p>
          <button
            className="mt-6 bg-[#FF6A6A] text-white px-6 py-3 rounded-xl hover:bg-[#FF4C4C] transition duration-200"
            onClick={handleEditProfileToggle}
          >
            ✏️ Editar Perfil
          </button>
        </div>

        {/* Navegación de pestañas */}
        <div className="flex justify-center bg-[#F7F7F7] py-6 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-8 py-3 font-semibold transition-all duration-300 ${
              activeTab === 'overview'
                ? 'text-[#FF6A6A] border-b-4 border-[#FF6A6A]'
                : 'text-gray-600 hover:text-[#FF6A6A]'
            }`}
          >
            Resumen
          </button>
          <button
            onClick={() => setActiveTab('pets')}
            className={`px-8 py-3 font-semibold transition-all duration-300 ${
              activeTab === 'pets'
                ? 'text-[#FF6A6A] border-b-4 border-[#FF6A6A]'
                : 'text-gray-600 hover:text-[#FF6A6A]'
            }`}
          >
            Mascotas
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-8 py-3 font-semibold transition-all duration-300 ${
              activeTab === 'requests'
                ? 'text-[#FF6A6A] border-b-4 border-[#FF6A6A]'
                : 'text-gray-600 hover:text-[#FF6A6A]'
            }`}
          >
            Solicitudes
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-8 py-3 font-semibold transition-all duration-300 ${
              activeTab === 'reviews'
                ? 'text-[#FF6A6A] border-b-4 border-[#FF6A6A]'
                : 'text-gray-600 hover:text-[#FF6A6A]'
            }`}
          >
            Reseñas
          </button>
        </div>

        {/* Contenido dinámico de las pestañas */}
        <div className="p-6">{renderActiveTabContent()}</div>
      </div>
    </div>
  );
};

export default UserProfile;
