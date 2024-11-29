import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Mi Menú</h2>
      <ul className="space-y-2">
        <li>
          <Link
            to="/profile"
            className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-600"
          >
            Perfil
          </Link>
        </li>
        <li>
          <Link
            to="/profile/movements"
            className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-600"
          >
            Movimientos
          </Link>
        </li>
        <li>
          <Link
            to="/profile/requests"
            className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-600"
          >
            Solicitudes
          </Link>
        </li>
        <li>
          <Link
            to="/profile/history"
            className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-600"
          >
            Historial
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
