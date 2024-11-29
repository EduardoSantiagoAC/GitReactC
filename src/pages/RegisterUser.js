import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: '',
    profilePhoto: null,
    licenses: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [name]: file ? URL.createObjectURL(file) : null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, userType, profilePhoto } = formData;
    if (!name || !email || !password || !userType) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.some((user) => user.email === email)) {
      setError('Este correo ya está registrado.');
      return;
    }

    const newUser = { ...formData };
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
    setError('');
    setSuccess(true);

    setTimeout(() => {
      navigate('/login'); // Redirige al login después de registrarse
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7D3BF] via-[#D5ACC5] to-[#B4789D] flex justify-center items-center p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#B4789D] text-center mb-6">Crear Cuenta</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">¡Registro exitoso! Redirigiendo...</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Foto de perfil */}
          <div className="flex justify-center">
            {formData.profilePhoto ? (
              <img
                src={formData.profilePhoto}
                alt="Previsualización"
                className="w-20 h-20 rounded-full object-cover border-4 border-[#B4789D]"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-4 border-[#B4789D]">
                📷
              </div>
            )}
          </div>
          <div className="text-center">
            <label className="block text-black mb-1 font-medium">Foto de Perfil</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              name="profilePhoto"
              onChange={handleFileChange}
              className="w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#D5ACC5] file:text-black file:rounded-full hover:file:bg-[#E7D3BF]"
            />
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-black font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              className="w-full p-3 border border-[#C6A89C] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B4789D]"
            />
          </div>

          {/* Correo Electrónico */}
          <div>
            <label className="block text-black font-medium mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              className="w-full p-3 border border-[#C6A89C] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B4789D]"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-black font-medium mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
              className="w-full p-3 border border-[#C6A89C] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B4789D]"
            />
          </div>

          {/* Tipo de Usuario */}
          <div>
            <label className="block text-black font-medium mb-1">Tipo de Usuario</label>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className="w-full p-3 border border-[#C6A89C] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B4789D]"
            >
              <option value="">Selecciona tu rol</option>
              <option value="Usuario General">Usuario General</option>
              <option value="Cuidador">Cuidador</option>
              <option value="Dueño que presta su mascota">Dueño que presta su mascota</option>
            </select>
          </div>

          {/* Campo adicional para cuidadores */}
          {formData.userType === 'Cuidador' && (
            <div>
              <label className="block text-black font-medium mb-1">Sube tus Licencias</label>
              <input
                type="file"
                accept=".pdf,.png,.jpg"
                name="licenses"
                onChange={handleFileChange}
                className="w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#D5ACC5] file:text-black file:rounded-full hover:file:bg-[#E7D3BF]"
              />
            </div>
          )}

          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full bg-[#B4789D] text-white py-3 rounded-lg shadow hover:bg-[#C6A89C] transition-all"
          >
            Crear Cuenta
          </button>
        </form>

        {/* Botones de redes sociales */}
        <div className="flex justify-center space-x-4 mt-6">
          <button className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-700">
            F
          </button>
          <button className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-600">
            G
          </button>
          <button className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-500">
            T
          </button>
        </div>

        <p className="text-black text-center mt-6">
          ¿Ya tienes cuenta?{' '}
          <a
            href="/login"
            className="text-[#B4789D] hover:text-[#C6A89C] transition-all duration-300"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
