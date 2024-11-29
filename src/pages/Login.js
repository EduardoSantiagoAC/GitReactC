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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      setError('Correo o contraseña incorrectos.');
      return;
    }

    setError('');
    onLogin(user); // Pasa los datos del usuario autenticado al estado global
    navigate('/profile'); // Redirige al perfil del usuario
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7D3BF] via-[#D5ACC5] to-[#B4789D] flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#B4789D] text-center mb-6">Iniciar Sesión</h1>

        {error && <p className="text-[#B4789D] text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label className="block text-black mb-2">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            className="w-full p-3 border border-[#C6A89C] rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#B4789D]"
          />

          <label className="block text-black mb-2">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Tu contraseña"
            className="w-full p-3 border border-[#C6A89C] rounded mb-6 focus:outline-none focus:ring-2 focus:ring-[#B4789D]"
          />

          <button
            type="submit"
            className="w-full bg-[#B4789D] text-white py-3 rounded-lg hover:bg-[#C6A89C] transition-all duration-300"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-black text-center mt-4">
          ¿No tienes cuenta?{' '}
          <a
            href="/register"
            className="text-[#B4789D] hover:text-[#C6A89C] transition-all duration-300"
          >
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
