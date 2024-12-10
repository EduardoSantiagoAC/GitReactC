import React, { useState, useEffect } from 'react';

const UserProfile = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingPet, setEditingPet] = useState(null);
  const [pets, setPets] = useState([]);
  const [loadingPets, setLoadingPets] = useState(true);
  const [error, setError] = useState(null);

  // Obtener las mascotas registradas por el usuario
  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        const response = await fetch(`/api/pets/getUserPets?userId=${user.id}`);
        if (!response.ok) {
          throw new Error('Error al obtener las mascotas del usuario.');
        }
        const data = await response.json();
        setPets(data.pets);
        setLoadingPets(false);
      } catch (error) {
        setError(error.message);
        setLoadingPets(false);
      }
    };

    if (user?.id) {
      fetchUserPets();
    }
  }, [user]);

  const handleEditPet = (pet) => {
    setEditingPet(pet);
  };

  const handleSavePet = () => {
    setPets((prevPets) =>
      prevPets.map((pet) => (pet.id === editingPet.id ? editingPet : pet))
    );
    setEditingPet(null);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-black mb-6">Resumen del Perfil</h2>
            <p className="text-black">
              Bienvenido a tu perfil, <strong>{user?.name || 'Invitado'}</strong>. Aquí puedes
              administrar tus actividades.
            </p>
            <p className="text-black">
              <span className="font-semibold">Tipo de Usuario:</span> {user?.userType || 'No disponible'}
            </p>
          </div>
        );

      case 'pets':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-black mb-6">Mascotas Publicadas</h2>
            {loadingPets ? (
              <p className="text-gray-500 italic">Cargando mascotas...</p>
            ) : error ? (
              <p className="text-red-500 italic">{error}</p>
            ) : pets.length === 0 ? (
              <p className="text-gray-400 italic">No has registrado ninguna mascota.</p>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pets.map((pet) => (
                  <li
                    key={pet.id}
                    className="bg-[#E7D3BF] p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-2"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-[#D5ACC5] rounded-full overflow-hidden">
                        <img
                          src={pet.image || 'https://via.placeholder.com/150'}
                          alt={pet.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-black">{pet.name}</h3>
                        <p className="text-sm text-black">
                          {`${pet.type} - ${pet.breed} - ${pet.age} años`}
                        </p>
                      </div>
                    </div>
                    <p className="text-black text-sm">{pet.description}</p>
                    <button
                      className="mt-4 w-full bg-[#B4789D] text-white py-2 rounded-md hover:bg-[#C6A89C] transition-colors"
                      onClick={() => handleEditPet(pet)}
                    >
                      ✏️ Editar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7D3BF] to-[#D5ACC5] py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-gradient-to-br from-[#B4789D] to-[#D5ACC5] text-white text-center py-8 px-6 rounded-t-xl">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-white overflow-hidden shadow-md">
            {user?.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-black text-xl font-semibold">
                {user?.name ? user.name[0] : 'U'}
              </div>
            )}
          </div>
          <h1 className="text-3xl font-semibold mt-6 text-white">{user?.name || 'Usuario desconocido'}</h1>
          <p className="text-[#E7D3BF] text-lg">{user?.email || 'Correo no disponible'}</p>
        </div>

        <div className="flex justify-center bg-[#E7D3BF] py-4">
          {['overview', 'pets', 'requests', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 mx-2 font-semibold rounded-md transition-colors ${
                activeTab === tab
                  ? 'bg-[#B4789D] text-white'
                  : 'text-black hover:bg-[#D5ACC5]'
              }`}
            >
              {tab === 'overview' ? 'Resumen' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6">{editingPet ? null : renderActiveTabContent()}</div>
      </div>
    </div>
  );
};

export default UserProfile;
