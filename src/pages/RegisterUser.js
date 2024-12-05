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

    // Crear un objeto FormData para enviar al backend
    const formDataToSend = new FormData();
    formDataToSend.append('profilePhoto', profilePhoto);
    formDataToSend.append('name', name);
    formDataToSend.append('email', email);
    formDataToSend.append('password', password);
    formDataToSend.append('userType', userType);

    try {
      // Enviar los datos al backend utilizando fetch
      const response = await fetch('https://git-react-c.vercel.app/api/users/register', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      // Verificar la respuesta del backend
      if (response.ok) {
        setSuccess(true);
        setError('');
        setTimeout(() => {
          navigate('/login'); // Redirige al login después de registrarse
        }, 2000);
      } else {
        setError(result.message || 'Hubo un error al intentar procesar la solicitud');
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      setError('Hubo un error al intentar procesar la solicitud');
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>¡Usuario registrado con éxito!</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Foto de perfil</label>
          <input
            type="file"
            name="profilePhoto"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label>Tipo de usuario</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
          >
            <option value="Usuario General">Usuario General</option>
            <option value="Cuidador">Cuidador</option>
            <option value="Dueño que presta su mascota">Dueño que presta su mascota</option>
          </select>
        </div>
        <div>
          <button type="submit">Crear cuenta</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
