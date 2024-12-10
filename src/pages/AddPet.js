import React, { useState } from 'react';

const AddPet = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    classification: '',
    breed: '',
    size: '',
    age: '',
    diet: '',
    food: '',
    description: '',
    price: '',
  });

  const [imageFile, setImageFile] = useState(null); // Imagen de la mascota
  const [vaccinationFile, setVaccinationFile] = useState(null); // Cartilla de vacunación
  const [licenseFile, setLicenseFile] = useState(null); // Licencia (opcional)
  const [imagePreview, setImagePreview] = useState(''); // Previsualización de imagen
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleVaccinationChange = (e) => {
    setVaccinationFile(e.target.files[0]);
  };

  const handleLicenseChange = (e) => {
    setLicenseFile(e.target.files[0]);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const {
    name,
    type,
    classification,
    breed,
    size,
    age,
    diet,
    food,
    description,
    price,
  } = formData;

  if (
    !name ||
    !type ||
    !classification ||
    !breed ||
    !size ||
    !age ||
    !diet ||
    !food ||
    !description ||
    !price ||
    !imageFile ||
    !vaccinationFile
  ) {
    setError(
      'Todos los campos son obligatorios, incluida la imagen y la cartilla de vacunación.'
    );
    setSuccess(false);
    return;
  }

  if ((classification === 'Terapia' || classification === 'Apoyo') && !licenseFile) {
    setError('Debes subir un certificado o licencia para esta clasificación.');
    setSuccess(false);
    return;
  }

  setError('');

  try {
    // Subir imagen a Cloudinary
    const imageData = new FormData();
    imageData.append('file', imageFile);
    imageData.append('upload_preset', 'default-preset'); // Reemplaza con tu preset de Cloudinary

    const imageResponse = await fetch(
      'https://api.cloudinary.com/v1_1/dp6iwjckt/image/upload',
      {
        method: 'POST',
        body: imageData,
      }
    );

    if (!imageResponse.ok) {
      throw new Error('Error al subir la imagen');
    }

    const imageResult = await imageResponse.json();
    const imageUrl = imageResult.secure_url;

    // Obtener el ID del usuario desde localStorage o sessionStorage
    const ownerId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    if (!ownerId) {
      throw new Error('No se pudo identificar al usuario. Inicia sesión nuevamente.');
    }

    // Subir datos de la mascota al backend
    const petData = {
      name,
      type,
      classification,
      breed,
      size,
      age,
      diet,
      food,
      description,
      price,
      image: imageUrl,
      ownerId, // Agregar automáticamente el ID del usuario
    };

    const response = await fetch('/api/pets/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(petData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar la mascota');
    }

    const data = await response.json();
    console.log('Mascota registrada con éxito:', data);

    setSuccess(true);
    setFormData({
      name: '',
      type: '',
      classification: '',
      breed: '',
      size: '',
      age: '',
      diet: '',
      food: '',
      description: '',
      price: '',
    });
    setImageFile(null);
    setVaccinationFile(null);
    setLicenseFile(null);
    setImagePreview('');
  } catch (err) {
    console.error(err);
    setError(err.message || 'Error al conectar con el servidor');
    setSuccess(false);
  }
};


  
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-100 to-rose-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-[#B4789D] text-center mb-6">Registrar Nueva Mascota</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">¡Mascota registrada exitosamente! 🎉</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Previsualización de Imagen */}
          <div className="col-span-full flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#B4789D] shadow-md">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Previsualización"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-[#E7D3BF]">
                    <p className="text-[#C6A89C]">Sin imagen</p>
                  </div>
                )}
              </div>
              <label
                htmlFor="uploadImage"
                className="absolute bottom-0 right-0 bg-[#B4789D] text-white p-2 rounded-full cursor-pointer hover:bg-[#C6A89C] transition-all"
              >
                📷
              </label>
              <input
                id="uploadImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Campos del Formulario */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Buddy"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Tipo</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <option value="">Selecciona un tipo</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Clasificación</label>
            <select
              name="classification"
              value={formData.classification}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <option value="">Selecciona una clasificación</option>
              <option value="Compañía">Compañía</option>
              <option value="Terapia">Terapia</option>
              <option value="Apoyo">Apoyo</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Raza</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Ej: Golden Retriever"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Tamaño</label>
            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <option value="">Selecciona un tamaño</option>
              <option value="Pequeño">Pequeño</option>
              <option value="Mediano">Mediano</option>
              <option value="Grande">Grande</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Edad</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Ej: 3"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Dieta</label>
            <input
              type="text"
              name="diet"
              value={formData.diet}
              onChange={handleChange}
              placeholder="Ej: Sin gluten"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Comida Preferida</label>
            <input
              type="text"
              name="food"
              value={formData.food}
              onChange={handleChange}
              placeholder="Ej: Pollo"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe brevemente a la mascota"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Precio por Día</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Ej: 20"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Cartilla de Vacunación</label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleVaccinationChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          <button
            type="submit"
            className="col-span-full bg-[#B4789D] text-white py-3 rounded-lg hover:bg-[#C6A89C] transition-all"
          >
            Registrar Mascota
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
