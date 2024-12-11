import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const PetDetails = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedImage, setExpandedImage] = useState(null);

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await fetch(`/api/pets/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al cargar los detalles de la mascota');
        }
        const data = await response.json();
        setPet(data.pet);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E7D3BF] via-[#D5ACC5] to-[#B4789D]">
        <motion.p
          className="text-center text-[#B4789D] text-xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Cargando detalles de la mascota...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E7D3BF] via-[#D5ACC5] to-[#B4789D]">
        <motion.p
          className="text-center text-[#B4789D] text-xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E7D3BF] via-[#D5ACC5] to-[#B4789D]">
        <motion.p
          className="text-center text-[#B4789D] text-xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No se encontraron detalles para esta mascota.
        </motion.p>
      </div>
    );
  }

  const galleryImages = [pet.image, ...(pet.additionalImages || [])];

  return (
    <div className="min-h-screen bg-[#E7D3BF]">
      {/* Imagen Principal */}
      <motion.div
        className="relative h-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src={galleryImages[0]} alt={pet.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-6">
          <h1 className="text-4xl font-bold">{pet.name}</h1>
          <p className="text-lg">{pet.type}</p>
        </div>
      </motion.div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Información de la Mascota */}
        <motion.div
          className="bg-[#D5ACC5] p-6 rounded-lg shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-black">Detalles de {pet.name}</h2>
          <p className="text-black mb-4">{pet.description}</p>
          <p className="text-black">
            <strong>Clasificación:</strong> {pet.classification}
          </p>
          <p className="text-black">
            <strong>Precio:</strong> ${pet.price} por día
          </p>
        </motion.div>

        {/* Galería de Imágenes */}
        <motion.div
          className="bg-[#D5ACC5] p-6 rounded-lg shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-black">Galería</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Galería ${index}`}
                className="w-full h-32 object-cover rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow border-2 border-[#C6A89C]"
                onClick={() => setExpandedImage(img)}
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal de imagen expandida */}
      {expandedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setExpandedImage(null)}
        >
          <img
            src={expandedImage}
            alt="Expandida"
            className="max-w-3xl max-h-screen object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default PetDetails;
