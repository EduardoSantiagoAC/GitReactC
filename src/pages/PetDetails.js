import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    user: 'Juan Pérez',
    petId: 1, 
    rating: 5,
    comment: '¡Biscuit es increíble! Es un Golden Retriever muy juguetón y amigable.',
  },
  {
    id: 2,
    user: 'Ana López',
    petId: 2, 
    rating: 4,
    comment: 'Bigotes es un gato muy curioso y tranquilo, ideal para terapias.',
  },
  {
    id: 3,
    user: 'Carlos Díaz',
    petId: 3, 
    rating: 5,
    comment: 'Virus es un gato egipcio muy dulce. Perfecto para personas alérgicas.',
  },
  {
    id: 4,
    user: 'María González',
    petId: 4, 
    rating: 4,
    comment: 'Apache es un cachorro de Pastor Alemán muy enérgico y amigable. Ideal para familias con espacio.',
  },
  {
    id: 5,
    user: 'Luis Pérez',
    petId: 5, 
    rating: 5,
    comment: 'Doggy es muy tranquilo y tierno. ¡Perfecto para tenerlo como compañía en casa!',
  },
  {
    id: 6,
    user: 'Ana Ruiz',
    petId: 6, 
    rating: 5,
    comment: 'Luna es una French Poodle adorable, muy silenciosa y fiel. ¡Me encanta!',
  },
  {
    id: 7,
    user: 'Pedro Sánchez',
    petId: 7, 
    rating: 5,
    comment: 'Doge es un Shiba Inu encantador, muy lindo y sociable. ¡Un excelente compañero!',
  },
  {
    id: 8,
    user: 'Patricia López',
    petId: 8, 
    rating: 4,
    comment: 'Carnitas es un gato tranquilo y afectivo. Ideal para personas que necesitan compañía calmada.',
  },
  {
    id: 9,
    user: 'Juliana Martínez',
    petId: 9, 
    rating: 5,
    comment: 'Kira es un Siamés suave y afectivo. Es perfecto para quienes buscan un gato cariñoso.',
  },
  {
    id: 10,
    user: 'Roberto García',
    petId: 10, 
    rating: 4,
    comment: 'Snowy es un Chihuahua tranquilo, pero a veces muy curioso. Ideal para personas con poco espacio.',
  },
];


const PetDetails = ({ pets }) => {
  const { id } = useParams();
  const [expandedImage, setExpandedImage] = useState(null);
  const pet = pets.find((p) => p.id.toString() === id);

  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E7D3BF] via-[#D5ACC5] to-[#B4789D]">
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
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/250',
    'https://via.placeholder.com/300',
  ];

  const owner = {
    name: 'Carlos Méndez',
    contact: 'carlos@email.com',
    experience: '5 años cuidando mascotas',
    profilePic:
      'https://via.placeholder.com/150?text=Perfil+Carlos',
  };


  
  return (
    <div className="min-h-screen bg-[#E7D3BF]">
      {/* Imagen Principal */}
      <motion.div
        className="relative h-96"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={galleryImages[0]}
          alt={pet.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-6">
          <h1 className="text-4xl font-bold">{pet.name}</h1>
          <p className="text-lg">{pet.type}</p>
        </div>
      </motion.div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Información del Perrito */}
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

        {/* Información del Dueño */}
        <motion.div
          className="bg-[#E7D3BF] p-6 rounded-lg shadow-md flex items-center gap-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={owner.profilePic}
            alt={`Perfil de ${owner.name}`}
            className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-[#B4789D]"
          />
          <div>
            <h3 className="text-xl font-semibold mb-2 text-black">{owner.name}</h3>
            <p className="text-black">
              <strong>Contacto:</strong> {owner.contact}
            </p>
            <p className="text-black">
              <strong>Experiencia:</strong> {owner.experience}
            </p>
          </div>
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

        {/* Reseñas */}
        <motion.div
          className="bg-[#C6A89C] p-6 rounded-lg shadow-md"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-black">Reseñas</h3>
          {reviews.map((review) => (
            <div
              key={review.id}
              className="mb-4 p-4 bg-[#E7D3BF] rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-2">
                <div className="flex-shrink-0 w-10 h-10 bg-[#B4789D] rounded-full"></div>
                <div className="ml-4">
                  <h4 className="font-semibold text-black">{review.user}</h4>
                  <p className="text-[#B4789D]">{`⭐`.repeat(review.rating)}</p>
                </div>
              </div>
              <p className="text-black">{review.comment}</p>
            </div>
          ))}
        </motion.div>

        {/* Botón Volver */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            className="px-6 py-3 bg-[#B4789D] text-white rounded-full hover:bg-[#C6A89C] transition-all"
            onClick={() => window.history.back()}
          >
            Volver
          </button>
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

      {/* Botón de Mensajería */}
      <button
        className="fixed bottom-8 right-8 bg-[#B4789D] text-white p-4 rounded-full shadow-lg hover:bg-[#C6A89C] transition-all"
        onClick={() => alert('Iniciando servicio de mensajería...')}
      >
        📩
      </button>
    </div>
  );
};

export default PetDetails;
