import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    const { email, password } = formData;

    if (!email || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Verificar si el usuario existe
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      setError('');
      if (onLogin) {
        onLogin(user); // Llamamos a onLogin para guardar el estado de usuario
      }
      navigate('/profile'); // Redirigir al perfil después de login exitoso
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary-color text-center mb-6">
          Iniciar Sesión
        </h1>

        {/* Mensajes de error */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
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
            Iniciar Sesión
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-primary-color hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
