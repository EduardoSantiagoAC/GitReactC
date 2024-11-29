import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterUser = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name } = formData;

    if (!email || !password || !name) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Comprobar si el correo ya está registrado
    const existingUser = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUser.some((user) => user.email === email)) {
      setError('Este correo ya está registrado.');
      return;
    }

    // Agregar el nuevo usuario al almacenamiento local
    const newUser = { email, password, name };
    existingUser.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUser));

    // Llamar a la función onLogin y redirigir
    if (onLogin) {
      onLogin(newUser); // Puedes pasarle la información del nuevo usuario
    }
    navigate('/profile');
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary-color text-center mb-6">
          Crear Cuenta
        </h1>

        {/* Mensajes de error */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 mb-2">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />

          <label className="block text-gray-700 mb-2">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />

          <label className="block text-gray-700 mb-2">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Tu contraseña"
            className="w-full p-3 border border-gray-300 rounded mb-6"
          />

          <button
            type="submit"
            className="w-full bg-primary-color text-white py-3 rounded hover:bg-red-500 transition"
          >
            Crear Cuenta
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-primary-color hover:underline">
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
