import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const reviews = [
  { id: 1, user: 'Juan Pérez', rating: 5, comment: '¡Biscuit es increíble!' },
  { id: 2, user: 'Ana López', rating: 4, comment: 'Bigotes es muy tranquilo.' },
];

const PetDetails = ({ pets }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
  const [showFullGallery, setShowFullGallery] = useState(false);

  const pet = pets.find((p) => p.id.toString() === id);

  const owner = {
    name: 'Carlos Méndez',
    location: 'Ciudad de México, México',
    image: 'https://via.placeholder.com/150',
    rating: 4.88,
    reviews: 1229,
    experience: 4,
    responseRate: '100%',
    responseTime: 'menos de una hora',
    superHost: true,
  };

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E7D3BF]">
        <motion.p
          className="text-center text-[#B4789D] text-xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No se encontró la mascota solicitada.
        </motion.p>
      </div>
    );
  }

  const galleryImages = [
    pet.image,
    'https://via.placeholder.com/400x300?text=Imagen+2',
    'https://via.placeholder.com/400x300?text=Imagen+3',
    'https://via.placeholder.com/400x300?text=Imagen+4',
    'https://via.placeholder.com/400x300?text=Imagen+5',
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="bg-[#E7D3BF]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 max-w-7xl mx-auto px-4 lg:px-8 mt-8">
        {galleryImages.slice(0, 5).map((image, index) => (
          <motion.div
            key={index}
            className={`${
              index === 0 ? 'col-span-2 row-span-2' : ''
            } relative group`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <img
              src={image}
              alt={`Galería ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            {index === 4 && galleryImages.length > 5 && (
              <button
                onClick={() => setShowFullGallery(true)}
                className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center justify-center text-lg font-semibold rounded-lg transition-opacity opacity-0 group-hover:opacity-100"
              >
                Ver más fotos
              </button>
            )}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold">{pet.name}</h1>
              <p className="text-gray-500 text-lg">{pet.type}</p>
            </motion.div>
            <motion.p
              className="text-lg text-gray-800 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {pet.description}
            </motion.p>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-4">Capacidades</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>Amigable con niños pequeños y adultos mayores</li>
                <li>Entrenado para obedecer comandos básicos</li>
                <li>Ideal como compañero terapéutico</li>
                <li>Sociable con otras mascotas</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-4">Reseñas de la mascota</h3>
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="border border-gray-200 rounded-lg p-4 mb-4 bg-white shadow-sm"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                      {review.user.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">{review.user}</h4>
                      <p className="text-yellow-500">{'⭐'.repeat(review.rating)}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold mb-4">Ubicación</h3>
              <div className="h-64 bg-gray-300 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2798895832!2d-74.25986697216851!3d40.6976700636254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c250bdfc4e30df%3A0x5315eb9e2e34a255!2sNew+York%2C+EE.+UU.!5e0!3m2!1ses!2smx!4v1632922301243!5m2!1ses!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="border border-gray-300 rounded-2xl shadow-lg p-6 space-y-6 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex justify-between items-center">
              <p className="text-3xl font-bold">${pet.price}</p>
              <p className="text-sm text-gray-600">por día</p>
            </div>
            <hr className="border-gray-200" />
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                Selecciona las fechas
              </h4>
              <Calendar
                selectRange
                onChange={(dates) => setSelectedDates(dates)}
                className="rounded-lg shadow-inner border border-gray-200"
              />
              <p className="text-sm mt-4 text-gray-600">
                <strong>Fechas seleccionadas:</strong>{' '}
                {selectedDates[0]?.toLocaleDateString()} -{' '}
                {selectedDates[1]?.toLocaleDateString()}
              </p>
            </div>
            <button
              className="w-full bg-gradient-to-r from-[#FF385C] to-[#D91448] hover:shadow-lg text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/pago')}
            >
              Reservar ahora
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              ¡No se te cobrará aún!
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 rounded-2xl shadow-lg mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <img
              src={owner.image}
              alt={owner.name}
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
            <div>
              <h3 className="text-xl font-bold">{owner.name}</h3>
              {owner.superHost && (
                <p className="text-sm text-gray-500 flex items-center">
                  <span className="bg-[#FF385C] text-white text-xs px-2 py-1 rounded-full mr-2">
                    Super cuidador
                  </span>
                </p>
              )}
              <p className="text-gray-500 text-sm">{owner.location}</p>
              <div className="mt-2 text-gray-800 text-sm">
                <p>⭐ {owner.rating} ({owner.reviews} reseñas)</p>
                <p>{owner.experience} años de experiencia</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Carlos es Super cuidador</h4>
            <p className="text-gray-600 text-sm">
              Los Super cuidadores son personas con experiencia y evaluaciones
              excelentes, que se esfuerzan al máximo por ofrecer cuidados
              maravillosos a las mascotas.
            </p>
            <hr className="border-gray-200" />
            <div>
              <h5 className="text-md font-semibold">Información del cuidador</h5>
              <p className="text-gray-600 text-sm">
                Índice de respuesta: <strong>{owner.responseRate}</strong>
              </p>
              <p className="text-gray-600 text-sm">
                Responde en <strong>{owner.responseTime}</strong>
              </p>
            </div>
            <button
              className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-all duration-300"
              onClick={() => alert(`Contactando a ${owner.name}...`)}
            >
              Escribir al cuidador
            </button>
          </div>
        </motion.div>
      </div>

      {showFullGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setShowFullGallery(false)}
            className="absolute top-4 right-4 text-white bg-black p-2 rounded-full hover:bg-gray-800"
          >
            ✕
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Imagen ${index + 1}`}
                className="w-full h-48 md:h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PetDetails;
