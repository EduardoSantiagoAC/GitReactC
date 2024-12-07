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
    
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('userType', formData.userType);
      formDataToSend.append('profilePhoto', formData.profilePhoto); // Archivo
    
      try {
        const response = await fetch('https://git-react-c.vercel.app/api/users/register', {
          method: 'POST',
          body: formDataToSend, // No configures manualmente Content-Type
        });
    
        if (!response.ok) {
          const errorData = await response.json().catch(() => null); // Manejar errores que no sean JSON
          const errorMessage = errorData?.message || 'Hubo un error al procesar la solicitud';
          throw new Error(errorMessage);
        }
    
        const data = await response.json();
        console.log('Usuario registrado con éxito:', data);
        setSuccess(true);
        setError('');
        setTimeout(() => navigate('/login'), 2000); // Redirigir al login
      } catch (err) {
        console.error('Error:', err);
        setError(err.message || 'Error al conectar con el servidor');
      }
    };

  return (
    <div>
      <h2>Registrarse</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Usuario registrado con éxito!</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="profilePhoto">Foto de perfil:</label>
        <input type="file" name="profilePhoto" onChange={handleFileChange} required />
        <br />
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="userType">Tipo de usuario:</label>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleChange}
        >
          <option value="Usuario General">Usuario General</option>
          <option value="Cuidador">Cuidador</option>
          <option value="Dueño">Dueño</option>
        </select>
        <br />
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
};

export default RegisterUser;
