import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiUser, FiGlobe, FiPlusCircle } from 'react-icons/fi';
import logo from '../assets/Logo.png';
 
const Navbar = ({ currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
 
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
 
  const handleAddPet = () => {
    if (!currentUser) {
      navigate('/login');
    } else {
      navigate('/add-pet');
    }
  };
 
  return (
    <nav className="bg-gradient-to-r from-[#E7D3BF] via-[#D5ACC5] to-[#C6A89C] shadow-md sticky top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        <Link
          to="/"
          className="flex items-center hover:scale-105 transition-transform duration-300"
        >
          <img src={logo} alt="PetShare Logo" className="h-10 mr-3" />
          <span className="text-2xl font-extrabold text-white tracking-tight">
            Mundo Mascotas
          </span>
        </Link>
 
        <div className="flex items-center space-x-4">
          <button
            className="hidden sm:flex items-center space-x-2 bg-[#E7D3BF] hover:bg-[#D5ACC5] text-white px-4 py-2 rounded-full shadow-md transition-all duration-300"
          >
            <FiGlobe className="text-lg" />
            <span className="text-sm">ES</span>
          </button>
 
          <button
            onClick={handleAddPet}
            className="flex items-center space-x-2 bg-[#FF8856] hover:bg-[#FF7043] text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 hover:scale-105"
          >
            <FiPlusCircle className="text-lg" />
            <span className="text-sm">Subir Mascota</span>
          </button>
 
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center space-x-2 bg-[#D5ACC5] hover:bg-[#C6A89C] text-white px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:scale-105"
            >
              <FiMenu className="text-lg" />
              <FiUser className="text-lg" />
            </button>
            {isMenuOpen && (
              <div
                className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl w-64 py-2 z-50 animate-fade-in-down"
              >
                {!currentUser ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-[#B4789D] hover:bg-[#F4E2D3] rounded-md transition-all duration-300"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-[#B4789D] hover:bg-[#F4E2D3] rounded-md transition-all duration-300"
                    >
                      Regístrate
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-[#B4789D] hover:bg-[#F4E2D3] rounded-md transition-all duration-300"
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-[#B4789D] hover:bg-[#F4E2D3] rounded-md transition-all duration-300"
                    >
                      Configuración
                    </Link>
                  </>
                )}
                <Link
                  to="/help"
                  className="block px-4 py-2 text-[#B4789D] hover:bg-[#F4E2D3] rounded-md transition-all duration-300"
                >
                  Centro de ayuda
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