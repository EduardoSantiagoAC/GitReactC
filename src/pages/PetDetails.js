import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';



const reviewsBiscuit = [
  { id: 1, user: 'Juan Pérez', rating: 5, comment: '¡Biscuit es increíble!' },
  { id: 2, user: 'María González', rating: 4, comment: 'Ideal para compañía.' },
];

const reviewsBigotes = [
  { id: 1, user: 'Ana López', rating: 5, comment: 'Bigotes es muy tranquilo.' },
  { id: 2, user: 'Carlos Díaz', rating: 4, comment: 'Un gato muy curioso.' },
];

const reviewsVirus = [
  { id: 1, user: 'Pedro Sánchez', rating: 5, comment: 'Perfecto para personas alérgicas.' },
  { id: 2, user: 'Juliana Martínez', rating: 4, comment: 'Muy afectivo y único.' },
];

const reviewsApache = [
  { id: 1, user: 'María González', rating: 5, comment: 'Apache es perfecto para familias activas.' },
  { id: 2, user: 'Luis Pérez', rating: 4, comment: 'Un cachorro amigable.' },
];

const reviewsDoggy = [
  { id: 1, user: 'Ana Ruiz', rating: 5, comment: 'Doggy es muy tranquilo y tierno.' },
  { id: 2, user: 'Carlos Méndez', rating: 4, comment: 'Perfecto para niños pequeños.' },
];

const reviewsLuna = [
  { id: 1, user: 'Pedro Sánchez', rating: 5, comment: 'Luna es muy fiel y cariñosa.' },
  { id: 2, user: 'Verónica Sánchez', rating: 4, comment: 'Un cachorro muy silencioso.' },
];

const reviewsDoge = [
  { id: 1, user: 'Luis Pérez', rating: 5, comment: 'Doge es encantador y energético.' },
  { id: 2, user: 'Ana López', rating: 4, comment: 'Muy lindo y juguetón.' },
];

const reviewsCarnitas = [
  { id: 1, user: 'Patricia López', rating: 5, comment: 'Carnitas es muy tranquilo.' },
  { id: 2, user: 'Javier Torres', rating: 4, comment: 'Perfecto para terapia emocional.' },
];

const reviewsKira = [
  { id: 1, user: 'Juliana Martínez', rating: 5, comment: 'Kira es muy afectiva y suave.' },
  { id: 2, user: 'Isabel Ramírez', rating: 4, comment: 'Un gato ideal para interiores.' },
];

const reviewsSnowy = [
  { id: 1, user: 'Luis Pérez', rating: 5, comment: 'Snowy es muy amigable.' },
  { id: 2, user: 'Verónica Sánchez', rating: 4, comment: 'Perfecto para espacios pequeños.' },
];

const reviewsKiki = [
  { id: 1, user: 'Juan Pérez', rating: 5, comment: 'Kiki es adorable y con gran personalidad.' },
  { id: 2, user: 'Ana López', rating: 4, comment: 'Muy tierno y juguetón.' },
];

const reviewsPegazo = [
  { id: 1, user: 'Carlos Méndez', rating: 5, comment: 'Pegazo es elegante y ágil.' },
  { id: 2, user: 'Laura Gómez', rating: 4, comment: 'Perfecto para actividades ecuestres.' },
];

const reviewsSpirit = [
  { id: 1, user: 'Carlos Díaz', rating: 5, comment: 'Spirit tiene un espíritu libre y salvaje.' },
  { id: 2, user: 'Ana Pérez', rating: 4, comment: 'Ideal para equinoterapia.' },
];

const reviewsGridi = [
  { id: 1, user: 'María González', rating: 5, comment: 'Gridi es muy tierno y dócil.' },
  { id: 2, user: 'Pedro Sánchez', rating: 4, comment: 'Perfecto para niños pequeños.' },
];

const reviewsPelusa = [
  { id: 1, user: 'Luis García', rating: 5, comment: 'Pelusa es muy suave y perfecto para caricias.' },
  { id: 2, user: 'Ana Ruiz', rating: 4, comment: 'Un conejo muy tranquilo.' },
];

const reviewsFrederick = [
  { id: 1, user: 'Ana Ruiz', rating: 5, comment: 'Frederick es fascinante y exótico.' },
  { id: 2, user: 'Carlos Díaz', rating: 4, comment: 'Ideal para coleccionistas.' },
];

const reviewsBilly = [
  { id: 1, user: 'Pedro Sánchez', rating: 5, comment: 'Billy es de gran belleza.' },
  { id: 2, user: 'Patricia López', rating: 4, comment: 'Un excelente compañero para terrarios.' },
];

