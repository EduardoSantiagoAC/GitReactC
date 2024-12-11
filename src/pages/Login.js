import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = formData;
  
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }
  
      const data = await response.json();
      console.log('Inicio de sesión exitoso:', data);
  
      // Almacenar el token y el userId en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
  
      // Manejar estado global (opcional)
      onLogin(data.user);
  
      setTimeout(() => navigate('/profile'), 2000);
    } catch (err) {
      console.error('Error al iniciar sesión:', err.message);
      setError(err.message || 'Error al conectar con el servidor');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E7D3BF] via-[#D5ACC5] to-[#B4789D] flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#B4789D] text-center mb-6">Iniciar Sesión</h1>

        {error && <p className="text-[#B4789D] text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">Inicio de sesión exitoso!</p>}

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
