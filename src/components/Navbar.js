import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Controla el menú desplegable

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gradient-to-br from-rose-100 to-pink-200 shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-primary-color hover:text-red-600 transition duration-300">
          🐾 PetShare
        </Link>

        {/* Navegación Principal */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-primary-color text-lg transition duration-300">
            Inicio
          </Link>
          <Link to="/register" className="text-gray-700 hover:text-primary-color text-lg transition duration-300">
            Regístrate
          </Link>
          <Link to="/add-pet" className="text-gray-700 hover:text-primary-color text-lg transition duration-300">
            Subir Mascota
          </Link>

          {/* Menú de Usuario */}
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center bg-primary-color text-white px-6 py-2 rounded-full hover:bg-red-500 transition duration-300"
            >
              Mi Cuenta
              <span className="ml-2">🔽</span>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-primary-color transition duration-300"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  🧑 Perfil
                </Link>
                <Link
                  to="/profile/movements"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-primary-color transition duration-300"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  📊 Movimientos
                </Link>
                <Link
                  to="/profile/requests"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-primary-color transition duration-300"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  📑 Solicitudes
                </Link>
                <Link
                  to="/profile/history"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-primary-color transition duration-300"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  🕒 Historial
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

