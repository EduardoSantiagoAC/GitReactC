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

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.type || !formData.classification || !formData.description || !formData.price || !imageFile) {
      setError('Todos los campos son obligatorios, incluida la imagen.');
      setSuccess(false);
      return;
    }

    try {
      // Subir la imagen a Cloudinary
      const uploadData = new FormData();
      uploadData.append('file', imageFile);
      uploadData.append('upload_preset', 'default-preset');

      const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/dp6iwjckt/image/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!uploadResponse.ok) throw new Error('Error al subir la imagen');

      const uploadResult = await uploadResponse.json();
      const imageUrl = uploadResult.secure_url;

      // Enviar datos al backend
      const response = await fetch('/api/pets/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image: imageUrl }),
      });

      if (!response.ok) throw new Error('Error al registrar la mascota');

      const data = await response.json();
      setSuccess(true);
      setError('');
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
      setImagePreview('');
      console.log('Mascota registrada:', data);
    } catch (error) {
      console.error(error);
      setError('Hubo un problema al registrar la mascota');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-red-100 to-rose-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-[#B4789D] text-center mb-6">Registrar Nueva Mascota</h1>

        {error && <p className="text-[#C6A89C] text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">¡Mascota registrada exitosamente! 🎉</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Previsualización de Imagen */}
          <div className="col-span-full flex flex-col items-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#B4789D] shadow-md">
                {imagePreview ? (
                  <img src={imagePreview} alt="Previsualización" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full bg-[#E7D3BF]">
                    <p className="text-[#C6A89C]">Sin imagen</p>
                  </div>
                )}
              </div>
              <label htmlFor="uploadImage" className="absolute bottom-0 right-0 bg-[#B4789D] text-white p-2 rounded-full cursor-pointer hover:bg-[#C6A89C] transition-all">
                📷
              </label>
              <input id="uploadImage" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
          </div>

          {/* Campos del Formulario */}
          <div className="col-span-full">
            <label className="block text-gray-700 font-medium mb-2">Nombre de la Mascota</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Buddy"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>
          {/* Resto de los campos como en tu diseño */}
          <button type="submit" className="w-full bg-[#B4789D] text-white py-3 rounded-lg hover:bg-[#C6A89C] transition-all">
            Registrar Mascota
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
