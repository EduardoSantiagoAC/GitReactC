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
  const [licenseFile, setLicenseFile] = useState(null); // Archivo de licencia (para apoyo/terapia)
  const [imagePreview, setImagePreview] = useState(''); // Previsualización de imagen
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    setSuccess(false);

    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('type', type);
    formDataToSend.append('classification', classification);
    formDataToSend.append('breed', breed);
    formDataToSend.append('size', size);
    formDataToSend.append('age', age);
    formDataToSend.append('diet', diet);
    formDataToSend.append('food', food);
    formDataToSend.append('description', description);
    formDataToSend.append('price', price);
    formDataToSend.append('image', imageFile);
    formDataToSend.append('vaccination', vaccinationFile);

    if (licenseFile) {
      formDataToSend.append('license', licenseFile);
    }

    try {
      const response = await fetch('/api/pets/register', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Hubo un error al registrar la mascota.');
      }

      setSuccess(true);
      setError('');
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
      setError('Error al registrar la mascota.');
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-100 to-rose-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-[#B4789D] text-center mb-6">
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
          <div className="col-span-full">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Buddy"
              className="w-full p-3 border rounded"
            />
          </div>
          {/* Resto de los campos */}
          <div>
            <label>Tipo</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            >
              <option value="">Seleccione un tipo</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
            </select>
          </div>
          {/* Otros campos (clasificación, precio, etc.) siguen el mismo patrón */}
          {/* Botón de registro */}
          <div className="col-span-full">
            <button
              type="submit"
              className="w-full bg-[#B4789D] text-white py-3 rounded-lg hover:bg-[#C6A89C] transition-all"
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
