import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';

const Navbar = ({ currentUser }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Controla el menú desplegable

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gradient-to-r from-[#D5ACC5] to-[#E7D3BF] shadow-md sticky top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-white hover:text-[#C6A89C]">
          🐾 PetShare
        </Link>

        {/* Navegación Principal */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-white hover:text-[#C6A89C] text-lg transition-colors duration-300">
            Inicio
          </Link>
          <Link to="/register" className="text-white hover:text-[#C6A89C] text-lg transition-colors duration-300">
            Regístrate
          </Link>
          <Link to="/add-pet" className="text-white hover:text-[#C6A89C] text-lg transition-colors duration-300">
            Subir Mascota
          </Link>

          {/* Menú de Usuario */}
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center bg-[#C6A89C] text-white px-6 py-2 rounded-full hover:bg-[#B4789D] transition duration-300"
            >
              Mi Cuenta
              <span className="ml-2">🔽</span>
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2">
                {/* Redirige al perfil del usuario */}
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-[#B4789D] hover:bg-[#E7D3BF] hover:text-[#C6A89C] transition-colors duration-300"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  🧑 Perfil
                </Link>
                <Link
                  to="/profile/movements"
                  className="block px-4 py-2 text-[#B4789D] hover:bg-[#E7D3BF] hover:text-[#C6A89C] transition-colors duration-300"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  📊 Movimientos
                </Link>
                <Link
                  to="/profile/requests"
                  className="block px-4 py-2 text-[#B4789D] hover:bg-[#E7D3BF] hover:text-[#C6A89C] transition-colors duration-300"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  📑 Solicitudes
                </Link>
                <Link
                  to="/profile/history"
                  className="block px-4 py-2 text-[#B4789D] hover:bg-[#E7D3BF] hover:text-[#C6A89C] transition-colors duration-300"
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
