import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'Usuario General', // Valor predeterminado
    profilePhoto: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Maneja los cambios en los campos de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el cambio de archivo para la foto de perfil
  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, userType, profilePhoto } = formData;

    // Validaciones básicas
    if (!name || !email || !password || !userType || !profilePhoto) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      // Crear un objeto FormData para enviar los datos al backend
      const formDataToSend = new FormData();
      formDataToSend.append('name', name);
      formDataToSend.append('email', email);
      formDataToSend.append('password', password);
      formDataToSend.append('userType', userType);
      formDataToSend.append('profilePhoto', profilePhoto);

      // Hacer la solicitud POST a la API de backend
      const response = await fetch('/api/users/register', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setError('');
        setSuccess(true);

        // Redirigir al login después de un breve éxito
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Hubo un error al registrar al usuario.');
      }
    } catch (error) {
      setError('Hubo un error al procesar la solicitud.');
    }
  };

  return (
    <div className="register-container">
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">¡Registro exitoso!</p>}
        
        <label htmlFor="profilePhoto">Foto de perfil:</label>
        <input 
          type="file" 
          id="profilePhoto" 
          name="profilePhoto" 
          accept="image/*" 
          onChange={handleFileChange} 
          required
        />

        <label htmlFor="name">Nombre:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required
        />

        <label htmlFor="email">Correo electrónico:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required
        />

        <label htmlFor="password">Contraseña:</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          required
        />

        <label htmlFor="userType">Tipo de usuario:</label>
        <select 
          id="userType" 
          name="userType" 
          value={formData.userType} 
          onChange={handleChange} 
          required
        >
          <option value="Usuario General">Usuario General</option>
          <option value="Cuidador">Cuidador</option>
          <option value="Dueño">Dueño</option>
        </select>

        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
};

export default RegisterUser;
