import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#E7D3BF] flex flex-col items-center justify-center px-4">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-[#B4789D] mb-4">¡Pago realizado con éxito!</h1>
        <p className="text-gray-700 mb-6">
          Gracias por confiar en nosotros. Hemos confirmado tu reserva. Si necesitas más información, no dudes en contactarnos.
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-[#FF385C] hover:bg-[#D91448] text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          Volver al inicio
        </button>
      </motion.div>
    </div>
  );
};

export default ConfirmationPage;
