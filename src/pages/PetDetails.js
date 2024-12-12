import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


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

  {
    id: 10,
    user: 'Roberto García',
    petId: 10, 
    rating: 4,
    comment: 'Snowy es un Chihuahua tranquilo, pero a veces muy curioso. Ideal para personas con poco espacio.',
  },
  {
    id: 11,
    user: 'Juan Pérez',
    petId: 11, 
    rating: 4.7,
    comment: 'Pegazo es un caballo magnífico. Muy dócil y fácil de montar. Los paseos fueron increíbles.',
  },
  {
    id: 12,
    user: 'Carlos Méndez',
    petId: 12, 
    rating: 4.9,
    comment: 'Spirit es un caballo con gran sensibilidad, perfecto para sesiones de terapia emocional.',
  },
  {
    id: 13,
    user: 'Ana Pérez',
    petId: 13, 
    rating: 4.6,
    comment: 'Gridi es un conejo encantador, muy juguetón y lleno de energía. Mis hijos lo adoran.',
  },
  {
    id: 14,
    user: 'Laura Gómez',
    petId: 14, 
    rating: 4.8,
    comment: 'Pelusa es un conejo increíblemente suave y cariñoso. ¡Es la mascota ideal para mis hijos!',
  },
  {
    id: 15,
    user: 'Roberto Fernández',
    petId: 15, 
    rating: 4.9,
    comment: 'Frederick es una iguana súper tranquila y fácil de cuidar. Su color es fascinante.',
  },
  {
    id: 16,
    user: 'Isabel Ramírez',
    petId: 16, 
    rating: 4.4,
    comment: 'Billy es una serpiente fascinante. Es tranquila y fácil de manejar, perfecta para principiantes.',
  },
  {
    id: 17,
    user: 'Javier Torres',
    petId: 17, 
    rating: 4.6,
    comment: 'Snowy es un gato blanco precioso y muy cariñoso. ¡Nos llena de amor todos los días!',
  }
];  



const PetDetails = ({ pets }) => {
  const { id } = useParams();
  const [expandedImage, setExpandedImage] = useState(null);
  const [showMap, setShowMap] = useState(false);

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

  const owner = {
    name: 'Carlos Méndez',
    contact: 'carlos@email.com',
    experience: '5 años cuidando mascotas',
    profilePic: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Carlos%20M%C3%A9ndez.PNG?raw=true',
  };

  const galleryImages = [
    pet.image,
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/250',
    'https://via.placeholder.com/300',
  ];

  return (
    <div className="min-h-screen bg-[#E7D3BF]">
      <h1 className="text-3xl font-bold text-center">{pet.name}</h1>



      {/* Imagen principal */}
      <img src={pet.image} alt={pet.name} className="w-full h-64 object-cover rounded-md my-4" />
      <p className="text-lg">{pet.description}</p>
      <p className="text-lg"><strong>Precio:</strong> ${pet.price} por día</p>



      {/* Botón para mostrar la ubicación */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => setShowMap(!showMap)}
      >
        {showMap ? 'Ocultar Mapa' : 'Ver Ubicación'}
      </button>

      {showMap && pet.ubicacion && (
        <div className="mt-6">
          <MapContainer
            center={[pet.ubicacion.latitud, pet.ubicacion.longitud]}
            zoom={15}
            style={{ height: '300px', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[pet.ubicacion.latitud, pet.ubicacion.longitud]}>
              <Popup>
                {pet.name}: {pet.description}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      

      {/* Información del cuidador */}
      <div className="bg-[#FFF3E0] p-6 rounded-lg shadow-md mt-8">
        <h3 className="text-xl font-semibold mb-4 text-black">Información del Cuidador</h3>
        <div className="flex items-center gap-4">
          <img
            src={owner.profilePic}
            alt="Perfil del cuidador"
            className="w-16 h-16 rounded-full shadow-md"
          />
          <div>
            <p><strong>Nombre:</strong> {owner.name}</p>
            <p><strong>Contacto:</strong> {owner.contact}</p>
            <p><strong>Experiencia:</strong> {owner.experience}</p>
          </div>
        </div>
      </div>

      

      {/* Sección de reseñas */}
      <motion.div
        className="bg-[#F3E5F5] p-6 rounded-lg shadow-md mt-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-black">Reseñas</h3>
        {reviews.filter((review) => review.petId.toString() === id).map((review) => (
          <div key={review.id} className="border-b-2 border-[#D5ACC5] py-2">
            <p>
              <strong>{review.user}:</strong> {review.comment}
            </p>
            <p>⭐ {review.rating} / 5</p>
          </div>
        ))}
      </motion.div>

      {/* Galería de imágenes */}
      <motion.div
        className="bg-[#D5ACC5] p-6 rounded-lg shadow-md mt-8"
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



/*

const petImages = [
  {
    name: 'kiki',
    images: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/kiki.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/kiki2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/kiki3.PNG?raw=true'
    ]
  },
  {
    name: 'Pegazo',
    images: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegazo.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegazo2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegaazo3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegazo4.PNG?raw=true'
    ]
  },
  {
    name: 'Spirit',
    images: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit4.PNG?raw=true'
    ]
  },
  {
    name: 'Gridi',
    images: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/gridi.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/gridi2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/gridi3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/gridi4.PNG?raw=true'
    ]
  },
  {
    name: 'Pelusa',
    images: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/pelusa.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/pelusa2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/pelusa3.PNG?raw=true'
    ]
  },
  {
    name: 'Frederick',
    images: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/iguana/frederick.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/iguana/frederick2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/iguana/frederick3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/iguana/frederick4.PNG?raw=true'
    ]
  },
  {
    name: 'Billy',
    images: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/serpiente/billy.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/serpiente/billy2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/serpiente/billy3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/serpiente/billy4.PNG?raw=true'
    ]
  },
  {
    name: 'Lefty',
    images: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty4.PNG?raw=true'
    ]
  },
  {
    name: 'Rafael',
    images: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael4.PNG?raw=true'
    ]
  },
  {
    name: 'Dali',
    images: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/dali.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/dali2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/dali3.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/dali4.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/dali5.PNG?raw=true'
    ]
  },
  {
    name: 'Tom',
    images: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/tom.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/tom2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/tom3.PNG?raw=true'
    ]
  },
  {
    name: 'Snowy',
    images: [
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/snowy.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/snowy2.PNG?raw=true',
      'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/snowy3.PNG?raw=true'
    ]
  }
];


*/



