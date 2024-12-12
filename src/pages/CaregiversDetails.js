import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CaregiversDetails = ({ caregivers }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const caregiver = caregivers.find((caregiver) => caregiver.id.toString() === id);

  if (!caregiver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E7D3BF] to-[#B4789D]">
        <motion.p
          className="text-center text-[#B4789D] text-xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No se encontró el cuidador solicitado.
        </motion.p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#E7D3BF] to-[#D5ACC5] min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header con imagen y nombre */}
        <div className="relative h-48 bg-[#B4789D]">
          <img
            src={caregiver.image}
            alt={caregiver.name}
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-[#B4789D]">{caregiver.name}</h1>
          <p className="text-center text-gray-600 mt-2">{caregiver.description}</p>

          {/* Detalles del cuidador */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#E7D3BF] rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold text-[#B4789D]">Experiencia</h3>
              <p className="text-gray-600">{caregiver.experience} años</p>
            </div>
            <div className="bg-[#E7D3BF] rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold text-[#B4789D]">Calificación</h3>
              <p className="text-gray-600">⭐ {caregiver.rating}</p>
            </div>
          </div>

          {/* Botón para contactar */}
          <div className="mt-6 text-center">
            <motion.button
              className="bg-[#B4789D] text-white py-3 px-6 rounded-lg shadow-md hover:bg-[#C6A89C] transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert(`Contactando a ${caregiver.name}...`)}
            >
              Contactar al cuidador
            </motion.button>
          </div>

          {/* Volver a la lista */}
          <div className="mt-4 text-center">
            <motion.button
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
            >
              Volver
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiversDetails;
