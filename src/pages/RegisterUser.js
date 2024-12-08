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

    // Validación de campos
    if (!name || !email || !password || !userType || !profilePhoto) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      // Subir la foto a Cloudinary
      const uploadData = new FormData();
      uploadData.append('file', profilePhoto);
      uploadData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Reemplaza con tu preset de Cloudinary

      const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!uploadResponse.ok) throw new Error('Error al subir la imagen');

      const uploadResult = await uploadResponse.json();
      const photoUrl = uploadResult.secure_url;

      // Registrar el usuario
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, userType, profilePhoto: photoUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Hubo un error al registrar el usuario');
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