const reviewsLefty = [
  { id: 1, user: 'Patricia López', rating: 5, comment: 'Lefty es tranquila y longeva.' },
  { id: 2, user: 'Luis Pérez', rating: 4, comment: 'muy activa en jardines.' },
];

const reviewsRafael = [
  { id: 1, user: 'Juliana Martínez', rating: 5, comment: 'Rafael tiene mucho carácter.' },
  { id: 2, user: 'Carlos Méndez', rating: 4, comment: 'Perfecto para acuarios grandes.' },
];

const reviewsDali = [
  { id: 1, user: 'Roberto García', rating: 5, comment: 'Dali es muy inteligente y amigable.' },
  { id: 2, user: 'Isabel Ramírez', rating: 4, comment: 'Ideal como primera mascota.' },
];

const reviewsDefault = [
  { id: 1, user: 'Usuario General', rating: 4, comment: 'Muy buena mascota.' },
  { id: 2, user: 'Usuario Anónimo', rating: 5, comment: 'Recomendada.' },
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
    image: 'https://github.com/JffrGD2/mascotas-temporales/blob/main/Expertos/Carlos%20M%C3%A9ndez.PNG?raw=true',
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

  const capacitiesBiscuit = [
    'Amigable con niños pequeños y adultos mayores',
    'Entrenado para obedecer comandos básicos',
    'Ideal como compañero terapéutico',
    'Sociable con otras mascotas',
  ];
  
  const capacitiesBigotes = [
    'Explorador y curioso',
    'Sabe utilizar la caja de arena',
    'Ideal para terapia emocional',
    'Fácil de cuidar en interiores',
  ];
  
  const capacitiesVirus = [
    'Hipoalergénico, ideal para personas alérgicas',
    'Fácil de cuidar',
    'De belleza exótica y porte único',
    'Sociable con humanos',
  ];
  
  const capacitiesApache = [
    'leal y tranquilo',
    'Ideal para actividades al aire libre',
    'Fácil de entrenar para tareas básicas',
    'Compatible con familias activas',
  ];
  
  const capacitiesDoggy = [
    'Tranquilo y cariñoso',
    'Sociable con otros animales',
    'Ideal para espacios pequeños',
    'Fácil de cuidar',
  ];
  
  const capacitiesLuna = [
    'Amigable y tranquila',
    'Muy fiel a su dueño',
    'De temperamento cariñoso',
    'Requiere poco mantenimiento',
  ];
  
  const capacitiesDoge = [
    'Encantador y energético',
    'De fácil entrenamiento',
    'Sociable con humanos y otras mascotas',
    'Ideal para familias con niños',
  ];
  
  const capacitiesCarnitas = [
    'Tranquilo y cariñoso',
    'Fácil de cuidar en interiores',
    'Sociable con otras mascotas',
    'energético',
  ];
  
  const capacitiesKira = [
    'Muy afectiva y sociable',
    'Amigable con niños',
    'Sociable con otras mascotas',
    'Requiere poco mantenimiento',
  ];
  
  const capacitiesSnowy = [
    'De tamaño compacto, ideal para espacios pequeños',
    'Temperamento tranquilo',
    'Sociable con humanos',
    'Requiere poco ejercicio',
  ];
  
  const capacitiesKiki = [
    'De gran personalidad y energía',
    'Ideal para familias activas',
    'Sociable con niños y adultos',
    'Fácil de cuidar en interiores',
  ];
  
  const capacitiesPegazo = [
    'Elegante y ágil',
    'Ideal para actividades ecuestres',
    'De temperamento tranquilo',
    'Compatible con otros caballos',
  ];
  
  const capacitiesSpirit = [
    'De espíritu libre y salvaje',
    'Requiere espacio amplio',
    'Leal y protector',
    'Ideal para equinoterapia',
  ];
  
  const capacitiesGridi = [
    'Dócil y tierno',
    'Ideal para niños pequeños',
    'De fácil cuidado',
    'Sociable con otras mascotas',
  ];
  
  const capacitiesPelusa = [
    'De pelaje suave y cómodo de acariciar',
    'Tranquilo y fácil de cuidar',
    'Sociable con niños',
    'Requiere poco espacio',
  ];
  
  const capacitiesFrederick = [
    'Exótico y fascinante',
    'Ideal para coleccionistas',
    'De fácil cuidado en terrarios',
    'Sociable con humanos',
  ];
  
  const capacitiesBilly = [
    'De gran belleza y elegancia',
    'Ideal para terrarios bien diseñados',
    'Sociable con humanos',
    'De temperamento tranquilo',
  ];
  
  const capacitiesLefty = [
    'Tranquilo y longevo',
    'Ideal para jardines o acuarios',
    'Fácil de cuidar',
    'Compatible con otras tortugas',
  ];
  
  const capacitiesRafael = [
    'De carácter fuerte y protector',
    'Ideal para acuarios grandes',
    'Longevo y de fácil cuidado',
    'Compatible con otros reptiles',
  ];
  
  const capacitiesDali = [
    'Muy inteligente y amigable',
    'Fácil de entrenar',
    'Ideal como primera mascota',
    'Sociable con humanos',
  ];
  
  const capacitiesDefault = [
    'Amigable con los humanos',
    'Fácil de entrenar',
    'Ideal para familias',
    'Sociable con otras mascotas',
  ];

  
  const galleryBiscuit = [
    "https://th.bing.com/th/id/R.d680672d9d7a7b4d3da8c02e38dcfdc8?rik=7o1%2bYH1%2famZcLw&pid=ImgRaw&r=0",
  ];
  
  const galleryBigotes = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/snowy.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/snowy2.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/snowy3.PNG?raw=true',
  ];
  
  const galleryVirus = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/egipcio.PNG?raw=true',
  ];
  
  const galleryApache = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/aleman.PNG?raw=true',
  ];
  
  const galleryDoggy = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/salchicha.PNG?raw=true',
  ];
  
  const galleryLuna = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/poodle.PNG?raw=true',
  ];
  
  const galleryDoge = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/shiba.PNG?raw=true',
  ];
  
  const galleryCarnitas = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/Arturo.PNG?raw=true',
  ];
  
  const galleryKira = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/siam%C3%A9s.PNG?raw=true',
  ];
  
  const gallerySnowy = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/chihuahua.PNG?raw=true',
  ];
  
  const galleryKiki = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/kiki2.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/kiki3.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/kiki2.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/gatos/kiki3.PNG?raw=true',
  ];
  
  const galleryPegazo = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegazo.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegazo2.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegaazo3.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/pegazo4.PNG?raw=true',
  ];
  
  const gallerySpirit = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit2.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit3.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/caballos/spirit4.PNG?raw=true',
  ];
  
  const galleryGridi = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/gridi.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/gridi2.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/gridi3.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/gridi4.PNG?raw=true',
  ];
  
  const galleryPelusa = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/pelusa.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/pelusa2.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/conejos/pelusa3.PNG?raw=true',
  ];
  
  const galleryFrederick = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/iguana/frederick.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/iguana/frederick2.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/iguana/frederick3.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/iguana/frederick4.PNG?raw=true',
  ];
  
  const galleryBilly = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/serpiente/billy.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/serpiente/billy2.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/serpiente/billy3.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/serpiente/billy4.PNG?raw=true',
  ];
  
  const galleryLefty = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty2.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty3.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/lefty4.PNG?raw=true',
  ];
  
  const galleryRafael = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael2.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael3.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/tortuga/rafael4.PNG?raw=true',
  ];
  
  const galleryDali = [
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/dali.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/dali2.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/dali3.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/dali4.PNG?raw=true',
    'https://github.com/JffrGD2/mascotas-temporales/blob/main/rat/dali5.PNG?raw=true',
  ];
  
  
  let selectedReviews = [];
  if (pet.name === 'Biscuit') selectedReviews = reviewsBiscuit;
  else if (pet.name === 'Bigotes') selectedReviews = reviewsBigotes;
  else if (pet.name === 'Virus') selectedReviews = reviewsVirus;
  else if (pet.name === 'Apache') selectedReviews = reviewsApache;
  else if (pet.name === 'Doggy') selectedReviews = reviewsDoggy;
  else if (pet.name === 'Luna') selectedReviews = reviewsLuna;
  else if (pet.name === 'Doge') selectedReviews = reviewsDoge;
  else if (pet.name === 'Carnitas') selectedReviews = reviewsCarnitas;
  else if (pet.name === 'Kira') selectedReviews = reviewsKira;
  else if (pet.name === 'Snowy') selectedReviews = reviewsSnowy;
  else if (pet.name === 'Kiki') selectedReviews = reviewsKiki;
  else if (pet.name === 'Pegazo') selectedReviews = reviewsPegazo;
  else if (pet.name === 'Spirit') selectedReviews = reviewsSpirit;
  else if (pet.name === 'Gridi') selectedReviews = reviewsGridi;
  else if (pet.name === 'Pelusa') selectedReviews = reviewsPelusa;
  else if (pet.name === 'Frederick') selectedReviews = reviewsFrederick;
  else if (pet.name === 'Billy') selectedReviews = reviewsBilly;
  else if (pet.name === 'Lefty') selectedReviews = reviewsLefty;
  else if (pet.name === 'Rafael') selectedReviews = reviewsRafael;
  else if (pet.name === 'Dali') selectedReviews = reviewsDali;
  else selectedReviews = reviewsDefault;

  let galleryImages = [];
  if (pet.name === 'Biscuit') galleryImages = galleryBiscuit;
  if (pet.name === 'Bigotes') galleryImages = galleryBigotes;
  if (pet.name === 'Virus') galleryImages = galleryVirus;
  if (pet.name === 'Apache') galleryImages = galleryApache;
  if (pet.name === 'Doggy') galleryImages = galleryDoggy;
  if (pet.name === 'Luna') galleryImages = galleryLuna;
  if (pet.name === 'Doge') galleryImages = galleryDoge;
  if (pet.name === 'Carnitas') galleryImages = galleryCarnitas;
  if (pet.name === 'Kira') galleryImages = galleryKira;
  if (pet.name === 'Snowy') galleryImages = gallerySnowy;
  if (pet.name === 'Kiki') galleryImages = galleryKiki;
  if (pet.name === 'Pegazo') galleryImages = galleryPegazo;
  if (pet.name === 'Spirit') galleryImages = gallerySpirit;
  if (pet.name === 'Gridi') galleryImages = galleryGridi;
  if (pet.name === 'Pelusa') galleryImages = galleryPelusa;
  if (pet.name === 'Frederick') galleryImages = galleryFrederick;
  if (pet.name === 'Billy') galleryImages = galleryBilly;
  if (pet.name === 'Lefty') galleryImages = galleryLefty;
  if (pet.name === 'Rafael') galleryImages = galleryRafael;
  if (pet.name === 'Dali') galleryImages = galleryDali;
  
  let selectedCapacities = [];
  if (pet.name === 'Biscuit') selectedCapacities = capacitiesBiscuit;
  else if (pet.name === 'Bigotes') selectedCapacities = capacitiesBigotes;
  else if (pet.name === 'Virus') selectedCapacities = capacitiesVirus;
  else if (pet.name === 'Apache') selectedCapacities = capacitiesApache;
  else if (pet.name === 'Doggy') selectedCapacities = capacitiesDoggy;
  else if (pet.name === 'Luna') selectedCapacities = capacitiesLuna;
  else if (pet.name === 'Doge') selectedCapacities = capacitiesDoge;
  else if (pet.name === 'Carnitas') selectedCapacities = capacitiesCarnitas;
  else if (pet.name === 'Kira') selectedCapacities = capacitiesKira;
  else if (pet.name === 'Snowy') selectedCapacities = capacitiesSnowy;
  else if (pet.name === 'Kiki') selectedCapacities = capacitiesKiki;
  else if (pet.name === 'Pegazo') selectedCapacities = capacitiesPegazo;
  else if (pet.name === 'Spirit') selectedCapacities = capacitiesSpirit;
  else if (pet.name === 'Gridi') selectedCapacities = capacitiesGridi;
  else if (pet.name === 'Pelusa') selectedCapacities = capacitiesPelusa;
  else if (pet.name === 'Frederick') selectedCapacities = capacitiesFrederick;
  else if (pet.name === 'Billy') selectedCapacities = capacitiesBilly;
  else if (pet.name === 'Lefty') selectedCapacities = capacitiesLefty;
  else if (pet.name === 'Rafael') selectedCapacities = capacitiesRafael;
  else if (pet.name === 'Dali') selectedCapacities = capacitiesDali;
  else selectedCapacities = capacitiesDefault;
  
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


  <motion.div
    className="space-y-6 mx-auto max-w-3xl bg-[#F7F3F0] border border-[#D5ACC5] rounded-lg p-6 shadow-md"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <h3 className="text-xl font-semibold mb-4">cualidades</h3>
    <ul className="list-disc ml-6 space-y-2 text-gray-700">
      {selectedCapacities.map((capacity, index) => (
        <li key={index}>{capacity}</li>
      ))}
    </ul>
  </motion.div>


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
              className="space-y-6 mx-auto max-w-3xl bg-[#F7F3F0] border border-[#D5ACC5] rounded-lg p-6 shadow-md mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-4">estandares</h3>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>✔ Sociable con humanos y otras mascotas</li>
                <li>✔ vacunas al día</li>
                <li>✔ Desparasitado y con chequeos veterinarios recientes</li>
                <li>✔ temperamento tranquilo</li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold mb-4">Reseñas de la mascota</h3>
              {selectedReviews.map((review) => (
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

