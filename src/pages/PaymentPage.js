import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    postalCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    alert('¡Reserva confirmada! Tu nueva mascota te espera 🐾');
    navigate('/confirmacion');
  };

  return (
    <motion.div
      className="min-h-screen bg-[#F5EFE6]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Principal */}
        <div className="lg:col-span-2 space-y-8">
          <motion.h1
            className="text-4xl font-bold text-[#B4789D]"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Confirma tu reserva
          </motion.h1>
          {/* Notificación */}
          <motion.div
            className="bg-[#FFEFEA] border border-[#FFB6C1] rounded-lg p-4 flex items-center space-x-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-[#FFB6C1] text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
              🐾
            </span>
            <p className="text-[#B4789D] font-medium">
              ¡Tu mascota ideal te está esperando! No tardes, las reservas son muy solicitadas.
            </p>
          </motion.div>
          {/* Detalles de la Reserva */}
          <motion.div
            className="border-b border-gray-300 pb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-[#B4789D] mb-4">Detalles de tu reserva</h2>
            <div className="flex justify-between items-center mb-3">
              <p className="text-gray-700">Fechas de cuidado</p>
              <button className="text-[#FF385C] font-medium underline">Editar</button>
            </div>
            <p className="text-gray-500">15–20 de dic.</p>
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-700">Mascota seleccionada</p>
              <button className="text-[#FF385C] font-medium underline">Editar</button>
            </div>
            <p className="text-gray-500">Golden Retriever - Biscuit</p>
          </motion.div>
          {/* Pagar con */}
          <motion.div
            className="space-y-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-[#B4789D]">Método de pago</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Número de tarjeta</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentDetails.cardNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#B4789D]"
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium mb-1">Fecha de expiración</label>
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={paymentDetails.expiry}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#B4789D]"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium mb-1">CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    placeholder="123"
                    value={paymentDetails.cvv}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#B4789D]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Código postal</label>
                <input
                  type="text"
                  name="postalCode"
                  placeholder="Código postal"
                  value={paymentDetails.postalCode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#B4789D]"
                />
              </div>
            </div>
          </motion.div>
        </div>
        {/* Columna de Resumen */}
        <motion.div
          className="bg-[#FFF7F2] rounded-lg shadow-lg p-6 space-y-6 border border-gray-300"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Mascota"
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-lg font-bold text-[#B4789D]">Biscuit</h3>
              <p className="text-sm text-gray-500">Golden Retriever</p>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-4 space-y-4">
            <h4 className="text-lg font-semibold text-[#B4789D]">Costo del cuidado</h4>
            <div className="flex justify-between">
              <p className="text-gray-600">350 MXN x 5 días</p>
              <p className="text-gray-800 font-medium">1,750 MXN</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Descuento por reserva extendida</p>
              <p className="text-green-500 font-medium">-350 MXN</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Tarifa de servicio</p>
              <p className="text-gray-800 font-medium">150 MXN</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Impuestos</p>
              <p className="text-gray-800 font-medium">100 MXN</p>
            </div>
          </div>
          <div className="flex justify-between border-t border-gray-300 pt-4">
            <p className="text-lg font-bold">Total (MXN)</p>
            <p className="text-lg font-bold text-[#B4789D]">1,650 MXN</p>
          </div>
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-10 flex justify-center">
        <button
          onClick={handlePayment}
          className="bg-gradient-to-r from-[#FF385C] to-[#D91448] text-white py-3 px-12 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
        >
          Confirmar y pagar
        </button>
      </div>
    </motion.div>
  );
};

export default PaymentPage;
