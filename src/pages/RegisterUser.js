import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'Usuario General',
    profilePhoto: null,
    country: '',
    frontDni: null,
    backDni: null,
    selfie: null,
    certificates: null,
  });





  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const [frontDniPreview, setFrontDniPreview] = useState(null); // Estado para la vista previa de la foto frontal del DNI
  const [backDniPreview, setBackDniPreview] = useState(null); // Estado para la vista previa de la foto trasera del DNI
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
  
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor, selecciona solo imágenes (JPG, PNG, etc.)');
        return;
      }
    }
  
    if (name === 'profilePhoto' && file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  
    if (name === 'frontDni' && file) {
      const reader = new FileReader();
      reader.onload = () => setFrontDniPreview(reader.result); // Vista previa de la foto frontal del DNI
      reader.readAsDataURL(file);
    }
  
    if (name === 'backDni' && file) {
      const reader = new FileReader();
      reader.onload = () => setBackDniPreview(reader.result); // Vista previa de la foto trasera del DNI
      reader.readAsDataURL(file);
    }
  
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };


  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'default-preset'); 
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dp6iwjckt/image/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message);
      return data.secure_url; // La URL segura de la imagen subida
    } catch (error) {
      console.error('Error al subir a Cloudinary:', error);
      setError('Error al subir la imagen a Cloudinary');
      return null;
    }
  };

  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.profilePhoto ||
      !formData.frontDni ||
      !formData.backDni ||
      !formData.country
    ) {
      setError('Todos los campos son obligatorios.');
      return;
    }
  
    if (formData.userType === 'Cuidador' && !formData.certificates) {
      setError('Debes subir tus certificados si eres cuidador.');
      return;
    }
  
    try {
      // Crear FormData para enviar archivos al backend
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('userType', formData.userType);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('profilePhoto', formData.profilePhoto);
      formDataToSend.append('frontDni', formData.frontDni);
      formDataToSend.append('backDni', formData.backDni);
  
      if (formData.certificates) {
        formDataToSend.append('certificates', formData.certificates);
      }
  
      const response = await fetch('/api/users/register', {
        method: 'POST',
        body: formDataToSend,
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al registrar usuario.');
      }
  
      setSuccess(true);
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error('Error en el registro:', error);
      setError(error.message);
    }
  };
  
  
  
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF3E0] to-[#F3D9DB] px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-[#B4789D] mb-6 text-center">Crear Cuenta</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">¡Usuario registrado con éxito!</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
         
          {/* Foto de perfil */}
        <div className="flex flex-col items-center">
          <label
            htmlFor="profilePhoto"
            className="w-32 h-32 rounded-full bg-[#FAF3E0] flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm cursor-pointer hover:ring-2 hover:ring-[#B4789D] transition-all"
          >
            {profilePhotoPreview ? (
              <img src={profilePhotoPreview} alt="Foto de perfil" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 font-medium">Subir Foto</span>
            )}
          </label>
          <input type="file" name="profilePhoto" id="profilePhoto" onChange={handleFileChange} className="hidden" />
        </div>

          {/* Información personal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-600 font-medium">
                Nombre Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-[#B4789D]"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-600 font-medium">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-[#B4789D]"
                required
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-gray-600 font-medium">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-[#B4789D]"
              required
            />
          </div>

          {/* País */}
          <div>
            <label htmlFor="country" className="block text-gray-600 font-medium">
              País
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-[#B4789D]"
              required
            >
              <option value="">Selecciona tu país</option>
              <option value="MX">México</option>
              <option value="US">Estados Unidos</option>
              <option value="ES">España</option>
              <option value="AR">Argentina</option>
            </select>
          </div>

          {/* Fotos del DNI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="frontDni" className="block text-gray-600 font-medium">Foto Frontal del DNI</label>
            <label htmlFor="frontDni" className="bg-gradient-to-r from-[#B4789D] to-[#EAA9A5] text-white py-2 px-8 rounded-full font-semibold hover:scale-105 transition-transform cursor-pointer text-center inline-block">
              Seleccionar Archivo
            </label>
            <input type="file" name="frontDni" id="frontDni" onChange={handleFileChange} className="hidden" />
            {frontDniPreview && <img src={frontDniPreview} alt="Foto Frontal del DNI" className="w-32 h-32" />}
          </div>

          <div>
            <label htmlFor="backDni" className="block text-gray-600 font-medium">Foto Trasera del DNI</label>
            <label htmlFor="backDni" className="bg-gradient-to-r from-[#B4789D] to-[#EAA9A5] text-white py-2 px-8 rounded-full font-semibold hover:scale-105 transition-transform cursor-pointer text-center inline-block">
              Seleccionar Archivo
            </label>
            <input type="file" name="backDni" id="backDni" onChange={handleFileChange} className="hidden" />
            {backDniPreview && <img src={backDniPreview} alt="Foto Trasera del DNI" className="w-32 h-32" />}
          </div>

            {/* Sección para la Foto Trasera del DNI */}
            <div className="flex flex-col items-center">
              <label htmlFor="backDni" className="w-32 h-32 bg-[#FAF3E0] flex items-center justify-center overflow-hidden border border-gray-200 shadow-sm cursor-pointer hover:ring-2 hover:ring-[#B4789D] transition-all">
                {backDniPreview ? (
                  <img src={backDniPreview} alt="Foto Trasera del DNI" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400 font-medium">Subir Foto Trasera</span>
                )}
              </label>
              <input 
                type="file" 
                name="backDni" 
                id="backDni" 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </div>
          </div>


          {/* Certificados */}
          {formData.userType === 'Cuidador' && (
            <div>
              <label htmlFor="certificates" className="block text-gray-600 font-medium">
                Certificados
              </label>
              <label
                htmlFor="certificates"
                className="bg-gradient-to-r from-[#B4789D] to-[#EAA9A5] text-white py-2 px-8 rounded-full font-semibold hover:scale-105 transition-transform cursor-pointer text-center inline-block"
              >
                Seleccionar Archivo
              </label>
              <input
                type="file"
                name="certificates"
                id="certificates"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          )}

          {/* Tipo de Usuario */}
          <div>
            <label htmlFor="userType" className="block text-gray-600 font-medium">
              Tipo de Usuario
            </label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-[#B4789D]"
            >
              <option value="Usuario General">Usuario General</option>
              <option value="Cuidador">Cuidador</option>
              <option value="Dueño">Dueño</option>
            </select>
          </div>

          {/* Botón Crear Cuenta */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#B4789D] to-[#EAA9A5] text-white py-3 px-12 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition-all"
            >
              Crear Cuenta
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default RegisterUser;
