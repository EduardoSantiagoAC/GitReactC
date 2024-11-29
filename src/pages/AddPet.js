import React, { useState } from 'react';

const AddPet = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    classification: '',
    description: '',
    price: '',
    breed: '',
    size: '',
    age: '',
    diet: '',
    food: '',
  });

  const [imageFile, setImageFile] = useState(null); // Imagen de la mascota
  const [vaccinationFile, setVaccinationFile] = useState(null); // Cartilla de vacunación
  const [licenseFile, setLicenseFile] = useState(null); // Archivo de licencia (para apoyo/terapia)
  const [imagePreview, setImagePreview] = useState(''); // Previsualización de imagen
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
    const file = e.target.files[0];
    setVaccinationFile(file);
  };

  const handleLicenseChange = (e) => {
    const file = e.target.files[0];
    setLicenseFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      type,
      classification,
      description,
      price,
      breed,
      size,
      age,
      diet,
      food,
    } = formData;

    if (!name || !type || !classification || !description || !price || !breed || !size || !age || !diet || !food || !imageFile || !vaccinationFile) {
      setError('Todos los campos son obligatorios, incluida la imagen y la cartilla de vacunación.');
      setSuccess(false);
      return;
    }

    if (classification === 'Terapia' || classification === 'Apoyo') {
      if (!licenseFile) {
        setError('Debes subir un certificado o licencia para esta clasificación.');
        setSuccess(false);
        return;
      }
    }

    setError('');
    setSuccess(true);

    const petData = new FormData();
    petData.append('name', name);
    petData.append('type', type);
    petData.append('classification', classification);
    petData.append('description', description);
    petData.append('price', price);
    petData.append('breed', breed);
    petData.append('size', size);
    petData.append('age', age);
    petData.append('diet', diet);
    petData.append('food', food);
    petData.append('image', imageFile);
    petData.append('vaccination', vaccinationFile);

    if (licenseFile) {
      petData.append('license', licenseFile);
    }

    console.log('Datos de la mascota registrados:', Object.fromEntries(petData.entries()));

    setFormData({
      name: '',
      type: '',
      classification: '',
      description: '',
      price: '',
      breed: '',
      size: '',
      age: '',
      diet: '',
      food: '',
    });
    setImageFile(null);
    setVaccinationFile(null);
    setLicenseFile(null);
    setImagePreview('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-100 to-rose-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-red-600 text-center mb-6">
          Registrar Nueva Mascota
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">
            ¡Mascota registrada exitosamente! 🎉
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Previsualización de Imagen */}
          <div className="col-span-full flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-500 shadow-md">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Previsualización"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <p className="text-gray-500">Sin imagen</p>
                  </div>
                )}
              </div>
              <label
                htmlFor="uploadImage"
                className="absolute bottom-0 right-0 bg-red-600 text-white p-2 rounded-full cursor-pointer hover:bg-red-800"
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
          <div className="col-span-full">
            <label className="block text-gray-700 font-medium mb-2">
              Nombre de la Mascota
            </label>
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
            <label className="block text-gray-700 font-medium mb-2">Tipo de Mascota</label>
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

          <div className="col-span-full">
            <label className="block text-gray-700 font-medium mb-2">Cartilla de Vacunación</label>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleVaccinationChange}
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

          <div className="col-span-full">
            <label className="block text-gray-700 font-medium mb-2">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe brevemente a la mascota"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            ></textarea>
          </div>

          <div className="col-span-full">
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

          <div className="col-span-full">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all"
            >
              Registrar Mascota
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
